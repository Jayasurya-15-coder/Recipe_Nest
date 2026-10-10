import {
  executeGraphQL,
  NormalizedRecipe,
  SEARCH_RECIPES_QUERY,
  GET_RECIPE_QUERY,
  GET_FEATURED_QUERY,
  GET_CATEGORIES_QUERY,
  MATCH_INGREDIENTS_QUERY,
  GET_FITMEALS_QUERY,
} from './graphqlClient.js';

export type { NormalizedRecipe };

// 1. Search recipes via GraphQL
export async function searchRecipes(query: string): Promise<NormalizedRecipe[]> {
  try {
    const data = await executeGraphQL<{ recipes: NormalizedRecipe[] }>(
      SEARCH_RECIPES_QUERY,
      { query }
    );
    return data.recipes || [];
  } catch (err) {
    console.error('GraphQL searchRecipes failed:', err);
    return [];
  }
}

// 2. Recipe details via GraphQL
export async function getRecipeDetails(recipeId: string): Promise<NormalizedRecipe | null> {
  try {
    const data = await executeGraphQL<{ recipe: NormalizedRecipe | null }>(
      GET_RECIPE_QUERY,
      { id: recipeId }
    );
    return data.recipe || null;
  } catch (err) {
    console.error('GraphQL getRecipeDetails failed:', err);
    return null;
  }
}

// 3. Featured recipes via GraphQL
export async function getFeaturedRecipes(): Promise<NormalizedRecipe[]> {
  try {
    const data = await executeGraphQL<{ featuredRecipes: NormalizedRecipe[] }>(
      GET_FEATURED_QUERY
    );
    return data.featuredRecipes || [];
  } catch (err) {
    console.error('GraphQL getFeaturedRecipes failed:', err);
    return [];
  }
}

// 4. Categories via GraphQL
export async function getCategories(): Promise<{ name: string; description: string; thumbnail: string }[]> {
  try {
    const data = await executeGraphQL<{ categories: { name: string; description: string; thumbnail: string }[] }>(
      GET_CATEGORIES_QUERY
    );
    return data.categories || [];
  } catch (err) {
    console.error('GraphQL getCategories failed:', err);
    return [];
  }
}

// 5. Match ingredients via GraphQL
export async function matchPantryIngredients(params: {
  ingredients: string[];
  cuisineFilter?: string;
  dietaryFilter?: string;
}): Promise<NormalizedRecipe[]> {
  try {
    const data = await executeGraphQL<{ matchIngredients: NormalizedRecipe[] }>(
      MATCH_INGREDIENTS_QUERY,
      {
        ingredients: params.ingredients,
        cuisineFilter: params.cuisineFilter,
        dietaryFilter: params.dietaryFilter,
      }
    );
    return data.matchIngredients || [];
  } catch (err) {
    console.error('GraphQL matchPantryIngredients failed:', err);
    return [];
  }
}

// 6. FitMeals via GraphQL
export async function getFitMeals(params: {
  category?: string;
  isVegetarianOnly?: boolean;
  highProteinOnly?: boolean;
  searchQuery?: string;
}): Promise<NormalizedRecipe[]> {
  try {
    const data = await executeGraphQL<{ fitMeals: NormalizedRecipe[] }>(
      GET_FITMEALS_QUERY,
      params
    );
    return data.fitMeals || [];
  } catch (err) {
    console.error('GraphQL getFitMeals failed:', err);
    return [];
  }
}
