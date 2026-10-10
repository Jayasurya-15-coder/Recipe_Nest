import React from 'react';
import { NormalizedRecipe } from '../services/recipeApi.js';
import { LanguageCode, translations } from '../i18n/translations.js';
import { getLocalizedIngredient } from '../i18n/ingredientTranslations.js';

interface RecipeCardProps {
  recipe: NormalizedRecipe;
  onViewRecipe: (recipeId: string) => void;
  onToggleSave?: (recipe: NormalizedRecipe) => void;
  isSaved?: boolean;
  currentLanguage: LanguageCode;
  showMatchDetails?: boolean;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onViewRecipe,
  onToggleSave,
  isSaved = false,
  currentLanguage,
  showMatchDetails = false,
}) => {
  const t = translations[currentLanguage];

  return (
    <article className="group bg-white border border-[#E5DFD5] overflow-hidden flex flex-col justify-between transition-all duration-200 hover:border-[#16321A] hover:shadow-md">
      <div>
        {/* Food Photography */}
        <div className="relative aspect-[16/10] overflow-hidden bg-[#EFEAE2]">
          {recipe.thumbnail ? (
            <img
              src={recipe.thumbnail}
              alt={recipe.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-[#7A8A7F] uppercase tracking-wider">
              No Photography Available
            </div>
          )}

          {/* Clean Unboxed Match Indicator (if available) */}
          {recipe.matchPercentage !== undefined && recipe.matchPercentage > 0 && (
            <div className="absolute top-3 left-3 bg-[#16321A]/90 backdrop-blur-xs text-white px-2.5 py-1 text-xs font-semibold tracking-wide">
              {recipe.matchPercentage}% {t.ingredientMatchScore}
            </div>
          )}
        </div>

        {/* Content Details */}
        <div className="p-5">
          {/* Metadata Row: Category and Cuisine as clean unboxed text */}
          <div className="flex items-center text-xs text-[#5D7062] font-medium tracking-wide uppercase mb-2">
            <span>{recipe.category || 'General'}</span>
            {recipe.area && (
              <>
                <span className="mx-2" aria-hidden="true">·</span>
                <span>{recipe.area} {t.cuisine}</span>
              </>
            )}
            {recipe.isHighProtein && (
              <>
                <span className="mx-2" aria-hidden="true">·</span>
                <span className="text-[#16321A] font-semibold">High Protein</span>
              </>
            )}
            {recipe.isVegetarian && (
              <>
                <span className="mx-2" aria-hidden="true">·</span>
                <span className="text-[#2D5A35]">Vegetarian</span>
              </>
            )}
          </div>

          {/* Recipe Title */}
          <h3 className="font-serif text-xl font-semibold text-[#16321A] leading-snug line-clamp-2 mb-2 group-hover:text-[#234E35]">
            {recipe.title}
          </h3>

          {/* Transparent Agent Explanation or Ingredients Summary */}
          {recipe.explanation && (
            <p className="text-xs text-[#4A5D4F] leading-relaxed line-clamp-2 mb-3 bg-[#F6F4EE] p-2 border-l-2 border-[#16321A]">
              {recipe.explanation}
            </p>
          )}

          {/* Matched vs Missing Summary for Ingredient Matcher */}
          {showMatchDetails && (
            <div className="text-xs text-[#5D7062] space-y-1 mb-3 pt-2 border-t border-[#EFEAE2]">
              {recipe.matchedIngredients && recipe.matchedIngredients.length > 0 && (
                <div>
                  <span className="font-semibold text-[#16321A]">{t.matchedIngredients}: </span>
                  <span>{recipe.matchedIngredients.slice(0, 4).map((ing) => getLocalizedIngredient(ing, currentLanguage)).join(', ')}</span>
                  {recipe.matchedIngredients.length > 4 && <span> (+{recipe.matchedIngredients.length - 4} more)</span>}
                </div>
              )}
              {recipe.missingIngredients && recipe.missingIngredients.length > 0 && (
                <div>
                  <span className="font-semibold text-[#8C4A32]">{t.missingIngredients}: </span>
                  <span>{recipe.missingIngredients.slice(0, 3).map((ing) => getLocalizedIngredient(ing, currentLanguage)).join(', ')}</span>
                  {recipe.missingIngredients.length > 3 && <span> (+{recipe.missingIngredients.length - 3} more)</span>}
                </div>
              )}
            </div>
          )}

          {/* Nutrition Estimate (if FitMeals view) */}
          {recipe.nutritionEstimate && recipe.isHighProtein && (
            <div className="text-xs text-[#5D7062] pt-2 border-t border-[#EFEAE2] flex items-center justify-between">
              <span>Est. Protein: <strong className="text-[#16321A]">{recipe.nutritionEstimate.proteinGrams}g</strong></span>
              <span>Est. Calories: <strong>{recipe.nutritionEstimate.calories} kcal</strong></span>
            </div>
          )}
        </div>
      </div>

      {/* Action Text Buttons */}
      <div className="p-5 pt-0 flex items-center justify-between gap-3 border-t border-[#F2ECE3] mt-2">
        <button
          onClick={() => onViewRecipe(recipe.id)}
          className="flex-1 bg-[#16321A] text-white text-xs uppercase tracking-wider font-semibold py-2.5 px-4 text-center hover:bg-[#234E35] transition-colors"
        >
          {t.viewRecipe}
        </button>

        {onToggleSave && (
          <button
            onClick={() => onToggleSave(recipe)}
            className={`text-xs uppercase tracking-wider font-semibold py-2.5 px-3 border transition-colors ${
              isSaved
                ? 'bg-[#EAE4D9] text-[#16321A] border-[#D5CFC4]'
                : 'bg-white text-[#4A5D4F] border-[#D5CFC4] hover:border-[#16321A] hover:text-[#16321A]'
            }`}
          >
            {isSaved ? t.recipeSaved : t.saveRecipe}
          </button>
        )}
      </div>
    </article>
  );
};
