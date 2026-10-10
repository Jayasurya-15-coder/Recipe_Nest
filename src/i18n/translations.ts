export type LanguageCode = 'en' | 'ta' | 'hi';

export interface Translations {
  appName: string;
  tagline: string;
  navHome: string;
  navMatcher: string;
  navFitMeals: string;
  navSaved: string;
  searchPlaceholder: string;
  searchButton: string;
  searching: string;
  viewRecipe: string;
  saveRecipe: string;
  recipeSaved: string;
  removeSaved: string;
  submitFeedback: string;
  feedbackSubmitted: string;
  findMatchingMeals: string;
  matchedIngredients: string;
  missingIngredients: string;
  ingredientMatchScore: string;
  cuisine: string;
  category: string;
  instructions: string;
  ingredientsList: string;
  feedbackTitle: string;
  feedbackDescription: string;
  ratingLabel: string;
  rateExcellent: string;
  rateGood: string;
  rateAverage: string;
  rateNotSuitable: string;
  improveLabel: string;
  improveIngredientMatch: string;
  improveDietSuitability: string;
  improveCookingTime: string;
  improveCuisinePreference: string;
  improveOther: string;
  commentLabel: string;
  commentPlaceholder: string;
  noSavedTitle: string;
  noSavedDescription: string;
  exploreRecipesNow: string;
  highProteinCollection: string;
  vegetarianFilter: string;
  nonVegetarianFilter: string;
  allMeals: string;
  estimatedNutrition: string;
  nutritionDisclaimer: string;
  agentStatusAi: string;
  agentStatusAlgorithmic: string;
  transparentExplanation: string;
  activePreferenceProfile: string;
  resetPreferences: string;
  languageDisclaimer: string;
  pantryInputLabel: string;
  pantryInputPlaceholder: string;
  addIngredient: string;
  clearAll: string;
  popularPantryItems: string;
  quickExamples: string;
  loadingRecipes: string;
  noRecipesFound: string;
  tryDifferentSearch: string;
}

export const translations: Record<LanguageCode, Translations> = {
  en: {
    appName: 'RecipeNest',
    tagline: 'An Agentic AI Culinary Discovery Platform',
    navHome: 'Explore Recipes',
    navMatcher: 'Ingredient Matcher',
    navFitMeals: 'FitMeals',
    navSaved: 'Saved Recipes',
    searchPlaceholder: 'Search dishes, cuisines, or ingredients (e.g. Chicken, Pasta, Curry)...',
    searchButton: 'Search Recipes',
    searching: 'Searching dishes...',
    viewRecipe: 'View Recipe',
    saveRecipe: 'Save Recipe',
    recipeSaved: 'Saved',
    removeSaved: 'Remove Saved Recipe',
    submitFeedback: 'Submit Feedback',
    feedbackSubmitted: 'Feedback recorded! Adaptive preferences updated.',
    findMatchingMeals: 'Find Matching Meals',
    matchedIngredients: 'In Your Pantry',
    missingIngredients: 'Missing Ingredients',
    ingredientMatchScore: 'Ingredient Match',
    cuisine: 'Cuisine',
    category: 'Category',
    instructions: 'Preparation Steps',
    ingredientsList: 'Required Ingredients & Measurements',
    feedbackTitle: 'Evaluate Recommendation',
    feedbackDescription: 'Your feedback directly updates your SQLite preference profile to tune future rankings.',
    ratingLabel: 'How was this recommendation?',
    rateExcellent: 'Excellent',
    rateGood: 'Good',
    rateAverage: 'Average',
    rateNotSuitable: 'Not suitable',
    improveLabel: 'What should we improve?',
    improveIngredientMatch: 'Ingredient match',
    improveDietSuitability: 'Diet suitability',
    improveCookingTime: 'Cooking time',
    improveCuisinePreference: 'Cuisine or taste preference',
    improveOther: 'Other',
    commentLabel: 'Optional culinary notes',
    commentPlaceholder: 'Share what worked or how you adapted the recipe...',
    noSavedTitle: 'No Saved Recipes Yet',
    noSavedDescription: 'Bookmark recipes you love to build your personal cookbook and receive tailored recommendations.',
    exploreRecipesNow: 'Explore Recipes Now',
    highProteinCollection: 'High-Protein Meals',
    vegetarianFilter: 'Vegetarian Only',
    nonVegetarianFilter: 'Non-Vegetarian',
    allMeals: 'All Dishes',
    estimatedNutrition: 'Estimated Nutrition Profile',
    nutritionDisclaimer: 'Nutritional estimates are calculated from standard USDA portion weights of listed raw ingredients. Not certified laboratory analysis.',
    agentStatusAi: 'Agent Mode: Gemini 3.8 Flash Active',
    agentStatusAlgorithmic: 'Agent Mode: Preference-Weighted Matching Active',
    transparentExplanation: 'Recommendation Reasoning',
    activePreferenceProfile: 'Your Preference Weights',
    resetPreferences: 'Reset Preferences',
    languageDisclaimer: 'Ingredients, measurements, pantry matching, and interface controls are localized in your selected language. Cooking preparation steps are sourced from TheMealDB global archive.',
    pantryInputLabel: 'Enter ingredients you have at home',
    pantryInputPlaceholder: 'Type an ingredient (e.g. eggs, chicken, onion) and press Enter',
    addIngredient: 'Add',
    clearAll: 'Clear All',
    popularPantryItems: 'Common Pantry Staples',
    quickExamples: 'Try Common Combos',
    loadingRecipes: 'Curating recipes...',
    noRecipesFound: 'No recipes matched your search criteria.',
    tryDifferentSearch: 'Try searching by a broader dish name or different ingredients.',
  },
  ta: {
    appName: 'ரெசிபி நெஸ்ட் (RecipeNest)',
    tagline: 'அறிவார்ந்த செய்முறை பரிந்துரை தளம்',
    navHome: 'சமையல் தேடல்',
    navMatcher: 'பொருட்கள் பொருத்தம்',
    navFitMeals: 'உடற்பயிற்சி உணவுகள்',
    navSaved: 'சேமிக்கப்பட்டவை',
    searchPlaceholder: 'உணவு பெயர், வகை அல்லது பொருட்களை தேடவும்...',
    searchButton: 'செய்முறைகளை தேடுக',
    searching: 'தேடப்படுகிறது...',
    viewRecipe: 'செய்முறையைக் காண்க',
    saveRecipe: 'செய்முறையைச் சேமி',
    recipeSaved: 'சேமிக்கப்பட்டது',
    removeSaved: 'சேமிப்பை நீக்கு',
    submitFeedback: 'கருத்தைப் பதிவு செய்க',
    feedbackSubmitted: 'கருத்து பதிவு செய்யப்பட்டது! விருப்பங்கள் புதுப்பிக்கப்பட்டன.',
    findMatchingMeals: 'பொருந்தும் உணவுகளைக் காண்க',
    matchedIngredients: 'உங்களிடம் உள்ள பொருட்கள்',
    missingIngredients: 'தேவைப்படும் கூடுதல் பொருட்கள்',
    ingredientMatchScore: 'பொருட்களின் பொருத்தம்',
    cuisine: 'பாரம்பரியம்',
    category: 'வகை',
    instructions: 'செய்முறை படிகள்',
    ingredientsList: 'தேவையான பொருட்கள் மற்றும் அளவுகள்',
    feedbackTitle: 'பரிந்துரையை மதிப்பிடுங்கள்',
    feedbackDescription: 'உங்கள் கருத்து அடுத்தடுத்த பரிந்துரைகளை துல்லியமாக்க உதவுகிறது.',
    ratingLabel: 'இந்த பரிந்துரை எப்படி இருந்தது?',
    rateExcellent: 'மிகச் சிறந்தது',
    rateGood: 'நல்லது',
    rateAverage: 'சுமாரானது',
    rateNotSuitable: 'பொருத்தமற்றது',
    improveLabel: 'நாங்கள் எதை மேம்படுத்த வேண்டும்?',
    improveIngredientMatch: 'பொருட்களின் பொருத்தம்',
    improveDietSuitability: 'உணவு முறை பொருத்தம்',
    improveCookingTime: 'சமையல் நேரம்',
    improveCuisinePreference: 'சுவை / உணவு கலாச்சாரம்',
    improveOther: 'மற்றவை',
    commentLabel: 'கூடுதல் குறிப்புகள் (விருப்பத்தேர்வு)',
    commentPlaceholder: 'உங்கள் சமையல் அனுபவத்தைப் பகிர்ந்து கொள்ளுங்கள்...',
    noSavedTitle: 'சேமிக்கப்பட்ட உணவுகள் எதுவும் இல்லை',
    noSavedDescription: 'உங்களுக்கு பிடித்த உணவுகளைச் சேமித்து வைத்து தனிப்பயன் சமையல் தொகுப்பை உருவாக்குங்கள்.',
    exploreRecipesNow: 'உணவுகளைத் தேடுங்கள்',
    highProteinCollection: 'அதிக புரதச் சத்து உணவுகள்',
    vegetarianFilter: 'சைவம் மட்டும்',
    nonVegetarianFilter: 'அசைவம்',
    allMeals: 'அனைத்து உணவுகள்',
    estimatedNutrition: 'கணக்கிடப்பட்ட ஊட்டச்சத்து விவரம்',
    nutritionDisclaimer: 'ஊட்டச்சத்து அளவுகள் USDA தரவுகளின்படி கணக்கிடப்பட்ட தோராயமான மதிப்புகளாகும்.',
    agentStatusAi: 'செயற்கை நுண்ணறிவு: ஜெமினி 3.8 பிளாஷ் இயங்குகிறது',
    agentStatusAlgorithmic: 'முறை: தனிப்பயன் கணக்கீட்டு பொருத்தம் இயங்குகிறது',
    transparentExplanation: 'பரிந்துரைக்கான காரணம்',
    activePreferenceProfile: 'உங்கள் சுவை விருப்பங்கள்',
    resetPreferences: 'விருப்பங்களை மீட்டமை',
    languageDisclaimer: 'சமையல் பொருட்கள், அளவுகள், இடைமுகம் மற்றும் கட்டுப்பாடுகள் தமிழில் மொழிபெயர்க்கப்பட்டுள்ளன. சமையல் வழிமுறைகள் TheMealDB மூலம் ஆங்கிலத்தில் உள்ளன.',
    pantryInputLabel: 'வீட்டில் உள்ள பொருட்களை உள்ளிடவும்',
    pantryInputPlaceholder: 'பொருளின் பெயரை உள்ளிட்டு Enter அழுத்தவும் (எ.கா: முட்டை, வெங்காயம்)',
    addIngredient: 'சேர்',
    clearAll: 'அனைத்தையும் நீக்கு',
    popularPantryItems: 'பொதுவான அத்தியாவசியப் பொருட்கள்',
    quickExamples: 'மாதிரி சேர்க்கைகள்',
    loadingRecipes: 'செய்முறைகள் எடுக்கப்படுகின்றன...',
    noRecipesFound: 'பொருத்தமான செய்முறைகள் எதுவும் கிடைக்கவில்லை.',
    tryDifferentSearch: 'வேறு உணவுப் பெயர் அல்லது பொருட்களைப் பயன்படுத்தி முயற்சிக்கவும்.',
  },
  hi: {
    appName: 'रेसिपीनेस्ट (RecipeNest)',
    tagline: 'बुद्धिमान रेसिपी खोज और अनुशंसा मंच',
    navHome: 'रेसिपी खोजें',
    navMatcher: 'सामग्री मिलान',
    navFitMeals: 'फिटमील्स',
    navSaved: 'सहेजी गई रेसिपी',
    searchPlaceholder: 'व्यंजन, सामग्री या पकवान खोजें (उदा: चिकन, पास्ता, पनीर)...',
    searchButton: 'रेसिपी खोजें',
    searching: 'खोज जारी है...',
    viewRecipe: 'विधि देखें',
    saveRecipe: 'रेसिपी सहेजें',
    recipeSaved: 'सहेजा गया',
    removeSaved: 'सहेजी सूची से हटाएं',
    submitFeedback: 'प्रतिक्रिया दर्ज करें',
    feedbackSubmitted: 'प्रतिक्रिया दर्ज की गई! वरीयता प्रोफ़ाइल अपडेट हुई।',
    findMatchingMeals: 'अनुकूल भोजन खोजें',
    matchedIngredients: 'आपके पास मौजूद सामग्री',
    missingIngredients: 'अतिरिक्त आवश्यक सामग्री',
    ingredientMatchScore: 'सामग्री मिलान प्रतिशत',
    cuisine: 'खानपान शैली',
    category: 'श्रेणी',
    instructions: 'बनाने की विधि',
    ingredientsList: 'आवश्यक सामग्री और मात्रा',
    feedbackTitle: 'सिफारिश का मूल्यांकन करें',
    feedbackDescription: 'आपकी प्रतिक्रिया भविष्य की सिफारिशों को और बेहतर बनाती है।',
    ratingLabel: 'यह सिफारिश कैसी रही?',
    rateExcellent: 'उत्कृष्ट',
    rateGood: 'अच्छा',
    rateAverage: 'औसत',
    rateNotSuitable: 'अनुपयुक्त',
    improveLabel: 'हमें क्या सुधारना चाहिए?',
    improveIngredientMatch: 'सामग्री का मिलान',
    improveDietSuitability: 'आहार उपयुक्तता',
    improveCookingTime: 'पकाने का समय',
    improveCuisinePreference: 'स्वाद या व्यंजन शैली',
    improveOther: 'अन्य',
    commentLabel: 'अतिरिक्त टिप्पणियाँ (वैकल्पिक)',
    commentPlaceholder: 'अपने अनुभव या बदलाव साझा करें...',
    noSavedTitle: 'कोई सहेजी गई रेसिपी नहीं है',
    noSavedDescription: 'अपनी पसंदीदा रेसिपी सहेजें और व्यक्तिगत संग्रह बनाएं।',
    exploreRecipesNow: 'अभी खोज शुरू करें',
    highProteinCollection: 'उच्च प्रोटीन भोजन',
    vegetarianFilter: 'केवल शाकाहारी',
    nonVegetarianFilter: 'मांसाहारी',
    allMeals: 'सभी व्यंजन',
    estimatedNutrition: 'अनुमानित पोषण प्रोफ़ाइल',
    nutritionDisclaimer: 'पोषण मान कच्चे घटकों के USDA संदर्भ भार पर आधारित अनुमान हैं।',
    agentStatusAi: 'एजेंट मोड: जेमिनी 3.8 फ्लैश सक्रिय',
    agentStatusAlgorithmic: 'एजेंट मोड: वरीयता-आधारित मिलान सक्रिय',
    transparentExplanation: 'सिफारिश का स्पष्ट कारण',
    activePreferenceProfile: 'आपकी सक्रिय वरीयताएँ',
    resetPreferences: 'वरीयताएँ रीसेट करें',
    languageDisclaimer: 'सामग्री, माप, इंटरफ़ेस और नियंत्रण हिंदी में अनुवादित हैं। खाना पकाने के निर्देश TheMealDB से मूल अंग्रेजी में हैं।',
    pantryInputLabel: 'घर में उपलब्ध सामग्री दर्ज करें',
    pantryInputPlaceholder: 'सामग्री का नाम लिखें और Enter दबाएं (उदा: अंडे, टमाटर, प्याज)',
    addIngredient: 'जोड़ें',
    clearAll: 'सभी हटाएं',
    popularPantryItems: 'सामान्य रसोई सामग्री',
    quickExamples: 'त्वरित उदाहरण',
    loadingRecipes: 'रेसिपी लोड हो रही हैं...',
    noRecipesFound: 'कोई उपयुक्त रेसिपी नहीं मिली।',
    tryDifferentSearch: 'कृपया कोई अन्य नाम या सामग्री आज़माएं।',
  },
};
