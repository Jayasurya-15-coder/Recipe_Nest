import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LanguageCode, translations } from '../i18n/translations.js';

interface NavbarProps {
  savedCount: number;
  currentLanguage: LanguageCode;
  onChangeLanguage: (lang: LanguageCode) => void;
  onOpenPreferences: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  savedCount,
  currentLanguage,
  onChangeLanguage,
  onOpenPreferences,
}) => {
  const t = translations[currentLanguage];
  const location = useLocation();
  const path = location.pathname;

  const isHome = path === '/' || path.startsWith('/recipe');
  const isMatcher = path === '/matcher';
  const isFitMeals = path === '/fitmeals';
  const isSaved = path === '/saved';

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Text Logo using React Router Link */}
          <Link to="/" className="flex items-baseline space-x-3 cursor-pointer">
            <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-[#16321A]">
              RecipeNest
            </span>
            <span className="hidden sm:inline-block text-xs uppercase tracking-widest text-[#5A6E5F] font-medium border-l border-[#D5CFC4] pl-3">
              Culinary Platform
            </span>
          </Link>

          {/* Desktop Navigation Links using React Router Link */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <Link
              to="/"
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                isHome
                  ? 'text-[#16321A] border-b-2 border-[#16321A]'
                  : 'text-[#4A5D4F] hover:text-[#16321A]'
              }`}
            >
              {t.navHome}
            </Link>

            <Link
              to="/matcher"
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                isMatcher
                  ? 'text-[#16321A] border-b-2 border-[#16321A]'
                  : 'text-[#4A5D4F] hover:text-[#16321A]'
              }`}
            >
              {t.navMatcher}
            </Link>

            <Link
              to="/fitmeals"
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                isFitMeals
                  ? 'text-[#16321A] border-b-2 border-[#16321A]'
                  : 'text-[#4A5D4F] hover:text-[#16321A]'
              }`}
            >
              {t.navFitMeals}
            </Link>

            <Link
              to="/saved"
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                isSaved
                  ? 'text-[#16321A] border-b-2 border-[#16321A]'
                  : 'text-[#4A5D4F] hover:text-[#16321A]'
              }`}
            >
              {t.navSaved}
              {savedCount > 0 && (
                <span className="ml-1.5 text-xs text-[#16321A] font-semibold">
                  ({savedCount})
                </span>
              )}
            </Link>
          </nav>

          {/* Right Tools: Preferences & Language Switcher */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={onOpenPreferences}
              className="text-xs uppercase tracking-wider font-semibold text-[#16321A] border border-[#C8C0B2] hover:border-[#16321A] px-2.5 py-1.5 transition-colors"
            >
              Preferences
            </button>

            {/* Language Selector */}
            <div className="flex items-center border border-[#D5CFC4] bg-white divide-x divide-[#D5CFC4]">
              <button
                onClick={() => onChangeLanguage('en')}
                className={`px-2 py-1 text-xs font-medium transition-colors ${
                  currentLanguage === 'en'
                    ? 'bg-[#16321A] text-white'
                    : 'text-[#4A5D4F] hover:text-[#16321A]'
                }`}
                title="English"
              >
                EN
              </button>
              <button
                onClick={() => onChangeLanguage('ta')}
                className={`px-2 py-1 text-xs font-medium transition-colors ${
                  currentLanguage === 'ta'
                    ? 'bg-[#16321A] text-white'
                    : 'text-[#4A5D4F] hover:text-[#16321A]'
                }`}
                title="தமிழ்"
              >
                தமிழ்
              </button>
              <button
                onClick={() => onChangeLanguage('hi')}
                className={`px-2 py-1 text-xs font-medium transition-colors ${
                  currentLanguage === 'hi'
                    ? 'bg-[#16321A] text-white'
                    : 'text-[#4A5D4F] hover:text-[#16321A]'
                }`}
                title="हिन्दी"
              >
                हिन्दी
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Row using React Router Link */}
        <div className="md:hidden flex items-center justify-around py-2.5 border-t border-[#E8E2D8] text-xs font-medium">
          <Link
            to="/"
            className={`px-2 py-1 ${isHome ? 'text-[#16321A] font-semibold border-b-2 border-[#16321A]' : 'text-[#5A6E5F]'}`}
          >
            {t.navHome}
          </Link>
          <Link
            to="/matcher"
            className={`px-2 py-1 ${isMatcher ? 'text-[#16321A] font-semibold border-b-2 border-[#16321A]' : 'text-[#5A6E5F]'}`}
          >
            {t.navMatcher}
          </Link>
          <Link
            to="/fitmeals"
            className={`px-2 py-1 ${isFitMeals ? 'text-[#16321A] font-semibold border-b-2 border-[#16321A]' : 'text-[#5A6E5F]'}`}
          >
            {t.navFitMeals}
          </Link>
          <Link
            to="/saved"
            className={`px-2 py-1 ${isSaved ? 'text-[#16321A] font-semibold border-b-2 border-[#16321A]' : 'text-[#5A6E5F]'}`}
          >
            {t.navSaved} {savedCount > 0 && `(${savedCount})`}
          </Link>
        </div>
      </div>
    </header>
  );
};
