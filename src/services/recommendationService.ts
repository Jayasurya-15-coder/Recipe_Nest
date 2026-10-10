import {
  executeGraphQL,
  NormalizedRecipe,
  GET_RECOMMENDATIONS_QUERY,
} from './graphqlClient.js';
import { store } from '../store/index.js';

export interface RecommendationParams {
  query?: string;
  availableIngredients?: string[];
  dietaryPreference?: 'all' | 'vegetarian' | 'high-protein';
  cuisinePreference?: string;
}

export interface RecommendationResponse {
  success: boolean;
  recommendations: NormalizedRecipe[];
  intent: {
    goal: string;
    identifiedIngredients: string[];
    dietaryFocus?: string;
    cuisineFocus?: string;
  };
  scoringMethodology: string;
}

export async function requestPersonalizedRecommendations(
  params: RecommendationParams
): Promise<RecommendationResponse> {
  // Retrieve feedback history from Redux centralized store
  const feedbackList = store.getState().feedback.history.map((fb) => ({
    recipeId: fb.recipeId,
    recipeName: fb.recipeName,
    cuisine: fb.cuisine || '',
    category: fb.category || '',
    rating: fb.rating,
    improvementCategory: fb.improvementCategory,
    comment: fb.comment || '',
  }));

  try {
    const data = await executeGraphQL<{
      recommendations: {
        recipes: NormalizedRecipe[];
        intent: {
          goal: string;
          identifiedIngredients: string[];
          dietaryFocus?: string;
          cuisineFocus?: string;
        };
        scoringMethodology: string;
      };
    }>(GET_RECOMMENDATIONS_QUERY, {
      query: params.query || '',
      availableIngredients: params.availableIngredients || [],
      dietaryPreference: params.dietaryPreference || 'all',
      cuisinePreference: params.cuisinePreference || null,
      userFeedback: feedbackList,
    });

    return {
      success: true,
      recommendations: data.recommendations.recipes,
      intent: data.recommendations.intent,
      scoringMethodology: data.recommendations.scoringMethodology,
    };
  } catch (err: any) {
    console.error('GraphQL recommendation query error:', err);
    throw err;
  }
}
