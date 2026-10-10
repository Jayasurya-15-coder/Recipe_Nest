# RecipeNest

RecipeNest is a responsive, full-stack recipe recommendation and discovery platform built with React, Redux, React Router, Node.js, and GraphQL. It connects to TheMealDB culinary archive, providing real-time dish search, pantry ingredient matching, fitness-oriented meal filtering, persistent cookbook saving, and feedback-based algorithmic personalization.

## Built Features

- **Recipe Search & Discovery:** Search recipes by dish name, browse featured meals, or explore popular culinary categories.
- **Recipe Cards:** Responsive cards displaying recipe photography, category, cuisine origin, dietary flags, and text-only action buttons.
- **Detailed Recipe Views:** Complete ingredient measures, step-by-step cooking instructions, publisher source links, and YouTube demonstration links.
- **Ingredient Matcher:** Input available pantry ingredients, normalize ingredient variants, calculate match percentages, and transparently view matched vs. missing items.
- **FitMeals:** Fitness and performance collection focusing on high-protein and vegetarian meals, accompanied by macro estimates and nutritional transparency disclaimers.
- **Saved Recipes Cookbook:** Save and remove recipes with centralized Redux state management and browser `localStorage` persistence.
- **Feedback & Adaptive Personalization:** Rate recipes (Excellent, Good, Average, Not suitable) and identify areas for improvement; an explainable 4-factor scoring algorithm adjusts future recommendation rankings.
- **Multilingual Support:** Complete interface, ingredient, and measurement unit localization across English, Tamil (தமிழ்), and Hindi (हिन्दी).
- **Strict No-Icons Design System:** Clear text-based buttons and navigation adhering to an editorial, typography-driven aesthetic.

## Technology Stack

- **Frontend:**
  - **React 19 & Vite** — Component architecture and development tooling.
  - **Redux Toolkit (`@reduxjs/toolkit`, `react-redux`)** — Centralized state management for saved recipes, feedback signals, and language settings.
  - **React Router (`react-router-dom`)** — Client-side URL routing (`/`, `/recipe/:id`, `/matcher`, `/fitmeals`, `/saved`).
  - **Tailwind CSS** — Utility-first styling with responsive, editorial layout.
  - **TypeScript** — Static typing across all components and services.
- **Backend:**
  - **Node.js & Express** — Full-stack server running Vite middlewares in development.
  - **GraphQL (`graphql`)** — API communication layer serving queries and mutations at `/graphql`.
- **Data Source:**
  - **TheMealDB API** — External open recipe archive queried server-side with in-memory caching.

## Recipe Data Source: TheMealDB

RecipeNest uses [TheMealDB](https://www.themealdb.com/) as its recipe data source. TheMealDB is an open, community-contributed recipe database with an API for retrieving meals, categories, ingredients, regions, recipe instructions, and images.

TheMealDB website currently reports approximately:

- **790+ meals**
- **992 ingredients**
- **14 meal categories** (Beef, Chicken, Dessert, Lamb, Miscellaneous, Pasta, Pork, Seafood, Side, Starter, Vegan, Vegetarian, Breakfast, Goat)
- **29+ international cuisines/regions** (Italian, Mexican, Japanese, Indian, British, French, Mediterranean, etc.)

**Integration Architecture:** Rather than calling TheMealDB directly from the browser, all requests flow through the Node.js backend via **GraphQL**. The backend fetches verified data, calculates macronutrient estimates, executes ingredient matching, and caches lookups in memory.

## API Endpoints Used

The backend interacts with TheMealDB's public V1 API:

| Purpose | Example endpoint |
|---|---|
| Search meals by name | `https://www.themealdb.com/api/json/v1/1/search.php?s=chicken` |
| Get full meal details | `https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772` |
| List categories | `https://www.themealdb.com/api/json/v1/1/categories.php` |
| Filter by one ingredient | `https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast` |
| Filter by category | `https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood` |
| List cuisines/areas | `https://www.themealdb.com/api/json/v1/1/list.php?a=list` |

The client application communicates exclusively through the unified **GraphQL** endpoint:

- **Endpoint:** `POST /graphql`
- **Queries:** `recipes`, `recipe`, `featuredRecipes`, `categories`, `matchIngredients`, `fitMeals`, `recommendations`
- **Mutations:** `submitFeedback`

For full endpoint details, see the [official TheMealDB API documentation](https://www.themealdb.com/api.php).

## Run the Project Locally

### Prerequisites

- Node.js (v18 or higher recommended) and npm
- A web browser
- Internet access for recipe lookups

### Installation

Open a terminal in the project folder and run:

```bash
npm install
npm run dev
```

The full-stack application will start and listen on port 3000:

```text
http://localhost:3000
```

### Production Build

To compile and verify the production bundle:

```bash
npm run build
```

To run TypeScript verification:

```bash
npm run lint
```

## Project Structure

The project follows a modular, full-stack structure aligned with the Modern Web Application Development curriculum:

```text
recipenest/
├── server.ts                         # Node.js Express server + GraphQL endpoint
├── server/
│   ├── graphqlSchema.ts              # GraphQL schema definitions, queries & mutations
│   ├── mealdb.ts                     # TheMealDB client & in-memory cache
│   └── recommendationEngine.ts       # JavaScript 4-factor feedback ranking engine
├── src/
│   ├── components/                   # Navbar, RecipeCard, FeedbackForm, Modals
│   ├── pages/
│   │   ├── Home.tsx                  # Search & featured recipe explorer
│   │   ├── RecipeDetails.tsx         # Detailed recipe instructions & measurements
│   │   ├── IngredientMatcher.tsx     # Pantry inventory matcher & match scores
│   │   ├── FitMeals.tsx              # High-protein & vegetarian collections
│   │   └── SavedRecipes.tsx          # Saved cookbook archive
│   ├── store/
│   │   ├── index.ts                  # Redux Toolkit store & typed hooks
│   │   ├── savedSlice.ts             # Saved recipes state + localStorage sync
│   │   ├── feedbackSlice.ts          # Feedback ratings & dynamic user preferences
│   │   └── languageSlice.ts          # Selected language state
│   ├── services/
│   │   ├── graphqlClient.ts          # GraphQL query/mutation execution client
│   │   ├── recipeApi.ts              # Recipe querying service functions
│   │   ├── feedbackService.ts        # Feedback submission helper
│   │   └── recommendationService.ts  # Personalized recommendations helper
│   ├── i18n/
│   │   ├── translations.ts           # UI string dictionary (EN, TA, HI)
│   │   └── ingredientTranslations.ts # Ingredient & measurement dictionary
│   ├── App.tsx                       # Redux Provider & BrowserRouter routing
│   └── main.tsx                      # React DOM mount point
├── index.html
├── package.json
├── tsconfig.json
└── README.md
```

## Error Handling

The application handles common edge cases and error states:

- **Empty Input:** Helpful prompts when search or pantry fields are submitted blank.
- **Empty Results:** User-friendly messages with suggestions when no recipes match a query or pantry combination.
- **Network Failures:** Clear error cards when TheMealDB or GraphQL service encounters connection limits.
- **Loading Indicators:** Text-based loading feedback during GraphQL query execution.
- **Nutritional Transparency:** Explicit disclaimers clarifying that macro values are estimates based on standard raw portion weights rather than certified lab tests.

## Course & Curriculum Alignment

This project satisfies the technical requirements for **Modern Web Application Development (19AI545 / CS3545)**:

- **React.js & Vite:** Component-based SPA with declarative forms and hooks.
- **Redux:** Centralized state management via Redux Toolkit (`@reduxjs/toolkit`).
- **React Router:** Standard URL routing (`react-router-dom`).
- **Node.js Backend:** Express-based server hosting the API and static client.
- **GraphQL:** Typed API schema with queries and mutations replacing standard REST.
- **Client-Side Personalization:** Algorithmic ranking implemented in JavaScript without external LLM dependencies.

## License and Attribution

Recipe data and photography are provided by [TheMealDB](https://www.themealdb.com/). All product trademarks belong to their respective owners.
