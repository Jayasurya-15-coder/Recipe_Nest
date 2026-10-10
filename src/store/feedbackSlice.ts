import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FeedbackRecord {
  id: string;
  recipeId: string;
  recipeName: string;
  cuisine?: string;
  category?: string;
  rating: 'Excellent' | 'Good' | 'Average' | 'Not suitable';
  improvementCategory: 'Ingredient match' | 'Diet suitability' | 'Cooking time' | 'Cuisine or taste preference' | 'Other';
  comment?: string;
  timestamp: string;
}

export interface PreferenceProfile {
  preferredCuisines: Record<string, number>;
  dislikedCuisines: Record<string, number>;
  preferredCategories: Record<string, number>;
  dislikedCategories: Record<string, number>;
  totalPositive: number;
  totalNegative: number;
  minMatchPercent: number;
}

const STORAGE_KEY_FEEDBACK = 'recipenest_redux_feedback_list';

function loadFeedbackFromStorage(): FeedbackRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_FEEDBACK);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function computeProfile(items: FeedbackRecord[]): PreferenceProfile {
  const preferredCuisines: Record<string, number> = {};
  const dislikedCuisines: Record<string, number> = {};
  const preferredCategories: Record<string, number> = {};
  const dislikedCategories: Record<string, number> = {};
  let totalPositive = 0;
  let totalNegative = 0;
  let minMatchPercent = 40;

  for (const fb of items) {
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

interface FeedbackState {
  history: FeedbackRecord[];
  profile: PreferenceProfile;
}

const initialHistory = loadFeedbackFromStorage();

const initialState: FeedbackState = {
  history: initialHistory,
  profile: computeProfile(initialHistory),
};

export const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {
    addFeedbackItem: (
      state,
      action: PayloadAction<Omit<FeedbackRecord, 'id' | 'timestamp'>>
    ) => {
      const newRecord: FeedbackRecord = {
        ...action.payload,
        id: `fb_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        timestamp: new Date().toISOString(),
      };
      state.history.unshift(newRecord);
      state.profile = computeProfile(state.history);
      try {
        localStorage.setItem(STORAGE_KEY_FEEDBACK, JSON.stringify(state.history));
      } catch (err) {
        console.error('Failed to store feedback in localStorage:', err);
      }
    },
    resetPreferences: (state) => {
      state.history = [];
      state.profile = computeProfile([]);
      try {
        localStorage.removeItem(STORAGE_KEY_FEEDBACK);
      } catch (err) {
        console.error('Failed to clear feedback from localStorage:', err);
      }
    },
  },
});

export const { addFeedbackItem, resetPreferences } = feedbackSlice.actions;
export default feedbackSlice.reducer;
