import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NormalizedRecipe } from '../services/graphqlClient.js';

const STORAGE_KEY = 'recipenest_redux_saved_recipes';

function loadSavedFromStorage(): NormalizedRecipe[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function persistSavedToStorage(recipes: NormalizedRecipe[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
  } catch (err) {
    console.error('Failed to persist saved recipes to localStorage:', err);
  }
}

interface SavedState {
  recipes: NormalizedRecipe[];
}

const initialState: SavedState = {
  recipes: loadSavedFromStorage(),
};

export const savedSlice = createSlice({
  name: 'saved',
  initialState,
  reducers: {
    saveRecipe: (state, action: PayloadAction<NormalizedRecipe>) => {
      const exists = state.recipes.some((r) => r.id === action.payload.id);
      if (!exists) {
        state.recipes.unshift(action.payload);
        persistSavedToStorage(state.recipes);
      }
    },
    removeSavedRecipe: (state, action: PayloadAction<string>) => {
      state.recipes = state.recipes.filter((r) => r.id !== action.payload);
      persistSavedToStorage(state.recipes);
    },
    toggleSavedRecipe: (state, action: PayloadAction<NormalizedRecipe>) => {
      const idx = state.recipes.findIndex((r) => r.id === action.payload.id);
      if (idx >= 0) {
        state.recipes.splice(idx, 1);
      } else {
        state.recipes.unshift(action.payload);
      }
      persistSavedToStorage(state.recipes);
    },
  },
});

export const { saveRecipe, removeSavedRecipe, toggleSavedRecipe } = savedSlice.actions;
export default savedSlice.reducer;
