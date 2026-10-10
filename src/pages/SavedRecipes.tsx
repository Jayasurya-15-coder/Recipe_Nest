import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RecipeCard } from '../components/RecipeCard.js';
import { useAppDispatch, useAppSelector } from '../store/index.js';
import { toggleSavedRecipe } from '../store/savedSlice.js';
import { translations } from '../i18n/translations.js';

export const SavedRecipes: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const currentLanguage = useAppSelector((state) => state.language.currentLanguage);
  const savedRecipes = useAppSelector((state) => state.saved.recipes);
  const t = translations[currentLanguage];

  const handleViewRecipe = (id: string) => {
    navigate(`/recipe/${id}`);
  };

  const handleRemoveSaved = (recipe: any) => {
    dispatch(toggleSavedRecipe(recipe));
  };

  const handleExplore = () => {
    navigate('/');
  };

  return (
    <div className="space-y-10">
      {/* Editorial Header */}
      <section className="text-center max-w-3xl mx-auto pt-6 pb-2">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#5A6E5F] mb-3 block">
          Personal Cookbook Archive · Redux Store
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight text-[#16321A] leading-tight mb-4">
          Your Curated Kitchen Collection
        </h1>
        <p className="text-sm sm:text-base text-[#4A5D4F] leading-relaxed max-w-2xl mx-auto">
          All your bookmarked recipes, stored centrally in Redux with browser storage persistence and ready for your next culinary adventure.
        </p>
      </section>

      {/* Content Section */}
      <section className="border-t border-[#E8E2D8] pt-8">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#16321A]">
              Saved Dishes ({savedRecipes.length})
            </h2>
            <p className="text-xs sm:text-sm text-[#5D7062] mt-1">
              Synchronized with your centralized Redux store.
            </p>
          </div>
        </div>

        {savedRecipes.length === 0 && (
          <div className="bg-white border border-[#E8E2D8] p-12 text-center max-w-xl mx-auto space-y-4">
            <h3 className="font-serif text-2xl font-semibold text-[#16321A]">
              {t.noSavedTitle}
            </h3>
            <p className="text-xs sm:text-sm text-[#5D7062] leading-relaxed max-w-md mx-auto">
              {t.noSavedDescription}
            </p>
            <div className="pt-4">
              <button
                onClick={handleExplore}
                className="bg-[#16321A] text-white text-xs uppercase tracking-wider font-semibold py-3 px-6 hover:bg-[#234E35] transition-colors"
              >
                {t.exploreRecipesNow}
              </button>
            </div>
          </div>
        )}

        {savedRecipes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {savedRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onViewRecipe={handleViewRecipe}
                onToggleSave={handleRemoveSaved}
                isSaved={true}
                currentLanguage={currentLanguage}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
