import { buildSchema } from 'graphql';
import {
  searchRecipes,
  getRecipeById,
  getMealCategories,
  getFeaturedRecipes,
  filterRecipesByCategory,
  filterRecipesByIngredient,
} from './mealdb.js';
import {
  getPersonalizedRecommendations,
  calculateIngredientMatch,
  calculateRecipeScore,
  generateRecommendationExplanation,
  cleanIngredientName,
  derivePreferencesFromFeedback,
  UserFeedbackSignal,
} from './recommendationEngine.js';

export const schema = buildSchema(`
  type Ingredient {
    name: String!
    measure: String
  }

  type NutritionEstimate {
    calories: Int
    proteinGrams: Int
    carbsGrams: Int
    fatGrams: Int
    isEstimated: Boolean
    disclaimer: String
  }

  type ScoreBreakdown {
    ingredientMatchScore: Float
    cuisineAffinityScore: Float
    dietarySuitabilityScore: Float
    feedbackAdjustmentScore: Float
    totalScore: Float
  }

  type Recipe {
    id: ID!
    title: String!
    category: String
    area: String
    instructions: String
    thumbnail: String
    tags: [String!]
    youtube: String
    source: String
    ingredients: [Ingredient!]!
    isVegetarian: Boolean
    isHighProtein: Boolean
    matchPercentage: Int
    matchedIngredients: [String!]
    missingIngredients: [String!]
    explanation: String
    scoreBreakdown: ScoreBreakdown
    nutritionEstimate: NutritionEstimate
  }

  type Category {
    name: String!
    description: String
    thumbnail: String
  }

  type RecommendationIntent {
    goal: String
    identifiedIngredients: [String!]
    dietaryFocus: String
    cuisineFocus: String
  }

  type RecommendationResponse {
    recipes: [Recipe!]!
    intent: RecommendationIntent
    scoringMethodology: String
  }

  type FeedbackResponse {
    success: Boolean!
    id: String!
    message: String
  }

  input FeedbackInput {
    recipeId: String!
    recipeName: String!
    cuisine: String
    category: String
    rating: String!
    improvementCategory: String!
    comment: String
  }

  type Query {
    recipes(query: String): [Recipe!]!
    recipe(id: ID!): Recipe
    featuredRecipes: [Recipe!]!
    categories: [Category!]!
    matchIngredients(
      ingredients: [String!]!
      cuisineFilter: String
      dietaryFilter: String
    ): [Recipe!]!
    fitMeals(
      category: String
      isVegetarianOnly: Boolean
      highProteinOnly: Boolean
      searchQuery: String
    ): [Recipe!]!
    recommendations(
      query: String
      availableIngredients: [String!]
      dietaryPreference: String
      cuisinePreference: String
      userFeedback: [FeedbackInput!]
    ): RecommendationResponse!
  }

  type Mutation {
    submitFeedback(input: FeedbackInput!): FeedbackResponse!
  }
`);

// In-memory feedback store on server
const serverFeedbackLog: UserFeedbackSignal[] = [];

export const rootResolver = {
  // 1. Search recipes
  recipes: async ({ query }: { query?: string }) => {
    return await searchRecipes(query || '');
  },

  // 2. Recipe details by ID
  recipe: async ({ id }: { id: string }) => {
    return await getRecipeById(id);
  },

  // 3. Featured recipes
  featuredRecipes: async () => {
    return await getFeaturedRecipes();
  },

  // 4. Categories
  categories: async () => {
    return await getMealCategories();
  },

  // 5. Match ingredients
  matchIngredients: async ({
    ingredients,
    cuisineFilter,
    dietaryFilter,
  }: {
    ingredients: string[];
    cuisineFilter?: string;
    dietaryFilter?: string;
  }) => {
    const cleanIngredients = ingredients.map(cleanIngredientName).filter(Boolean);
    const profile = derivePreferencesFromFeedback(serverFeedbackLog);

    const candidateMap = new Map<string, any>();
    for (const ing of cleanIngredients.slice(0, 5)) {
      const meals = await filterRecipesByIngredient(ing);
      for (const m of meals.slice(0, 8)) {
        if (!candidateMap.has(m.idMeal)) {
          const full = await getRecipeById(m.idMeal);
          if (full) {
            candidateMap.set(full.id, full);
          }
        }
      }
    }

    if (candidateMap.size < 4) {
      const fallbackList = await searchRecipes('chicken');
      for (const f of fallbackList) {
        if (!candidateMap.has(f.id)) {
          candidateMap.set(f.id, f);
        }
      }
    }

    let candidates = Array.from(candidateMap.values());

    if (dietaryFilter === 'vegetarian') {
      candidates = candidates.filter((c) => c.isVegetarian);
    } else if (dietaryFilter === 'high-protein') {
      candidates = candidates.filter((c) => c.isHighProtein);
    }

    if (cuisineFilter && cuisineFilter !== 'all') {
      candidates = candidates.filter(
        (c) => c.area && c.area.toLowerCase() === cuisineFilter.toLowerCase()
      );
    }

    const results = candidates.map((recipe) => {
      const match = calculateIngredientMatch(cleanIngredients, recipe.ingredients);
      const scoreBreakdown = calculateRecipeScore(
        recipe,
        match.matchPercentage,
        profile,
        dietaryFilter,
        cuisineFilter
      );
      const explanation = generateRecommendationExplanation(recipe, match, scoreBreakdown, profile);

      return {
        ...recipe,
        matchPercentage: match.matchPercentage,
        matchedIngredients: match.matchedIngredients,
        missingIngredients: match.missingIngredients,
        scoreBreakdown,
        explanation,
      };
    });

    results.sort((a, b) => {
      if (b.matchPercentage !== a.matchPercentage) {
        return b.matchPercentage - a.matchPercentage;
      }
      return b.scoreBreakdown.totalScore - a.scoreBreakdown.totalScore;
    });

    return results;
  },

  // 6. FitMeals
  fitMeals: async ({
    category,
    isVegetarianOnly,
    highProteinOnly,
    searchQuery,
  }: {
    category?: string;
    isVegetarianOnly?: boolean;
    highProteinOnly?: boolean;
    searchQuery?: string;
  }) => {
    let pool: any[] = [];
    if (searchQuery) {
      pool = await searchRecipes(searchQuery);
    } else if (category && category !== 'all') {
      pool = await filterRecipesByCategory(category);
    } else {
      const chicken = await filterRecipesByCategory('Chicken');
      const seafood = await filterRecipesByCategory('Seafood');
      const veg = await filterRecipesByCategory('Vegetarian');
      pool = [...chicken, ...seafood, ...veg];
    }

    const uniqueMap = new Map<string, any>();
    for (const r of pool) {
      uniqueMap.set(r.id, r);
    }
    let list = Array.from(uniqueMap.values());

    if (isVegetarianOnly) {
      list = list.filter((r) => r.isVegetarian);
    }

    if (highProteinOnly) {
      list = list.filter((r) => r.isHighProtein);
    }

    list.sort((a, b) => {
      const protA = a.nutritionEstimate?.proteinGrams || 0;
      const protB = b.nutritionEstimate?.proteinGrams || 0;
      return protB - protA;
    });

    return list;
  },

  // 7. Personalized recommendations
  recommendations: async ({
    query,
    availableIngredients,
    dietaryPreference,
    cuisinePreference,
    userFeedback,
  }: {
    query?: string;
    availableIngredients?: string[];
    dietaryPreference?: 'all' | 'vegetarian' | 'high-protein';
    cuisinePreference?: string;
    userFeedback?: UserFeedbackSignal[];
  }) => {
    const feedbackCombined = [...serverFeedbackLog, ...(userFeedback || [])];
    return await getPersonalizedRecommendations({
      query,
      availableIngredients,
      dietaryPreference,
      cuisinePreference,
      userFeedback: feedbackCombined,
    });
  },

  // 8. Submit feedback mutation
  submitFeedback: async ({ input }: { input: UserFeedbackSignal }) => {
    serverFeedbackLog.push(input);
    const id = `fb_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    return {
      success: true,
      id,
      message: 'Feedback recorded into Redux and GraphQL store.',
    };
  },
};
