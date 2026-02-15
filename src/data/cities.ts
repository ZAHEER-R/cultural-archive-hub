export interface CityData {
  id: string;
  name: string;
  country: string;
  region: string;
  continent: string;
  image: string;
  lat: number;
  lng: number;
  population: string;
  languages: string[];
  cultures: CultureItem[];
  touristPlaces?: string[];
  famousFood?: string[];
  famousRestaurants?: string[];
  beaches?: string[];
  rivers?: string[];
  parks?: string[];
  malls?: string[];
}

export interface CultureItem {
  title: string;
  category: string;
  description: string;
  religion?: string;
  celebrationDate?: string;
}

export const categories = [
  "Folk Stories", "Rituals & Ceremonies", "Traditional Medicine",
  "Oral Histories", "Dance Forms", "Songs & Music",
  "Craft Techniques", "Indigenous Knowledge", "Festivals",
  "Cuisine", "Architecture", "Clothing & Textiles"
];

export const regions = [
  "South Asia", "Middle East", "Europe", "East Asia",
  "South America", "Africa", "North America", "Southeast Asia", "Oceania", "Central Asia", "Caribbean", "Central America"
];

export const continentColors: Record<string, string> = {
  "Asia": "#e74c3c",
  "Europe": "#3498db",
  "Africa": "#f39c12",
  "North America": "#2ecc71",
  "South America": "#9b59b6",
  "Oceania": "#1abc9c",
  "Antarctica": "#95a5a6",
};

export function getContinentForRegion(region: string): string {
  if (["South Asia","East Asia","Southeast Asia","Middle East","Central Asia"].includes(region)) return "Asia";
  if (region === "Europe") return "Europe";
  if (region === "Africa") return "Africa";
  if (["North America","Central America","Caribbean"].includes(region)) return "North America";
  if (region === "South America") return "South America";
  if (region === "Oceania") return "Oceania";
  return "Asia";
}

export const cities: CityData[] = [
  {
    id: "delhi", name: "Delhi", country: "India", region: "South Asia", continent: "Asia",
    image: "delhi", lat: 28.6139, lng: 77.209, population: "32 million",
    languages: ["Hindi", "Urdu", "Punjabi", "English"],
    touristPlaces: ["Red Fort", "Qutub Minar", "India Gate", "Humayun's Tomb", "Lotus Temple", "Jama Masjid", "Chandni Chowk"],
    famousFood: ["Butter Chicken", "Chole Bhature", "Paranthas", "Biryani", "Chaat", "Jalebi"],
    famousRestaurants: ["Karim's", "Bukhara", "Indian Accent", "Moti Mahal"],
    parks: ["Lodhi Garden", "Garden of Five Senses", "Nehru Park"],
    rivers: ["Yamuna River"],
    cultures: [
      { title: "Diwali - Festival of Lights", category: "Festivals", description: "A five-day festival celebrating the victory of light over darkness. Homes are decorated with oil lamps (diyas), rangoli patterns, and fireworks illuminate the sky. Families exchange sweets, wear new clothes, and perform Lakshmi Puja for prosperity.", religion: "Hinduism", celebrationDate: "October/November" },
      { title: "Kathak Dance", category: "Dance Forms", description: "One of the eight major forms of Indian classical dance, originating from the nomadic bards of ancient northern India. Known for its intricate footwork, spins (chakkar), and expressive storytelling." },
      { title: "Mughlai Cuisine", category: "Cuisine", description: "A culinary tradition born from the Mughal Empire, featuring rich gravies, aromatic spices, and slow-cooked dishes like biryani, kebabs, nihari, and butter chicken." },
      { title: "Qawwali Music", category: "Songs & Music", description: "A form of Sufi devotional music performed at shrines (dargahs), featuring harmonium, tabla, and chorus. Aims to inspire spiritual ecstasy." },
      { title: "Holi Festival", category: "Festivals", description: "The Festival of Colors celebrating spring and the triumph of good over evil. People throw colored powder and water, dance to dhol beats.", religion: "Hinduism", celebrationDate: "March" },
      { title: "Red Fort Heritage", category: "Architecture", description: "The iconic 17th-century Mughal fortress with red sandstone walls, intricate marble inlay work, and beautiful gardens representing Mughal architecture zenith." },
      { title: "Ramlila Folk Drama", category: "Folk Stories", description: "Traditional dramatic folk re-enactment of the epic Ramayana, performed during Dussehra. Features elaborate costumes, dialogues, and culminates in burning of Ravana effigies." },
    ]
  },
  {
    id: "istanbul", name: "Istanbul", country: "Turkey", region: "Middle East", continent: "Asia",
    image: "istanbul", lat: 41.0082, lng: 28.9784, population: "15.8 million",
    languages: ["Turkish", "Kurdish", "Arabic"],
    touristPlaces: ["Hagia Sophia", "Blue Mosque", "Topkapi Palace", "Grand Bazaar", "Galata Tower", "Basilica Cistern"],
    famousFood: ["Kebab", "Baklava", "Turkish Delight", "Pide", "Lahmacun", "Doner"],
    famousRestaurants: ["Mikla", "Nusr-Et", "Çiya Sofrası"],
    cultures: [
      { title: "Eid al-Fitr Celebrations", category: "Festivals", description: "Marking the end of Ramadan with prayers, feasts, gift-giving, and traditional sweets like baklava and Turkish delight.", religion: "Islam", celebrationDate: "Varies (lunar calendar)" },
      { title: "Whirling Dervish Ceremony", category: "Rituals & Ceremonies", description: "The Mevlevi Sema ceremony where dervishes spin in white robes, symbolizing the soul's journey toward truth and divine love." },
      { title: "Turkish Bath (Hamam)", category: "Traditional Medicine", description: "Ottoman bathing tradition combining steam, massage, and cleansing rituals in historic marble interiors." },
      { title: "Grand Bazaar Craftsmanship", category: "Craft Techniques", description: "One of the world's oldest covered markets with artisans practicing carpet weaving, ceramics, copperwork, and calligraphy." },
      { title: "Turkish Classical Music", category: "Songs & Music", description: "Rich tradition featuring ney, oud, kanun, and kemençe, with the distinctive makam melodic system." },
      { title: "Karagöz Shadow Puppetry", category: "Folk Stories", description: "Traditional shadow puppet theatre featuring characters Karagöz and Hacivat, a UNESCO-recognized art form dating to Ottoman times." },
    ]
  },
  {
    id: "rome", name: "Rome", country: "Italy", region: "Europe", continent: "Europe",
    image: "rome", lat: 41.9028, lng: 12.4964, population: "4.3 million",
    languages: ["Italian", "Latin (liturgical)"],
    touristPlaces: ["Colosseum", "Vatican City", "Trevi Fountain", "Pantheon", "Roman Forum", "Spanish Steps"],
    famousFood: ["Carbonara", "Cacio e Pepe", "Supplì", "Gelato", "Pizza al Taglio"],
    famousRestaurants: ["Da Enzo", "Roscioli", "La Pergola"],
    cultures: [
      { title: "Christmas Eve Feast (La Vigilia)", category: "Festivals", description: "The Feast of the Seven Fishes featuring an elaborate multi-course seafood dinner, midnight mass, and panettone.", religion: "Christianity", celebrationDate: "December 24-25" },
      { title: "Roman Gladiatorial Heritage", category: "Oral Histories", description: "The Colosseum stands as testament to ancient Roman entertainment and engineering that shaped Roman social life." },
      { title: "Commedia dell'Arte", category: "Dance Forms", description: "Improvisational theatre with masked stock characters like Arlecchino, Colombina, and Pulcinella." },
      { title: "Vatican Artistic Heritage", category: "Architecture", description: "Millennia of artistic treasures including Michelangelo's Sistine Chapel ceiling and St. Peter's Basilica." },
      { title: "Roman Cuisine Traditions", category: "Cuisine", description: "Ancient recipes: cacio e pepe, carbonara, amatriciana, emphasizing simple high-quality ingredients refined over millennia." },
    ]
  },
  {
    id: "amritsar", name: "Amritsar", country: "India", region: "South Asia", continent: "Asia",
    image: "amritsar", lat: 31.634, lng: 74.8723, population: "1.2 million",
    languages: ["Punjabi", "Hindi", "English"],
    touristPlaces: ["Golden Temple", "Jallianwala Bagh", "Wagah Border", "Partition Museum"],
    famousFood: ["Amritsari Kulcha", "Lassi", "Amritsari Fish", "Pinni"],
    cultures: [
      { title: "Guru Nanak Jayanti", category: "Festivals", description: "Celebrating the birth of Guru Nanak with processions, Akhand Path, and community meals (langar) serving thousands.", religion: "Sikhism", celebrationDate: "November" },
      { title: "Golden Temple Langar", category: "Rituals & Ceremonies", description: "World's largest free kitchen serving 100,000+ meals daily at Harmandir Sahib, embodying Sikh equality principles." },
      { title: "Bhangra Dance", category: "Dance Forms", description: "Energetic Punjabi folk dance with vigorous kicks, leaps, dhol drums, traditionally performed during Baisakhi harvest festival." },
      { title: "Phulkari Embroidery", category: "Craft Techniques", description: "Traditional Punjabi embroidery creating geometric patterns on handspun cloth using bright silk threads." },
    ]
  },
  {
    id: "kyoto", name: "Kyoto", country: "Japan", region: "East Asia", continent: "Asia",
    image: "kyoto", lat: 35.0116, lng: 135.7681, population: "1.5 million",
    languages: ["Japanese"],
    touristPlaces: ["Fushimi Inari Shrine", "Kinkaku-ji", "Arashiyama Bamboo Grove", "Kiyomizu-dera"],
    famousFood: ["Kaiseki", "Yudofu", "Matcha", "Tsukemono"],
    cultures: [
      { title: "Cherry Blossom Festival (Hanami)", category: "Festivals", description: "The centuries-old tradition of enjoying cherry blossoms, gathering for picnics and contemplation of beauty.", celebrationDate: "March-April" },
      { title: "Tea Ceremony (Chanoyu)", category: "Rituals & Ceremonies", description: "Choreographed ritual of preparing and serving matcha, embodying wabi-sabi aesthetics and Zen Buddhist principles." },
      { title: "Noh Theatre", category: "Dance Forms", description: "World's oldest extant theatrical form combining dance, music, and drama with elaborate masks and extreme precision." },
      { title: "Kintsugi (Golden Repair)", category: "Craft Techniques", description: "Repairing broken pottery with lacquer mixed with powdered gold, celebrating imperfections as part of an object's history." },
      { title: "Geisha Traditions", category: "Indigenous Knowledge", description: "Entertainers skilled in classical dance, shamisen, tea ceremony, ikebana, preserved in Gion district." },
    ]
  },
  {
    id: "cusco", name: "Cusco", country: "Peru", region: "South America", continent: "South America",
    image: "cusco", lat: -13.5319, lng: -71.9675, population: "430,000",
    languages: ["Spanish", "Quechua", "Aymara"],
    touristPlaces: ["Machu Picchu", "Sacsayhuamán", "Plaza de Armas", "Sacred Valley"],
    famousFood: ["Ceviche", "Lomo Saltado", "Cuy", "Quinoa Soup"],
    cultures: [
      { title: "Inti Raymi (Festival of the Sun)", category: "Festivals", description: "Ancient Incan ceremony honoring Inti, the sun god, with elaborate costumes and ritual offerings at Sacsayhuaman.", celebrationDate: "June 24" },
      { title: "Andean Textile Weaving", category: "Craft Techniques", description: "Pre-Columbian weaving with backstrap looms and natural dyes encoding identity and cosmological beliefs." },
      { title: "Pachamama Offerings", category: "Rituals & Ceremonies", description: "Earth Mother ceremonies offering coca leaves and chicha to maintain reciprocity with nature." },
      { title: "Incan Stone Masonry", category: "Architecture", description: "Massive stones fitted without mortar so precisely a knife blade cannot fit between them." },
    ]
  },
  {
    id: "marrakech", name: "Marrakech", country: "Morocco", region: "Africa", continent: "Africa",
    image: "marrakech", lat: 31.6295, lng: -7.9811, population: "1 million",
    languages: ["Arabic", "Berber", "French"],
    touristPlaces: ["Jemaa el-Fnaa", "Majorelle Garden", "Bahia Palace", "Koutoubia Mosque"],
    famousFood: ["Tagine", "Couscous", "Pastilla", "Harira", "Mint Tea"],
    cultures: [
      { title: "Gnawa Music Festival", category: "Songs & Music", description: "Blending sub-Saharan, Berber, and Arabic traditions with guembri and qraqeb, originally healing music.", celebrationDate: "June" },
      { title: "Moroccan Zellige Tilework", category: "Craft Techniques", description: "Ancient mosaic artform using hand-cut geometric tiles to create intricate mathematical patterns." },
      { title: "Jemaa el-Fnaa Storytelling", category: "Folk Stories", description: "Ancient square with halqa performances: storytellers, musicians, snake charmers — UNESCO Masterpiece." },
      { title: "Traditional Hammam Rituals", category: "Traditional Medicine", description: "Cleansing with black soap, kessa glove exfoliation, argan oil treatments — community gathering places." },
      { title: "Moroccan Culinary Arts", category: "Cuisine", description: "Tagine cooking, couscous, ras el hanout spice blending with 30+ spices, and Moroccan tea service." },
    ]
  },
  {
    id: "cairo", name: "Cairo", country: "Egypt", region: "Africa", continent: "Africa",
    image: "delhi", lat: 30.0444, lng: 31.2357, population: "21 million",
    languages: ["Arabic", "Egyptian Arabic"],
    touristPlaces: ["Pyramids of Giza", "Egyptian Museum", "Khan el-Khalili", "Al-Azhar Mosque"],
    famousFood: ["Koshari", "Ful Medames", "Molokhia", "Shawarma"],
    cultures: [
      { title: "Pharaonic Heritage", category: "Architecture", description: "The Great Pyramids and Sphinx represent 4,500+ years of architectural mastery and astronomical knowledge." },
      { title: "Sufi Mawlid Celebrations", category: "Festivals", description: "Annual celebrations honoring Islamic saints with dhikr chanting, processions, and communal feasting.", religion: "Islam" },
      { title: "Egyptian Folk Music (Shaabi)", category: "Songs & Music", description: "Popular music reflecting working-class life, evolved from traditional mawwal vocal improvisation." },
    ]
  },
  {
    id: "beijing", name: "Beijing", country: "China", region: "East Asia", continent: "Asia",
    image: "kyoto", lat: 39.9042, lng: 116.4074, population: "21.5 million",
    languages: ["Mandarin Chinese"],
    touristPlaces: ["Great Wall", "Forbidden City", "Temple of Heaven", "Summer Palace", "Tiananmen Square"],
    famousFood: ["Peking Duck", "Jianbing", "Zhajiangmian", "Hotpot"],
    cultures: [
      { title: "Chinese New Year", category: "Festivals", description: "Dragon dances, fireworks, red envelopes (hongbao), family reunion dinners, and temple fairs.", celebrationDate: "January/February" },
      { title: "Peking Opera", category: "Dance Forms", description: "Combining music, vocal performance, mime, dance, acrobatics with elaborate costumes and painted faces." },
      { title: "Forbidden City Architecture", category: "Architecture", description: "World's largest palace complex with 980 buildings exemplifying feng shui and symbolic numerology." },
      { title: "Traditional Chinese Medicine", category: "Traditional Medicine", description: "Holistic healing: herbal medicine, acupuncture, cupping, tai chi, qi gong — 2,500 years of knowledge." },
    ]
  },
  {
    id: "athens", name: "Athens", country: "Greece", region: "Europe", continent: "Europe",
    image: "rome", lat: 37.9838, lng: 23.7275, population: "3.2 million",
    languages: ["Greek"],
    touristPlaces: ["Acropolis", "Parthenon", "Plaka", "Ancient Agora", "National Archaeological Museum"],
    famousFood: ["Souvlaki", "Moussaka", "Spanakopita", "Baklava"],
    cultures: [
      { title: "Greek Orthodox Easter", category: "Festivals", description: "Midnight candlelight services, red-dyed eggs, lamb roasting, and Holy Week processions.", religion: "Christianity", celebrationDate: "April/May" },
      { title: "Parthenon & Acropolis Heritage", category: "Architecture", description: "Mathematical proportions, Doric columns, and sculptural program influencing Western architecture for millennia." },
      { title: "Greek Folk Dancing (Syrtos)", category: "Dance Forms", description: "Traditional circle and line dances with bouzouki, lyra, and clarinet accompaniment." },
      { title: "Greek Mythology Oral Tradition", category: "Folk Stories", description: "Rich tapestry of myths about gods and heroes preserved through oral tradition, informing global literature." },
    ]
  },
  {
    id: "varanasi", name: "Varanasi", country: "India", region: "South Asia", continent: "Asia",
    image: "amritsar", lat: 25.3176, lng: 83.0068, population: "1.5 million",
    languages: ["Hindi", "Bhojpuri", "Sanskrit"],
    touristPlaces: ["Dashashwamedh Ghat", "Kashi Vishwanath Temple", "Sarnath", "Manikarnika Ghat"],
    famousFood: ["Kachori Sabzi", "Banarasi Paan", "Thandai", "Malaiyo"],
    rivers: ["Ganges"],
    cultures: [
      { title: "Ganga Aarti Ceremony", category: "Rituals & Ceremonies", description: "Spectacular fire ritual every evening on the ghats with large flaming lamps, flower offerings, and chanting.", religion: "Hinduism" },
      { title: "Banarasi Silk Weaving", category: "Craft Techniques", description: "Centuries-old tradition of luxurious silk with gold/silver brocade (zari) and Mughal-inspired designs." },
      { title: "Classical Music (Banaras Gharana)", category: "Songs & Music", description: "Home to the Banaras gharana of Hindustani classical music with distinctive vocal and instrumental styles." },
    ]
  },
  {
    id: "mexico-city", name: "Mexico City", country: "Mexico", region: "North America", continent: "North America",
    image: "cusco", lat: 19.4326, lng: -99.1332, population: "21.8 million",
    languages: ["Spanish", "Nahuatl"],
    touristPlaces: ["Zócalo", "Teotihuacan", "Chapultepec Castle", "Frida Kahlo Museum", "Palacio de Bellas Artes"],
    famousFood: ["Tacos al Pastor", "Mole", "Tamales", "Chilaquiles", "Churros"],
    cultures: [
      { title: "Day of the Dead (Dia de los Muertos)", category: "Festivals", description: "Vibrant celebration honoring deceased with altars, marigolds, sugar skulls, and cemetery gatherings.", celebrationDate: "November 1-2" },
      { title: "Aztec Heritage & Templo Mayor", category: "Architecture", description: "Ruins of Tenochtitlan beneath modern city, revealing sophisticated Mesoamerican urban planning." },
      { title: "Mariachi Music", category: "Songs & Music", description: "Ensembles of violins, trumpets, guitars, UNESCO-recognized intangible heritage of passionate musical tradition." },
      { title: "Traditional Mole Cuisine", category: "Cuisine", description: "Complex sauces of 30+ ingredients including chiles, chocolate, spices, taking days to prepare." },
    ]
  },
  // ========== EXPANDED CITIES ==========
  {
    id: "paris", name: "Paris", country: "France", region: "Europe", continent: "Europe",
    image: "rome", lat: 48.8566, lng: 2.3522, population: "12.2 million",
    languages: ["French"],
    touristPlaces: ["Eiffel Tower", "Louvre", "Notre-Dame", "Sacré-Cœur", "Versailles"],
    famousFood: ["Croissant", "Coq au Vin", "Crêpes", "Escargot", "Macarons"],
    cultures: [
      { title: "Bastille Day Celebrations", category: "Festivals", description: "National day on July 14 with military parade on Champs-Élysées, fireworks at Eiffel Tower, and communal dancing.", celebrationDate: "July 14" },
      { title: "French Gastronomy", category: "Cuisine", description: "UNESCO-listed culinary tradition emphasizing multi-course meals, wine pairing, and artisanal food preparation." },
      { title: "Impressionist Art Heritage", category: "Architecture", description: "Paris as birthplace of Impressionism; Musée d'Orsay and Montmartre preserve this revolutionary art movement." },
      { title: "Chanson Française", category: "Songs & Music", description: "Distinctive French song tradition from Édith Piaf to modern artists, emphasizing poetic lyrics and emotional delivery." },
    ]
  },
  {
    id: "london", name: "London", country: "United Kingdom", region: "Europe", continent: "Europe",
    image: "rome", lat: 51.5074, lng: -0.1278, population: "9.5 million",
    languages: ["English"],
    touristPlaces: ["Tower of London", "Big Ben", "British Museum", "Buckingham Palace", "Westminster Abbey"],
    famousFood: ["Fish and Chips", "Sunday Roast", "Pie and Mash", "Afternoon Tea"],
    rivers: ["Thames"],
    cultures: [
      { title: "Royal Ceremonies", category: "Rituals & Ceremonies", description: "Changing of the Guard, State Opening of Parliament, and Trooping the Colour represent centuries of monarchy traditions." },
      { title: "Shakespearean Theatre", category: "Folk Stories", description: "Globe Theatre and West End preserve the world's greatest theatrical traditions from the Elizabethan era." },
      { title: "British Pub Culture", category: "Cuisine", description: "Centuries-old tradition of communal gathering, ale brewing, and pub food that forms the heart of British social life." },
      { title: "Notting Hill Carnival", category: "Festivals", description: "Europe's largest street festival celebrating Caribbean culture with steel bands, calypso, and colorful costumes.", celebrationDate: "August" },
    ]
  },
  {
    id: "tokyo", name: "Tokyo", country: "Japan", region: "East Asia", continent: "Asia",
    image: "kyoto", lat: 35.6762, lng: 139.6503, population: "37.4 million",
    languages: ["Japanese"],
    touristPlaces: ["Shibuya Crossing", "Meiji Shrine", "Senso-ji", "Tokyo Skytree", "Tsukiji Market"],
    famousFood: ["Sushi", "Ramen", "Tempura", "Tonkatsu", "Wagyu"],
    cultures: [
      { title: "Matsuri Festivals", category: "Festivals", description: "Hundreds of annual festivals with portable shrine processions (mikoshi), taiko drumming, and traditional dance." },
      { title: "Kabuki Theatre", category: "Dance Forms", description: "Stylized classical dance-drama with elaborate makeup (kumadori), combining dance, music, and dramatic acting." },
      { title: "Sushi Craftsmanship", category: "Cuisine", description: "Art of preparing sushi requires years of apprenticeship; masters spend decades perfecting rice preparation and knife skills." },
      { title: "Shinto Shrine Rituals", category: "Rituals & Ceremonies", description: "Purification rituals, prayer ceremonies, and seasonal celebrations at thousands of shrines across Tokyo." },
    ]
  },
  {
    id: "new-york", name: "New York", country: "United States", region: "North America", continent: "North America",
    image: "rome", lat: 40.7128, lng: -74.006, population: "8.3 million",
    languages: ["English", "Spanish", "Chinese", "Russian"],
    touristPlaces: ["Statue of Liberty", "Central Park", "Times Square", "Empire State Building", "Brooklyn Bridge"],
    famousFood: ["New York Pizza", "Bagels", "Cheesecake", "Hot Dogs", "Pastrami Sandwich"],
    cultures: [
      { title: "Broadway Theatre", category: "Dance Forms", description: "World's premier theatre district with musicals and plays running since the 1900s, defining American performing arts." },
      { title: "Jazz & Hip-Hop Heritage", category: "Songs & Music", description: "Birthplace of hip-hop in the Bronx and historic jazz clubs in Harlem preserving African American musical innovation." },
      { title: "Thanksgiving Traditions", category: "Festivals", description: "Macy's Parade, turkey dinners, and family gatherings reflecting American cultural identity.", celebrationDate: "November" },
      { title: "Ellis Island Immigration", category: "Oral Histories", description: "Gateway for 12 million immigrants (1892-1954), preserving stories of cultural exchange and the American Dream." },
    ]
  },
  {
    id: "bangkok", name: "Bangkok", country: "Thailand", region: "Southeast Asia", continent: "Asia",
    image: "kyoto", lat: 13.7563, lng: 100.5018, population: "10.7 million",
    languages: ["Thai"],
    touristPlaces: ["Grand Palace", "Wat Phra Kaew", "Wat Arun", "Chatuchak Market", "Khao San Road"],
    famousFood: ["Pad Thai", "Tom Yum Goong", "Green Curry", "Mango Sticky Rice", "Som Tam"],
    cultures: [
      { title: "Songkran Water Festival", category: "Festivals", description: "Thai New Year celebrated with massive water fights, temple visits, and merit-making ceremonies.", celebrationDate: "April 13-15" },
      { title: "Muay Thai", category: "Dance Forms", description: "Ancient martial art 'Art of Eight Limbs' with ritualistic pre-fight Wai Kru dance honoring teachers." },
      { title: "Thai Temple Architecture", category: "Architecture", description: "Ornate Buddhist temples with golden spires, intricate mosaics, and mythical guardian figures." },
      { title: "Thai Massage Tradition", category: "Traditional Medicine", description: "2,500-year-old healing system combining acupressure, Indian Ayurvedic principles, and assisted yoga postures." },
    ]
  },
  {
    id: "sydney", name: "Sydney", country: "Australia", region: "Oceania", continent: "Oceania",
    image: "rome", lat: -33.8688, lng: 151.2093, population: "5.4 million",
    languages: ["English"],
    touristPlaces: ["Sydney Opera House", "Harbour Bridge", "Bondi Beach", "Taronga Zoo", "The Rocks"],
    famousFood: ["Meat Pie", "Lamington", "Vegemite Toast", "Barramundi", "Pavlova"],
    beaches: ["Bondi Beach", "Manly Beach", "Coogee Beach"],
    cultures: [
      { title: "Aboriginal Dreamtime", category: "Indigenous Knowledge", description: "World's oldest continuous culture (65,000+ years) with Dreamtime stories explaining creation and natural world." },
      { title: "NAIDOC Week", category: "Festivals", description: "Celebrating Aboriginal and Torres Strait Islander history, culture, and achievements.", celebrationDate: "July" },
      { title: "Didgeridoo Music", category: "Songs & Music", description: "Ancient Aboriginal wind instrument producing drone sounds used in ceremonies for 1,500+ years." },
      { title: "Australian Bush Tucker", category: "Cuisine", description: "Indigenous food traditions using native ingredients like kangaroo, wattleseed, bush tomatoes, and lemon myrtle." },
    ]
  },
  {
    id: "rio-de-janeiro", name: "Rio de Janeiro", country: "Brazil", region: "South America", continent: "South America",
    image: "cusco", lat: -22.9068, lng: -43.1729, population: "13.6 million",
    languages: ["Portuguese"],
    touristPlaces: ["Christ the Redeemer", "Copacabana Beach", "Sugarloaf Mountain", "Ipanema Beach"],
    famousFood: ["Feijoada", "Açaí Bowl", "Brigadeiro", "Churrasco", "Pão de Queijo"],
    beaches: ["Copacabana", "Ipanema", "Leblon"],
    cultures: [
      { title: "Carnival", category: "Festivals", description: "World's largest carnival with samba parades, elaborate costumes, floats, and music lasting 5 days before Lent.", celebrationDate: "February/March" },
      { title: "Samba Dance & Music", category: "Dance Forms", description: "Afro-Brazilian dance tradition with syncopated rhythms, born in Bahia and perfected in Rio's favelas." },
      { title: "Capoeira", category: "Indigenous Knowledge", description: "Afro-Brazilian martial art disguised as dance, combining acrobatics, music (berimbau), and cultural resistance." },
      { title: "Bossa Nova", category: "Songs & Music", description: "Musical genre born in Ipanema blending samba rhythms with jazz harmonies, epitomized by 'Girl from Ipanema'." },
    ]
  },
  {
    id: "moscow", name: "Moscow", country: "Russia", region: "Europe", continent: "Europe",
    image: "rome", lat: 55.7558, lng: 37.6173, population: "12.5 million",
    languages: ["Russian"],
    touristPlaces: ["Red Square", "Kremlin", "St. Basil's Cathedral", "Bolshoi Theatre", "GUM"],
    famousFood: ["Borscht", "Beef Stroganoff", "Blini", "Pelmeni", "Piroshki"],
    cultures: [
      { title: "Russian Ballet", category: "Dance Forms", description: "Bolshoi and Mariinsky companies represent centuries of ballet excellence, from Swan Lake to The Nutcracker." },
      { title: "Orthodox Christmas", category: "Festivals", description: "Celebrated on January 7 with midnight services, traditional feast, and Babushka gift-giving traditions.", religion: "Christianity", celebrationDate: "January 7" },
      { title: "Matryoshka Craftsmanship", category: "Craft Techniques", description: "Nested wooden dolls painted by hand, each set telling a story or depicting Russian folk characters." },
      { title: "Russian Folk Music", category: "Songs & Music", description: "Balalaika, accordion, and choral traditions expressing Russian soul through folk songs and byliny epics." },
    ]
  },
  {
    id: "dubai", name: "Dubai", country: "United Arab Emirates", region: "Middle East", continent: "Asia",
    image: "istanbul", lat: 25.2048, lng: 55.2708, population: "3.5 million",
    languages: ["Arabic", "English"],
    touristPlaces: ["Burj Khalifa", "Palm Jumeirah", "Dubai Mall", "Dubai Creek", "Jumeirah Mosque"],
    famousFood: ["Shawarma", "Al Machboos", "Luqaimat", "Knafeh"],
    malls: ["Dubai Mall", "Mall of the Emirates", "Ibn Battuta Mall"],
    cultures: [
      { title: "Bedouin Heritage", category: "Indigenous Knowledge", description: "Desert survival traditions including falconry, camel racing, and pearl diving passed through generations." },
      { title: "Arabic Coffee Ceremony", category: "Rituals & Ceremonies", description: "Gahwa preparation with cardamom served in small cups, a UNESCO-recognized symbol of Arabian hospitality." },
      { title: "Eid Celebrations", category: "Festivals", description: "Grand celebrations with communal prayers, family feasts, charity, and spectacular light displays.", religion: "Islam" },
      { title: "Arabic Calligraphy", category: "Craft Techniques", description: "Sacred art form transforming Arabic script into elaborate visual compositions adorning mosques and manuscripts." },
    ]
  },
  {
    id: "nairobi", name: "Nairobi", country: "Kenya", region: "Africa", continent: "Africa",
    image: "marrakech", lat: -1.2921, lng: 36.8219, population: "4.7 million",
    languages: ["Swahili", "English"],
    touristPlaces: ["Nairobi National Park", "David Sheldrick Wildlife Trust", "Giraffe Centre", "Karen Blixen Museum"],
    famousFood: ["Nyama Choma", "Ugali", "Sukuma Wiki", "Mandazi"],
    cultures: [
      { title: "Maasai Cultural Traditions", category: "Indigenous Knowledge", description: "Semi-nomadic pastoralist traditions including beadwork, warrior ceremonies (Eunoto), and cattle-keeping wisdom." },
      { title: "Swahili Storytelling", category: "Folk Stories", description: "Rich oral tradition of fables, proverbs, and epic narratives preserving East African wisdom and history." },
      { title: "Kikuyu Harvest Rituals", category: "Rituals & Ceremonies", description: "Agricultural ceremonies giving thanks for harvest, connecting communities to their ancestral farming traditions." },
      { title: "Benga Music", category: "Songs & Music", description: "Kenyan popular music blending traditional Luo rhythms with modern instruments, defining East African sound." },
    ]
  },
  {
    id: "mumbai", name: "Mumbai", country: "India", region: "South Asia", continent: "Asia",
    image: "delhi", lat: 19.076, lng: 72.8777, population: "20.7 million",
    languages: ["Marathi", "Hindi", "English"],
    touristPlaces: ["Gateway of India", "Marine Drive", "Elephanta Caves", "Chhatrapati Shivaji Terminus"],
    famousFood: ["Vada Pav", "Pav Bhaji", "Bombay Sandwich", "Bhel Puri"],
    beaches: ["Juhu Beach", "Marine Drive"],
    cultures: [
      { title: "Bollywood Film Industry", category: "Songs & Music", description: "World's largest film industry producing 1,500+ films annually with song-and-dance traditions defining Indian pop culture." },
      { title: "Ganesh Chaturthi", category: "Festivals", description: "10-day festival with massive Ganesh idol installations, processions, and ocean immersion ceremonies.", religion: "Hinduism", celebrationDate: "August/September" },
      { title: "Dabbawalas Lunch Delivery", category: "Indigenous Knowledge", description: "125-year-old system of 5,000 dabbawalas delivering 200,000 lunches daily with near-perfect accuracy — studied by Harvard Business School." },
      { title: "Koli Fishing Culture", category: "Folk Stories", description: "Indigenous Koli community's fishing traditions, seafood cuisine, and maritime folklore predating Mumbai's founding." },
    ]
  },
  {
    id: "singapore", name: "Singapore", country: "Singapore", region: "Southeast Asia", continent: "Asia",
    image: "kyoto", lat: 1.3521, lng: 103.8198, population: "5.9 million",
    languages: ["English", "Mandarin", "Malay", "Tamil"],
    touristPlaces: ["Marina Bay Sands", "Gardens by the Bay", "Sentosa", "Chinatown", "Little India"],
    famousFood: ["Hainanese Chicken Rice", "Chilli Crab", "Laksa", "Satay", "Kaya Toast"],
    cultures: [
      { title: "Hawker Centre Food Culture", category: "Cuisine", description: "UNESCO-listed culinary tradition of affordable, diverse street food in communal open-air hawker centres." },
      { title: "Chinese New Year in Chinatown", category: "Festivals", description: "Spectacular light-ups, lion dances, and River Hongbao celebrations in Chinatown.", celebrationDate: "January/February" },
      { title: "Peranakan Heritage", category: "Indigenous Knowledge", description: "Unique Straits Chinese culture blending Malay and Chinese traditions in cuisine, dress, and architecture." },
      { title: "Tamil Thaipusam", category: "Rituals & Ceremonies", description: "Hindu festival of devotion with kavadi (burden) carrying, body piercing, and temple processions.", religion: "Hinduism", celebrationDate: "January/February" },
    ]
  },
  {
    id: "barcelona", name: "Barcelona", country: "Spain", region: "Europe", continent: "Europe",
    image: "rome", lat: 41.3874, lng: 2.1686, population: "5.6 million",
    languages: ["Spanish", "Catalan"],
    touristPlaces: ["Sagrada Família", "Park Güell", "La Rambla", "Casa Batlló", "Gothic Quarter"],
    famousFood: ["Paella", "Tapas", "Crema Catalana", "Pan con Tomate"],
    beaches: ["Barceloneta Beach"],
    cultures: [
      { title: "La Mercè Festival", category: "Festivals", description: "Barcelona's biggest festival with human towers (castells), fire runs (correfoc), and giant figures.", celebrationDate: "September" },
      { title: "Gaudí's Architectural Legacy", category: "Architecture", description: "Antoni Gaudí's unique modernist architecture blending nature, religion, and art in buildings like Sagrada Família." },
      { title: "Flamenco & Sardana Dance", category: "Dance Forms", description: "Passionate flamenco and traditional Catalan sardana circle dance representing Spanish cultural diversity." },
      { title: "Catalan Cuisine", category: "Cuisine", description: "Mediterranean cooking tradition of pa amb tomàquet, escalivada, and innovative molecular gastronomy." },
    ]
  },
  {
    id: "cairo-luxor", name: "Luxor", country: "Egypt", region: "Africa", continent: "Africa",
    image: "delhi", lat: 25.6872, lng: 32.6396, population: "1.3 million",
    languages: ["Arabic"],
    touristPlaces: ["Valley of the Kings", "Karnak Temple", "Luxor Temple", "Hatshepsut Temple"],
    cultures: [
      { title: "Ancient Egyptian Burial Rituals", category: "Rituals & Ceremonies", description: "Elaborate mummification and burial practices with Book of the Dead texts guiding souls to the afterlife." },
      { title: "Pharaonic Temple Architecture", category: "Architecture", description: "Karnak's hypostyle hall with 134 massive columns represents the pinnacle of ancient Egyptian monumental building." },
      { title: "Nile River Traditions", category: "Folk Stories", description: "Millennia of stories, myths, and agricultural traditions centered around the annual Nile flood cycle." },
    ]
  },
  {
    id: "hanoi", name: "Hanoi", country: "Vietnam", region: "Southeast Asia", continent: "Asia",
    image: "kyoto", lat: 21.0278, lng: 105.8342, population: "8.2 million",
    languages: ["Vietnamese"],
    touristPlaces: ["Hoan Kiem Lake", "Temple of Literature", "Old Quarter", "Ho Chi Minh Mausoleum"],
    famousFood: ["Pho", "Bun Cha", "Banh Mi", "Egg Coffee", "Bun Bo Hue"],
    cultures: [
      { title: "Water Puppet Theatre", category: "Folk Stories", description: "Unique Vietnamese art form with wooden puppets performing on water, depicting rural life and legends." },
      { title: "Tet (Lunar New Year)", category: "Festivals", description: "Vietnam's most important holiday with ancestral worship, kumquat trees, banh chung, and family reunions.", celebrationDate: "January/February" },
      { title: "Vietnamese Coffee Culture", category: "Cuisine", description: "Distinctive drip-brew technique using robusta beans, condensed milk, and egg coffee unique to Hanoi." },
      { title: "Ao Dai Traditional Dress", category: "Clothing & Textiles", description: "Elegant Vietnamese tunic symbolizing grace, worn during festivals, weddings, and national celebrations." },
    ]
  },
  {
    id: "istanbul-cappadocia", name: "Cappadocia", country: "Turkey", region: "Middle East", continent: "Asia",
    image: "istanbul", lat: 38.6431, lng: 34.8289, population: "300,000",
    languages: ["Turkish"],
    touristPlaces: ["Fairy Chimneys", "Göreme Open Air Museum", "Underground Cities", "Hot Air Balloon Rides"],
    cultures: [
      { title: "Cave Church Heritage", category: "Architecture", description: "Byzantine-era rock-cut churches with stunning frescoes carved into volcanic tuff formations." },
      { title: "Pottery Traditions (Avanos)", category: "Craft Techniques", description: "Red clay pottery from the Kızılırmak river, shaped using techniques unchanged for 4,000 years." },
      { title: "Underground City Living", category: "Indigenous Knowledge", description: "Ancient underground cities (Derinkuyu, Kaymakli) carved 8 stories deep, sheltering communities for millennia." },
    ]
  },
  {
    id: "jaipur", name: "Jaipur", country: "India", region: "South Asia", continent: "Asia",
    image: "delhi", lat: 26.9124, lng: 75.7873, population: "3.1 million",
    languages: ["Hindi", "Rajasthani", "English"],
    touristPlaces: ["Amber Fort", "Hawa Mahal", "City Palace", "Jantar Mantar", "Nahargarh Fort"],
    famousFood: ["Dal Baati Churma", "Ghewar", "Pyaaz Kachori", "Laal Maas"],
    cultures: [
      { title: "Rajasthani Folk Music & Dance", category: "Songs & Music", description: "Manganiyar and Langa musicians, Ghoomar dance, and Kalbelia snake charmer dance — all UNESCO recognized." },
      { title: "Block Printing (Bagru)", category: "Craft Techniques", description: "Hand-carved wooden block printing on fabric using natural dyes, a Rajasthani tradition spanning centuries." },
      { title: "Teej Festival", category: "Festivals", description: "Women's festival celebrating monsoon with swings, folk songs, mehndi, and fasting for marital bliss.", religion: "Hinduism", celebrationDate: "July/August" },
      { title: "Rajput Architecture", category: "Architecture", description: "Pink sandstone city with forts, palaces, and havelis showcasing the grandeur of Rajput warrior kings." },
    ]
  },
  {
    id: "addis-ababa", name: "Addis Ababa", country: "Ethiopia", region: "Africa", continent: "Africa",
    image: "marrakech", lat: 9.0222, lng: 38.7469, population: "5.4 million",
    languages: ["Amharic", "Oromo", "English"],
    touristPlaces: ["National Museum", "Holy Trinity Cathedral", "Merkato", "Entoto Mountain"],
    famousFood: ["Injera", "Doro Wat", "Kitfo", "Ethiopian Coffee"],
    cultures: [
      { title: "Ethiopian Coffee Ceremony", category: "Rituals & Ceremonies", description: "Elaborate three-round ceremony of roasting, grinding, and brewing coffee with incense — birthplace of coffee culture." },
      { title: "Timkat (Epiphany)", category: "Festivals", description: "Three-day celebration of Jesus' baptism with colorful processions, holy water ceremonies, and traditional music.", religion: "Christianity", celebrationDate: "January 19" },
      { title: "Eskista Dance", category: "Dance Forms", description: "Distinctive Ethiopian shoulder dance with rapid shoulder movements, performed at celebrations and festivals." },
      { title: "Ge'ez Script Heritage", category: "Indigenous Knowledge", description: "One of the world's oldest alphabets still in use, with a literary tradition spanning 2,000+ years." },
    ]
  },
  {
    id: "prague", name: "Prague", country: "Czech Republic", region: "Europe", continent: "Europe",
    image: "rome", lat: 50.0755, lng: 14.4378, population: "1.3 million",
    languages: ["Czech"],
    touristPlaces: ["Charles Bridge", "Prague Castle", "Old Town Square", "Astronomical Clock"],
    famousFood: ["Trdelník", "Svíčková", "Knedlíky", "Czech Beer"],
    cultures: [
      { title: "Bohemian Glass Making", category: "Craft Techniques", description: "700-year tradition of cut crystal and blown glass artistry known for exceptional clarity and craftsmanship." },
      { title: "Czech Puppet Theatre", category: "Folk Stories", description: "UNESCO-recognized tradition of marionette performances dating to the 18th century, deeply woven into Czech identity." },
      { title: "Czech Beer Culture", category: "Cuisine", description: "Birthplace of Pilsner lager with the world's highest per-capita beer consumption and centuries of brewing tradition." },
    ]
  },
  {
    id: "buenos-aires", name: "Buenos Aires", country: "Argentina", region: "South America", continent: "South America",
    image: "cusco", lat: -34.6037, lng: -58.3816, population: "15.4 million",
    languages: ["Spanish"],
    touristPlaces: ["La Boca", "Recoleta Cemetery", "Plaza de Mayo", "Teatro Colón", "San Telmo"],
    famousFood: ["Asado", "Empanadas", "Dulce de Leche", "Choripán", "Milanesa"],
    cultures: [
      { title: "Tango", category: "Dance Forms", description: "UNESCO-recognized passionate partner dance born in Buenos Aires' working-class neighborhoods, now a global art form." },
      { title: "Gaucho Culture", category: "Indigenous Knowledge", description: "Cowboy traditions of the pampas including horsemanship, cattle herding, mate drinking, and folk music." },
      { title: "Argentine Asado", category: "Cuisine", description: "Sacred grilling tradition of slow-cooking various cuts of beef over wood fire, a social and culinary ritual." },
      { title: "Feria de San Telmo", category: "Festivals", description: "Weekly antique market and street fair with tango performers, artisans, and traditional food.", celebrationDate: "Every Sunday" },
    ]
  },
  {
    id: "seoul", name: "Seoul", country: "South Korea", region: "East Asia", continent: "Asia",
    image: "kyoto", lat: 37.5665, lng: 126.978, population: "9.7 million",
    languages: ["Korean"],
    touristPlaces: ["Gyeongbokgung Palace", "N Seoul Tower", "Bukchon Hanok Village", "Myeongdong"],
    famousFood: ["Kimchi", "Bibimbap", "Korean BBQ", "Tteokbokki", "Bulgogi"],
    cultures: [
      { title: "Chuseok Harvest Festival", category: "Festivals", description: "Korean Thanksgiving with ancestral rites (charye), songpyeon rice cakes, and family reunions.", celebrationDate: "September/October" },
      { title: "Hanbok Traditional Dress", category: "Clothing & Textiles", description: "Elegant Korean traditional clothing with vibrant colors and flowing lines, worn during festivals and ceremonies." },
      { title: "K-Pop & Hallyu Wave", category: "Songs & Music", description: "Modern Korean cultural export combining traditional aesthetics with contemporary performance art and global influence." },
      { title: "Korean Temple Stay", category: "Rituals & Ceremonies", description: "Buddhist temple programs offering meditation, tea ceremony, and communal living experiences." },
    ]
  },
  {
    id: "havana", name: "Havana", country: "Cuba", region: "Caribbean", continent: "North America",
    image: "cusco", lat: 23.1136, lng: -82.3666, population: "2.1 million",
    languages: ["Spanish"],
    touristPlaces: ["Old Havana", "Malecón", "El Capitolio", "Plaza de la Revolución"],
    famousFood: ["Ropa Vieja", "Cuban Sandwich", "Mojito", "Arroz con Pollo"],
    cultures: [
      { title: "Son Cubano Music", category: "Songs & Music", description: "Foundation of salsa music blending Spanish guitar with African rhythms, drums, and call-and-response singing." },
      { title: "Santería Rituals", category: "Rituals & Ceremonies", description: "Afro-Cuban religion blending Yoruba orishas with Catholic saints, featuring drumming, dance, and offerings." },
      { title: "Cuban Cigar Rolling", category: "Craft Techniques", description: "Art of hand-rolling premium cigars (torcedores), a tradition requiring years of apprenticeship and expertise." },
      { title: "Rumba Dance", category: "Dance Forms", description: "Afro-Cuban dance tradition with guaguancó, yambú, and columbia styles expressing community spirit." },
    ]
  },
  {
    id: "kathmandu", name: "Kathmandu", country: "Nepal", region: "South Asia", continent: "Asia",
    image: "delhi", lat: 27.7172, lng: 85.324, population: "1.5 million",
    languages: ["Nepali", "Newari", "English"],
    touristPlaces: ["Swayambhunath", "Boudhanath", "Pashupatinath", "Durbar Square", "Thamel"],
    famousFood: ["Momo", "Dal Bhat", "Sel Roti", "Chatamari"],
    cultures: [
      { title: "Dashain Festival", category: "Festivals", description: "Nepal's biggest festival celebrating goddess Durga's victory, with family reunions, kite flying, and animal offerings.", religion: "Hinduism", celebrationDate: "October" },
      { title: "Newari Architecture", category: "Architecture", description: "Distinctive pagoda-style temples with intricately carved wooden windows and doors in Kathmandu Valley." },
      { title: "Living Goddess (Kumari)", category: "Rituals & Ceremonies", description: "Ancient tradition of selecting a young girl as incarnation of goddess Taleju, worshipped in Kumari Ghar." },
      { title: "Thangka Painting", category: "Craft Techniques", description: "Buddhist scroll paintings depicting deities, mandalas, and spiritual scenes using mineral pigments and gold." },
    ]
  },
  {
    id: "lisbon", name: "Lisbon", country: "Portugal", region: "Europe", continent: "Europe",
    image: "rome", lat: 38.7223, lng: -9.1393, population: "2.9 million",
    languages: ["Portuguese"],
    touristPlaces: ["Belém Tower", "Jerónimos Monastery", "Alfama", "Praça do Comércio"],
    famousFood: ["Pastel de Nata", "Bacalhau", "Sardines", "Caldo Verde"],
    cultures: [
      { title: "Fado Music", category: "Songs & Music", description: "UNESCO-recognized Portuguese music genre expressing saudade (longing) with guitar accompaniment in intimate venues." },
      { title: "Azulejo Tile Art", category: "Craft Techniques", description: "Distinctive blue-and-white ceramic tile tradition adorning buildings, churches, and train stations since the 15th century." },
      { title: "Santos Populares", category: "Festivals", description: "June festivals honoring saints with grilled sardines, colorful decorations, and street dancing in Alfama.", celebrationDate: "June" },
    ]
  },
  {
    id: "amsterdam", name: "Amsterdam", country: "Netherlands", region: "Europe", continent: "Europe",
    image: "rome", lat: 52.3676, lng: 4.9041, population: "1.2 million",
    languages: ["Dutch", "English"],
    touristPlaces: ["Anne Frank House", "Rijksmuseum", "Van Gogh Museum", "Vondelpark", "Canal Ring"],
    famousFood: ["Stroopwafel", "Bitterballen", "Herring", "Poffertjes"],
    cultures: [
      { title: "Dutch Master Painting", category: "Architecture", description: "Golden Age artistic tradition of Rembrandt, Vermeer, and Van Gogh that revolutionized European art." },
      { title: "King's Day (Koningsdag)", category: "Festivals", description: "National celebration on April 27 with orange-clad crowds, canal boat parties, and city-wide flea markets.", celebrationDate: "April 27" },
      { title: "Dutch Cycling Culture", category: "Indigenous Knowledge", description: "Deeply embedded transportation and lifestyle tradition with more bicycles than people, shaping urban design." },
    ]
  },
  {
    id: "lhasa", name: "Lhasa", country: "China", region: "East Asia", continent: "Asia",
    image: "kyoto", lat: 29.652, lng: 91.1721, population: "900,000",
    languages: ["Tibetan", "Mandarin"],
    touristPlaces: ["Potala Palace", "Jokhang Temple", "Barkhor Street", "Sera Monastery"],
    famousFood: ["Tsampa", "Yak Butter Tea", "Momo", "Thukpa"],
    cultures: [
      { title: "Tibetan Buddhism", category: "Rituals & Ceremonies", description: "Monastic traditions of meditation, prayer wheels, mantra chanting, and sand mandala creation." },
      { title: "Saga Dawa Festival", category: "Festivals", description: "Most sacred Buddhist month celebrating Buddha's birth, enlightenment, and death with pilgrimages and acts of virtue.", celebrationDate: "May/June" },
      { title: "Thangka & Sand Mandala Art", category: "Craft Techniques", description: "Sacred Buddhist art forms: scroll paintings and intricate sand mandalas created and ritually destroyed." },
      { title: "Tibetan Opera (Lhamo)", category: "Dance Forms", description: "Combination of dance, chant, and song telling Buddhist moral tales, performed in open-air venues." },
    ]
  },
  {
    id: "jerusalem", name: "Jerusalem", country: "Israel", region: "Middle East", continent: "Asia",
    image: "istanbul", lat: 31.7683, lng: 35.2137, population: "950,000",
    languages: ["Hebrew", "Arabic", "English"],
    touristPlaces: ["Western Wall", "Church of the Holy Sepulchre", "Dome of the Rock", "Via Dolorosa", "Old City"],
    famousFood: ["Falafel", "Hummus", "Shawarma", "Knafeh", "Shakshuka"],
    cultures: [
      { title: "Shabbat Observance", category: "Rituals & Ceremonies", description: "Weekly Jewish day of rest from Friday sunset to Saturday night with candle lighting, prayers, and family meals.", religion: "Judaism" },
      { title: "Easter Holy Week", category: "Festivals", description: "Christian pilgrims walk the Via Dolorosa, attend services at Holy Sepulchre, celebrating resurrection.", religion: "Christianity", celebrationDate: "April" },
      { title: "Ramadan in Al-Aqsa", category: "Festivals", description: "Muslims gather for special prayers and Iftar meals at Al-Aqsa Mosque during the holy month.", religion: "Islam" },
      { title: "Old City Heritage", category: "Architecture", description: "4,000 years of layered architecture spanning Jewish, Christian, Muslim, and Armenian quarters." },
    ]
  },
  {
    id: "petra-jordan", name: "Petra", country: "Jordan", region: "Middle East", continent: "Asia",
    image: "istanbul", lat: 30.3285, lng: 35.4444, population: "30,000",
    languages: ["Arabic"],
    touristPlaces: ["The Treasury", "The Monastery", "Siq Canyon", "Royal Tombs"],
    cultures: [
      { title: "Nabataean Rock Architecture", category: "Architecture", description: "Ancient city carved into rose-red cliffs by the Nabataeans 2,000+ years ago, showcasing hydraulic engineering mastery." },
      { title: "Bedouin Hospitality", category: "Rituals & Ceremonies", description: "Desert hospitality traditions of tea preparation, storytelling around campfires, and communal generosity." },
      { title: "Bedouin Music & Poetry", category: "Folk Stories", description: "Oral poetry tradition (nabati) preserving desert wisdom, genealogies, and love stories through rhythmic verse." },
    ]
  },
  {
    id: "fez", name: "Fez", country: "Morocco", region: "Africa", continent: "Africa",
    image: "marrakech", lat: 34.0181, lng: -5.0078, population: "1.2 million",
    languages: ["Arabic", "French", "Berber"],
    touristPlaces: ["Fez el Bali Medina", "Al-Qarawiyyin University", "Chouara Tannery", "Bou Inania Madrasa"],
    famousFood: ["Pastilla", "Rfissa", "Harira", "Mint Tea"],
    cultures: [
      { title: "World's Oldest University", category: "Architecture", description: "Al-Qarawiyyin, founded in 859 AD, is the world's oldest continuously operating university, center of Islamic scholarship." },
      { title: "Leather Tanning (Chouara)", category: "Craft Techniques", description: "Medieval tanning process using pigeon droppings, cow urine, and natural dyes in ancient stone vats — unchanged for centuries." },
      { title: "Andalusian Music", category: "Songs & Music", description: "Classical Moorish music tradition preserved since the expulsion from Spain, featuring lute, rebab, and choir." },
    ]
  },
  {
    id: "bali", name: "Bali", country: "Indonesia", region: "Southeast Asia", continent: "Asia",
    image: "kyoto", lat: -8.3405, lng: 115.092, population: "4.3 million",
    languages: ["Indonesian", "Balinese"],
    touristPlaces: ["Uluwatu Temple", "Tegallalang Rice Terraces", "Ubud Monkey Forest", "Tanah Lot"],
    famousFood: ["Nasi Goreng", "Babi Guling", "Satay Lilit", "Lawar"],
    beaches: ["Kuta Beach", "Seminyak", "Nusa Dua"],
    cultures: [
      { title: "Nyepi (Day of Silence)", category: "Festivals", description: "Balinese New Year — entire island shuts down: no lights, no travel, no work. Preceded by spectacular Ogoh-Ogoh monster parades.", celebrationDate: "March" },
      { title: "Kecak Fire Dance", category: "Dance Forms", description: "Mesmerizing chanting dance performed by 100+ men at sunset, depicting the Ramayana without musical instruments." },
      { title: "Balinese Temple Ceremonies", category: "Rituals & Ceremonies", description: "Daily offerings (canang sari), elaborate temple festivals (odalan), and water purification rituals.", religion: "Hinduism" },
      { title: "Balinese Wood Carving", category: "Craft Techniques", description: "Intricate carvings of mythological figures, masks, and decorative panels using traditional tools and local wood." },
    ]
  },
  {
    id: "chiang-mai", name: "Chiang Mai", country: "Thailand", region: "Southeast Asia", continent: "Asia",
    image: "kyoto", lat: 18.7061, lng: 98.9817, population: "1.2 million",
    languages: ["Thai", "Northern Thai"],
    touristPlaces: ["Doi Suthep", "Old City Temples", "Night Bazaar", "Elephant Nature Park"],
    famousFood: ["Khao Soi", "Sai Oua", "Sticky Rice", "Mango Sticky Rice"],
    cultures: [
      { title: "Yi Peng Lantern Festival", category: "Festivals", description: "Thousands of sky lanterns released simultaneously creating a magical floating light display.", celebrationDate: "November" },
      { title: "Lanna Kingdom Heritage", category: "Architecture", description: "Distinctive Northern Thai temple architecture with multi-tiered roofs, teak wood carvings, and Burmese influences." },
      { title: "Umbrella Making (Bo Sang)", category: "Craft Techniques", description: "Traditional handmade paper umbrellas and fans painted with floral designs, a 200-year-old village tradition." },
    ]
  },
  {
    id: "cape-town", name: "Cape Town", country: "South Africa", region: "Africa", continent: "Africa",
    image: "marrakech", lat: -33.9249, lng: 18.4241, population: "4.7 million",
    languages: ["Afrikaans", "English", "Xhosa"],
    touristPlaces: ["Table Mountain", "Robben Island", "V&A Waterfront", "Cape of Good Hope", "Kirstenbosch"],
    famousFood: ["Bobotie", "Biltong", "Braai", "Boerewors", "Koeksister"],
    beaches: ["Camps Bay", "Muizenberg", "Clifton"],
    cultures: [
      { title: "Cape Malay Bo-Kaap Culture", category: "Cuisine", description: "Colorful Bo-Kaap neighborhood with Cape Malay cuisine blending Indonesian, African, and Dutch cooking traditions." },
      { title: "Xhosa Initiation Rituals", category: "Rituals & Ceremonies", description: "Coming-of-age ceremonies marking transition to manhood with traditional practices and community celebration." },
      { title: "Ghoema Music & Cape Jazz", category: "Songs & Music", description: "Distinctive Cape Town music blending traditional ghoema drum rhythms with modern jazz influences." },
      { title: "Cape Winelands Heritage", category: "Indigenous Knowledge", description: "350-year-old wine-making tradition in Stellenbosch and Franschhoek valleys, blending Dutch and French techniques." },
    ]
  },
  {
    id: "vienna", name: "Vienna", country: "Austria", region: "Europe", continent: "Europe",
    image: "rome", lat: 48.2082, lng: 16.3738, population: "1.9 million",
    languages: ["German"],
    touristPlaces: ["Schönbrunn Palace", "St. Stephen's Cathedral", "Belvedere", "Vienna State Opera"],
    famousFood: ["Wiener Schnitzel", "Sachertorte", "Apfelstrudel", "Tafelspitz"],
    cultures: [
      { title: "Viennese Waltz", category: "Dance Forms", description: "Elegant ballroom dance tradition from the Habsburg era, still celebrated at over 450 annual balls." },
      { title: "Classical Music Capital", category: "Songs & Music", description: "Home of Mozart, Beethoven, Strauss — the Vienna Philharmonic and State Opera maintain this unmatched legacy." },
      { title: "Coffee House Culture", category: "Cuisine", description: "UNESCO-listed tradition of Viennese coffee houses as 'urban living rooms' for intellectual discourse and leisure." },
    ]
  },
  {
    id: "istanbul-ephesus", name: "Ephesus", country: "Turkey", region: "Middle East", continent: "Asia",
    image: "istanbul", lat: 37.9394, lng: 27.3417, population: "40,000",
    languages: ["Turkish"],
    touristPlaces: ["Library of Celsus", "Great Theatre", "Temple of Artemis", "House of Virgin Mary"],
    cultures: [
      { title: "Ancient Greek-Roman Heritage", category: "Architecture", description: "One of the best-preserved ancient cities with the Library of Celsus, one of the Seven Wonders of the Ancient World (Temple of Artemis)." },
      { title: "Early Christian Heritage", category: "Oral Histories", description: "Site of one of the Seven Churches of Revelation, where St. Paul preached and the Gospel of John may have been written." },
    ]
  },
  {
    id: "bogota", name: "Bogotá", country: "Colombia", region: "South America", continent: "South America",
    image: "cusco", lat: 4.711, lng: -74.0721, population: "11 million",
    languages: ["Spanish"],
    touristPlaces: ["La Candelaria", "Monserrate", "Gold Museum", "Botero Museum"],
    famousFood: ["Bandeja Paisa", "Arepas", "Ajiaco", "Empanadas"],
    cultures: [
      { title: "Colombian Carnival of Barranquilla", category: "Festivals", description: "UNESCO-recognized carnival with cumbia dancing, marimonda masks, and cultural parades.", celebrationDate: "February" },
      { title: "Pre-Columbian Gold Work", category: "Craft Techniques", description: "Museo del Oro displays 55,000+ gold artifacts from Muisca, Quimbaya, and other civilizations." },
      { title: "Cumbia & Vallenato Music", category: "Songs & Music", description: "African, indigenous, and Spanish musical fusion, with vallenato accordion storytelling tradition." },
    ]
  },
  {
    id: "siem-reap", name: "Siem Reap", country: "Cambodia", region: "Southeast Asia", continent: "Asia",
    image: "kyoto", lat: 13.3671, lng: 103.8448, population: "250,000",
    languages: ["Khmer", "English"],
    touristPlaces: ["Angkor Wat", "Angkor Thom", "Ta Prohm", "Bayon Temple"],
    famousFood: ["Fish Amok", "Lok Lak", "Nom Banh Chok", "Fried Tarantula"],
    cultures: [
      { title: "Angkor Wat Temple Complex", category: "Architecture", description: "World's largest religious monument, built in 12th century as Hindu temple, later converted to Buddhist, with extraordinary bas-reliefs." },
      { title: "Apsara Dance", category: "Dance Forms", description: "Graceful Khmer classical dance depicting celestial beings (apsaras), with elaborate costumes and slow, precise movements." },
      { title: "Khmer Silk Weaving", category: "Craft Techniques", description: "Traditional ikat silk weaving using natural dyes and patterns representing Cambodian mythology and nature." },
    ]
  },
  {
    id: "medina", name: "Medina", country: "Saudi Arabia", region: "Middle East", continent: "Asia",
    image: "istanbul", lat: 24.4539, lng: 39.6142, population: "1.4 million",
    languages: ["Arabic"],
    touristPlaces: ["Al-Masjid an-Nabawi", "Quba Mosque", "Mount Uhud", "Qiblatain Mosque"],
    cultures: [
      { title: "Prophet's Mosque Heritage", category: "Architecture", description: "One of Islam's holiest sites, expanded across centuries while preserving the original mosque's spiritual essence." },
      { title: "Hajj & Umrah Traditions", category: "Rituals & Ceremonies", description: "Millions of pilgrims visit annually following rituals established 1,400 years ago, unifying Muslims worldwide.", religion: "Islam" },
      { title: "Arabic Hospitality (Diyafa)", category: "Folk Stories", description: "Sacred tradition of welcoming guests with dates, Arabic coffee, and generous meals, rooted in Bedouin culture." },
    ]
  },
  {
    id: "zanzibar", name: "Zanzibar", country: "Tanzania", region: "Africa", continent: "Africa",
    image: "marrakech", lat: -6.1659, lng: 39.1991, population: "900,000",
    languages: ["Swahili", "Arabic", "English"],
    touristPlaces: ["Stone Town", "Prison Island", "Spice Farms", "Jozani Forest"],
    famousFood: ["Zanzibar Pizza", "Urojo Soup", "Biryani", "Spiced Seafood"],
    beaches: ["Nungwi Beach", "Kendwa Beach", "Paje Beach"],
    cultures: [
      { title: "Spice Trade Heritage", category: "Indigenous Knowledge", description: "Centuries as the 'Spice Island' — clove, nutmeg, cinnamon farms preserving cultivation techniques from Omani traders." },
      { title: "Stone Town Architecture", category: "Architecture", description: "UNESCO World Heritage maze of narrow streets with carved wooden doors reflecting Swahili, Arab, and Indian influences." },
      { title: "Taarab Music", category: "Songs & Music", description: "Zanzibar's signature music blending Arabic melodies, Indian instruments, and African rhythms, performed at weddings." },
    ]
  },
  {
    id: "udaipur", name: "Udaipur", country: "India", region: "South Asia", continent: "Asia",
    image: "delhi", lat: 24.5854, lng: 73.7125, population: "600,000",
    languages: ["Hindi", "Mewari", "English"],
    touristPlaces: ["City Palace", "Lake Pichola", "Jag Mandir", "Saheliyon-ki-Bari"],
    famousFood: ["Dal Baati Churma", "Gatte ki Sabzi", "Kachori"],
    cultures: [
      { title: "Mewar Painting Tradition", category: "Craft Techniques", description: "Distinctive Rajasthani miniature painting style depicting court life, festivals, and nature with vibrant pigments." },
      { title: "Gangaur Festival", category: "Festivals", description: "Women worship goddess Gauri with decorated clay idols, processions through old city, and traditional songs.", religion: "Hinduism", celebrationDate: "March/April" },
      { title: "Lake Palace Heritage", category: "Architecture", description: "Floating marble palace on Lake Pichola built in 1746, epitomizing Rajput romantic architectural vision." },
    ]
  },
  {
    id: "edinburgh", name: "Edinburgh", country: "United Kingdom", region: "Europe", continent: "Europe",
    image: "rome", lat: 55.9533, lng: -3.1883, population: "540,000",
    languages: ["English", "Scots", "Scottish Gaelic"],
    touristPlaces: ["Edinburgh Castle", "Royal Mile", "Arthur's Seat", "Holyrood Palace"],
    famousFood: ["Haggis", "Scotch Whisky", "Shortbread", "Cullen Skink"],
    cultures: [
      { title: "Edinburgh Festival Fringe", category: "Festivals", description: "World's largest arts festival with thousands of performers across comedy, theatre, music, and dance.", celebrationDate: "August" },
      { title: "Scottish Highland Games", category: "Dance Forms", description: "Traditional sporting events with caber toss, Highland dancing, and bagpipe competitions celebrating Celtic heritage." },
      { title: "Scotch Whisky Tradition", category: "Cuisine", description: "Centuries-old distillation traditions with strict aging requirements, regional flavor profiles, and master blenders." },
    ]
  },
  {
    id: "cartagena", name: "Cartagena", country: "Colombia", region: "South America", continent: "South America",
    image: "cusco", lat: 10.3932, lng: -75.5322, population: "1.1 million",
    languages: ["Spanish"],
    touristPlaces: ["Walled City", "Castillo San Felipe", "Rosario Islands", "Getsemaní"],
    famousFood: ["Ceviche", "Arepas de Huevo", "Coconut Rice", "Fried Fish"],
    beaches: ["Playa Blanca", "Bocagrande"],
    cultures: [
      { title: "Spanish Colonial Architecture", category: "Architecture", description: "UNESCO-listed walled city with colorful balconied houses, churches, and fortifications from the 16th century." },
      { title: "Champeta Music", category: "Songs & Music", description: "Afro-Colombian music blending African rhythms with Caribbean beats, born in Cartagena's Afro-descendant communities." },
      { title: "Palenque Heritage", category: "Indigenous Knowledge", description: "San Basilio de Palenque, first free African town in the Americas, preserving Afro-Colombian language and traditions." },
    ]
  },
  {
    id: "auckland", name: "Auckland", country: "New Zealand", region: "Oceania", continent: "Oceania",
    image: "rome", lat: -36.8485, lng: 174.7633, population: "1.7 million",
    languages: ["English", "Māori"],
    touristPlaces: ["Sky Tower", "Rangitoto Island", "Auckland War Memorial Museum", "Waiheke Island"],
    famousFood: ["Pavlova", "Hangi", "Meat Pie", "Feijoa"],
    cultures: [
      { title: "Māori Haka", category: "Dance Forms", description: "Powerful ceremonial war dance with rhythmic body movements, stomping, chest beating, and chanting." },
      { title: "Māori Tā Moko", category: "Craft Techniques", description: "Sacred facial tattoo tradition carrying genealogical information, social status, and tribal identity." },
      { title: "Matariki (Māori New Year)", category: "Festivals", description: "Celebration of the Pleiades star cluster's rise, marking new beginnings with feasting and remembrance.", celebrationDate: "June/July" },
    ]
  },
  {
    id: "berlin", name: "Berlin", country: "Germany", region: "Europe", continent: "Europe",
    image: "rome", lat: 52.52, lng: 13.405, population: "3.6 million",
    languages: ["German"],
    touristPlaces: ["Brandenburg Gate", "Berlin Wall Memorial", "Museum Island", "Reichstag"],
    famousFood: ["Currywurst", "Döner Kebab", "Berliner Pfannkuchen", "Pretzel"],
    cultures: [
      { title: "Berlin Techno Culture", category: "Songs & Music", description: "Post-reunification electronic music scene in abandoned warehouses, shaping global club culture." },
      { title: "Oktoberfest Traditions", category: "Festivals", description: "Bavarian beer festival tradition with lederhosen, dirndls, brass bands, and centuries of brewing heritage.", celebrationDate: "September/October" },
      { title: "Bauhaus Design Heritage", category: "Architecture", description: "Revolutionary 1919 art school merging crafts and fine arts, fundamentally reshaping modern design and architecture." },
    ]
  },
  {
    id: "colombo", name: "Colombo", country: "Sri Lanka", region: "South Asia", continent: "Asia",
    image: "delhi", lat: 6.9271, lng: 79.8612, population: "5.6 million",
    languages: ["Sinhala", "Tamil", "English"],
    touristPlaces: ["Temple of the Sacred Tooth", "Sigiriya", "Galle Fort", "Yala National Park"],
    famousFood: ["Rice and Curry", "Hoppers", "Kottu Roti", "Sri Lankan Tea"],
    beaches: ["Unawatuna", "Mirissa", "Bentota"],
    cultures: [
      { title: "Kandy Perahera", category: "Festivals", description: "Grand Buddhist procession with decorated elephants, fire dancers, and drummers honoring the Sacred Tooth Relic.", celebrationDate: "July/August" },
      { title: "Ceylon Tea Heritage", category: "Indigenous Knowledge", description: "150-year tea plantation tradition in hill country, producing world-renowned Ceylon tea with distinctive flavor." },
      { title: "Kandyan Dance", category: "Dance Forms", description: "Energetic traditional dance with elaborate costumes, acrobatic movements, and rhythmic drumming." },
    ]
  },
  {
    id: "lima", name: "Lima", country: "Peru", region: "South America", continent: "South America",
    image: "cusco", lat: -12.0464, lng: -77.0428, population: "10.7 million",
    languages: ["Spanish", "Quechua"],
    touristPlaces: ["Historic Centre", "Miraflores", "Huaca Pucllana", "Larco Museum"],
    famousFood: ["Ceviche", "Lomo Saltado", "Anticuchos", "Causa", "Pisco Sour"],
    cultures: [
      { title: "Peruvian Gastronomy", category: "Cuisine", description: "World-renowned cuisine blending Incan, Spanish, African, Chinese, and Japanese influences — Lima is the 'Gastronomic Capital of the Americas'." },
      { title: "Señor de los Milagros", category: "Festivals", description: "Largest Catholic procession in South America honoring the Lord of Miracles with purple-clad devotees.", religion: "Christianity", celebrationDate: "October" },
      { title: "Pisco Sour Tradition", category: "Cuisine", description: "National cocktail with a contested origin story, using pisco brandy, lime, egg white, and bitters." },
    ]
  },
  {
    id: "kuala-lumpur", name: "Kuala Lumpur", country: "Malaysia", region: "Southeast Asia", continent: "Asia",
    image: "kyoto", lat: 3.139, lng: 101.6869, population: "7.8 million",
    languages: ["Malay", "English", "Chinese", "Tamil"],
    touristPlaces: ["Petronas Towers", "Batu Caves", "KL Tower", "Merdeka Square"],
    famousFood: ["Nasi Lemak", "Satay", "Roti Canai", "Char Kway Teow"],
    cultures: [
      { title: "Thaipusam at Batu Caves", category: "Rituals & Ceremonies", description: "Hindu festival of devotion with spectacular kavadi (burden) carrying and body piercing at sacred limestone caves.", religion: "Hinduism", celebrationDate: "January/February" },
      { title: "Malaysian Batik", category: "Craft Techniques", description: "Wax-resist dyeing technique creating vibrant floral and geometric patterns on silk and cotton fabric." },
      { title: "Hari Raya Aidilfitri", category: "Festivals", description: "End of Ramadan celebrations with open houses, traditional cookies, and multi-ethnic community gatherings.", religion: "Islam" },
    ]
  },
  {
    id: "kraków", name: "Kraków", country: "Poland", region: "Europe", continent: "Europe",
    image: "rome", lat: 50.0647, lng: 19.945, population: "780,000",
    languages: ["Polish"],
    touristPlaces: ["Wawel Castle", "Main Market Square", "St. Mary's Basilica", "Wieliczka Salt Mine"],
    famousFood: ["Pierogi", "Obwarzanek", "Żurek", "Oscypek"],
    cultures: [
      { title: "Hejnał Mariacki (Trumpet Call)", category: "Songs & Music", description: "Hourly trumpet signal from St. Mary's tower, commemorating a 13th-century watchman who warned of Mongol invasion." },
      { title: "Szopka (Christmas Cribs)", category: "Craft Techniques", description: "UNESCO-listed tradition of building elaborate miniature architectural nativity scenes reflecting Kraków's monuments." },
      { title: "Lajkonik Festival", category: "Festivals", description: "Costumed horseman (Tatar warrior) parades through old town, touching spectators with a mace for good luck.", celebrationDate: "June" },
    ]
  },
  {
    id: "osaka", name: "Osaka", country: "Japan", region: "East Asia", continent: "Asia",
    image: "kyoto", lat: 34.6937, lng: 135.5023, population: "19 million",
    languages: ["Japanese"],
    touristPlaces: ["Osaka Castle", "Dotonbori", "Shinsekai", "Universal Studios Japan"],
    famousFood: ["Takoyaki", "Okonomiyaki", "Kushikatsu", "Ramen"],
    cultures: [
      { title: "Bunraku Puppet Theatre", category: "Folk Stories", description: "UNESCO-recognized traditional puppet theatre with near-life-size puppets, narrative chanting, and shamisen music." },
      { title: "Tenjin Matsuri", category: "Festivals", description: "One of Japan's top three festivals with river boat procession, fireworks, and 1,000-year-old shrine rituals.", celebrationDate: "July 24-25" },
      { title: "Osaka Street Food Culture", category: "Cuisine", description: "Known as 'Japan's Kitchen' (kuidaore), with street food traditions of takoyaki and okonomiyaki perfected over centuries." },
    ]
  },
  {
    id: "accra", name: "Accra", country: "Ghana", region: "Africa", continent: "Africa",
    image: "marrakech", lat: 5.6037, lng: -0.187, population: "4.2 million",
    languages: ["English", "Twi", "Ga"],
    touristPlaces: ["Kwame Nkrumah Mausoleum", "Jamestown", "Labadi Beach", "Cape Coast Castle"],
    famousFood: ["Jollof Rice", "Banku", "Fufu", "Kelewele"],
    cultures: [
      { title: "Homowo Festival", category: "Festivals", description: "Ga people's harvest festival mocking hunger, with kpokpoi (corn meal) sprinkled through streets and traditional dance.", celebrationDate: "August" },
      { title: "Kente Cloth Weaving", category: "Craft Techniques", description: "Ashanti tradition of weaving vibrant, symbolic cloth on narrow looms; each pattern carries specific meaning and history." },
      { title: "Highlife Music", category: "Songs & Music", description: "Ghana's iconic genre blending traditional melodies with Western instruments, foundational to modern African popular music." },
      { title: "Fantasy Coffin Art", category: "Craft Techniques", description: "Ga people's tradition of elaborate custom coffins shaped as cars, animals, or objects reflecting the deceased's life." },
    ]
  },
  {
    id: "reykjavik", name: "Reykjavík", country: "Iceland", region: "Europe", continent: "Europe",
    image: "rome", lat: 64.1466, lng: -21.9426, population: "130,000",
    languages: ["Icelandic"],
    touristPlaces: ["Hallgrímskirkja", "Blue Lagoon", "Golden Circle", "Northern Lights"],
    famousFood: ["Hákarl (Fermented Shark)", "Skyr", "Lamb Soup", "Hot Dogs"],
    cultures: [
      { title: "Saga Literature", category: "Folk Stories", description: "Medieval Icelandic sagas preserving Norse history, mythology, and genealogies — foundational European literary tradition." },
      { title: "Þorrablót Winter Festival", category: "Festivals", description: "Mid-winter feast with traditional foods (hákarl, svið), celebrating Old Norse heritage and enduring Icelandic spirit.", celebrationDate: "January/February" },
      { title: "Geothermal Bathing Culture", category: "Traditional Medicine", description: "Centuries-old tradition of communal hot spring bathing, integral to Icelandic social life and wellness." },
    ]
  },
  {
    id: "agra", name: "Agra", country: "India", region: "South Asia", continent: "Asia",
    image: "delhi", lat: 27.1767, lng: 78.0081, population: "2.1 million",
    languages: ["Hindi", "Urdu"],
    touristPlaces: ["Taj Mahal", "Agra Fort", "Fatehpur Sikri", "Itimad-ud-Daulah"],
    famousFood: ["Petha", "Mughlai Paratha", "Bedai", "Dal Moth"],
    cultures: [
      { title: "Taj Mahal Heritage", category: "Architecture", description: "Shah Jahan's monument of love, a pinnacle of Mughal architecture with marble inlay, calligraphy, and perfect symmetry." },
      { title: "Marble Inlay (Pietra Dura)", category: "Craft Techniques", description: "Centuries-old art of embedding semi-precious stones into marble, perfected by artisans who built the Taj Mahal." },
      { title: "Mughal Garden Design", category: "Architecture", description: "Charbagh (four-part) garden design symbolizing paradise, with water channels, walkways, and geometric planting." },
    ]
  },
  {
    id: "manila", name: "Manila", country: "Philippines", region: "Southeast Asia", continent: "Asia",
    image: "kyoto", lat: 14.5995, lng: 120.9842, population: "14 million",
    languages: ["Filipino", "English"],
    touristPlaces: ["Intramuros", "San Agustin Church", "Rizal Park", "Manila Ocean Park"],
    famousFood: ["Adobo", "Lechon", "Sinigang", "Halo-Halo", "Lumpia"],
    cultures: [
      { title: "Sinulog Festival", category: "Festivals", description: "Grand festival honoring Santo Niño with street dancing in colorful costumes, drums, and religious processions.", celebrationDate: "January" },
      { title: "Jeepney Art", category: "Craft Techniques", description: "Colorfully decorated public buses converted from WWII jeeps, mobile art galleries reflecting Filipino creativity." },
      { title: "Filipino Karaoke Culture", category: "Songs & Music", description: "Deep cultural tradition of communal singing connecting families and communities — Philippines as karaoke capital of the world." },
    ]
  },
  {
    id: "venice", name: "Venice", country: "Italy", region: "Europe", continent: "Europe",
    image: "rome", lat: 45.4408, lng: 12.3155, population: "260,000",
    languages: ["Italian", "Venetian"],
    touristPlaces: ["St. Mark's Basilica", "Rialto Bridge", "Grand Canal", "Doge's Palace"],
    famousFood: ["Risotto al Nero di Seppia", "Cicchetti", "Fegato alla Veneziana", "Tiramisu"],
    cultures: [
      { title: "Carnival of Venice", category: "Festivals", description: "700-year-old tradition of elaborate masks and costumes, masquerade balls, and theatrical performances.", celebrationDate: "February" },
      { title: "Murano Glass Making", category: "Craft Techniques", description: "800-year tradition of blown glass artistry on Murano island, with techniques guarded as state secrets." },
      { title: "Gondola Tradition", category: "Indigenous Knowledge", description: "Centuries-old craft of building asymmetric black gondolas and the singing gondolier tradition of navigating canals." },
    ]
  },
  {
    id: "dakar", name: "Dakar", country: "Senegal", region: "Africa", continent: "Africa",
    image: "marrakech", lat: 14.7167, lng: -17.4677, population: "3.1 million",
    languages: ["French", "Wolof"],
    touristPlaces: ["Gorée Island", "African Renaissance Monument", "Pink Lake", "IFAN Museum"],
    famousFood: ["Thieboudienne", "Yassa", "Mafé", "Bissap"],
    cultures: [
      { title: "Sabar Drumming & Dance", category: "Dance Forms", description: "Wolof percussion tradition with complex polyrhythmic drumming and athletic dance at community celebrations." },
      { title: "Teranga Hospitality", category: "Rituals & Ceremonies", description: "Senegalese culture of radical hospitality — sharing meals with strangers, welcoming guests as family." },
      { title: "Gorée Island Heritage", category: "Oral Histories", description: "UNESCO site preserving the memory of the Atlantic slave trade, with the House of Slaves as powerful memorial." },
    ]
  },
  {
    id: "tallinn", name: "Tallinn", country: "Estonia", region: "Europe", continent: "Europe",
    image: "rome", lat: 59.437, lng: 24.7536, population: "450,000",
    languages: ["Estonian"],
    touristPlaces: ["Toompea Castle", "Alexander Nevsky Cathedral", "Old Town", "Kadriorg Palace"],
    famousFood: ["Black Bread", "Verivorst", "Kama", "Mulgipuder"],
    cultures: [
      { title: "Estonian Song Festival", category: "Festivals", description: "Massive choral event with 30,000+ singers uniting the nation — central to Estonia's identity and 'Singing Revolution'.", celebrationDate: "Every 5 years" },
      { title: "Seto Leelo (Polyphonic Singing)", category: "Songs & Music", description: "UNESCO-recognized ancient polyphonic singing tradition of the Seto people, one of Europe's oldest vocal forms." },
      { title: "Sauna Culture", category: "Traditional Medicine", description: "Estonian smoke sauna tradition involving heating, sweating, and birch branch vihta massage for purification." },
    ]
  },
  {
    id: "tashkent", name: "Tashkent", country: "Uzbekistan", region: "Central Asia", continent: "Asia",
    image: "istanbul", lat: 41.2995, lng: 69.2401, population: "2.6 million",
    languages: ["Uzbek", "Russian"],
    touristPlaces: ["Registan Square (Samarkand)", "Chorsu Bazaar", "Khast-Imam Complex", "Amir Timur Square"],
    famousFood: ["Plov", "Samsa", "Shashlik", "Lagman", "Non Bread"],
    cultures: [
      { title: "Silk Road Heritage", category: "Architecture", description: "Samarkand's Registan Square with turquoise-tiled madrasas represents the pinnacle of Islamic architecture on the Silk Road." },
      { title: "Suzani Embroidery", category: "Craft Techniques", description: "Elaborate silk embroidery with cosmic garden motifs, traditionally created by brides as part of their dowry." },
      { title: "Navruz (New Year)", category: "Festivals", description: "Spring equinox celebration with sumalak preparation (wheat germ pudding), music, and communal feasting.", celebrationDate: "March 21" },
      { title: "Maqom Music", category: "Songs & Music", description: "UNESCO-recognized classical music tradition of Central Asia with complex melodic modes and poetic texts." },
    ]
  },
  {
    id: "guadalajara", name: "Guadalajara", country: "Mexico", region: "North America", continent: "North America",
    image: "cusco", lat: 20.6597, lng: -103.3496, population: "5.3 million",
    languages: ["Spanish"],
    touristPlaces: ["Hospicio Cabañas", "Tlaquepaque", "Guadalajara Cathedral", "Barranca de Huentitán"],
    famousFood: ["Birria", "Torta Ahogada", "Tequila", "Tejuino"],
    cultures: [
      { title: "Mariachi Birthplace", category: "Songs & Music", description: "Guadalajara as the origin city of mariachi music, with Plaza de los Mariachis as its cultural heart." },
      { title: "Tequila Production", category: "Indigenous Knowledge", description: "Traditional distillation of blue agave in Jalisco, UNESCO-listed cultural landscape with centuries of heritage." },
      { title: "Charrería (Mexican Rodeo)", category: "Dance Forms", description: "National sport of Mexico featuring horsemanship, roping, and equestrian skills — UNESCO intangible heritage." },
    ]
  },
  {
    id: "dubrovnik", name: "Dubrovnik", country: "Croatia", region: "Europe", continent: "Europe",
    image: "rome", lat: 42.6507, lng: 18.0944, population: "42,000",
    languages: ["Croatian"],
    touristPlaces: ["City Walls", "Old Town", "Lokrum Island", "Fort Lovrijenac"],
    famousFood: ["Black Risotto", "Peka", "Rozata", "Fresh Seafood"],
    cultures: [
      { title: "Dubrovnik Summer Festival", category: "Festivals", description: "47-day arts festival with theatre, music, and dance performed in historic squares, forts, and churches.", celebrationDate: "July-August" },
      { title: "Linđo Folk Dance", category: "Dance Forms", description: "Traditional Dubrovnik folk dance with colorful costumes, celebrating local customs and courtship traditions." },
      { title: "Maritime Republic Heritage", category: "Architecture", description: "Medieval walled city that rivaled Venice as a trading power, with stunning Gothic-Renaissance architecture." },
    ]
  },
  {
    id: "lahore", name: "Lahore", country: "Pakistan", region: "South Asia", continent: "Asia",
    image: "delhi", lat: 31.5204, lng: 74.3587, population: "13 million",
    languages: ["Urdu", "Punjabi", "English"],
    touristPlaces: ["Badshahi Mosque", "Lahore Fort", "Shalimar Gardens", "Minar-e-Pakistan"],
    famousFood: ["Nihari", "Paya", "Seekh Kebab", "Falooda", "Lahori Chargha"],
    cultures: [
      { title: "Basant (Kite Festival)", category: "Festivals", description: "Spring kite-flying festival filling Lahore's sky with colorful kites, rooftop celebrations, and Punjabi folk music.", celebrationDate: "February" },
      { title: "Sufi Shrine Music", category: "Songs & Music", description: "Qawwali devotional music at Data Darbar and other Sufi shrines, drawing thousands of devotees weekly." },
      { title: "Mughal Architecture", category: "Architecture", description: "Badshahi Mosque and Shalimar Gardens showcase the grandeur of Mughal architectural vision in the subcontinent." },
      { title: "Truck Art", category: "Craft Techniques", description: "Vibrantly painted trucks and buses featuring calligraphy, poetry, and elaborate floral designs — rolling folk art." },
    ]
  },
];

// Extended country list for search suggestions
export const countries = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria",
  "Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan",
  "Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cabo Verde","Cambodia",
  "Cameroon","Canada","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo","Costa Rica",
  "Croatia","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt",
  "El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland","France","Gabon",
  "Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana",
  "Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel",
  "Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Kuwait","Kyrgyzstan","Laos",
  "Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Madagascar","Malawi",
  "Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova",
  "Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands",
  "New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia","Norway","Oman","Pakistan","Palau",
  "Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania",
  "Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia","Saint Vincent","Samoa","San Marino","Sao Tome","Saudi Arabia","Senegal",
  "Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea",
  "South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria","Taiwan","Tajikistan",
  "Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu",
  "Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela",
  "Vietnam","Yemen","Zambia","Zimbabwe"
];
