export interface CityData {
  id: string;
  name: string;
  country: string;
  region: string;
  image: string;
  lat: number;
  lng: number;
  population: string;
  languages: string[];
  cultures: CultureItem[];
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
  "South America", "Africa", "North America", "Southeast Asia", "Oceania"
];

export const cities: CityData[] = [
  {
    id: "delhi",
    name: "Delhi",
    country: "India",
    region: "South Asia",
    image: "delhi",
    lat: 28.6139,
    lng: 77.209,
    population: "32 million",
    languages: ["Hindi", "Urdu", "Punjabi", "English"],
    cultures: [
      { title: "Diwali - Festival of Lights", category: "Festivals", description: "A five-day festival celebrating the victory of light over darkness. Homes are decorated with oil lamps (diyas), rangoli patterns, and fireworks illuminate the sky. Families exchange sweets, wear new clothes, and perform Lakshmi Puja for prosperity.", religion: "Hinduism", celebrationDate: "October/November" },
      { title: "Kathak Dance", category: "Dance Forms", description: "One of the eight major forms of Indian classical dance, originating from the nomadic bards of ancient northern India. Known for its intricate footwork, spins (chakkar), and expressive storytelling through facial expressions and hand gestures." },
      { title: "Mughlai Cuisine", category: "Cuisine", description: "A culinary tradition born from the Mughal Empire, featuring rich gravies, aromatic spices, and slow-cooked dishes like biryani, kebabs, nihari, and butter chicken. The cuisine reflects a blend of Central Asian, Persian, and Indian cooking traditions." },
      { title: "Qawwali Music", category: "Songs & Music", description: "A form of Sufi devotional music that originated in South Asia. Performed at Sufi shrines (dargahs), it features a lead singer (qawwal), harmonium, tabla, and a chorus. The music aims to inspire spiritual ecstasy." },
      { title: "Holi Festival", category: "Festivals", description: "Known as the Festival of Colors, celebrating the arrival of spring and the triumph of good over evil. People throw colored powder (gulal) and water at each other, dance to dhol beats, and share festive drinks like thandai.", religion: "Hinduism", celebrationDate: "March" },
      { title: "Red Fort Heritage", category: "Architecture", description: "The iconic 17th-century Mughal fortress served as the main residence of Mughal emperors. Its red sandstone walls, intricate marble inlay work, and beautiful gardens represent the zenith of Mughal architecture." },
    ]
  },
  {
    id: "istanbul",
    name: "Istanbul",
    country: "Turkey",
    region: "Middle East",
    image: "istanbul",
    lat: 41.0082,
    lng: 28.9784,
    population: "15.8 million",
    languages: ["Turkish", "Kurdish", "Arabic"],
    cultures: [
      { title: "Eid al-Fitr Celebrations", category: "Festivals", description: "Marking the end of Ramadan, families gather for special prayers, feasts, and gift-giving. Traditional sweets like baklava and Turkish delight are shared among neighbors and communities.", religion: "Islam", celebrationDate: "Varies (lunar calendar)" },
      { title: "Whirling Dervish Ceremony", category: "Rituals & Ceremonies", description: "The Mevlevi Sema ceremony is a mesmerizing spiritual practice where dervishes spin in flowing white robes, symbolizing the soul's journey toward truth and divine love. Originating from Sufi mystic Rumi's teachings." },
      { title: "Turkish Bath (Hamam)", category: "Traditional Medicine", description: "An Ottoman bathing tradition combining steam, massage, and cleansing rituals. Historic hamams like Cagaloglu feature stunning marble interiors and have served communities for centuries as places of purification and socializing." },
      { title: "Grand Bazaar Craftsmanship", category: "Craft Techniques", description: "One of the world's oldest covered markets, housing thousands of artisans practicing traditional crafts including carpet weaving, ceramics (Iznik tiles), copperwork, calligraphy, and jewelry making." },
      { title: "Turkish Classical Music", category: "Songs & Music", description: "A rich musical tradition influenced by Ottoman court music, featuring instruments like the ney (reed flute), oud, kanun (zither), and kemençe. The makam system creates distinctive melodic patterns." },
    ]
  },
  {
    id: "rome",
    name: "Rome",
    country: "Italy",
    region: "Europe",
    image: "rome",
    lat: 41.9028,
    lng: 12.4964,
    population: "4.3 million",
    languages: ["Italian", "Latin (liturgical)"],
    cultures: [
      { title: "Christmas Eve Feast (La Vigilia)", category: "Festivals", description: "The Italian Christmas Eve tradition of the Feast of the Seven Fishes features an elaborate multi-course seafood dinner. Families gather for midnight mass at historic basilicas, followed by gift exchanges and panettone.", religion: "Christianity", celebrationDate: "December 24-25" },
      { title: "Roman Gladiatorial Heritage", category: "Oral Histories", description: "The Colosseum stands as a testament to ancient Roman entertainment and engineering. Oral histories and records describe spectacular events that shaped Roman social life and the empire's cultural identity." },
      { title: "Commedia dell'Arte", category: "Dance Forms", description: "A form of improvisational theatre originating in 16th century Italy, featuring masked stock characters like Arlecchino, Colombina, and Pulcinella. The tradition influenced modern comedy and theatrical performance worldwide." },
      { title: "Vatican Artistic Heritage", category: "Architecture", description: "The Vatican houses millennia of artistic treasures including Michelangelo's Sistine Chapel ceiling, Raphael's frescoes, and St. Peter's Basilica. These works represent the pinnacle of Renaissance artistic achievement." },
      { title: "Roman Cuisine Traditions", category: "Cuisine", description: "Ancient recipes passed through generations: cacio e pepe, carbonara, amatriciana, and saltimbocca. Roman cuisine emphasizes simple, high-quality ingredients and techniques refined over two millennia." },
    ]
  },
  {
    id: "amritsar",
    name: "Amritsar",
    country: "India",
    region: "South Asia",
    image: "amritsar",
    lat: 31.634,
    lng: 74.8723,
    population: "1.2 million",
    languages: ["Punjabi", "Hindi", "English"],
    cultures: [
      { title: "Guru Nanak Jayanti", category: "Festivals", description: "Celebrating the birth of Guru Nanak, the founder of Sikhism. Devotees participate in Prabhat Pheris (morning processions), continuous reading of the Guru Granth Sahib (Akhand Path), and community meals (langar) serving thousands.", religion: "Sikhism", celebrationDate: "November" },
      { title: "Golden Temple Langar", category: "Rituals & Ceremonies", description: "The world's largest free kitchen serves over 100,000 meals daily at the Harmandir Sahib. Volunteers cook, clean, and serve food regardless of caste, creed, or religion, embodying Sikh principles of equality and service." },
      { title: "Bhangra Dance", category: "Dance Forms", description: "An energetic folk dance from Punjab, traditionally performed during harvest festival Baisakhi. Characterized by vigorous kicks, leaps, and bends, accompanied by the dhol drum and boliyan (folk couplets)." },
      { title: "Phulkari Embroidery", category: "Craft Techniques", description: "A traditional Punjabi embroidery technique where geometric patterns are created on handspun cloth using bright silk threads. Each region has distinct patterns, passed down through generations of women artisans." },
    ]
  },
  {
    id: "kyoto",
    name: "Kyoto",
    country: "Japan",
    region: "East Asia",
    image: "kyoto",
    lat: 35.0116,
    lng: 135.7681,
    population: "1.5 million",
    languages: ["Japanese"],
    cultures: [
      { title: "Cherry Blossom Festival (Hanami)", category: "Festivals", description: "The centuries-old tradition of enjoying the transient beauty of cherry blossoms. Families and friends gather under blooming trees for picnics, poetry reading, and contemplation of mono no aware (the pathos of things).", celebrationDate: "March-April" },
      { title: "Tea Ceremony (Chanoyu)", category: "Rituals & Ceremonies", description: "A choreographed ritual of preparing and serving matcha green tea. Every movement has meaning, from the arrangement of utensils to the rotation of the bowl. It embodies wabi-sabi aesthetics and Zen Buddhist principles." },
      { title: "Noh Theatre", category: "Dance Forms", description: "One of the world's oldest extant theatrical forms, combining dance, music, and drama. Performers wear elaborate masks and costumes, moving with extreme slowness and precision to tell stories from Japanese mythology and history." },
      { title: "Kintsugi (Golden Repair)", category: "Craft Techniques", description: "The Japanese art of repairing broken pottery with lacquer mixed with powdered gold. Rather than hiding imperfections, kintsugi celebrates them, reflecting the philosophy that breakage and repair are part of an object's history." },
      { title: "Geisha Traditions", category: "Indigenous Knowledge", description: "Geisha are traditional Japanese entertainers skilled in classical arts including dance (nihon buyo), music (shamisen), tea ceremony, flower arrangement (ikebana), and conversation. Kyoto's Gion district preserves this centuries-old tradition." },
    ]
  },
  {
    id: "cusco",
    name: "Cusco",
    country: "Peru",
    region: "South America",
    image: "cusco",
    lat: -13.5319,
    lng: -71.9675,
    population: "430,000",
    languages: ["Spanish", "Quechua", "Aymara"],
    cultures: [
      { title: "Inti Raymi (Festival of the Sun)", category: "Festivals", description: "An ancient Incan ceremony honoring Inti, the sun god. Held during the winter solstice, it features elaborate costumes, traditional music, ritual offerings, and a reenactment at the Sacsayhuaman fortress overlooking Cusco.", celebrationDate: "June 24" },
      { title: "Andean Textile Weaving", category: "Craft Techniques", description: "Quechua communities maintain pre-Columbian weaving techniques using backstrap looms and natural dyes from plants and insects (cochineal). Each community's patterns encode information about identity, social status, and cosmological beliefs." },
      { title: "Pachamama Offerings", category: "Rituals & Ceremonies", description: "Earth Mother (Pachamama) ceremonies involve offering coca leaves, chicha (corn beer), and other gifts to the earth. These rituals maintain reciprocity with nature and are central to Andean worldview and agricultural cycles." },
      { title: "Incan Stone Masonry", category: "Architecture", description: "The precision stonework of Machu Picchu and Sacsayhuaman features massive stones fitted together without mortar so precisely that a knife blade cannot fit between them. This engineering knowledge was passed through generations." },
    ]
  },
  {
    id: "marrakech",
    name: "Marrakech",
    country: "Morocco",
    region: "Africa",
    image: "marrakech",
    lat: 31.6295,
    lng: -7.9811,
    population: "1 million",
    languages: ["Arabic", "Berber", "French"],
    cultures: [
      { title: "Gnawa Music Festival", category: "Songs & Music", description: "Gnawa music blends sub-Saharan African, Berber, and Arabic musical traditions. Featuring the guembri (three-string bass lute), metal castanets (qraqeb), and call-and-response singing, it originated as healing music of formerly enslaved peoples.", celebrationDate: "June" },
      { title: "Moroccan Zellige Tilework", category: "Craft Techniques", description: "An ancient mosaic artform using hand-cut geometric tiles to create intricate patterns. Master craftsmen (maalems) train for years to create the mathematical designs adorning fountains, walls, and floors of riads and mosques." },
      { title: "Jemaa el-Fnaa Storytelling", category: "Folk Stories", description: "The ancient square comes alive nightly with halqa (circle) performances: storytellers (hlaykia), musicians, snake charmers, and acrobats. This living tradition of oral performance has been recognized by UNESCO as a Masterpiece of Intangible Heritage." },
      { title: "Traditional Hammam Rituals", category: "Traditional Medicine", description: "Moroccan hammam culture combines cleansing with black soap (savon beldi), exfoliation with a kessa glove, and argan oil treatments. These weekly rituals serve as community gathering places and rites of passage." },
      { title: "Moroccan Culinary Arts", category: "Cuisine", description: "Tagine cooking, couscous preparation, and preserved lemon making represent centuries of culinary knowledge. Spice blending (ras el hanout can contain 30+ spices) and the art of Moroccan tea service are treasured traditions." },
    ]
  },
  {
    id: "cairo",
    name: "Cairo",
    country: "Egypt",
    region: "Africa",
    image: "delhi",
    lat: 30.0444,
    lng: 31.2357,
    population: "21 million",
    languages: ["Arabic", "Egyptian Arabic"],
    cultures: [
      { title: "Pharaonic Heritage", category: "Architecture", description: "The Great Pyramids of Giza and the Sphinx represent over 4,500 years of architectural mastery. Ancient Egyptian building techniques, astronomical alignments, and symbolic designs continue to inspire awe and scholarly research." },
      { title: "Sufi Mawlid Celebrations", category: "Festivals", description: "Annual celebrations honoring Islamic saints feature devotional chanting (dhikr), processions, and communal feasting. The Mawlid al-Nabi celebrating Prophet Muhammad's birthday is marked with special prayers and charitable giving.", religion: "Islam" },
      { title: "Egyptian Folk Music (Shaabi)", category: "Songs & Music", description: "A popular music genre reflecting the daily life and struggles of working-class Egyptians. Featuring electronic keyboards, tabla drums, and colloquial Arabic lyrics, shaabi evolved from traditional mawwal (vocal improvisation) traditions." },
    ]
  },
  {
    id: "beijing",
    name: "Beijing",
    country: "China",
    region: "East Asia",
    image: "kyoto",
    lat: 39.9042,
    lng: 116.4074,
    population: "21.5 million",
    languages: ["Mandarin Chinese"],
    cultures: [
      { title: "Chinese New Year (Spring Festival)", category: "Festivals", description: "The most important Chinese holiday features dragon and lion dances, fireworks, red envelope (hongbao) gifts, family reunion dinners, and temple fairs. Each year is associated with one of twelve zodiac animals.", celebrationDate: "January/February" },
      { title: "Peking Opera", category: "Dance Forms", description: "A traditional theatrical art combining music, vocal performance, mime, dance, and acrobatics. Performers wear elaborate costumes and painted faces, with each color symbolizing different character traits and emotions." },
      { title: "Forbidden City Architecture", category: "Architecture", description: "The world's largest palace complex showcases imperial Chinese architecture at its finest. Its 980 buildings exemplify traditional Chinese palatial design including feng shui principles, symbolic numerology, and intricate wood joinery." },
      { title: "Traditional Chinese Medicine", category: "Traditional Medicine", description: "A holistic healing system developed over 2,500 years, incorporating herbal medicine, acupuncture, cupping, tai chi, and qi gong. TCM theory is based on concepts of yin-yang balance and the flow of vital energy (qi)." },
    ]
  },
  {
    id: "athens",
    name: "Athens",
    country: "Greece",
    region: "Europe",
    image: "rome",
    lat: 37.9838,
    lng: 23.7275,
    population: "3.2 million",
    languages: ["Greek"],
    cultures: [
      { title: "Greek Orthodox Easter", category: "Festivals", description: "The most significant Greek celebration features midnight candlelight services, red-dyed eggs, lamb roasting on a spit, and the symbolic cracking of eggs. Holy Week processions and Good Friday epitaphios ceremonies are deeply moving.", religion: "Christianity", celebrationDate: "April/May" },
      { title: "Parthenon & Acropolis Heritage", category: "Architecture", description: "The Acropolis, crowned by the Parthenon temple dedicated to Athena, represents the pinnacle of classical Greek architecture. Its mathematical proportions, Doric columns, and sculptural program influenced Western architecture for millennia." },
      { title: "Greek Folk Dancing (Syrtos)", category: "Dance Forms", description: "Traditional circle and line dances performed at celebrations and festivals. The syrtos, kalamatianos, and hasapiko each have distinct regional variations, accompanied by bouzouki, lyra, and clarinet music." },
      { title: "Greek Mythology Oral Tradition", category: "Oral Histories", description: "The rich tapestry of Greek myths about gods, heroes, and the cosmos was preserved through oral tradition for centuries before being written down. These stories continue to inform global literature, art, and philosophy." },
    ]
  },
  {
    id: "varanasi",
    name: "Varanasi",
    country: "India",
    region: "South Asia",
    image: "amritsar",
    lat: 25.3176,
    lng: 83.0068,
    population: "1.5 million",
    languages: ["Hindi", "Bhojpuri", "Sanskrit"],
    cultures: [
      { title: "Ganga Aarti Ceremony", category: "Rituals & Ceremonies", description: "A spectacular fire ritual performed every evening on the ghats of the Ganges River. Priests wave large flaming lamps in choreographed movements while devotees float flower offerings (diyas) on the river, accompanied by chanting and bells.", religion: "Hinduism" },
      { title: "Banarasi Silk Weaving", category: "Craft Techniques", description: "A centuries-old tradition of weaving luxurious silk fabrics with intricate gold and silver brocade (zari) work. Banarasi saris are prized for their Mughal-inspired designs including floral and foliate motifs." },
      { title: "Classical Music (Banaras Gharana)", category: "Songs & Music", description: "Varanasi is home to the Banaras gharana of Hindustani classical music, known for its distinctive vocal and instrumental styles. The city has produced legendary musicians and maintains a vibrant tradition of music education." },
    ]
  },
  {
    id: "mexico-city",
    name: "Mexico City",
    country: "Mexico",
    region: "North America",
    image: "cusco",
    lat: 19.4326,
    lng: -99.1332,
    population: "21.8 million",
    languages: ["Spanish", "Nahuatl"],
    cultures: [
      { title: "Day of the Dead (Dia de los Muertos)", category: "Festivals", description: "A vibrant celebration honoring deceased loved ones with colorful altars (ofrendas), marigold flowers, sugar skulls, and the favorite foods of the departed. Families gather in cemeteries for picnics and storytelling.", celebrationDate: "November 1-2" },
      { title: "Aztec Heritage & Templo Mayor", category: "Architecture", description: "The ruins of the Aztec capital Tenochtitlan lie beneath modern Mexico City. The Templo Mayor and surrounding archaeological sites reveal sophisticated urban planning, astronomical knowledge, and artistic traditions of Mesoamerican civilizations." },
      { title: "Mariachi Music", category: "Songs & Music", description: "Born in western Mexico, mariachi ensembles feature violins, trumpets, guitars, and the distinctive guitarron. This passionate musical tradition accompanies serenades, celebrations, and national events, recognized by UNESCO as intangible heritage." },
      { title: "Traditional Mole Cuisine", category: "Cuisine", description: "Complex sauces combining dozens of ingredients including chiles, chocolate, spices, and nuts. Each region's mole recipe represents generations of culinary knowledge, with some containing over 30 ingredients and taking days to prepare." },
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
