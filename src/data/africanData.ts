import { Destination, TourPackage, AddOnOption } from '../types';

export const AFRICAN_DESTINATIONS: Destination[] = [
  {
    id: 'serengeti-tanzania',
    name: 'Serengeti & Ngorongoro Crater',
    nativeName: 'Siringitu ("Endless Plains")',
    country: 'Tanzania',
    region: 'East Africa',
    tagline: 'The Greatest Wildlife Theater on Earth',
    description: 'Two million wildebeest cross the golden plains each year, stalked by Africa’s densest population of big cats.',
    heroImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=800&q=80'
    ],
    activities: ['Wildlife Safari', 'Eco-Conservation', 'Cultural Immersion'],
    highlightBadge: 'UNESCO World Heritage',
    bestTimeToVisit: 'July to October (River Crossings) / Jan to March (Calving)',
    averageRating: 4.98,
    reviewsCount: 1420,
    startingPriceUSD: 1450,
    latitude: -2.3333,
    longitude: 34.8333,
    highlights: ['The Great Mara River Crossing', 'Ngorongoro Caldera Floor Big 5', 'Hot Air Balloon at Sunrise', 'Authentic Maasai Boma Visits'],
    climate: 'Warm Savanna (15°C - 28°C)',
    localCultureTip: 'Learn traditional greetings with Maasai elders: "Sopa" (Hello) and always ask politely before capturing portraits.'
  },
  {
    id: 'victoria-falls-zambia-zimbabwe',
    name: 'Victoria Falls & Zambezi River',
    nativeName: 'Mosi-oa-Tunya ("The Smoke That Thunders")',
    country: 'Zimbabwe / Zambia',
    region: 'Southern Africa',
    tagline: 'Earth\'s Mightiest Curtain of Falling Water',
    description: 'A 108-meter wall of water drops into a basalt gorge, wrapped in permanent mist and double rainbows.',
    heroImage: 'https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=800&q=80'
    ],
    activities: ['Coastal & Marine', 'Desert Expeditions', 'Wildlife Safari'],
    highlightBadge: 'Seven Natural Wonders',
    bestTimeToVisit: 'February to May (Peak Spray) / August to December (Devil\'s Pool)',
    averageRating: 4.95,
    reviewsCount: 980,
    startingPriceUSD: 890,
    latitude: -17.9243,
    longitude: 25.8572,
    highlights: ['Helicopter Flight of Angels', 'Devil\'s Pool Swim at the Edge', 'Sunset Zambezi Wildlife Cruise', 'Rainforest Canopy Walk'],
    climate: 'Sub-tropical with heavy cooling spray',
    localCultureTip: 'Batik textiles and Shona stone sculptures in local markets are carved from indigenous serpentine stone.'
  },
  {
    id: 'pyramids-nile-egypt',
    name: 'Giza Necropolis & Nile Valley',
    nativeName: 'Al-Qahirah & Nil Misr',
    country: 'Egypt',
    region: 'North Africa',
    tagline: '5,000 Years of Timeless Pharaohs & Starlit Feluccas',
    description: 'Stand beneath the Great Pyramid, meet the Sphinx, and sail the Nile by felucca under desert stars.',
    heroImage: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=800&q=80'
    ],
    activities: ['Ancient Heritage', 'Desert Expeditions', 'Cultural Immersion'],
    highlightBadge: 'Ancient World Wonder',
    bestTimeToVisit: 'October to April (Mild desert breeze)',
    averageRating: 4.92,
    reviewsCount: 2310,
    startingPriceUSD: 720,
    latitude: 29.9792,
    longitude: 31.1342,
    highlights: ['Great Pyramid King\'s Chamber Tour', 'Grand Egyptian Museum Private Access', 'Valley of the Kings in Luxor', 'Sunset Felucca Sailing'],
    climate: 'Arid Desert with cool evenings (18°C - 32°C)',
    localCultureTip: 'Enjoy traditional Hibiscus tea (Karkadeh) and freshly baked Aish Baladi bread during local Nubian village visits.'
  },
  {
    id: 'okavango-delta-botswana',
    name: 'Okavango Delta & Chobe National Park',
    nativeName: 'The River That Never Finds the Sea',
    country: 'Botswana',
    region: 'Southern Africa',
    tagline: 'A Lush Eden of Crystal Waterways & Gentle Giants',
    description: 'Glide through papyrus channels in a dugout mokoro while elephants swim alongside and leopards prowl the banks.',
    heroImage: 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=800&q=80'
    ],
    activities: ['Wildlife Safari', 'Eco-Conservation', 'Coastal & Marine'],
    highlightBadge: 'Pristine Wilderness Oasis',
    bestTimeToVisit: 'May to October (Flood Season / Peak Wildlife Concentration)',
    averageRating: 4.99,
    reviewsCount: 650,
    startingPriceUSD: 2100,
    latitude: -19.2833,
    longitude: 22.9000,
    highlights: ['Traditional Wooden Mokoro Excursions', 'Chobe River Boat Safari with 100,000+ Elephants', 'Fly-in Luxury Tented Eco-Lodges', 'Night Predator Tracking'],
    climate: 'Subtropical wetland (12°C - 30°C)',
    localCultureTip: 'Botswana pioneers low-impact, high-value conservation where 40% of land is strictly protected for wildlife.'
  },
  {
    id: 'kilimanjaro-tanzania',
    name: 'Mount Kilimanjaro Summit',
    nativeName: 'Uhuru Peak ("Freedom Point" - 5,895m)',
    country: 'Tanzania',
    region: 'East Africa',
    tagline: 'The Roof of Africa Rising Above the Clouds',
    description: 'Africa’s highest peak, rising through five climate zones from rainforest to arctic glacier.',
    heroImage: 'https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1589556264800-08ae9e129a8c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80'
    ],
    activities: ['Mountain Trekking', 'Eco-Conservation'],
    highlightBadge: 'Summit of the Continent',
    bestTimeToVisit: 'January to March / June to October (Clear mountain skies)',
    averageRating: 4.96,
    reviewsCount: 1120,
    startingPriceUSD: 1850,
    latitude: -3.0674,
    longitude: 37.3556,
    highlights: ['Lemosho & Machame Scenic Routes', 'Sunrise over the Glaciers of Uhuru Peak', 'Chagga Tribe Cultural Village Experience', 'High-Altitude Acclimatization Guidance'],
    climate: 'Rainforest (25°C) to Arctic Glacial Summit (-10°C)',
    localCultureTip: 'Tipping your Chagga porters and mountain chefs is a cherished tradition of gratitude on the mountain.'
  },
  {
    id: 'sossusvlei-namibia',
    name: 'Sossusvlei & Namib Desert',
    nativeName: 'Deadvlei & Dune 45',
    country: 'Namibia',
    region: 'Southern Africa',
    tagline: 'The Oldest Desert on Earth with Red Star Dunes',
    description: 'Climb crimson dunes at dawn, walk the dead trees of Deadvlei, and stargaze in a Dark Sky Reserve.',
    heroImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80'
    ],
    activities: ['Desert Expeditions', 'Eco-Conservation', 'Cultural Immersion'],
    highlightBadge: 'International Dark Sky Reserve',
    bestTimeToVisit: 'May to October (Comfortable daytime temperatures)',
    averageRating: 4.94,
    reviewsCount: 740,
    startingPriceUSD: 1100,
    latitude: -24.7275,
    longitude: 15.3400,
    highlights: ['Sunrise Ascent on Dune 45 / Big Daddy', 'Ghostly 900-Year Deadvlei Salt Pan', 'Sesriem Canyon Exploration', 'Stargazing with High-Powered Telescopes'],
    climate: 'Desert Climate (Sunny days 24°C, cool nights 8°C)',
    localCultureTip: 'Look for desert-adapted gemsbok oryx and fog-basking beetles that thrive in hyper-arid ecosystems.'
  },
  {
    id: 'bwindi-gorillas-uganda-rwanda',
    name: 'Bwindi Impenetrable Forest & Volcanoes',
    nativeName: 'Mubwindi ("Dark & Misty Valley")',
    country: 'Uganda / Rwanda',
    region: 'East Africa',
    tagline: 'Eye-to-Eye Encounters with Endangered Mountain Gorillas',
    description: 'Trek mist-shrouded jungle to sit quietly among mountain gorilla families and golden monkeys.',
    heroImage: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=800&q=80'
    ],
    activities: ['Wildlife Safari', 'Eco-Conservation', 'Mountain Trekking'],
    highlightBadge: 'Rare Primate Encounter',
    bestTimeToVisit: 'June to August & December to February (Dry trekking conditions)',
    averageRating: 4.99,
    reviewsCount: 890,
    startingPriceUSD: 2300,
    latitude: -1.0500,
    longitude: 29.6833,
    highlights: ['Permit Guaranteed Gorilla Habituation', 'Golden Monkey Trekking in Bamboo Forests', 'Batwa Pygmy Cultural Forest Walk', 'Lake Bunyonyi Scenic Retreat'],
    climate: 'Misty Highland Rainforest (15°C - 23°C)',
    localCultureTip: 'Gorilla permits directly fund anti-poaching ranger teams and local community health clinics around the national park.'
  },
  {
    id: 'zanzibar-tanzania',
    name: 'Zanzibar Spice Island & Stone Town',
    nativeName: 'Unguja & Mji Mkongwe',
    country: 'Tanzania',
    region: 'East Africa',
    tagline: 'Turquoise Coral Lagoons & Swahili Sultan Palaces',
    description: 'Clove plantations, carved Swahili doorways, and white-sand beaches over coral reefs alive with sea turtles.',
    heroImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    ],
    activities: ['Coastal & Marine', 'Cultural Immersion', 'Ancient Heritage'],
    highlightBadge: 'Swahili Cultural Jewel',
    bestTimeToVisit: 'June to October / December to March (Clear diving & sunny skies)',
    averageRating: 4.91,
    reviewsCount: 1650,
    startingPriceUSD: 650,
    latitude: -6.1659,
    longitude: 39.2026,
    highlights: ['UNESCO Stone Town Historical Walk', 'Mnarani Marine Turtle Conservation', 'Sunset Dhow Cruise with Live Taarab Music', 'Organic Spice Farm Sensory Tour'],
    climate: 'Tropical Maritime (26°C - 31°C)',
    localCultureTip: 'Try Swahili Zanzibar mix soup (Urojo) and spiced chai tea at Forodhani Gardens night food market.'
  },
  {
    id: 'marrakech-atlas-morocco',
    name: 'Marrakech Medina & High Atlas',
    nativeName: 'Murakush & Toubkal',
    country: 'Morocco',
    region: 'North Africa',
    tagline: 'Vibrant Ochre Palaces & Berber Mountain Trails',
    description: 'Haggle in Jemaa el-Fnaa, sleep in a tiled riad, and trek Berber villages in the High Atlas.',
    heroImage: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=800&q=80'
    ],
    activities: ['Cultural Immersion', 'Mountain Trekking', 'Ancient Heritage'],
    highlightBadge: 'Imperial Berber City',
    bestTimeToVisit: 'March to May / September to November',
    averageRating: 4.89,
    reviewsCount: 2150,
    startingPriceUSD: 580,
    latitude: 31.6295,
    longitude: -7.9811,
    highlights: ['Bahia Palace & Jardin Majorelle', 'Atlas Berber Homestay & Tagine Cooking', 'Ourika Valley Waterfalls Hike', 'Agafay Desert Glamping & Stargazing'],
    climate: 'Mediterranean Continental (16°C - 30°C)',
    localCultureTip: 'Fresh mint tea is called "Berber Whiskey", poured from high above to create a frothy crown of hospitality.'
  },
  {
    id: 'cape-town-south-africa',
    name: 'Cape Peninsula & Table Mountain',
    nativeName: 'Hoerikwaggo ("Sea Mountain")',
    country: 'South Africa',
    region: 'Southern Africa',
    tagline: 'Where Majestic Oceans & Mountain Pinnacles Collide',
    description: 'Ride the cable car up Table Mountain, meet penguins at Boulders Beach, and drive Chapman’s Peak to the winelands.',
    heroImage: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=1600&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80'
    ],
    activities: ['Coastal & Marine', 'Mountain Trekking', 'Cultural Immersion'],
    highlightBadge: 'World Design Capital',
    bestTimeToVisit: 'November to April (Warm Mediterranean Summer)',
    averageRating: 4.93,
    reviewsCount: 1890,
    startingPriceUSD: 850,
    latitude: -33.9249,
    longitude: 18.4241,
    highlights: ['Table Mountain Aerial Cableway', 'Boulders Beach African Penguin Colony', 'Cape Point & Hope Lighthouse', 'Kirstenbosch Botanical Canopy Walk'],
    climate: 'Mediterranean (18°C - 28°C)',
    localCultureTip: 'Explore Bo-Kaap\'s brightly colored houses and taste authentic Cape Malay spiced bobotie.'
  }
];

export const AFRICAN_TOURS: TourPackage[] = [
  {
    id: 'tour-serengeti-great-migration',
    destinationId: 'serengeti-tanzania',
    title: 'Great Serengeti Migration & Big 5 Luxury Safari',
    country: 'Tanzania',
    region: 'East Africa',
    activityType: 'Wildlife Safari',
    durationDays: 7,
    difficulty: 'Easy / Family',
    priceUSD: 2450,
    originalPriceUSD: 2890,
    rating: 4.99,
    reviewsCount: 420,
    groupSizeMax: 6,
    coverImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    shortSummary: 'Follow the Mara River crossing with Maasai trackers and starlit eco-camps.',
    itinerary: [
      { day: 1, title: 'Arrival in Arusha & Safari Briefing', description: 'Meet your guide at Kilimanjaro International Airport. Rest at a lush coffee lodge in Arusha.', accommodation: 'Arusha Coffee Lodge', mealsIncluded: 'Dinner' },
      { day: 2, title: 'Tarangire National Park - Kingdom of Elephants', description: 'Game drive through ancient Baobab forests home to over 3,000 elephants and tree-climbing lions.', accommodation: 'Tarangire Safari Camp', mealsIncluded: 'Breakfast, Bush Lunch, Dinner' },
      { day: 3, title: 'Descend into Ngorongoro Volcanic Crater', description: 'Full day safari on the crater floor. Encounter endangered black rhinos, flamingos, and massive lion prides.', accommodation: 'Ngorongoro Serena Lodge', mealsIncluded: 'All Meals' },
      { day: 4, title: 'Serengeti Plains - In Search of the Big Cats', description: 'Fly-in game drive entering central Seronera valley. Witness cheetah hunts across open grasslands.', accommodation: 'Serengeti Migration Tented Camp', mealsIncluded: 'All Meals' },
      { day: 5, title: 'Northern Serengeti - The Mara River Crossing', description: 'Position along the riverbanks to observe dramatic wildebeest river crossings against Nile crocodiles.', accommodation: 'Mara River Luxury Camp', mealsIncluded: 'All Meals' },
      { day: 6, title: 'Hot Air Balloon Safari & Champagne Bush Breakfast', description: 'Float at sunrise over herds of giraffe and zebra followed by traditional Maasai warrior cultural song.', accommodation: 'Mara River Luxury Camp', mealsIncluded: 'All Meals' },
      { day: 7, title: 'Bush Flight to Arusha & Farewell', description: 'Morning game drive, scenic light aircraft flight over the Great Rift Valley, and airport transfer.', accommodation: 'Day room included', mealsIncluded: 'Breakfast, Lunch' }
    ],
    included: [
      'Custom 4x4 Land Cruiser with pop-up roof and guaranteed window seat',
      'All National Park entry permits and conservation fees ($680 value)',
      'Certified Senior Indigenous Guide (Fluent in English & Swahili)',
      'All luxury tented lodge accommodations with private en-suite',
      'Unlimited purified water, gourmet bush meals & local beverages',
      'Scenic bush flight from Serengeti to Arusha'
    ],
    notIncluded: [
      'International flights',
      'Tanzania tourist visa ($50-$100)',
      'Travel and medical insurance',
      'Discretionary tips for guides and camp crew'
    ],
    guideLanguage: ['English', 'French', 'Swahili', 'German'],
    tags: ['Big 5 Guaranteed', 'Eco-Lodge Stay', 'Migration Special', 'Maasai Guides'],
    featured: true
  },
  {
    id: 'tour-kilimanjaro-lemosho-summit',
    destinationId: 'kilimanjaro-tanzania',
    title: 'Mount Kilimanjaro 8-Day Lemosho Route Expedition',
    country: 'Tanzania',
    region: 'East Africa',
    activityType: 'Mountain Trekking',
    durationDays: 8,
    difficulty: 'Challenging',
    priceUSD: 2190,
    originalPriceUSD: 2450,
    rating: 4.97,
    reviewsCount: 310,
    groupSizeMax: 10,
    coverImage: 'https://images.unsplash.com/photo-1609198092458-38a293c7ac4b?auto=format&fit=crop&w=1200&q=80',
    shortSummary: 'A high-success summit via rainforest, Shira Plateau, and the Barranco Wall.',
    itinerary: [
      { day: 1, title: 'Londorossi Gate to Mti Mkubwa (2,650m)', description: 'Trek through dense montane cloud forests with black-and-white colobus monkeys.', accommodation: 'Mountain Expedition Tents', mealsIncluded: 'Lunch, Dinner' },
      { day: 2, title: 'Mti Mkubwa to Shira 1 Camp (3,610m)', description: 'Cross into the heather and moorland zone with panoramic views of the western breach.', accommodation: 'Mountain Expedition Tents', mealsIncluded: 'All Meals' },
      { day: 3, title: 'Shira 1 to Shira 2 & Lava Tower Acclimatization', description: 'Gradual ascent across the volcanic plateau for vital altitude acclimatization.', accommodation: 'Mountain Expedition Tents', mealsIncluded: 'All Meals' },
      { day: 4, title: 'Lava Tower (4,630m) to Barranco Valley (3,976m)', description: 'Climb high, sleep low. Marvel at the giant groundsel plants in the Barranco valley.', accommodation: 'Mountain Expedition Tents', mealsIncluded: 'All Meals' },
      { day: 5, title: 'Conquering the Great Barranco Wall to Karanga (3,995m)', description: 'Fun non-technical scramble up the Barranco Wall with breathtaking vistas.', accommodation: 'Mountain Expedition Tents', mealsIncluded: 'All Meals' },
      { day: 6, title: 'Karanga to Barafu Base Camp (4,673m)', description: 'Final staging camp on an alpine desert ridge. Early dinner and summit rest preparation.', accommodation: 'Mountain Expedition Tents', mealsIncluded: 'All Meals' },
      { day: 7, title: 'Midnight Summit Push to Uhuru Peak (5,895m)', description: 'Reach Stella Point at dawn and stand on the Roof of Africa as sunrise floods the continent.', accommodation: 'Mweka Camp (3,100m)', mealsIncluded: 'All Meals' },
      { day: 8, title: 'Mweka Gate Descent & Gold Certificate Ceremony', description: 'Descend through rainforest to collect your official Kilimanjaro National Park Summit Certificate.', accommodation: 'Hotel in Moshi', mealsIncluded: 'Breakfast, Lunch, Celebration Dinner' }
    ],
    included: [
      'Official Kilimanjaro National Park rescue and camping permits',
      'Wilderness First Responder certified Chief Guides and assistant guides',
      'Ratio of 3 porters and 1 cook per trekker for safe support',
      'Four-season insulated sleeping tents and private dining mess tent with solar lights',
      'Pulse oximeters, emergency hyperbaric chamber & medical oxygen',
      'Nutritious high-altitude meals prepared fresh daily'
    ],
    notIncluded: ['Personal sleeping bag and trekking poles (rental available)', 'Mountaineering travel insurance'],
    guideLanguage: ['English', 'Swahili', 'German'],
    tags: ['96% Summit Success', 'Certified Guides', 'Eco-Porters Fair Trade', 'Uhuru Peak'],
    featured: true
  },
  {
    id: 'tour-okavango-chobe-water-safari',
    destinationId: 'okavango-delta-botswana',
    title: 'Botswana Untamed: Okavango Delta & Chobe River Explorer',
    country: 'Botswana',
    region: 'Southern Africa',
    activityType: 'Wildlife Safari',
    durationDays: 6,
    difficulty: 'Easy / Family',
    priceUSD: 2980,
    originalPriceUSD: 3300,
    rating: 4.98,
    reviewsCount: 185,
    groupSizeMax: 6,
    coverImage: 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=1200&q=80',
    shortSummary: 'Handmade mokoro rides, private boat safaris, and open-sided canvas pavilions.',
    itinerary: [
      { day: 1, title: 'Fly into Maun & Helicopter Transfer to Delta Camp', description: 'Scenic flight over water channels dotted with hippo pods.', accommodation: 'Sanctuary Chief\'s Camp', mealsIncluded: 'Dinner' },
      { day: 2, title: 'Mokoro Canoe Trails & Walking Safari', description: 'Silent poling through lily-filled channels and tracking wildlife footprints on secluded islands.', accommodation: 'Sanctuary Chief\'s Camp', mealsIncluded: 'All Meals' },
      { day: 3, title: 'Moremi Game Reserve Predator Drive', description: 'Search for endangered African wild dogs, leopards in sausage trees, and red lechwe antelopes.', accommodation: 'Moremi Tented Sanctuary', mealsIncluded: 'All Meals' },
      { day: 4, title: 'Transfer to Chobe National Park', description: 'Game drive along the Savuti marshland renowned for lion-elephant dynamics.', accommodation: 'Chobe Game Lodge', mealsIncluded: 'All Meals' },
      { day: 5, title: 'Chobe River Private Electric Catamaran Safari', description: 'Approach colossal elephant breeding herds and basking Nile crocodiles at water level without engine noise.', accommodation: 'Chobe Game Lodge', mealsIncluded: 'All Meals' },
      { day: 6, title: 'Bush Farewell & Transfer to Victoria Falls or Kasane', description: 'Sunrise birding boat trip and seamless cross-border private transfer.', accommodation: 'Departure', mealsIncluded: 'Breakfast' }
    ],
    included: [
      'All internal scenic bush charter flights',
      'Exclusive private mokoro guides & safari boat cruises',
      'Top-tier eco-lodge accommodations with plunge pools',
      'All park concessions, conservation fees, and premium drinks'
    ],
    notIncluded: ['International flights', 'Gratuities'],
    guideLanguage: ['English', 'French', 'Setswana'],
    tags: ['Water Safari', 'Wild Dog Tracking', 'Zero-Emission Boat', 'Exclusive Reserve'],
    featured: true
  },
  {
    id: 'tour-egypt-nile-pharaohs',
    destinationId: 'pyramids-nile-egypt',
    title: 'Pharaohs & Sacred Waters: Cairo, Giza & 5-Star Nile Cruise',
    country: 'Egypt',
    region: 'North Africa',
    activityType: 'Ancient Heritage',
    durationDays: 8,
    difficulty: 'Easy / Family',
    priceUSD: 1650,
    originalPriceUSD: 1950,
    rating: 4.93,
    reviewsCount: 540,
    groupSizeMax: 12,
    coverImage: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=1200&q=80',
    shortSummary: 'Private Egyptologist guiding plus a 4-night cruise between Aswan and Luxor.',
    itinerary: [
      { day: 1, title: 'Welcome to Cairo & Private Transfer', description: 'VIP greeting at Cairo airport, private transfer to historic Nile-view hotel.', accommodation: 'Marriott Mena House Cairo', mealsIncluded: 'Dinner' },
      { day: 2, title: 'The Great Pyramids & The Sphinx of Giza', description: 'Walk around Khufu, Khafre, Menkaure pyramids with special access into the Sphinx enclosure.', accommodation: 'Marriott Mena House Cairo', mealsIncluded: 'Breakfast, Lunch' },
      { day: 3, title: 'Fly to Aswan & Board Luxury Nile Cruise', description: 'Visit Philae Temple dedicated to Isis on Agilkia Island and enjoy High Tea at sunset.', accommodation: 'Luxury Nile Cruiser Ship', mealsIncluded: 'All Meals' },
      { day: 4, title: 'Kom Ombo & Edfu Temples', description: 'Sail northward stopping at the dual crocodile-falcon temple of Kom Ombo and Horus temple.', accommodation: 'Luxury Nile Cruiser Ship', mealsIncluded: 'All Meals' },
      { day: 5, title: 'Luxor: Valley of the Kings & Queen Hatshepsut', description: 'Explore underground royal pharaoh tombs including King Tutankhamun with vibrant 3,300-year pigments.', accommodation: 'Luxury Nile Cruiser Ship', mealsIncluded: 'All Meals' },
      { day: 6, title: 'Karnak & Luxor Colonnades at Twilight', description: 'Walk through the 134 colossal columns of the Hypostyle Hall lit dramatically after dark.', accommodation: 'Steigenberger Nile Palace Luxor', mealsIncluded: 'Breakfast, Lunch' },
      { day: 7, title: 'Fly to Cairo & Khan el-Khalili Bazaar', description: 'Explore ancient Islamic Cairo, sensory spice markets, and Al-Muizz Street.', accommodation: 'Fairmont Nile City Cairo', mealsIncluded: 'Breakfast, Dinner' },
      { day: 8, title: 'Departure with Timeless Memories', description: 'Morning leisure and private chauffeur transfer to Cairo International Airport.', accommodation: 'Departure', mealsIncluded: 'Breakfast' }
    ],
    included: [
      'Licensed Academic Egyptologist tour director',
      'All internal domestic flights (Cairo - Aswan / Luxor - Cairo)',
      '4 nights on 5-Star Deluxe Nile Cruise with outside balcony cabin',
      'All entry tickets to monuments, pyramids, and tomb complexes'
    ],
    notIncluded: ['Egypt entry visa ($25 on arrival)', 'Optional Abu Simbel excursion'],
    guideLanguage: ['English', 'French', 'Spanish', 'German', 'Arabic'],
    tags: ['Egyptologist Guided', '5-Star River Cruise', 'Ancient Wonders', 'King Tut Tomb'],
    featured: true
  },
  {
    id: 'tour-namibia-dunes-safari',
    destinationId: 'sossusvlei-namibia',
    title: 'Namibia Red Dunes, Deadvlei & Skeleton Coast Expedition',
    country: 'Namibia',
    region: 'Southern Africa',
    activityType: 'Desert Expeditions',
    durationDays: 7,
    difficulty: 'Moderate',
    priceUSD: 1890,
    originalPriceUSD: 2150,
    rating: 4.95,
    reviewsCount: 220,
    groupSizeMax: 8,
    coverImage: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    shortSummary: 'Apricot dunes, the white clay pan of Deadvlei, and shipwreck coastlines.',
    itinerary: [
      { day: 1, title: 'Windhoek to Namib Desert', description: 'Scenic drive descending the Great Escarpment into the ancient red sands of Sossusvlei.', accommodation: 'Desert Hills Luxury Lodge', mealsIncluded: 'Dinner' },
      { day: 2, title: 'Sunrise on Big Daddy Dune & Deadvlei', description: 'Climb 325-meter dunes before sunrise and walk among 900-year-old preserved acacia trees.', accommodation: 'Desert Hills Luxury Lodge', mealsIncluded: 'All Meals' },
      { day: 3, title: 'Sesriem Canyon to Swakopmund Atlantic Coast', description: 'Cross the Tropic of Capricorn and stop at Solitaire for legendary apple pie before ocean breezes.', accommodation: 'Strand Hotel Swakopmund', mealsIncluded: 'Breakfast, Lunch' },
      { day: 4, title: 'Walvis Bay Marine Catamaran & Dune 7 4x4', description: 'Kayak with 50,000 Cape fur seals and spot dolphins alongside towering ocean dunes.', accommodation: 'Strand Hotel Swakopmund', mealsIncluded: 'Breakfast, Seafood Lunch' },
      { day: 5, title: 'Skeleton Coast & Damaraland Ancient Petroglyphs', description: 'Discover Twyfelfontein UNESCO San rock engravings and desert-adapted elephants.', accommodation: 'Twyfelfontein Country Lodge', mealsIncluded: 'All Meals' },
      { day: 6, title: 'Etosha National Park Waterhole Game Drive', description: 'Night and daytime game drives viewing rhinos, lions, and giraffes congregating around illuminated waterholes.', accommodation: 'Etosha Safari Camp', mealsIncluded: 'All Meals' },
      { day: 7, title: 'Return to Windhoek & Craft Market', description: 'Farewell brunch, cheetah conservation center visit, and airport transfer.', accommodation: 'Departure', mealsIncluded: 'Breakfast, Lunch' }
    ],
    included: [
      'Specially fitted air-conditioned 4x4 Safari vehicle with fridge and charging ports',
      'All National Park entry permits and concession fees',
      'Professional certified Namibia nature guide and astronomer',
      'All boutique desert lodge accommodations with stargazing skylights'
    ],
    notIncluded: ['International airfare', 'Alcoholic drinks outside included meals'],
    guideLanguage: ['English', 'German', 'Afrikaans'],
    tags: ['Dark Sky Reserve', 'Deadvlei Stargazing', 'Desert Wildlife', 'Shipwreck Coast']
  },
  {
    id: 'tour-gorilla-bwindi-uganda',
    destinationId: 'bwindi-gorillas-uganda-rwanda',
    title: 'Ultimate Mountain Gorilla & Chimpanzee Habituation Trek',
    country: 'Uganda',
    region: 'East Africa',
    activityType: 'Wildlife Safari',
    durationDays: 5,
    difficulty: 'Challenging',
    priceUSD: 2850,
    originalPriceUSD: 3100,
    rating: 4.99,
    reviewsCount: 340,
    groupSizeMax: 6,
    coverImage: 'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1200&q=80',
    shortSummary: 'An hour with wild silverback gorillas, plus chimpanzee tracking in Kibale.',
    itinerary: [
      { day: 1, title: 'Entebbe to Bwindi via Scenic Flight', description: 'Bush plane flight over emerald tea plantations and volcanic crater lakes to Kihihi airstrip.', accommodation: 'Bwindi Volcanoes Lodge', mealsIncluded: 'Lunch, Dinner' },
      { day: 2, title: 'The Gorilla Encounter Day in Bwindi', description: 'Trek through tangled jungle vines with rangers to meet a habituated gorilla family up close.', accommodation: 'Bwindi Volcanoes Lodge', mealsIncluded: 'All Meals' },
      { day: 3, title: 'Batwa Heritage Trail & Lake Bunyonyi', description: 'Learn medicinal plant secrets with indigenous Batwa guides and canoe on volcanic Lake Bunyonyi.', accommodation: 'BirdNest Resort Bunyonyi', mealsIncluded: 'All Meals' },
      { day: 4, title: 'Kibale Forest Chimpanzee Primate Trek', description: 'Walk through mahogany canopies following vocal troop calls of wild chimpanzees.', accommodation: 'Primate Lodge Kibale', mealsIncluded: 'All Meals' },
      { day: 5, title: 'Scenic Drive to Entebbe & Equator Crossing', description: 'Stop at the Equator for gravitational demonstrations and farewell dinner by Lake Victoria.', accommodation: 'Departure', mealsIncluded: 'Breakfast, Lunch' }
    ],
    included: [
      'Official Uganda Wildlife Authority Gorilla Permit ($800 value)',
      'Official Chimpanzee Tracking Permit ($250 value)',
      'Internal scenic charter flights to minimize driving',
      'Personal porter to carry backpack and assist during jungle trek',
      'Luxury forest lodge accommodations overlooking mist canopy'
    ],
    notIncluded: ['International flights', 'Yellow fever vaccination (mandatory)'],
    guideLanguage: ['English', 'French'],
    tags: ['Gorilla Permit Included', 'Primate Expert Guides', 'Community Uplift', 'Rainforest Lodge']
  },
  {
    id: 'tour-zanzibar-spice-ocean',
    destinationId: 'zanzibar-tanzania',
    title: 'Zanzibar Spice Coast, Coral Reefs & Stone Town Riad',
    country: 'Tanzania',
    region: 'East Africa',
    activityType: 'Coastal & Marine',
    durationDays: 5,
    difficulty: 'Easy / Family',
    priceUSD: 980,
    originalPriceUSD: 1150,
    rating: 4.92,
    reviewsCount: 460,
    groupSizeMax: 10,
    coverImage: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    shortSummary: 'Swim with dolphins at Mnemba Atoll, taste organic spices, dine on sandbanks.',
    itinerary: [
      { day: 1, title: 'Welcome to Stone Town Sultan Quarters', description: 'Check into a restored 19th-century Arab-Swahili palace riad with Persian chandeliers.', accommodation: 'Emerson on Hurumzi Palace', mealsIncluded: 'Dinner' },
      { day: 2, title: 'Spices, Hidden Alleyways & Freddie Mercury House', description: 'Sensory tour smelling fresh vanilla pods, nutmeg, cloves, and historic Stone Town walk.', accommodation: 'Emerson on Hurumzi Palace', mealsIncluded: 'Breakfast, Swahili Lunch' },
      { day: 3, title: 'Transfer to Nungwi Coral Beach & Sunset Dhow', description: 'White sand paradise. Board an authentic wooden dhow sailboat with tropical fruit and drumming.', accommodation: 'Zuri Zanzibar Eco-Resort', mealsIncluded: 'All Meals' },
      { day: 4, title: 'Mnemba Atoll Marine Sanctuary Snorkeling', description: 'Snorkel among coral gardens, reef fish, and sea turtles with a private boat chef.', accommodation: 'Zuri Zanzibar Eco-Resort', mealsIncluded: 'Breakfast, Fresh Catch Seafood BBQ' },
      { day: 5, title: 'Jozani Forest Red Colobus Monkeys & Departure', description: 'Spot endemic red colobus monkeys in indigenous mahogany forest before airport transfer.', accommodation: 'Departure', mealsIncluded: 'Breakfast' }
    ],
    included: [
      'Private airport and inter-hotel transfers in comfortable vehicles',
      'Exclusive private wooden dhow sunset sail with Swahili musicians',
      'Mnemba Island marine conservation fee & snorkeling gear',
      'All boutique luxury accommodations on the beach'
    ],
    notIncluded: ['International airfare', 'Alcoholic beverages outside dinner'],
    guideLanguage: ['English', 'Italian', 'French', 'Swahili'],
    tags: ['Coral Atoll Snorkel', 'Swahili Heritage', 'Beachfront Luxury', 'Spice Farm Tour']
  },
  {
    id: 'tour-morocco-imperial-sahara',
    destinationId: 'marrakech-atlas-morocco',
    title: 'Morocco Imperial Cities, Atlas Mountains & Sahara Glamping',
    country: 'Morocco',
    region: 'North Africa',
    activityType: 'Cultural Immersion',
    durationDays: 7,
    difficulty: 'Moderate',
    priceUSD: 1350,
    originalPriceUSD: 1580,
    rating: 4.94,
    reviewsCount: 680,
    groupSizeMax: 8,
    coverImage: 'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1200&q=80',
    shortSummary: 'Cross the Tizi n\'Tichka pass, ride Erg Chebbi dunes, sleep in Berber tents.',
    itinerary: [
      { day: 1, title: 'Marrakech Arrival & Medina Welcome Riad', description: 'Arrive in Marrakech, mint tea welcome ceremony in historic garden courtyard.', accommodation: 'Riad Kniza Marrakech', mealsIncluded: 'Dinner' },
      { day: 2, title: 'Marrakech Hidden Palaces & Artisan Souks', description: 'Explore Bahia Palace, Saadian Tombs, and master leather and brass workshops.', accommodation: 'Riad Kniza Marrakech', mealsIncluded: 'Breakfast, Lunch' },
      { day: 3, title: 'High Atlas Mountains & Kasbah Ait Benhaddou', description: 'Cross 2,260m altitude pass to the ancient clay fortress seen in Gladiator and Lawrence of Arabia.', accommodation: 'Ksar Ighnda Kasbah Lodge', mealsIncluded: 'All Meals' },
      { day: 4, title: 'Todra Gorge to Merzouga Sahara Dunes', description: 'Canyon walks leading to the Sahara edge. Sunset camel trek to luxury desert camp.', accommodation: 'Merzouga Royal Glamping Tent', mealsIncluded: 'All Meals' },
      { day: 5, title: 'Berber Stargazing & Desert Nomads Encounter', description: 'Traditional drumming around the campfire, quad bike dune riding, and tea with nomads.', accommodation: 'Merzouga Royal Glamping Tent', mealsIncluded: 'All Meals' },
      { day: 6, title: 'Draa Valley Oasis to Ouarzazate', description: 'Drive along millions of date palm trees, stopping at ancient subterranean irrigation systems.', accommodation: 'Berbere Palace Ouarzazate', mealsIncluded: 'All Meals' },
      { day: 7, title: 'Return over Atlas to Marrakech / Casablanca', description: 'Final panoramic mountain views and transfer to airport or onward journey.', accommodation: 'Departure', mealsIncluded: 'Breakfast, Lunch' }
    ],
    included: [
      'Private 4x4 Mercedes/Toyota with English-speaking Berber driver-guide',
      'Camel trek into Sahara with luggage transported separately by 4WD',
      'Luxury heated desert camp with en-suite shower, flush toilet & king bed',
      'All riad and kasbah accommodations with breakfast & dinner'
    ],
    notIncluded: ['International flights', 'Gratuities for local guides'],
    guideLanguage: ['English', 'French', 'Arabic', 'Spanish'],
    tags: ['Sahara Glamping', 'Berber Culture', 'Camel Trek', 'Kasbah Trail']
  }
];

export const TOUR_ADD_ONS: AddOnOption[] = [
  {
    id: 'addon-balloon-safari',
    name: 'Sunrise Hot Air Balloon Safari & Champagne Bush Breakfast',
    description: 'Drift serenely over waking herds at dawn, followed by an elegant white-tablecloth champagne breakfast under an acacia tree.',
    priceUSD: 550,
    icon: 'Wind',
    recommendedFor: 'Serengeti & Masai Mara'
  },
  {
    id: 'addon-private-maasai-guide',
    name: 'Private Maasai Elder & Wildlife Tracker dedicated to your vehicle',
    description: 'Learn ancestral bushcraft, tracking subtle predator tracks, medicinal botany, and tribal astronomy with an elder.',
    priceUSD: 280,
    icon: 'Compass',
    recommendedFor: 'Tanzania & Kenya'
  },
  {
    id: 'addon-helicopter-flight',
    name: 'Helicopter "Flight of Angels" Canyon & Crater Sweep',
    description: 'A breathtaking 25-minute doors-off scenic flight capturing wildlife concentrations and waterfalls from the clouds.',
    priceUSD: 390,
    icon: 'Camera',
    recommendedFor: 'Victoria Falls & Okavango'
  },
  {
    id: 'addon-boma-stargazing',
    name: 'Traditional Starlit Boma Feast with Indigenous Storytelling',
    description: 'Gather around a roaring acacia fire pit with traditional roasted specialties, spiced wines, and cosmic constellation readings.',
    priceUSD: 140,
    icon: 'Moon',
    recommendedFor: 'All Destinations'
  },
  {
    id: 'addon-pro-photo-pack',
    name: 'Professional Safari Photography Lens Kit & Pro Editing Session',
    description: 'Includes a rented 100-400mm telephoto lens, gimbal mount for the 4x4 vehicle, and a 1-on-1 Lightroom color grading session.',
    priceUSD: 220,
    icon: 'Sparkles',
    recommendedFor: 'Wildlife & Mountain Treks'
  }
];

export const BIG_FIVE_WILDLIFE = [
  {
    id: 'african-lion',
    name: 'African Lion (Simba)',
    scientificName: 'Panthera leo',
    status: 'Vulnerable (Protected)',
    description: 'The undisputed monarch of the savanna. Lions are the only social big cats, living in prides of up to 30 members dominating vast territories.',
    habitat: 'Open grasslands, savanna woodlands, Ngorongoro Crater, Serengeti & Kruger',
    bestTime: 'Dawn (06:00 - 08:30) & Dusk (17:30 - 19:00)',
    funFact: 'A lion’s roar can be heard from up to 8 kilometers (5 miles) away across the savanna!',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'african-leopard',
    name: 'African Leopard (Chui)',
    scientificName: 'Panthera pardus pardus',
    status: 'Vulnerable',
    description: 'The master of stealth and solitary elegance. Renowned for hoisting prey weighing more than themselves high into sausage and acacia trees.',
    habitat: 'Riverine forests, rocky kopjes, Samburu, South Luangwa & Okavango Delta',
    bestTime: 'Night safaris & overcast afternoons',
    funFact: 'Every leopard has a unique rosette spot pattern on its coat, just like human fingerprints!',
    image: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'african-elephant',
    name: 'African Savanna Elephant (Tembo)',
    scientificName: 'Loxodonta africana',
    status: 'Endangered (Strict Conservation)',
    description: 'Earth’s largest terrestrial mammal. Highly emotional, intelligent matriarchal families that communicate through deep infrasonic rumbles.',
    habitat: 'Chobe Riverfront, Amboseli (views of Kilimanjaro), Tarangire & Hwange',
    bestTime: 'Midday river crossings & mud-wallowing sessions',
    funFact: 'An adult elephant consumes up to 150 kg of vegetation and drinks up to 200 liters of water every single day.',
    image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'black-rhino',
    name: 'Black & White Rhinoceros (Kifaru)',
    scientificName: 'Diceros bicornis / Ceratotherium simum',
    status: 'Critically Endangered (High Security)',
    description: 'Prehistoric armored giants preserved through high-tech ranger patrols. Black rhinos are browsers with hooked lips; white rhinos are gentle grazers with square lips.',
    habitat: 'Ngorongoro Crater, Ol Pejeta Conservancy, Lewa Wildlife Conservancy & Etosha',
    bestTime: 'Early morning waterhole visits',
    funFact: 'Rhino horns are composed purely of keratin, the exact same protein found in human hair and fingernails!',
    image: 'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cape-buffalo',
    name: 'Cape Buffalo (Nyati)',
    scientificName: 'Syncerus caffer',
    status: 'Least Concern / Resilient',
    description: 'Fiercely protective and legendary for their heavy curved horns fused into a continuous bone shield called a "boss". Never domesticated.',
    habitat: 'Kruger National Park, Serengeti, Queen Elizabeth Park & Chobe',
    bestTime: 'Cool mornings grazing in large herds of hundreds',
    funFact: 'Cape buffalo herds vote before moving: females look toward their preferred direction and the majority way wins!',
    image: 'https://images.unsplash.com/photo-1549366021-9f761d450615?auto=format&fit=crop&w=800&q=80'
  }
];

export const EDITORIAL_STORIES = [
  {
    number: '01',
    category: 'WILDLIFE EXPEDITIONS',
    title: 'The Great Migration: Earth\'s Most Ancient Pulse',
    subtitle: 'Where millions of thundering hooves obey ancestral instincts across the Serengeti-Mara ecosystem.',
    body: 'Each year 1.5 million wildebeest follow the rains around a 1,000-kilometer loop. Thousands leaping into the churning Mara River is the continent’s oldest rhythm on display.',
    quote: 'In Africa, you do not just observe wildlife. You remember what it felt like when humanity was part of it.',
    author: 'Juma Mwangi, Senior Safari Naturalist (24 years in the Mara)',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { label: 'Animals on the Move', value: '2.2 Million' },
      { label: 'Ecosystem Protected', value: '30,000 km²' },
      { label: 'Species Documented', value: '500+ Birds & Mammals' }
    ]
  },
  {
    number: '02',
    category: 'INDIGENOUS WISDOM & TRADITION',
    title: 'Keepers of the Land: Living in Harmony with Giants',
    subtitle: 'Honoring the deep cultural heritage of the Maasai, Samburu, San, and Berber communities.',
    body: 'Community-owned conservancies put travelers beside Maasai elders around evening fires. Every booking funds village schools, water wells, and women’s artisan collectives.',
    quote: 'We do not inherit the earth from our ancestors; we borrow it from our children.',
    author: 'Naisula Leshore, Community Conservation Director',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { label: 'Community Royalty Share', value: '100% Direct' },
      { label: 'Indigenous Guides', value: '78 Certified Elders' },
      { label: 'Village Schools Funded', value: '42 Built Since 2018' }
    ]
  },
  {
    number: '03',
    category: 'SUSTAINABLE LUXURY ECO-LODGES',
    title: 'Under the Milky Way: 100% Solar & Zero-Footprint Lodges',
    subtitle: 'Uncompromising luxury where private plunge pools meet completely off-grid solar architecture.',
    body: 'Partner lodges run entirely on solar power, ban single-use plastics, and serve produce from neighboring farms. Guests sleep on elevated decks under open star-filled skies.',
    quote: 'Luxury is silence, space, and a sky filled with infinite stars untouched by city glow.',
    author: 'Safari Architecture & Sustainability Council',
    image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80',
    stats: [
      { label: 'Solar Powered Lodges', value: '100% Off-Grid' },
      { label: 'Single-Use Plastics', value: '0% Allowed' },
      { label: 'Protected Acreage', value: '1.2M Hectares' }
    ]
  }
];
