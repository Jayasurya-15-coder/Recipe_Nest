import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  NormalizedRecipe,
  getFitMeals,
} from '../services/recipeApi.js';
import { RecipeCard } from '../components/RecipeCard.js';
import { useAppDispatch, useAppSelector } from '../store/index.js';
import { toggleSavedRecipe } from '../store/savedSlice.js';
import { translations } from '../i18n/translations.js';

export const FitMeals: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const currentLanguage = useAppSelector((state) => state.language.currentLanguage);
  const savedRecipes = useAppSelector((state) => state.saved.recipes);
  const savedRecipeIds = new Set(savedRecipes.map((r) => r.id));

  const t = translations[currentLanguage];

  const [recipes, setRecipes] = useState<NormalizedRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isVegetarianOnly, setIsVegetarianOnly] = useState(false);
  const [isHighProteinOnly, setIsHighProteinOnly] = useState(true);
  const [fitSearch, setFitSearch] = useState('');

  const loadMeals = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const data = await getFitMeals({
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
        isVegetarianOnly,
        highProteinOnly: isHighProteinOnly,
        searchQuery: fitSearch.trim() || undefined,
      });
      setRecipes(data);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to load fitness meals.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMeals();
  }, [selectedCategory, isVegetarianOnly, isHighProteinOnly]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loadMeals();
  };

  const handleViewRecipe = (id: string) => {
    navigate(`/recipe/${id}`);
  };

  const handleToggleSave = (recipe: NormalizedRecipe) => {
    dispatch(toggleSavedRecipe(recipe));
  };

  return (
    <div className="space-y-10">
      {/* Editorial Header */}
      <section className="text-center max-w-3xl mx-auto pt-6 pb-2">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#5A6E5F] mb-3 block">
          Fitness & Performance Nutrition · React & GraphQL
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight text-[#16321A] leading-tight mb-4">
          Fuel your body with wholesome, honest meals.
        </h1>
        <p className="text-sm sm:text-base text-[#4A5D4F] leading-relaxed max-w-2xl mx-auto">
          Explore recipes optimized for lean protein, wholesome vegetables, and balanced macronutrients with complete nutritional transparency.
        </p>

        {/* Nutritional Transparency Disclaimer Box */}
        <div className="mt-6 bg-[#F6F4EE] border border-[#E0D8CB] p-4 text-xs text-[#5D7062] max-w-2xl mx-auto text-left leading-relaxed">
          <strong className="text-[#16321A] uppercase tracking-wider block mb-1">
            Nutritional Transparency Policy:
          </strong>
          {t.nutritionDisclaimer}
        </div>
      </section>

      {/* Filter and Category Controls (Zero Pills - clean segmented button groups) */}
      <section className="bg-white border border-[#E5DFD5] p-6 max-w-5xl mx-auto space-y-5">
        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="flex border border-[#16321A]">
          <input
            type="text"
            value={fitSearch}
            onChange={(e) => setFitSearch(e.target.value)}
            placeholder="Search protein meals (e.g. Salmon, Chicken breast, Lentils, Tofu)..."
            className="flex-1 px-4 py-2.5 text-sm text-[#1F2923] placeholder-[#8A988D] focus:outline-none"
          />
          <button
            type="submit"
            className="bg-[#16321A] text-white text-xs uppercase tracking-wider font-semibold px-6 hover:bg-[#234E35]"
          >
            Filter
          </button>
        </form>

        {/* Meal Categories Row */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#F2ECE3]">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#16321A] mr-2">
            Meal Collection:
          </span>
          {[
            { id: 'all', label: 'All Collections' },
            { id: 'Chicken', label: 'Poultry / Chicken' },
            { id: 'Seafood', label: 'Seafood & Fish' },
            { id: 'Vegetarian', label: 'Plant Protein' },
            { id: 'Breakfast', label: 'Breakfast' },
            { id: 'Beef', label: 'Lean Beef' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium border transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-[#16321A] text-white border-[#16321A]'
                  : 'bg-white text-[#4A5D4F] border-[#D5CFC4] hover:border-[#16321A]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Dietary Toggles */}
        <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-[#F2ECE3] text-xs">
          <span className="font-semibold uppercase tracking-wider text-[#16321A]">
            Dietary Preferences:
          </span>

          <button
            onClick={() => setIsHighProteinOnly(!isHighProteinOnly)}
            className={`px-3 py-1.5 border transition-colors font-medium ${
              isHighProteinOnly
                ? 'bg-[#16321A] text-white border-[#16321A]'
                : 'bg-white text-[#4A5D4F] border-[#D5CFC4]'
            }`}
          >
            {isHighProteinOnly ? '[Active] High Protein Only' : 'Include All Protein Levels'}
          </button>

          <button
            onClick={() => setIsVegetarianOnly(!isVegetarianOnly)}
            className={`px-3 py-1.5 border transition-colors font-medium ${
              isVegetarianOnly
                ? 'bg-[#16321A] text-white border-[#16321A]'
                : 'bg-white text-[#4A5D4F] border-[#D5CFC4]'
            }`}
          >
            {isVegetarianOnly ? '[Active] ' + t.vegetarianFilter : 'Allow Non-Vegetarian'}
          </button>
        </div>
      </section>

      {/* Grid of Fitness Recipes */}
      <section className="border-t border-[#E8E2D8] pt-8">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#16321A]">
              Nutrient-Dense Fitness Selections
            </h2>
            <p className="text-xs sm:text-sm text-[#5D7062] mt-1">
              Ranked by protein density and macro balance via GraphQL.
            </p>
          </div>
          <span className="text-xs font-mono text-[#5D7062]">
            {recipes.length} Dishes
          </span>
        </div>

        {isLoading && (
          <div className="py-20 text-center">
            <p className="font-serif text-xl text-[#16321A] mb-2">{t.loadingRecipes}</p>
            <p className="text-xs text-[#7A8A7F]">Evaluating ingredient macronutrient profiles via GraphQL...</p>
          </div>
        )}

        {errorMessage && (
          <div className="bg-[#FAF0ED] border border-[#F3C5BA] p-4 text-xs font-semibold text-[#8C3A28] mb-6 max-w-xl mx-auto text-center">
            {errorMessage}
          </div>
        )}

        {!isLoading && recipes.length === 0 && (
          <div className="bg-white border border-[#E8E2D8] p-10 text-center max-w-xl mx-auto">
            <h3 className="font-serif text-xl font-semibold text-[#16321A] mb-2">
              No Dishes Matched Current Fitness Criteria
            </h3>
            <p className="text-xs text-[#5D7062] mb-4">
              Try toggling off strict vegetarian filtering or selecting a broader meal collection.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setIsVegetarianOnly(false);
                setFitSearch('');
              }}
              className="bg-[#16321A] text-white text-xs uppercase tracking-wider font-semibold px-4 py-2"
            >
              Reset Filters
            </button>
          </div>
        )}

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
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
