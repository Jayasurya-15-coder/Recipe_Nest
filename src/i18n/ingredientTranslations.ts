import { LanguageCode } from './translations.js';

export interface TranslationPair {
  ta: string;
  hi: string;
}

export const INGREDIENT_DICTIONARY: Record<string, TranslationPair> = {
  // Meats & Poultry
  'chicken': { ta: 'கோழி இறைச்சி (Chicken)', hi: 'चिकन (Chicken)' },
  'chicken breast': { ta: 'கோழி நெஞ்சுக்கறி (Chicken Breast)', hi: 'चिकन ब्रेस्ट (Chicken Breast)' },
  'chicken breasts': { ta: 'கோழி நெஞ்சுக்கறி (Chicken Breasts)', hi: 'चिकन ब्रेस्ट (Chicken Breasts)' },
  'chicken thighs': { ta: 'கோழி தொடைக்கறி (Chicken Thighs)', hi: 'चिकन लेग पीस (Chicken Thighs)' },
  'beef': { ta: 'மாட்டிறைச்சி (Beef)', hi: 'बीफ (Beef)' },
  'minced beef': { ta: 'கொத்துக்கறி (Minced Beef)', hi: 'कीमा (Minced Beef)' },
  'ground beef': { ta: 'கொத்துக்கறி (Ground Beef)', hi: 'कीमा (Ground Beef)' },
  'steak': { ta: 'ஸ்டேக் இறைச்சி (Steak)', hi: 'स्टीक (Steak)' },
  'lamb': { ta: 'ஆட்டிறைச்சி (Lamb)', hi: 'मेमने का मांस (Lamb)' },
  'mutton': { ta: 'ஆட்டிறைச்சி (Mutton)', hi: 'मटन (Mutton)' },
  'pork': { ta: 'பன்றி இறைச்சி (Pork)', hi: 'पोर्क (Pork)' },
  'turkey': { ta: 'வான்கோழி (Turkey)', hi: 'टर्की (Turkey)' },
  'bacon': { ta: 'பேக்கன் இறைச்சி (Bacon)', hi: 'बेकन (Bacon)' },
  'sausage': { ta: 'சாசேஜ் (Sausage)', hi: 'सॉसेज (Sausage)' },
  'sausages': { ta: 'சாசேஜ்கள் (Sausages)', hi: 'सॉसेज (Sausages)' },

  // Seafood
  'salmon': { ta: 'சால்மன் மீன் (Salmon)', hi: 'सैल्मन मछली (Salmon)' },
  'salmon fillets': { ta: 'சால்மன் மீன் துண்டுகள்', hi: 'सैल्मन मछली के टुकड़े' },
  'tuna': { ta: 'சூரை மீன் / டுனா (Tuna)', hi: 'टूना मछली (Tuna)' },
  'prawns': { ta: 'இறால் (Prawns)', hi: 'झींगा (Prawns)' },
  'shrimp': { ta: 'இறால் (Shrimp)', hi: 'झींगा (Shrimp)' },
  'fish': { ta: 'மீன் (Fish)', hi: 'मछली (Fish)' },
  'cod': { ta: 'காட் மீன் (Cod)', hi: 'कॉड मछली (Cod)' },

  // Dairy & Eggs
  'egg': { ta: 'முட்டை (Egg)', hi: 'अंडा (Egg)' },
  'eggs': { ta: 'முட்டைகள் (Eggs)', hi: 'अंडे (Eggs)' },
  'milk': { ta: 'பால் (Milk)', hi: 'दूध (Milk)' },
  'sour milk': { ta: 'புளித்த பால் (Sour Milk)', hi: 'खट्टा दूध (Sour Milk)' },
  'butter': { ta: 'வெண்ணெய் (Butter)', hi: 'मक्खन (Butter)' },
  'melted butter': { ta: 'உருக்கிய வெண்ணெய்', hi: 'पिघला हुआ मक्खन' },
  'cheese': { ta: 'பாலாடைக்கட்டி (Cheese)', hi: 'चीज़ / पनीर (Cheese)' },
  'cheddar cheese': { ta: 'செடார் சீஸ் (Cheddar Cheese)', hi: 'चेडर चीज़ (Cheddar)' },
  'parmesan cheese': { ta: 'பார்மேசன் சீஸ் (Parmesan)', hi: 'परमेसन चीज़ (Parmesan)' },
  'mozzarella': { ta: 'மொஸரெல்லா சீஸ் (Mozzarella)', hi: 'मोत्ज़ारेला चीज़ (Mozzarella)' },
  'cream': { ta: 'பாலேடு / கிரீம் (Cream)', hi: 'क्रीम / मलाई (Cream)' },
  'heavy cream': { ta: 'கெட்டி கிரீம் (Heavy Cream)', hi: 'गाढ़ी मलाई (Heavy Cream)' },
  'sour cream': { ta: 'புளிப்பு கிரீம் (Sour Cream)', hi: 'खट्टी क्रीम (Sour Cream)' },
  'yogurt': { ta: 'தயிர் (Yogurt)', hi: 'दही (Yogurt)' },
  'greek yogurt': { ta: 'கிரேக்க தயிர் (Greek Yogurt)', hi: 'ग्रीक दही (Greek Yogurt)' },
  'paneer': { ta: 'பனீர் (Paneer)', hi: 'पनीर (Paneer)' },
  'ghee': { ta: 'நெய் (Ghee)', hi: 'घी (Ghee)' },

  // Vegetables & Aromatics
  'onion': { ta: 'வெங்காயம் (Onion)', hi: 'प्याज (Onion)' },
  'onions': { ta: 'வெங்காயம் (Onions)', hi: 'प्याज (Onions)' },
  'red onion': { ta: 'சிவப்பு வெங்காயம் (Red Onion)', hi: 'लाल प्याज (Red Onion)' },
  'spring onions': { ta: 'வெங்காயத்தாள் (Spring Onions)', hi: 'हरी प्याज (Spring Onions)' },
  'shallots': { ta: 'சின்ன வெங்காயம் (Shallots)', hi: 'छोटे प्याज (Shallots)' },
  'garlic': { ta: 'பூண்டு (Garlic)', hi: 'लहसुन (Garlic)' },
  'ginger': { ta: 'இஞ்சி (Ginger)', hi: 'अदरक (Ginger)' },
  'ginger paste': { ta: 'இஞ்சி விழுது (Ginger Paste)', hi: 'अदरक का पेस्ट' },
  'garlic paste': { ta: 'பூண்டு விழுது (Garlic Paste)', hi: 'लहसुन का पेस्ट' },
  'tomato': { ta: 'தக்காளி (Tomato)', hi: 'टमाटर (Tomato)' },
  'tomatoes': { ta: 'தக்காளி (Tomatoes)', hi: 'टमाटर (Tomatoes)' },
  'cherry tomatoes': { ta: 'செர்ரி தக்காளி (Cherry Tomatoes)', hi: 'चेरी टमाटर' },
  'potato': { ta: 'உருளைக்கிழங்கு (Potato)', hi: 'आलू (Potato)' },
  'potatoes': { ta: 'உருளைக்கிழங்கு (Potatoes)', hi: 'आलू (Potatoes)' },
  'carrot': { ta: 'கேரட் (Carrot)', hi: 'गाजर (Carrot)' },
  'carrots': { ta: 'கேரட் (Carrots)', hi: 'गाजर (Carrots)' },
  'broccoli': { ta: 'பிராக்கோலி (Broccoli)', hi: 'ब्रोकोली (Broccoli)' },
  'spinach': { ta: 'பசலைக் கீரை (Spinach)', hi: 'पालक (Spinach)' },
  'bell pepper': { ta: 'குடைமிளகாய் (Bell Pepper)', hi: 'शिमला मिर्च (Bell Pepper)' },
  'capsicum': { ta: 'குடைமிளகாய் (Capsicum)', hi: 'शिमला मिर्च (Capsicum)' },
  'green pepper': { ta: 'பச்சை குடைமிளகாய் (Green Pepper)', hi: 'हरी शिमला मिर्च' },
  'red pepper': { ta: 'சிவப்பு குடைமிளகாய் (Red Pepper)', hi: 'लाल शिमला मिर्च' },
  'chili': { ta: 'பச்சை மிளகாய் (Chili)', hi: 'हरी मिर्च (Chili)' },
  'chilies': { ta: 'மிளகாய் (Chilies)', hi: 'मिर्च (Chilies)' },
  'green chili': { ta: 'பச்சை மிளகாய் (Green Chili)', hi: 'हरी मिर्च (Green Chili)' },
  'red chili': { ta: 'சிவப்பு மிளகாய் (Red Chili)', hi: 'लाल मिर्च (Red Chili)' },
  'mushroom': { ta: 'காளான் (Mushroom)', hi: 'मशरूम (Mushroom)' },
  'mushrooms': { ta: 'காளான்கள் (Mushrooms)', hi: 'मशरूम (Mushrooms)' },
  'peas': { ta: 'பட்டாணி (Peas)', hi: 'मटर (Peas)' },
  'green peas': { ta: 'பச்சை பட்டாணி (Green Peas)', hi: 'हरी मटर (Green Peas)' },
  'cucumber': { ta: 'வெள்ளரிக்காய் (Cucumber)', hi: 'खीरा (Cucumber)' },
  'cabbage': { ta: 'முட்டைக்கோஸ் (Cabbage)', hi: 'पत्तागोभी (Cabbage)' },
  'cauliflower': { ta: 'காலிஃபிளவர் (Cauliflower)', hi: 'फूलगोभी (Cauliflower)' },
  'zucchini': { ta: 'சுக்கினி காய் (Zucchini)', hi: 'तुरई / ज़ुकिनी (Zucchini)' },
  'pumpkin': { ta: 'பூசணிக்காய் (Pumpkin)', hi: 'कद्दू (Pumpkin)' },
  'eggplant': { ta: 'கத்தரிக்காய் (Eggplant)', hi: 'बैंगन (Eggplant)' },
  'aubergine': { ta: 'கத்தரிக்காய் (Aubergine)', hi: 'बैंगन (Aubergine)' },
  'celery': { ta: 'செலரி கீரை (Celery)', hi: 'अजवाइन का डंठल (Celery)' },
  'corn': { ta: 'மக்காச்சோளம் (Corn)', hi: 'मक्का (Corn)' },
  'sweetcorn': { ta: 'இனிப்பு மக்காச்சோளம் (Sweetcorn)', hi: 'स्वीटकॉर्न (Sweetcorn)' },
  'coriander': { ta: 'கொத்தமல்லி (Coriander)', hi: 'हरा धनिया (Coriander)' },
  'cilantro': { ta: 'கொத்தமல்லி இலை (Cilantro)', hi: 'हरा धनिया (Cilantro)' },
  'mint': { ta: 'புதினா (Mint)', hi: 'पुदीना (Mint)' },
  'mint leaves': { ta: 'புதினா இலைகள் (Mint Leaves)', hi: 'पुदीने की पत्तियां' },
  'parsley': { ta: 'பார்ஸ்லி இலை (Parsley)', hi: 'पार्सले पत्ती (Parsley)' },
  'basil': { ta: 'துளசி இலை / பேசில் (Basil)', hi: 'बेसिल / तुलसी पत्ती (Basil)' },
  'lemon': { ta: 'எலுமிச்சை (Lemon)', hi: 'नींबू (Lemon)' },
  'lemon juice': { ta: 'எலுமிச்சை சாறு (Lemon Juice)', hi: 'नींबू का रस (Lemon Juice)' },
  'lime': { ta: 'எலுமிச்சம்பழம் (Lime)', hi: 'छोटा नींबू (Lime)' },
  'lime juice': { ta: 'எலுமிச்சை சாறு (Lime Juice)', hi: 'नींबू का रस' },
  'avocado': { ta: 'வெண்ணெய் பழம் (Avocado)', hi: 'एवोकाडो (Avocado)' },

  // Grains, Flours & Bakery
  'flour': { ta: 'மைதா / கோதுமை மாவு (Flour)', hi: 'आटा / मैदा (Flour)' },
  'plain flour': { ta: 'மைதா மாவு (Plain Flour)', hi: 'मैदा (Plain Flour)' },
  'all-purpose flour': { ta: 'மைதா மாவு (All-Purpose Flour)', hi: 'मैदा (All-Purpose Flour)' },
  'wheat flour': { ta: 'கோதுமை மாவு (Wheat Flour)', hi: 'गेहूं का आटा (Wheat Flour)' },
  'buckwheat flour': { ta: 'பக்வீட் மாவு (Buckwheat Flour)', hi: 'कुट्टू का आटा (Buckwheat)' },
  'cornflour': { ta: 'சோள மாவு (Cornflour)', hi: 'कॉर्नफ्लोर (Cornflour)' },
  'cornstarch': { ta: 'சோள மாவு (Cornstarch)', hi: 'कॉर्नस्टार्च (Cornstarch)' },
  'baking powder': { ta: 'பேக்கிங் பவுடர் (Baking Powder)', hi: 'बेकिंग पाउडर (Baking Powder)' },
  'baking soda': { ta: 'சமையல் சோடா (Baking Soda)', hi: 'बेकिंग सोडा (Baking Soda)' },
  'yeast': { ta: 'ஈஸ்ட் / நொதி (Yeast)', hi: 'खमीर / यीस्ट (Yeast)' },
  'bread': { ta: 'ரொட்டி (Bread)', hi: 'ब्रेड / पाव (Bread)' },
  'breadcrumbs': { ta: 'ரொட்டித்தூள் (Breadcrumbs)', hi: 'ब्रेडक्रंब (Breadcrumbs)' },
  'rice': { ta: 'அரிசி / சாதம் (Rice)', hi: 'चावल (Rice)' },
  'brown rice': { ta: 'கைக்குத்தல் அரிசி (Brown Rice)', hi: 'ब्राउन राइस (Brown Rice)' },
  'basmati rice': { ta: 'பாசுமதி அரிசி (Basmati Rice)', hi: 'बासमती चावल (Basmati Rice)' },
  'pasta': { ta: 'பாஸ்தா (Pasta)', hi: 'पास्ता (Pasta)' },
  'spaghetti': { ta: 'ஸ்பாகெட்டி (Spaghetti)', hi: 'स्पेगेटी (Spaghetti)' },
  'noodles': { ta: 'நூடுல்ஸ் (Noodles)', hi: 'नूडल्स (Noodles)' },
  'oats': { ta: 'ஓட்ஸ் (Oats)', hi: 'ओट्स (Oats)' },

  // Pulses & Plant Proteins
  'lentils': { ta: 'பருப்பு (Lentils)', hi: 'दाल / मसूर (Lentils)' },
  'red lentils': { ta: 'சிவப்பு பருப்பு (Red Lentils)', hi: 'मसूर दाल (Red Lentils)' },
  'chickpeas': { ta: 'கொண்டைக்கடலை (Chickpeas)', hi: 'छोले / चना (Chickpeas)' },
  'black beans': { ta: 'கருப்பு பீன்ஸ் (Black Beans)', hi: 'काले राजमा / सेम (Black Beans)' },
  'kidney beans': { ta: 'ராஜ்மா (Kidney Beans)', hi: 'राजमा (Kidney Beans)' },
  'tofu': { ta: 'டோஃபு சோயா பனீர் (Tofu)', hi: 'टोफू सोया पनीर (Tofu)' },

  // Oils & Fats
  'olive oil': { ta: 'ஆலிவ் எண்ணெய் (Olive Oil)', hi: 'जैतून का तेल (Olive Oil)' },
  'vegetable oil': { ta: 'தாவர எண்ணெய் (Vegetable Oil)', hi: 'वनस्पति तेल (Vegetable Oil)' },
  'sunflower oil': { ta: 'சூரியகாந்தி எண்ணெய் (Sunflower Oil)', hi: 'सूरजमुखी तेल (Sunflower Oil)' },
  'sesame oil': { ta: 'நல்லெண்ணெய் (Sesame Oil)', hi: 'तिल का तेल (Sesame Oil)' },
  'mustard oil': { ta: 'கடுகு எண்ணெய் (Mustard Oil)', hi: 'सरसों का तेल (Mustard Oil)' },
  'coconut oil': { ta: 'தேங்காய் எண்ணெய் (Coconut Oil)', hi: 'नारियल तेल (Coconut Oil)' },

  // Spices & Seasonings
  'salt': { ta: 'உப்பு (Salt)', hi: 'नमक (Salt)' },
  'sea salt': { ta: 'கடல் உப்பு (Sea Salt)', hi: 'सेंधा / समुद्री नमक (Sea Salt)' },
  'black pepper': { ta: 'கருப்பு மிளகு (Black Pepper)', hi: 'काली मिर्च (Black Pepper)' },
  'pepper': { ta: 'மிளகு (Pepper)', hi: 'काली मिर्च (Pepper)' },
  'white pepper': { ta: 'வெள்ளை மிளகு (White Pepper)', hi: 'सफेद मिर्च (White Pepper)' },
  'cumin': { ta: 'சீரகம் (Cumin)', hi: 'जीरा (Cumin)' },
  'cumin seeds': { ta: 'சீரகம் (Cumin Seeds)', hi: 'जीरा (Cumin Seeds)' },
  'ground cumin': { ta: 'சீரகத்தூள் (Ground Cumin)', hi: 'जीरा पाउडर (Ground Cumin)' },
  'turmeric': { ta: 'மஞ்சள் (Turmeric)', hi: 'हल्दी (Turmeric)' },
  'turmeric powder': { ta: 'மஞ்சள் தூள் (Turmeric Powder)', hi: 'हल्दी पाउडर (Turmeric Powder)' },
  'chili powder': { ta: 'மிளகாய்த்தூள் (Chili Powder)', hi: 'लाल मिर्च पाउडर (Chili Powder)' },
  'red chili powder': { ta: 'சிவப்பு மிளகாய்த்தூள் (Red Chili Powder)', hi: 'लाल मिर्च पाउडर' },
  'garam masala': { ta: 'கரம் மசாலா (Garam Masala)', hi: 'गरम मसाला (Garam Masala)' },
  'cinnamon': { ta: 'இலவங்கப்பட்டை (Cinnamon)', hi: 'दालचीनी (Cinnamon)' },
  'cardamom': { ta: 'ஏலக்காய் (Cardamom)', hi: 'इलायची (Cardamom)' },
  'cloves': { ta: 'கிராம்பு (Cloves)', hi: 'लौंग (Cloves)' },
  'bay leaf': { ta: 'பிரியாணி இலை (Bay Leaf)', hi: 'तेजपत्ता (Bay Leaf)' },
  'bay leaves': { ta: 'பிரியாணி இலைகள் (Bay Leaves)', hi: 'तेजपत्ता (Bay Leaves)' },
  'oregano': { ta: 'ஓரிகானோ மூலிகை (Oregano)', hi: 'ऑरेगैनो (Oregano)' },
  'rosemary': { ta: 'ரோஸ்மேரி மூலிகை (Rosemary)', hi: 'रोज़मेरी (Rosemary)' },
  'thyme': { ta: 'தைம் மூலிகை (Thyme)', hi: 'थाइम (Thyme)' },
  'paprika': { ta: 'பப்ரிகா மிளகாய்த்தூள் (Paprika)', hi: 'कश्मीरी मिर्च पाउडर (Paprika)' },
  'vanilla': { ta: 'வெண்ணிலா (Vanilla)', hi: 'वेनिला (Vanilla)' },
  'vanilla extract': { ta: 'வெண்ணிலா எசன்ஸ் (Vanilla Extract)', hi: 'वेनिला एसेंस (Vanilla Extract)' },

  // Condiments, Sauces & Sweeteners
  'soy sauce': { ta: 'சோயா சாஸ் (Soy Sauce)', hi: 'सोया सॉस (Soy Sauce)' },
  'vinegar': { ta: 'வினிகர் (Vinegar)', hi: 'सिरका (Vinegar)' },
  'mayonnaise': { ta: 'மயோனைஸ் (Mayonnaise)', hi: 'मेयोनेज़ (Mayonnaise)' },
  'mustard': { ta: 'கடுகு சாஸ் (Mustard)', hi: 'सरसों का पेस्ट (Mustard)' },
  'wholegrain mustard': { ta: 'முழுக்கடுகு சாஸ் (Wholegrain Mustard)', hi: 'साबुत सरसों पेस्ट (Wholegrain)' },
  'tomato paste': { ta: 'தக்காளி விழுது (Tomato Paste)', hi: 'टमाटर पेस्ट (Tomato Paste)' },
  'tomato puree': { ta: 'தக்காளி கூழ் (Tomato Puree)', hi: 'टमाटर प्यूरी (Tomato Puree)' },
  'ketchup': { ta: 'தக்காளி சாஸ் (Ketchup)', hi: 'टोमैटो केचप (Ketchup)' },
  'honey': { ta: 'தேன் (Honey)', hi: 'शहद (Honey)' },
  'sugar': { ta: 'சர்க்கரை (Sugar)', hi: 'चीनी (Sugar)' },
  'brown sugar': { ta: 'நாட்டுச்சர்க்கரை (Brown Sugar)', hi: 'भूरी चीनी / गुड़ (Brown Sugar)' },
  'water': { ta: 'தண்ணீர் (Water)', hi: 'पानी (Water)' },

  // Nuts, Seeds & Coconut
  'almonds': { ta: 'பாதாம் பருப்பு (Almonds)', hi: 'बादाम (Almonds)' },
  'cashews': { ta: 'முந்திரி பருப்பு (Cashews)', hi: 'काजू (Cashews)' },
  'peanuts': { ta: 'வேர்க்கடலை (Peanuts)', hi: 'मूंगफली (Peanuts)' },
  'walnuts': { ta: 'அக்ரூட் பருப்பு (Walnuts)', hi: 'अखरोट (Walnuts)' },
  'sesame seeds': { ta: 'எள் (Sesame Seeds)', hi: 'तिल (Sesame Seeds)' },
  'coconut': { ta: 'தேங்காய் (Coconut)', hi: 'नारियल (Coconut)' },
  'coconut milk': { ta: 'தேங்காய்ப்பால் (Coconut Milk)', hi: 'नारियल का दूध (Coconut Milk)' },

  // Fruits
  'apple': { ta: 'ஆப்பிள் (Apple)', hi: 'सेब (Apple)' },
  'apples': { ta: 'ஆப்பிள்கள் (Apples)', hi: 'सेब (Apples)' },
  'banana': { ta: 'வாழைப்பழம் (Banana)', hi: 'केला (Banana)' },
  'bananas': { ta: 'வாழைப்பழங்கள் (Bananas)', hi: 'केले (Bananas)' },
  'mango': { ta: 'மாம்பழம் (Mango)', hi: 'आम (Mango)' },
  'strawberries': { ta: 'ஸ்ட்ராபெரி (Strawberries)', hi: 'स्ट्रॉबेरी (Strawberries)' },
  'raisins': { ta: 'உலர் திராட்சை (Raisins)', hi: 'किशमिश (Raisins)' },
};

// Measurements and units dictionary
export const MEASURE_TRANSLATIONS: Record<string, TranslationPair> = {
  'cup': { ta: 'கப்', hi: 'कप' },
  'cups': { ta: 'கப்', hi: 'कप' },
  'tbsp': { ta: 'மேஜைக்கரண்டி', hi: 'बड़ा चम्मच' },
  'tablespoon': { ta: 'மேஜைக்கரண்டி', hi: 'बड़ा चम्मच' },
  'tablespoons': { ta: 'மேஜைக்கரண்டி', hi: 'बड़े चम्मच' },
  'tsp': { ta: 'தேக்கரண்டி', hi: 'छोटा चम्मच' },
  'teaspoon': { ta: 'தேக்கரண்டி', hi: 'छोटा चम्मच' },
  'teaspoons': { ta: 'தேக்கரண்டி', hi: 'छोटे चम्मच' },
  'pinch': { ta: 'சிட்டிகை', hi: 'चुटकी' },
  'pinches': { ta: 'சிட்டிகைகள்', hi: 'चुटकी' },
  'to taste': { ta: 'சுவைக்கேற்ப', hi: 'स्वादानुसार' },
  'sliced': { ta: 'நறுக்கியது', hi: 'कटा हुआ' },
  'chopped': { ta: 'பொடியாக நறுக்கியது', hi: 'बारीक कटा' },
  'crushed': { ta: 'இடித்தது', hi: 'कुटा हुआ' },
  'grated': { ta: 'துருவியது', hi: 'कद्दूकस किया' },
  'handful': { ta: 'கைப்பிடியளவு', hi: 'मुट्ठी भर' },
  'clove': { ta: 'பல்', hi: 'कली' },
  'cloves': { ta: 'பற்கள்', hi: 'कलियां' },
  'piece': { ta: 'துண்டு', hi: 'टुकड़ा' },
  'pieces': { ta: 'துண்டுகள்', hi: 'टुकड़े' },
  'small': { ta: 'சிறிய', hi: 'छोटा' },
  'large': { ta: 'பெரிய', hi: 'बड़ा' },
  'medium': { ta: 'நடுத்தர', hi: 'मध्यम' },
  'head': { ta: 'முழு', hi: 'साबुत' },
  'bunch': { ta: 'கட்டு', hi: 'गुच्छा' },
  'fillet': { ta: 'மீன் துண்டு', hi: 'टुकड़ा' },
  'fillets': { ta: 'மீன் துண்டுகள்', hi: 'टुकड़े' },
};

/**
 * Returns localized ingredient name according to selected language
 */
export function getLocalizedIngredient(rawName: string, lang: LanguageCode): string {
  if (!rawName) return '';
  if (lang === 'en') return rawName;

  const key = rawName.trim().toLowerCase();

  // Direct match
  if (INGREDIENT_DICTIONARY[key]) {
    return INGREDIENT_DICTIONARY[key][lang];
  }

  // Substring / singularized check
  for (const [dictKey, trans] of Object.entries(INGREDIENT_DICTIONARY)) {
    if (key === dictKey || key.includes(dictKey) || dictKey.includes(key)) {
      return trans[lang];
    }
  }

  // If unlisted, return original name
  return rawName;
}

/**
 * Returns localized cooking measurement string
 */
export function getLocalizedMeasure(rawMeasure: string, lang: LanguageCode): string {
  if (!rawMeasure) return '';
  if (lang === 'en') return rawMeasure;

  let localized = rawMeasure;

  for (const [unit, trans] of Object.entries(MEASURE_TRANSLATIONS)) {
    const regex = new RegExp(`\\b${unit}\\b`, 'gi');
    if (regex.test(localized)) {
      localized = localized.replace(regex, trans[lang]);
    }
  }

  return localized;
}

/**
 * Resolves a localized or user-entered ingredient name back to canonical English for TheMealDB matching
 */
export function getCanonicalIngredientName(input: string): string {
  if (!input) return '';
  const clean = input.trim().toLowerCase();

  // If already matches canonical English
  if (INGREDIENT_DICTIONARY[clean]) return clean;

  // Search Tamil and Hindi translations
  for (const [canonical, trans] of Object.entries(INGREDIENT_DICTIONARY)) {
    const taCore = trans.ta.toLowerCase();
    const hiCore = trans.hi.toLowerCase();
    if (taCore.includes(clean) || clean.includes(taCore.split(' ')[0])) {
      return canonical;
    }
    if (hiCore.includes(clean) || clean.includes(hiCore.split(' ')[0])) {
      return canonical;
    }
  }

  return clean;
}
