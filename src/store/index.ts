import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import savedReducer from './savedSlice.js';
import feedbackReducer from './feedbackSlice.js';
import languageReducer from './languageSlice.js';

export const store = configureStore({
  reducer: {
    saved: savedReducer,
    feedback: feedbackReducer,
    language: languageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
