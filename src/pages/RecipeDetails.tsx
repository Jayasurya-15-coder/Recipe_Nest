import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  NormalizedRecipe,
  getRecipeDetails,
} from '../services/recipeApi.js';
import { FeedbackForm } from '../components/FeedbackForm.js';
import { useAppDispatch, useAppSelector } from '../store/index.js';
import { toggleSavedRecipe } from '../store/savedSlice.js';
import { LanguageCode, translations } from '../i18n/translations.js';
import { getLocalizedIngredient, getLocalizedMeasure } from '../i18n/ingredientTranslations.js';

interface RecipeDetailsProps {
  recipeId?: string;
  onBack?: () => void;
  currentLanguage?: LanguageCode;
}

export const RecipeDetails: React.FC<RecipeDetailsProps> = ({
  recipeId: propRecipeId,
  onBack: propOnBack,
  currentLanguage: propCurrentLanguage,
}) => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const reduxLang = useAppSelector((state) => state.language.currentLanguage);
  const savedRecipes = useAppSelector((state) => state.saved.recipes);

  const currentLanguage = propCurrentLanguage || reduxLang;
  const t = translations[currentLanguage];

  const effectiveId = propRecipeId || params.id || '';
  const isSaved = savedRecipes.some((r) => r.id === effectiveId);

  const [recipe, setRecipe] = useState<NormalizedRecipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    if (!effectiveId) return;

    setIsLoading(true);
    setErrorMessage(null);

    getRecipeDetails(effectiveId)
      .then((data) => {
        if (!isMounted) return;
        if (data) {
          setRecipe(data);
        } else {
          setErrorMessage('Recipe details could not be found.');
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        setErrorMessage(err.message || 'Error loading recipe');
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [effectiveId]);

  const handleBack = () => {
    if (propOnBack) {
      propOnBack();
    } else {
      navigate(-1);
    }
  };

  const handleToggleSave = () => {
    if (!recipe) return;
    dispatch(toggleSavedRecipe(recipe));
  };

  if (isLoading) {
    return (
      <div className="py-24 text-center max-w-xl mx-auto">
        <p className="font-serif text-2xl text-[#16321A] mb-2">{t.loadingRecipes}</p>
        <p className="text-xs text-[#5D7062]">Retrieving verified ingredient measures and instructions via GraphQL...</p>
      </div>
    );
  }

  if (errorMessage || !recipe) {
    return (
      <div className="py-16 text-center max-w-xl mx-auto bg-white border border-[#E8E2D8] p-8">
        <h3 className="font-serif text-2xl font-semibold text-[#8C3A28] mb-3">
          Unable to Load Recipe
        </h3>
        <p className="text-xs text-[#5D7062] mb-6">{errorMessage || 'Recipe not found.'}</p>
        <button
          onClick={handleBack}
          className="bg-[#16321A] text-white text-xs uppercase tracking-wider font-semibold py-2.5 px-6"
        >
          Return to Recipe Explorer
        </button>
      </div>
    );
  }

  const rawSteps = recipe.instructions
    .split(/\r?\n+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-16">
      {/* Top Navigation Row */}
      <div className="flex items-center justify-between border-b border-[#E8E2D8] pb-4">
        <button
          onClick={handleBack}
          className="text-xs uppercase tracking-wider font-semibold text-[#16321A] border border-[#D5CFC4] hover:border-[#16321A] px-3.5 py-2 transition-colors"
        >
          Back to Recipes
        </button>

        <button
          onClick={handleToggleSave}
          className={`text-xs uppercase tracking-wider font-semibold px-4 py-2 border transition-colors ${
            isSaved
              ? 'bg-[#EAE4D9] text-[#16321A] border-[#D5CFC4]'
              : 'bg-[#16321A] text-white border-[#16321A] hover:bg-[#234E35]'
          }`}
        >
          {isSaved ? t.removeSaved : t.saveRecipe}
        </button>
      </div>

      {/* Main Recipe Header */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Photography */}
        <div className="md:col-span-5 bg-[#EFEAE2] border border-[#E8E2D8] overflow-hidden aspect-[4/3] sm:aspect-square">
          {recipe.thumbnail ? (
            <img
              src={recipe.thumbnail}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-[#7A8A7F]">
              No Image
            </div>
          )}
        </div>

        {/* Recipe Meta & Title */}
        <div className="md:col-span-7 flex flex-col justify-between h-full space-y-4">
          <div>
            {/* Metadata Line */}
            <div className="flex flex-wrap items-center text-xs text-[#5D7062] font-medium tracking-wide uppercase mb-3">
              <span>{recipe.category}</span>
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

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#16321A] leading-tight mb-4">
              {recipe.title}
            </h1>

            {/* Nutrition Estimate Summary Card */}
            {recipe.nutritionEstimate && (
              <div className="bg-white border border-[#E8E2D8] p-4 my-4">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#16321A] block mb-2">
                  {t.estimatedNutrition}
                </span>
                <div className="grid grid-cols-4 gap-2 text-center border-t border-[#F2ECE3] pt-2">
                  <div>
                    <span className="block text-base sm:text-lg font-serif font-bold text-[#16321A]">
                      {recipe.nutritionEstimate.calories}
                    </span>
                    <span className="text-[10px] uppercase text-[#5D7062]">Calories</span>
                  </div>
                  <div>
                    <span className="block text-base sm:text-lg font-serif font-bold text-[#16321A]">
                      {recipe.nutritionEstimate.proteinGrams}g
                    </span>
                    <span className="text-[10px] uppercase text-[#5D7062]">Protein</span>
                  </div>
                  <div>
                    <span className="block text-base sm:text-lg font-serif font-bold text-[#16321A]">
                      {recipe.nutritionEstimate.carbsGrams}g
                    </span>
                    <span className="text-[10px] uppercase text-[#5D7062]">Carbs</span>
                  </div>
                  <div>
                    <span className="block text-base sm:text-lg font-serif font-bold text-[#16321A]">
                      {recipe.nutritionEstimate.fatGrams}g
                    </span>
                    <span className="text-[10px] uppercase text-[#5D7062]">Fat</span>
                  </div>
                </div>
                <p className="text-[10px] text-[#7A8A7F] mt-2 italic">
                  {recipe.nutritionEstimate.disclaimer}
                </p>
              </div>
            )}
          </div>

          {/* External Links */}
          <div className="flex flex-wrap gap-3 pt-2">
            {recipe.source && (
              <a
                href={recipe.source}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-wider font-semibold text-[#16321A] border-b border-[#16321A] pb-0.5 hover:text-[#234E35]"
              >
                View Original Publisher Source
              </a>
            )}
            {recipe.youtube && (
              <a
                href={recipe.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-wider font-semibold text-[#8C3A28] border-b border-[#8C3A28] pb-0.5"
              >
                Watch Video Demonstration
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Two Column Content: Ingredients & Instructions */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-10 border-t border-[#E8E2D8] pt-10">
        {/* Ingredients List */}
        <div className="md:col-span-5 bg-white border border-[#E8E2D8] p-6 sm:p-8 self-start">
          <h2 className="font-serif text-2xl font-semibold text-[#16321A] mb-4 pb-2 border-b border-[#E8E2D8]">
            {t.ingredientsList}
          </h2>
          <ul className="divide-y divide-[#F2ECE3] text-sm text-[#2A3B2E]">
            {recipe.ingredients.map((ing, idx) => (
              <li key={idx} className="py-2.5 flex items-baseline justify-between gap-4">
                <span className="font-medium text-[#16321A]">
                  {getLocalizedIngredient(ing.name, currentLanguage)}
                </span>
                <span className="text-xs text-[#5D7062] font-mono text-right">
                  {getLocalizedMeasure(ing.measure || 'To taste', currentLanguage)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Step-by-Step Cooking Instructions */}
        <div className="md:col-span-7 space-y-6">
          <h2 className="font-serif text-2xl font-semibold text-[#16321A] pb-2 border-b border-[#E8E2D8]">
            {t.instructions}
          </h2>

          <div className="space-y-4">
            {rawSteps.map((step, idx) => (
              <div key={idx} className="flex gap-4 items-start text-sm sm:text-base leading-relaxed text-[#2C3D30]">
                <span className="font-mono text-xs font-semibold text-[#5D7062] pt-1 w-6 shrink-0">
                  {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}.
                </span>
                <p className="flex-1">{step}</p>
              </div>
            ))}
          </div>

          {/* Multilingual Notice */}
          <div className="text-xs text-[#7A8A7F] bg-[#FAF8F5] border border-[#E8E2D8] p-4 mt-6 leading-relaxed">
            {t.languageDisclaimer}
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section className="border-t border-[#E8E2D8] pt-10">
        <FeedbackForm
          recipeId={recipe.id}
          recipeName={recipe.title}
          cuisine={recipe.area}
          category={recipe.category}
          currentLanguage={currentLanguage}
        />
      </section>
    </div>
  );
};
