import {
  searchRecipes,
  getRecipeById,
  filterRecipesByIngredient,
  NormalizedRecipe,
} from './mealdb.js';

export interface UserFeedbackSignal {
  recipeId: string;
  recipeName: string;
  cuisine?: string;
  category?: string;
  rating: 'Excellent' | 'Good' | 'Average' | 'Not suitable';
  improvementCategory: 'Ingredient match' | 'Diet suitability' | 'Cooking time' | 'Cuisine or taste preference' | 'Other';
  comment?: string;
}

export interface RecommendationScoreBreakdown {
  ingredientMatchScore: number;     // 0 - 100
  cuisineAffinityScore: number;     // 0 - 100
  dietarySuitabilityScore: number;  // 0 - 100
  feedbackAdjustmentScore: number;  // -50 to +50
  totalScore: number;               // 0 - 100
}

export interface RecommendedRecipeItem extends NormalizedRecipe {
  matchPercentage: number;
  matchedIngredients: string[];
  missingIngredients: string[];
  scoreBreakdown: RecommendationScoreBreakdown;
  explanation: string;
}

export interface RecommendationRequest {
  query?: string;
  availableIngredients?: string[];
  dietaryPreference?: 'all' | 'vegetarian' | 'high-protein';
  cuisinePreference?: string;
  userFeedback?: UserFeedbackSignal[];
}

export interface RecommendationResult {
  recipes: RecommendedRecipeItem[];
  intent: {
    goal: string;
    identifiedIngredients: string[];
    dietaryFocus?: string;
    cuisineFocus?: string;
  };
  scoringMethodology: string;
}

// Normalize ingredient names for clean pantry matching
export function cleanIngredientName(name: string): string {
  let cleaned = name.trim().toLowerCase();
  cleaned = cleaned.replace(/^(fresh|dry|ground|diced|chopped|sliced|clove|cup|tbsp|tsp|pinch|can of)\s+/g, '');
  if (cleaned.endsWith('ies')) {
    cleaned = cleaned.slice(0, -3) + 'y';
  } else if (cleaned.endsWith('es') && !cleaned.endsWith('cheese')) {
    cleaned = cleaned.slice(0, -2);
  } else if (cleaned.endsWith('s') && !cleaned.endsWith('ss')) {
    cleaned = cleaned.slice(0, -1);
  }
  return cleaned;
}

// Calculate ingredient match details between user's pantry and recipe
export function calculateIngredientMatch(
  available: string[],
  recipeIngredients: { name: string }[]
): {
  matchPercentage: number;
  matchedIngredients: string[];
  missingIngredients: string[];
} {
  if (recipeIngredients.length === 0) {
    return {
      matchPercentage: 0,
      matchedIngredients: [],
      missingIngredients: [],
    };
  }

  const normalizedAvailable = available.map(cleanIngredientName);
  const matched: string[] = [];
  const missing: string[] = [];

  for (const item of recipeIngredients) {
    const normReq = cleanIngredientName(item.name);
    const isMatched = normalizedAvailable.some(
      (avail) =>
        avail === normReq ||
        normReq.includes(avail) ||
        avail.includes(normReq)
    );

    if (isMatched) {
      matched.push(item.name);
    } else {
      missing.push(item.name);
    }
  }

  const matchPercentage = Math.round((matched.length / recipeIngredients.length) * 100);

  return {
    matchPercentage,
    matchedIngredients: matched,
    missingIngredients: missing,
  };
}

// Derive preference profile from feedback history
export function derivePreferencesFromFeedback(feedbackList: UserFeedbackSignal[]) {
  const preferredCuisines: Record<string, number> = {};
  const dislikedCuisines: Record<string, number> = {};
  const preferredCategories: Record<string, number> = {};
  const dislikedCategories: Record<string, number> = {};
  let totalPositive = 0;
  let totalNegative = 0;
  let minMatchPercent = 40;

  for (const fb of feedbackList) {
    const isPos = fb.rating === 'Excellent' || fb.rating === 'Good';
    const isNeg = fb.rating === 'Average' || fb.rating === 'Not suitable';
    const cuisine = (fb.cuisine || '').trim();
    const cat = (fb.category || '').trim();

    if (isPos) {
      totalPositive += 1;
      if (cuisine) {
        preferredCuisines[cuisine] = (preferredCuisines[cuisine] || 0) + (fb.rating === 'Excellent' ? 2 : 1);
      }
      if (cat) {
        preferredCategories[cat] = (preferredCategories[cat] || 0) + 1;
      }
    } else if (isNeg) {
      totalNegative += 1;
      if (fb.improvementCategory === 'Cuisine or taste preference' && cuisine) {
        dislikedCuisines[cuisine] = (dislikedCuisines[cuisine] || 0) + 1;
      }
      if (fb.improvementCategory === 'Ingredient match') {
        minMatchPercent = Math.min(75, minMatchPercent + 5);
      }
      if (fb.improvementCategory === 'Diet suitability' && cat) {
        dislikedCategories[cat] = (dislikedCategories[cat] || 0) + 1;
      }
    }
  }

  return {
    preferredCuisines,
    dislikedCuisines,
    preferredCategories,
    dislikedCategories,
    totalPositive,
    totalNegative,
    minMatchPercent,
  };
}

// Multi-factor transparent scoring function
export function calculateRecipeScore(
  recipe: NormalizedRecipe,
  matchPercentage: number,
  profile: ReturnType<typeof derivePreferencesFromFeedback>,
  dietaryPreference?: string,
  cuisinePreference?: string
): RecommendationScoreBreakdown {
  // 1. Ingredient Match Score (weight: 40%)
  const ingredientMatchScore = matchPercentage;

  // 2. Cuisine Affinity Score (weight: 25%)
  let cuisineAffinityScore = 60; // neutral default
  const area = recipe.area || '';
  if (cuisinePreference && area.toLowerCase() === cuisinePreference.toLowerCase()) {
    cuisineAffinityScore = 100;
  } else if (area) {
    const pos = profile.preferredCuisines[area] || 0;
    const neg = profile.dislikedCuisines[area] || 0;
    if (pos > neg) {
      cuisineAffinityScore = Math.min(100, 70 + (pos - neg) * 10);
    } else if (neg > pos) {
      cuisineAffinityScore = Math.max(20, 50 - (neg - pos) * 10);
    }
  }

  // 3. Dietary Suitability Score (weight: 20%)
  let dietarySuitabilityScore = 75;
  if (dietaryPreference === 'vegetarian') {
    dietarySuitabilityScore = recipe.isVegetarian ? 100 : 10;
  } else if (dietaryPreference === 'high-protein') {
    dietarySuitabilityScore = recipe.isHighProtein ? 100 : 50;
  }

  // 4. Feedback Adjustment Score (-50 to +50, weight: 15%)
  let feedbackAdjustmentScore = 0;
  const cat = recipe.category || '';
  const posCat = profile.preferredCategories[cat] || 0;
  const negCat = profile.dislikedCategories[cat] || 0;
  feedbackAdjustmentScore += Math.min(25, posCat * 8) - Math.min(25, negCat * 8);

  // Weighted composite score (0 - 100)
  const weightedTotal =
    ingredientMatchScore * 0.40 +
    cuisineAffinityScore * 0.25 +
    dietarySuitabilityScore * 0.20 +
    (50 + feedbackAdjustmentScore) * 0.15;

  const totalScore = Math.max(0, Math.min(100, Math.round(weightedTotal)));

  return {
    ingredientMatchScore,
    cuisineAffinityScore,
    dietarySuitabilityScore,
    feedbackAdjustmentScore,
    totalScore,
  };
}

// Generate transparent explanation based on mathematical scoring
export function generateRecommendationExplanation(
  recipe: NormalizedRecipe,
  match: { matchPercentage: number; matchedIngredients: string[]; missingIngredients: string[] },
  scores: RecommendationScoreBreakdown,
  profile: ReturnType<typeof derivePreferencesFromFeedback>
): string {
  const parts: string[] = [];

  if (match.matchPercentage > 0) {
    parts.push(`Uses ${match.matchedIngredients.length} of ${recipe.ingredients.length} required ingredients (${match.matchPercentage}% pantry match)`);
  } else {
    parts.push(`Selected based on your culinary search criteria`);
  }

  const area = recipe.area;
  if (area && profile.preferredCuisines[area]) {
    parts.push(`promoted due to your positive feedback on ${area} cuisine (+${profile.preferredCuisines[area]} signal)`);
  } else if (area && profile.dislikedCuisines[area]) {
    parts.push(`retained despite lower ${area} preference due to strong ingredient availability`);
  }

  if (recipe.isHighProtein) {
    parts.push(`high protein profile (est. ${recipe.nutritionEstimate?.proteinGrams}g protein)`);
  } else if (recipe.isVegetarian) {
    parts.push(`meets vegetarian requirements`);
  }

  if (match.missingIngredients.length > 0 && match.missingIngredients.length <= 3) {
    parts.push(`missing items: ${match.missingIngredients.join(', ')}`);
  } else if (match.missingIngredients.length > 3) {
    parts.push(`requires ${match.missingIngredients.length} additional ingredients`);
  }

  return parts.join('; ') + '.';
}

// Central personalized recommendation function
export async function getPersonalizedRecommendations(
  req: RecommendationRequest
): Promise<RecommendationResult> {
  const query = (req.query || '').trim();
  const rawIngredients = req.availableIngredients || [];
  const normalizedIngredients = rawIngredients.map(cleanIngredientName).filter(Boolean);
  const feedbackList = req.userFeedback || [];

  const profile = derivePreferencesFromFeedback(feedbackList);

  let goal = query
    ? `User is searching for: "${query}"`
    : `Matching dishes using pantry items: ${normalizedIngredients.join(', ')}`;
  if (req.dietaryPreference && req.dietaryPreference !== 'all') {
    goal += ` with ${req.dietaryPreference} focus`;
  }

  // Retrieve candidate dishes
  const candidateMap = new Map<string, NormalizedRecipe>();

  if (normalizedIngredients.length > 0) {
    for (const ing of normalizedIngredients.slice(0, 4)) {
      const meals = await filterRecipesByIngredient(ing);
      for (const m of meals.slice(0, 5)) {
        if (!candidateMap.has(m.idMeal)) {
          const fullRecipe = await getRecipeById(m.idMeal);
          if (fullRecipe) {
            candidateMap.set(fullRecipe.id, fullRecipe);
          }
        }
      }
    }
  }

  // Fallback search or query search
  if (query || candidateMap.size < 4) {
    const searchResults = await searchRecipes(query || (req.dietaryPreference === 'vegetarian' ? 'vegetarian' : 'chicken'));
    for (const r of searchResults) {
      if (!candidateMap.has(r.id)) {
        candidateMap.set(r.id, r);
      }
    }
  }

  const candidates = Array.from(candidateMap.values());

  // Score and rank candidates
  const evaluated: RecommendedRecipeItem[] = candidates.map((recipe) => {
    const match = calculateIngredientMatch(normalizedIngredients, recipe.ingredients);
    const scoreBreakdown = calculateRecipeScore(
      recipe,
      match.matchPercentage,
      profile,
      req.dietaryPreference,
      req.cuisinePreference
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

  // Sort descending by composite score
  evaluated.sort((a, b) => b.scoreBreakdown.totalScore - a.scoreBreakdown.totalScore);

  return {
    recipes: evaluated.slice(0, 9),
    intent: {
      goal,
      identifiedIngredients: normalizedIngredients,
      dietaryFocus: req.dietaryPreference,
      cuisineFocus: req.cuisinePreference,
    },
    scoringMethodology: 'JavaScript multi-factor algorithmic scoring (Ingredient Match: 40%, Cuisine Affinity: 25%, Dietary Fit: 20%, Feedback Adjustment: 15%)',
  };
}
