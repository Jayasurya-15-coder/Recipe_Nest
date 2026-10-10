export interface NormalizedRecipe {
  id: string;
  title: string;
  category: string;
  area: string;
  instructions: string;
  thumbnail: string;
  tags: string[];
  youtube?: string;
  source?: string;
  ingredients: { name: string; measure: string }[];
  isVegetarian?: boolean;
  isHighProtein?: boolean;
  matchPercentage?: number;
  matchedIngredients?: string[];
  missingIngredients?: string[];
  explanation?: string;
  scoreBreakdown?: {
    ingredientMatchScore: number;
    cuisineAffinityScore: number;
    dietarySuitabilityScore: number;
    feedbackAdjustmentScore: number;
    totalScore: number;
  };
  nutritionEstimate?: {
    calories: number;
    proteinGrams: number;
    carbsGrams: number;
    fatGrams: number;
    isEstimated: boolean;
    disclaimer: string;
  };
}

export interface UserFeedbackInput {
  recipeId: string;
  recipeName: string;
  cuisine?: string;
  category?: string;
  rating: string;
  improvementCategory: string;
  comment?: string;
}

// Generic GraphQL fetcher communicating directly with Node.js /graphql endpoint
export async function executeGraphQL<T = any>(
  query: string,
  variables: Record<string, any> = {}
): Promise<T> {
  const response = await fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error ${response.status} from GraphQL server`);
  }

  const result = await response.json();
  if (result.errors && result.errors.length > 0) {
    throw new Error(result.errors[0].message || 'GraphQL execution error');
  }

  return result.data as T;
}

// 1. Search recipes query
export const SEARCH_RECIPES_QUERY = `
  query SearchRecipes($query: String) {
    recipes(query: $query) {
      id
      title
      category
      area
      instructions
      thumbnail
      tags
      isVegetarian
      isHighProtein
      ingredients {
        name
        measure
      }
      nutritionEstimate {
        calories
        proteinGrams
        carbsGrams
        fatGrams
        isEstimated
        disclaimer
      }
    }
  }
`;

// 2. Recipe details query
export const GET_RECIPE_QUERY = `
  query GetRecipe($id: ID!) {
    recipe(id: $id) {
      id
      title
      category
      area
      instructions
      thumbnail
      tags
      youtube
      source
      isVegetarian
      isHighProtein
      ingredients {
        name
        measure
      }
      nutritionEstimate {
        calories
        proteinGrams
        carbsGrams
        fatGrams
        isEstimated
        disclaimer
      }
    }
  }
`;

// 3. Featured recipes query
export const GET_FEATURED_QUERY = `
  query GetFeatured {
    featuredRecipes {
      id
      title
      category
      area
      instructions
      thumbnail
      tags
      isVegetarian
      isHighProtein
      ingredients {
        name
        measure
      }
      nutritionEstimate {
        calories
        proteinGrams
        carbsGrams
        fatGrams
        isEstimated
        disclaimer
      }
    }
  }
`;

// 4. Categories query
export const GET_CATEGORIES_QUERY = `
  query GetCategories {
    categories {
      name
      description
      thumbnail
    }
  }
`;

// 5. Match ingredients query
export const MATCH_INGREDIENTS_QUERY = `
  query MatchIngredients($ingredients: [String!]!, $cuisineFilter: String, $dietaryFilter: String) {
    matchIngredients(ingredients: $ingredients, cuisineFilter: $cuisineFilter, dietaryFilter: $dietaryFilter) {
      id
      title
      category
      area
      instructions
      thumbnail
      tags
      isVegetarian
      isHighProtein
      matchPercentage
      matchedIngredients
      missingIngredients
      explanation
      ingredients {
        name
        measure
      }
      scoreBreakdown {
        ingredientMatchScore
        cuisineAffinityScore
        dietarySuitabilityScore
        feedbackAdjustmentScore
        totalScore
      }
      nutritionEstimate {
        calories
        proteinGrams
        carbsGrams
        fatGrams
        isEstimated
        disclaimer
      }
    }
  }
`;

// 6. FitMeals query
export const GET_FITMEALS_QUERY = `
  query GetFitMeals($category: String, $isVegetarianOnly: Boolean, $highProteinOnly: Boolean, $searchQuery: String) {
    fitMeals(category: $category, isVegetarianOnly: $isVegetarianOnly, highProteinOnly: $highProteinOnly, searchQuery: $searchQuery) {
      id
      title
      category
      area
      instructions
      thumbnail
      tags
      isVegetarian
      isHighProtein
      ingredients {
        name
        measure
      }
      nutritionEstimate {
        calories
        proteinGrams
        carbsGrams
        fatGrams
        isEstimated
        disclaimer
      }
    }
  }
`;

// 7. Recommendations with user feedback query
export const GET_RECOMMENDATIONS_QUERY = `
  query GetRecommendations(
    $query: String
    $availableIngredients: [String!]
    $dietaryPreference: String
    $cuisinePreference: String
    $userFeedback: [FeedbackInput!]
  ) {
    recommendations(
      query: $query
      availableIngredients: $availableIngredients
      dietaryPreference: $dietaryPreference
      cuisinePreference: $cuisinePreference
      userFeedback: $userFeedback
    ) {
      recipes {
        id
        title
        category
        area
        instructions
        thumbnail
        tags
        isVegetarian
        isHighProtein
        matchPercentage
        matchedIngredients
        missingIngredients
        explanation
        ingredients {
          name
          measure
        }
        scoreBreakdown {
          ingredientMatchScore
          cuisineAffinityScore
          dietarySuitabilityScore
          feedbackAdjustmentScore
          totalScore
        }
        nutritionEstimate {
          calories
          proteinGrams
          carbsGrams
          fatGrams
          isEstimated
          disclaimer
        }
      }
      intent {
        goal
        identifiedIngredients
        dietaryFocus
        cuisineFocus
      }
      scoringMethodology
    }
  }
`;

// 8. Submit feedback mutation
export const SUBMIT_FEEDBACK_MUTATION = `
  mutation SubmitFeedback($input: FeedbackInput!) {
    submitFeedback(input: $input) {
      success
      id
      message
    }
  }
`;
