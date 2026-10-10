# RecipeNest

RecipeNest is a responsive recipe-discovery website built with React. It uses TheMealDB API to search for recipes and display the matching dishes as recipe cards.

## Built Features

- Search recipes by dish name.
- Display recipe cards with the dish name and food image.
- Fetch recipe data from TheMealDB API.
- Show loading feedback while a search is running.
- Display messages for empty search results and API errors.
- Responsive layout for desktop and mobile screens.

## Technology Stack

- **React** — builds the user interface.
- **Vite** — runs the development server and builds the frontend.
- **JavaScript** — handles search behavior and API requests.
- **CSS** — styles the website and responsive layout.
- **TheMealDB API** — provides recipe data.

## Recipe Data Source: TheMealDB

RecipeNest uses [TheMealDB](https://www.themealdb.com/) as its recipe data source. TheMealDB is an open, community-contributed recipe database with an API for retrieving meals, categories, ingredients, regions, recipe instructions, and images.

TheMealDB website currently reports approximately:

- **793 meals**
- **992 ingredients**
- **14 meal categories** (as provided for this project)
- **29+ international cuisines/regions** (as provided for this project)

Examples of categories include Chicken, Seafood, Beef, Vegetarian, Breakfast, Pasta, and Dessert. Examples of cuisines/regions include Italian, Mexican, Japanese, Indian, British, French, and Mediterranean.

**Important:** These are catalog-level figures, not a claim that every entry is displayed or searchable in the current RecipeNest interface. TheMealDB's catalog can change over time. The current application implements recipe-name search and recipe cards; pantry matching, category/cuisine filters, FitMeals, and feedback-based recommendations should only be described as available after they have been implemented and tested.

## API Endpoints Used

TheMealDB's public V1 API includes these endpoints:

| Purpose | Example endpoint |
|---|---|
| Search meals by name | `https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata` |
| Get full meal details | `https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772` |
| List categories | `https://www.themealdb.com/api/json/v1/1/categories.php` |
| Filter by one ingredient | `https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast` |
| Filter by category | `https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood` |
| Filter by cuisine/area | `https://www.themealdb.com/api/json/v1/1/filter.php?a=Canadian` |
| Get one random meal | `https://www.themealdb.com/api/json/v1/1/random.php` |

The current app's built feature is recipe-name search. The other endpoints are documented here as possible API capabilities and are not necessarily connected to the interface yet.

For full endpoint details and current access terms, see the [official TheMealDB API documentation](https://www.themealdb.com/api.php).

## Localhost

Run the project and open it at the localhost URL shown by Vite, commonly:

`http://localhost:5173`

## Project Structure

A typical structure for the current Vite + React application is:

```text
recipenest/
├── public/
├── src/
│   ├── services/
│   │   └── recipeApi.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
├── package.json
└── README.md
```

Your repository may contain additional files. Update this section to match the actual project structure.

## Error Handling

The interface should account for:

- Empty search input.
- Searches that return no recipes.
- Network failures or unsuccessful API responses.
- Loading state while a request is in progress.

If recipe results do not load, check your internet connection, the API endpoint, and the browser developer console.

## Current Project Scope

RecipeNest currently focuses on the recipe-search experience and responsive recipe cards. Features such as recipe details, saved recipes, ingredient matching, FitMeals, multilingual translations, feedback persistence, Redux, routing, GraphQL, and a Node.js backend should be listed as completed only after they are implemented and tested.

## Future Improvements

Potential improvements, if included in the project scope, are:

- Recipe details with ingredients and instructions.
- Saved recipes.
- Ingredient-based matching.
- Feedback form and personalized recommendation ranking.
- Category and cuisine filters.
- FitMeals collections.
- English, Tamil, and Hindi interface translations.
- Redux for shared application state, React Router for navigation, and GraphQL/Node.js if required by the course syllabus.

## License and Attribution

Recipe data is provided by TheMealDB. Refer to the [official API documentation](https://www.themealdb.com/api.php) for current API access and usage requirements. Add a separate `LICENSE` file if you choose a license for your own source code.
