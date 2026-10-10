import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store, useAppDispatch, useAppSelector } from './store/index.js';
import { setLanguage } from './store/languageSlice.js';
import { Navbar } from './components/Navbar.js';
import { Home } from './pages/Home.js';
import { RecipeDetails } from './pages/RecipeDetails.js';
import { IngredientMatcher } from './pages/IngredientMatcher.js';
import { FitMeals } from './pages/FitMeals.js';
import { SavedRecipes } from './pages/SavedRecipes.js';
import { PreferencesModal } from './components/PreferencesModal.js';
import { LanguageCode, translations } from './i18n/translations.js';

function AppLayout() {
  const dispatch = useAppDispatch();
  const currentLanguage = useAppSelector((state) => state.language.currentLanguage);
  const savedRecipes = useAppSelector((state) => state.saved.recipes);
  const t = translations[currentLanguage];

  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  const handleChangeLanguage = (lang: LanguageCode) => {
    dispatch(setLanguage(lang));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1F2923]">
      {/* Navbar with Text-Only Navigation & Language Selector */}
      <Navbar
        savedCount={savedRecipes.length}
        currentLanguage={currentLanguage}
        onChangeLanguage={handleChangeLanguage}
        onOpenPreferences={() => setIsPreferencesOpen(true)}
      />

      {/* Main Routed Content Area (React Router Routes) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/matcher" element={<IngredientMatcher />} />
          <Route path="/fitmeals" element={<FitMeals />} />
          <Route path="/saved" element={<SavedRecipes />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Preferences & Personalization Weights Modal */}
      <PreferencesModal
        isOpen={isPreferencesOpen}
        onClose={() => setIsPreferencesOpen(false)}
        currentLanguage={currentLanguage}
      />

      {/* Editorial Footer (Strictly No Icons) */}
      <footer className="border-t border-[#E8E2D8] bg-[#F4EFE6] mt-16 py-12 text-xs text-[#5D7062]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#E0D8CB] pb-6">
            <div>
              <span className="font-serif text-xl font-semibold text-[#16321A] tracking-tight block">
                RecipeNest
              </span>
              <p className="text-xs text-[#7A8A7F] mt-1">
                Modern Web Application (19AI545 / CS3545) · React · Redux · React Router · Node.js · GraphQL.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-xs font-medium text-[#16321A]">
              <Link to="/" className="hover:underline">
                {t.navHome}
              </Link>
              <Link to="/matcher" className="hover:underline">
                {t.navMatcher}
              </Link>
              <Link to="/fitmeals" className="hover:underline">
                {t.navFitMeals}
              </Link>
              <Link to="/saved" className="hover:underline">
                {t.navSaved}
              </Link>
              <button
                onClick={() => setIsPreferencesOpen(true)}
                className="hover:underline text-left"
              >
                View Redux Preferences
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-[#7A8A7F]">
            <p>
              Personalization signals stored centrally in Redux Toolkit state slices with browser storage persistence.
            </p>
            <p>
              Syllabus compliant technology stack. No icons design standard enforced.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </Provider>
  );
}
