import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LanguageCode } from '../i18n/translations.js';

const STORAGE_KEY_LANG = 'recipenest_redux_language';

function loadLanguage(): LanguageCode {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_LANG) as LanguageCode;
    if (raw === 'en' || raw === 'ta' || raw === 'hi') {
      return raw;
    }
  } catch {}
  return 'en';
}

interface LanguageState {
  currentLanguage: LanguageCode;
}

const initialState: LanguageState = {
  currentLanguage: loadLanguage(),
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<LanguageCode>) => {
      state.currentLanguage = action.payload;
      try {
        localStorage.setItem(STORAGE_KEY_LANG, action.payload);
      } catch (err) {
        console.error('Failed to save language in localStorage:', err);
      }
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
