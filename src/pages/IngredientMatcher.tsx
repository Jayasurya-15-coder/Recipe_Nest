import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  NormalizedRecipe,
  matchPantryIngredients,
} from '../services/recipeApi.js';
import { RecipeCard } from '../components/RecipeCard.js';
import { useAppDispatch, useAppSelector } from '../store/index.js';
import { toggleSavedRecipe } from '../store/savedSlice.js';
import { translations } from '../i18n/translations.js';
import { getLocalizedIngredient, getCanonicalIngredientName } from '../i18n/ingredientTranslations.js';

const COMMON_STAPLES = [
  'Eggs', 'Milk', 'Flour', 'Onion', 'Garlic', 'Chicken', 'Tomatoes', 'Rice',
  'Butter', 'Pasta', 'Cheese', 'Potatoes', 'Salmon', 'Broccoli', 'Olive Oil'
];

const PRESET_COMBOS = [
  { name: 'Breakfast Trio', items: ['Eggs', 'Milk', 'Flour'] },
  { name: 'Italian Pantry', items: ['Pasta', 'Tomatoes', 'Garlic', 'Olive Oil'] },
  { name: 'Dinner Essentials', items: ['Chicken', 'Onion', 'Garlic', 'Rice'] },
  { name: 'Healthy Catch', items: ['Salmon', 'Broccoli', 'Olive Oil', 'Garlic'] },
];

export const IngredientMatcher: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const currentLanguage = useAppSelector((state) => state.language.currentLanguage);
  const savedRecipes = useAppSelector((state) => state.saved.recipes);
  const savedRecipeIds = new Set(savedRecipes.map((r) => r.id));

  const t = translations[currentLanguage];

  const [inputVal, setInputVal] = useState('');
  const [ingredients, setIngredients] = useState<string[]>(['Eggs', 'Milk', 'Flour', 'Onion']);
  const [recipes, setRecipes] = useState<NormalizedRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Filters
  const [cuisineFilter, setCuisineFilter] = useState('all');
  const [dietaryFilter, setDietaryFilter] = useState('all');

  const handleAddIngredient = (itemToAdd?: string) => {
    const rawVal = (itemToAdd || inputVal).trim();
    if (!rawVal) return;

    const canonical = getCanonicalIngredientName(rawVal);
    const val = canonical || rawVal;

    if (!ingredients.some((item) => item.toLowerCase() === val.toLowerCase())) {
      setIngredients([...ingredients, val]);
    }
    if (!itemToAdd) setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddIngredient();
    }
  };

  const handleRemoveIngredient = (indexToRemove: number) => {
    setIngredients(ingredients.filter((_, idx) => idx !== indexToRemove));
  };

  const handleClearAll = () => {
    setIngredients([]);
    setRecipes([]);
    setSearched(false);
  };

  const handleApplyCombo = (items: string[]) => {
    setIngredients(items);
  };

  const handleFindMatches = async () => {
    if (ingredients.length === 0) {
      setErrorMessage('Please add at least one pantry ingredient.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setSearched(true);

    try {
      // Executes GraphQL matchIngredients query
      const results = await matchPantryIngredients({
        ingredients,
        cuisineFilter: cuisineFilter !== 'all' ? cuisineFilter : undefined,
        dietaryFilter: dietaryFilter !== 'all' ? dietaryFilter : undefined,
      });
      setRecipes(results);
    } catch (err: any) {
      setErrorMessage(err.message || 'Error calculating ingredient matches');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewRecipe = (id: string) => {
    navigate(`/recipe/${id}`);
  };

  const handleToggleSave = (recipe: NormalizedRecipe) => {
    dispatch(toggleSavedRecipe(recipe));
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <section className="text-center max-w-3xl mx-auto pt-6 pb-2">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#5A6E5F] mb-3 block">
          Pantry Matching Engine · React & GraphQL
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight text-[#16321A] leading-tight mb-4">
          Cook with what you already have.
        </h1>
        <p className="text-sm sm:text-base text-[#4A5D4F] leading-relaxed max-w-2xl mx-auto">
          Add the ingredients currently in your fridge and pantry. RecipeNest normalizes ingredient variants, calculates exact match percentages, and discloses all missing items.
        </p>
      </section>

      {/* Ingredient Management Console */}
      <section className="bg-white border border-[#E5DFD5] p-6 sm:p-8 max-w-4xl mx-auto">
        <div className="space-y-6">
          {/* Input Row */}
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-[#16321A] mb-2">
              {t.pantryInputLabel}
            </label>
            <div className="flex border-2 border-[#16321A] bg-white">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t.pantryInputPlaceholder}
                className="flex-1 px-4 py-3 text-sm text-[#1F2923] placeholder-[#8A988D] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handleAddIngredient()}
                className="bg-[#16321A] text-white text-xs uppercase tracking-wider font-semibold px-6 hover:bg-[#234E35] transition-colors"
              >
                {t.addIngredient}
              </button>
            </div>
          </div>

          {/* Active Ingredients List */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#16321A]">
                Your Pantry ({ingredients.length} items)
              </span>
              {ingredients.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearAll}
                  className="text-xs text-[#8C3A28] underline hover:text-black"
                >
                  {t.clearAll}
                </button>
              )}
            </div>

            {ingredients.length === 0 ? (
              <p className="text-xs text-[#7A8A7F] italic p-4 bg-[#FAF8F5] border border-dashed border-[#D5CFC4] text-center">
                Your pantry list is empty. Type an ingredient above or select a staple below.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {ingredients.map((item, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-2 border border-[#16321A] bg-[#F7F5EF] text-[#16321A] px-3 py-1.5 text-xs font-semibold"
                  >
                    <span>{getLocalizedIngredient(item, currentLanguage)}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveIngredient(idx)}
                      className="text-[#8C3A28] font-bold text-[11px] hover:text-black ml-1"
                      title={`Remove ${item}`}
                    >
                      [remove]
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Quick Preset Combos & Popular Staples */}
          <div className="pt-4 border-t border-[#E8E2D8] grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#5A6E5F] block mb-2">
                {t.quickExamples}
              </span>
              <div className="flex flex-wrap gap-2">
                {PRESET_COMBOS.map((combo) => (
                  <button
                    key={combo.name}
                    type="button"
                    onClick={() => handleApplyCombo(combo.items)}
                    className="text-xs border border-[#D5CFC4] bg-[#FAF8F5] px-2.5 py-1 text-[#3A4B3F] hover:border-[#16321A] hover:text-[#16321A]"
                  >
                    {combo.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#5A6E5F] block mb-2">
                {t.popularPantryItems}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {COMMON_STAPLES.map((staple) => (
                  <button
                    key={staple}
                    type="button"
                    onClick={() => handleAddIngredient(staple)}
                    className="text-xs text-[#2A4A32] underline hover:text-[#16321A] px-1"
                  >
                    +{getLocalizedIngredient(staple, currentLanguage)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Optional Filtering Controls */}
          <div className="pt-4 border-t border-[#E8E2D8] flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-[#16321A] uppercase tracking-wider">Cuisine:</span>
              <select
                value={cuisineFilter}
                onChange={(e) => setCuisineFilter(e.target.value)}
                className="bg-white border border-[#D5CFC4] p-1.5 text-xs text-[#1F2923] focus:outline-none"
              >
                <option value="all">All Cuisines</option>
                <option value="Italian">Italian</option>
                <option value="American">American</option>
                <option value="Mexican">Mexican</option>
                <option value="British">British</option>
                <option value="Japanese">Japanese</option>
                <option value="Indian">Indian</option>
                <option value="French">French</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="font-semibold text-[#16321A] uppercase tracking-wider">Diet:</span>
              <select
                value={dietaryFilter}
                onChange={(e) => setDietaryFilter(e.target.value)}
                className="bg-white border border-[#D5CFC4] p-1.5 text-xs text-[#1F2923] focus:outline-none"
              >
                <option value="all">Any Diet</option>
                <option value="vegetarian">Vegetarian Only</option>
                <option value="high-protein">High Protein Only</option>
              </select>
            </div>
          </div>

          {/* Action Trigger Button */}
          <div>
            <button
              type="button"
              onClick={handleFindMatches}
              disabled={isLoading || ingredients.length === 0}
              className="w-full bg-[#16321A] text-white text-xs sm:text-sm uppercase tracking-widest font-semibold py-3.5 px-6 hover:bg-[#234E35] disabled:opacity-50 transition-colors text-center"
            >
              {isLoading ? 'Computing Match Percentages...' : t.findMatchingMeals}
            </button>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="border-t border-[#E8E2D8] pt-8">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#16321A]">
              Matching Dishes Ranked by Pantry Overlap
            </h2>
            <p className="text-xs sm:text-sm text-[#5D7062] mt-1">
              Transparently displaying matched vs. required ingredients.
            </p>
          </div>
          {recipes.length > 0 && (
            <span className="text-xs font-mono text-[#5D7062]">
              {recipes.length} Suitable Dishes
            </span>
          )}
        </div>

        {errorMessage && (
          <div className="bg-[#FAF0ED] border border-[#F3C5BA] p-4 text-xs font-semibold text-[#8C3A28] mb-6 max-w-xl mx-auto text-center">
            {errorMessage}
          </div>
        )}

        {isLoading && (
          <div className="py-16 text-center">
            <p className="font-serif text-xl text-[#16321A] mb-2">{t.loadingRecipes}</p>
            <p className="text-xs text-[#7A8A7F]">Retrieving recipe requirements and calculating pantry ratios via GraphQL...</p>
          </div>
        )}

        {!isLoading && searched && recipes.length === 0 && (
          <div className="bg-white border border-[#E8E2D8] p-10 text-center max-w-xl mx-auto">
            <h3 className="font-serif text-xl font-semibold text-[#16321A] mb-2">
              No High-Overlap Matches Found
            </h3>
            <p className="text-xs text-[#5D7062] mb-4 leading-relaxed">
              We couldn't locate recipes meeting your current pantry items and filters. Try adding versatile staples like onions, eggs, or chicken.
            </p>
          </div>
        )}

        {/* Results Grid with detailed ingredient match tags */}
        {!isLoading && recipes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onViewRecipe={handleViewRecipe}
                onToggleSave={handleToggleSave}
                isSaved={savedRecipeIds.has(recipe.id)}
                currentLanguage={currentLanguage}
                showMatchDetails={true}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
