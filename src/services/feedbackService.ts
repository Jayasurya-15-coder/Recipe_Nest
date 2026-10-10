import { executeGraphQL, SUBMIT_FEEDBACK_MUTATION, UserFeedbackInput } from './graphqlClient.js';
import { store } from '../store/index.js';
import { addFeedbackItem, resetPreferences } from '../store/feedbackSlice.js';

export interface FeedbackData {
  recipeId: string;
  recipeName: string;
  cuisine?: string;
  category?: string;
  rating: 'Excellent' | 'Good' | 'Average' | 'Not suitable';
  improvementCategory: 'Ingredient match' | 'Diet suitability' | 'Cooking time' | 'Cuisine or taste preference' | 'Other';
  comment?: string;
}

export async function submitFeedback(data: FeedbackData) {
  // 1. Submit through GraphQL mutation to Node.js backend
  try {
    await executeGraphQL(SUBMIT_FEEDBACK_MUTATION, {
      input: {
        recipeId: data.recipeId,
        recipeName: data.recipeName,
        cuisine: data.cuisine || '',
        category: data.category || '',
        rating: data.rating,
        improvementCategory: data.improvementCategory,
        comment: data.comment || '',
      },
    });
  } catch (err) {
    console.warn('Backend GraphQL feedback mutation note:', err);
  }

  // 2. Dispatch to Redux centralized state store (persists to localStorage)
  store.dispatch(addFeedbackItem(data));

  return { success: true };
}

export function getUserFeedbackList() {
  return store.getState().feedback.history;
}

export function getUserPreferences() {
  return store.getState().feedback.profile;
}

export function resetUserPreferences() {
  store.dispatch(resetPreferences());
  return true;
}
