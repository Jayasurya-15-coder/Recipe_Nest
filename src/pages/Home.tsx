import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  NormalizedRecipe,
  searchRecipes,
  getFeaturedRecipes,
} from '../services/recipeApi.js';
import {
  requestPersonalizedRecommendations,
  RecommendationResponse,
} from '../services/recommendationService.js';
import { RecipeCard } from '../components/RecipeCard.js';
import { RecommendationDetailsModal } from '../components/RecommendationDetailsModal.js';
import { useAppDispatch, useAppSelector } from '../store/index.js';
import { toggleSavedRecipe } from '../store/savedSlice.js';
import { translations } from '../i18n/translations.js';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const currentLanguage = useAppSelector((state) => state.language.currentLanguage);
  const savedRecipes = useAppSelector((state) => state.saved.recipes);
  const savedRecipeIds = new Set(savedRecipes.map((r) => r.id));

  const t = translations[currentLanguage];

  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState<NormalizedRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Personalized recommendation details
  const [recData, setRecData] = useState<RecommendationResponse | null>(null);
  const [showRecModal, setShowRecModal] = useState(false);
  const [personalizationActive, setPersonalizationActive] = useState(false);
  const [dietaryChoice, setDietaryChoice] = useState<'all' | 'vegetarian' | 'high-protein'>('all');

  // Load featured dishes on initial mount
  useEffect(() => {
    loadFeatured();
  }, []);

  const loadFeatured = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    setPersonalizationActive(false);
    try {
      const data = await getFeaturedRecipes();
      setRecipes(data);
    } catch (err: any) {
      setErrorMessage('Unable to retrieve featured recipes from culinary archive.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = searchQuery.trim();
    if (!query) {
      loadFeatured();
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      // Execute GraphQL personalized recommendation query using feedback signals from Redux
      const response = await requestPersonalizedRecommendations({
        query,
        dietaryPreference: dietaryChoice,
      });

      if (response && response.recommendations && response.recommendations.length > 0) {
        setRecipes(response.recommendations);
        setRecData(response);
        setPersonalizationActive(true);
      } else {
        const fallbackList = await searchRecipes(query);
        setRecipes(fallbackList);
        setPersonalizationActive(false);
      }
    } catch (err: any) {
      try {
        const directResults = await searchRecipes(query);
        setRecipes(directResults);
        setPersonalizationActive(false);
      } catch (subErr) {
        setErrorMessage('Failed to search recipes. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickSearch = (keyword: string) => {
    setSearchQuery(keyword);
    setIsLoading(true);
    setErrorMessage(null);
    searchRecipes(keyword)
      .then((data) => {
        setRecipes(data);
        setPersonalizationActive(false);
      })
      .catch(() => setErrorMessage('Failed to fetch recipes.'))
      .finally(() => setIsLoading(false));
  };

  const handleViewRecipe = (id: string) => {
    navigate(`/recipe/${id}`);
  };

  const handleToggleSave = (recipe: NormalizedRecipe) => {
    dispatch(toggleSavedRecipe(recipe));
  };

  return (
    <div className="space-y-12">
      {/* Editorial Hero Header */}
      <section className="text-center max-w-3xl mx-auto pt-6 pb-2">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#5A6E5F] mb-3 block">
          Modern Culinary Platform · React & GraphQL
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#16321A] leading-tight mb-5">
          Cook with intelligence, flavor, and purpose.
        </h1>
        <p className="text-base sm:text-lg text-[#4A5D4F] leading-relaxed max-w-2xl mx-auto">
          RecipeNest interprets your pantry inventory and dietary goals to rank authentic recipes from around the globe, adapting with every rating you provide.
        </p>

        {/* Prominent Search Bar (Strictly No Icons) */}
        <form onSubmit={handleSearch} className="mt-8 max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row border-2 border-[#16321A] bg-white">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="flex-1 px-4 py-3.5 text-sm sm:text-base text-[#1F2923] placeholder-[#8A988D] focus:outline-none"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#16321A] text-white text-xs sm:text-sm uppercase tracking-wider font-semibold px-6 py-3.5 hover:bg-[#234E35] disabled:opacity-60 transition-colors"
            >
              {isLoading ? t.searching : t.searchButton}
            </button>
          </div>

          {/* Dietary Filter Buttons row under search */}
          <div className="flex items-center justify-center gap-2 mt-3 text-xs">
            <span className="text-[#5A6E5F] font-medium">Diet Focus:</span>
            {[
              { id: 'all', label: 'All' },
              { id: 'vegetarian', label: 'Vegetarian' },
              { id: 'high-protein', label: 'High Protein' },
            ].map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setDietaryChoice(d.id as any)}
                className={`px-2.5 py-1 text-xs border transition-colors ${
                  dietaryChoice === d.id
                    ? 'bg-[#16321A] text-white border-[#16321A]'
                    : 'bg-white text-[#4A5D4F] border-[#D5CFC4] hover:border-[#16321A]'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          {/* Quick Keyword Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
            <span className="text-[#7A8A7F]">Quick Discovers:</span>
            {['Chicken Teriyaki', 'Pasta', 'Curry', 'Salmon', 'Pancakes', 'Salad'].map((dish) => (
              <button
                key={dish}
                type="button"
                onClick={() => handleQuickSearch(dish)}
                className="text-xs text-[#2A4A32] underline hover:text-[#16321A]"
              >
                {dish}
              </button>
            ))}
          </div>
        </form>
      </section>

      {/* Personalization Pipeline Status Banner */}
      {personalizationActive && recData && (
        <section className="bg-white border border-[#D5CFC4] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#16321A]">
                Feedback Personalization Active (GraphQL Pipeline)
              </span>
            </div>
            <p className="text-xs text-[#4A5D4F] mt-1">
              {recData.intent.goal}
            </p>
          </div>
          <button
            onClick={() => setShowRecModal(true)}
            className="text-xs uppercase tracking-wider font-semibold text-[#16321A] border border-[#16321A] hover:bg-[#16321A] hover:text-white px-3.5 py-2 transition-colors shrink-0"
          >
            Inspect Ranking Formula & Weights
          </button>
        </section>
      )}

      {/* Recipe Grid Header */}
      <section className="border-t border-[#E8E2D8] pt-8">
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#16321A]">
              {searchQuery ? `Dishes matching "${searchQuery}"` : 'Featured Culinary Creations'}
            </h2>
            <p className="text-xs sm:text-sm text-[#5D7062] mt-1">
              TheMealDB
            </p>
          </div>
          <span className="text-xs font-mono text-[#5D7062]">
            {recipes.length} {recipes.length === 1 ? 'Dish' : 'Dishes'}
          </span>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="py-20 text-center">
            <p className="font-serif text-xl text-[#16321A] mb-2">{t.loadingRecipes}</p>
            <p className="text-xs text-[#7A8A7F]">Querying GraphQL endpoint and applying Redux preference weights...</p>
          </div>
        )}

        {/* Error State */}
        {!isLoading && errorMessage && (
          <div className="bg-[#FAF0ED] border border-[#F3C5BA] p-6 text-center max-w-xl mx-auto">
            <p className="text-sm font-semibold text-[#8C3A28] mb-2">{errorMessage}</p>
            <button
              onClick={loadFeatured}
              className="text-xs uppercase tracking-wider font-semibold text-[#16321A] border-b border-[#16321A] pb-0.5"
            >
              Reset to Featured Dishes
            </button>
          </div>
        )}

        {/* Empty Result State */}
        {!isLoading && !errorMessage && recipes.length === 0 && (
          <div className="bg-white border border-[#E8E2D8] p-12 text-center max-w-xl mx-auto">
            <h3 className="font-serif text-xl font-semibold text-[#16321A] mb-2">
              {t.noRecipesFound}
            </h3>
            <p className="text-xs text-[#5D7062] mb-6 leading-relaxed">
              {t.tryDifferentSearch}
            </p>
            <button
              onClick={loadFeatured}
              className="bg-[#16321A] text-white text-xs uppercase tracking-wider font-semibold px-5 py-2.5 hover:bg-[#234E35]"
            >
              View Featured Dishes
            </button>
          </div>
        )}

        {/* Responsive Recipe Card Grid */}
        {!isLoading && !errorMessage && recipes.length > 0 && (
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

      {/* Recommendation Details Modal */}
      {recData && (
        <RecommendationDetailsModal
          isOpen={showRecModal}
          onClose={() => setShowRecModal(false)}
          intent={recData.intent}
          scoringMethodology={recData.scoringMethodology}
          currentLanguage={currentLanguage}
        />
      )}
    </div>
  );
};
