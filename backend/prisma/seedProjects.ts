import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const REAL_PROJECTS = [
  {
    "title": "Anubhav Jain Farmhouse, New Delhi",
    "description": "This residence is integrated by Atpl. Featuring lighting, Hvac, and automated shading control and custom-engraved backlit keypads and thermostats. All systems are integrated through an app, enabling room-by-room management remotely.",
    "imageUrl": "/images/projects/residential/anubhav-jain-farmhouse/1.jpg",
    "type": "Residential"
  },
  {
    "title": "Anuj Garg Residence, Delhi Ncr",
    "description": "This residence is integrated by Atpl. Featuring lighting, Hvac, and automated shading control and custom-engraved backlit keypads and thermostats. All systems are integrated through an app, enabling room-by-room management remotely.",
    "imageUrl": "/images/projects/residential/anuj-garg-residence/1.webp",
    "type": "Residential"
  },
  {
    "title": "Aranyak Farmhouse, Delhi Ncr",
    "description": "Atpl integrated lighting control using Lutron HomeWorks Qs, Qs Link Power Supply, Adaptive Power Module, double column polymer-finish pre-engraved button keypads, Sonance ceiling speakers, Rusound audio streamer, channel amplifier,",
    "imageUrl": "/images/projects/residential/aranyak-farmhouse/1.jpg",
    "type": "Residential"
  },
  {
    "title": "Bhartiya Residence, Bengaluru",
    "description": "Integrated whole-home automation featuring Lutron motorized drapery, architectural scene recall, and multi-zone entertainment systems.",
    "imageUrl": "/images/projects/residential/bhartiya-residence/1.jpg",
    "type": "Residential"
  },
  {
    "title": "Bkt Farms, Delhi Ncr",
    "description": "The Bkt Farm project brings together lighting controls, motorized shades, chiller-based Hvac control, and electronic access through E-Key locks.Designed and integrated as a complete automation system, the project required detailed planning and coordination with consultants, architects, and contractors to address the requirements of a large-scale residence.",
    "imageUrl": "/images/projects/residential/bkt-farms/1.jpg",
    "type": "Residential"
  },
  {
    "title": "Dixit-Nene Residence, Mumbai",
    "description": "Lighting controls, motorised shades, backlit custom engraved keypads, temperature and air control systems, voice control and audio-video app integration by Atpl.",
    "imageUrl": "/images/projects/residential/dixit-nene/1.jpg",
    "type": "Residential"
  },
  {
    "title": "Indiabulls Blu Residence, Mumbai",
    "description": "Sea-facing luxury tower residence with circadian scene presets, automated draperies, and integrated smart entertainment.",
    "imageUrl": "/images/projects/residential/indiabulls-mumbai-residence/1.webp",
    "type": "Residential"
  },
  {
    "title": "Private Luxury Residence, Mumbai",
    "description": "Minimalist high-rise automation featuring acoustic zoning, architectural warm-dim downlights, and tactile smart keypads.",
    "imageUrl": "/images/projects/residential/mumbai-private-residence/1.webp",
    "type": "Residential"
  },
  {
    "title": "Nakul Bhatia Residence, New Delhi",
    "description": "Lighting controls, motorised shades, backlit custom engraved keypads",
    "imageUrl": "/images/projects/residential/nakul-bhatia/1.jpg",
    "type": "Residential"
  },
  {
    "title": "Sanjeet Bhasin Residence, New Delhi",
    "description": "The installation included lighting Control Palladiom thermostats, Alisse keypads, Hvac control, Wi-Fi, biometric access from eKey, a Denon soundbar, Tcs video door phone, customized switch plates with matching accessories, Sonance visible speakers,and complete audio integration",
    "imageUrl": "/images/projects/residential/sanjeet-bhasin/1.jpg",
    "type": "Residential"
  },
  {
    "title": "Sournika Villa, Delhi Ncr",
    "description": "Lighting controls, motorised shades, backlit custom engraved keypads,",
    "imageUrl": "/images/projects/residential/sournika-villa/1.jpg",
    "type": "Residential"
  },
  {
    "title": "Shanti Niketan Villa, Delhi",
    "description": "Four-storey architectural masterwork in Shanti Niketan designed by Morphogenesis with an enterprise-grade automation backbone.",
    "imageUrl": "/images/projects/residential/villa-delhi/1.jpg",
    "type": "Residential"
  },
  {
    "title": "Vishal Udani Residence, Bengaluru",
    "description": "Seamless multi-room high-resolution audio distribution, customized tactile keypad interfaces, and intelligent climate automation.",
    "imageUrl": "/images/projects/residential/vishal-udani/1.jpg",
    "type": "Residential"
  },
  {
    "title": "The Horizon Estate, Delhi Ncr",
    "description": "Complete private residence lighting scenes, circadian rhythm alignment, and silent motorized drapery systems overlooking tranquil gardens.",
    "imageUrl": "/assets/residential/project/delhi-residence/delhi-residence-1.jpg",
    "type": "Residential"
  },
  {
    "title": "Aura Residences, Mumbai",
    "description": "Premium gated luxury residence with integrated biometric security, automated energy setbacks, and ambient lighting.",
    "imageUrl": "/assets/residential/project/mumbai-residence-1/mumbai-residence-1-1.jpg",
    "type": "Residential"
  },
  {
    "title": "Lumina Lofts, Mumbai",
    "description": "Boutique smart apartments with synchronized motorized shades, multi-room audio, and intuitive touch keypad controls.",
    "imageUrl": "/assets/residential/project/mumbai-residence-2/mumbai-residence-2-1.jpg",
    "type": "Residential"
  },
  {
    "title": "Aloft New Delhi Aerocity",
    "description": "Aloft New Delhi Aerocity, designed by Bent Severin & Associates and established in 2018, reflects the vibrant energy of Aerocity’s modern hospitality district.Atpl integrated Lutron HomeWorks with International seeTouch keypads across public areas, restaurants, and all-day dining spaces.",
    "imageUrl": "/images/projects/hospitality/aloft-new-delhi/1.webp",
    "type": "Hospitality"
  },
  {
    "title": "Andaz Delhi, Aerocity",
    "description": "Andaz Delhi by Hyatt, spread across 6.6 acres in Aerocity, New Delhi, is designed by Bauer Latoza Studio with interiors by London-based Virgile + Partners. Atpl integrated Lutron HomeWorks with International seeTouch keypads installed across public areas, restaurants, and all-day dining spaces.",
    "imageUrl": "/images/projects/hospitality/andaz-delhi/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "Country Inn & Suites by Radisson, Bhiwadi",
    "description": "Country Inn & Suites by Radisson, Bhiwadi, established in 2014, is a premium hospitality destination catering to business and leisure travellers along the Delhi–Jaipur corridor. Atpl has integrated advanced lighting control solutions, HomeWorks systems, and international seeTouch keypads across the lobby, reception, and restaurant.",
    "imageUrl": "/images/projects/hospitality/country-inn-radisson-bhiwadi/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "Courtyard by Marriott, Jaisalmer",
    "description": "Marriott Resort & Spa, Jaisalmer The Jaisalmer Marriott Resort & Spa (est. 2016–17) is the city’s first international luxury hotel, redefining hospitality standards in the Golden City Atpl has integrated advanced lighting control solutions, HomeWorks systems, and international seeTouch keypads across the lobby, reception, and restaurant, enhancing ambience and guest experience.",
    "imageUrl": "/images/projects/hospitality/courtyard-marriott-jaisalmer/1.webp",
    "type": "Hospitality"
  },
  {
    "title": "Courtyard by Marriott, Madurai",
    "description": "Courtyard by Marriott Madurai opened its doors in 2018, bringing Marriott’s signature hospitality and upscale comfort to the heart of the Temple City of Madurai, Tamil Nadu Atpl has integrated lighting control solutions, HomeWorks systems, and international seeTouch keypads across key public areas, including the lobby, reception, and restaurants",
    "imageUrl": "/images/projects/hospitality/courtyard-marriott-madurai/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "Courtyard by Marriott, Raipur",
    "description": "Courtyard by Marriott Raipur was established in February 2016 as the 14th Courtyard property in India, reflecting Marriott’s commitment to Raipur’s rising business and corporate event potential.Atpl has integrated lighting control solutions, HomeWorks systems, and international seeTouch keypads across key public areas, including the lobby, reception, and restaurants",
    "imageUrl": "/images/projects/hospitality/courtyard-marriott-raipur/1.avif",
    "type": "Hospitality"
  },
  {
    "title": "Courtyard by Marriott, Shillong",
    "description": "Courtyard by Marriott Shillong has 182 rooms, including luxury and family suites with panoramic views, and a total built-up area of approximately 22,660 sq meters.Atpl Integrates HomeWorks systems, switching Module, face cut modules, International See Touch keypads, covering public areas, banquet halls, spa, and gym.",
    "imageUrl": "/images/projects/hospitality/courtyard-marriott-shillong/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "Crowne Plaza, Ahmedabad",
    "description": "Atpl has integrated lighting control solutions, HomeWorks systems, and international seeTouch keypads across key public areas, including the lobby, reception, and restaurants",
    "imageUrl": "/images/projects/hospitality/crowne-plaza-ahmedabad/1.jfif",
    "type": "Hospitality"
  },
  {
    "title": "Crowne Plaza, Gurgaon",
    "description": "Crowne Plaza, Gurugram. Atpl has integrated lighting control solutions, HomeWorks systems, and international seeTouch keypads across key public areas, including the lobby, reception, and restaurants",
    "imageUrl": "/images/projects/hospitality/crown-plaza-gurgaon/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "Crowne Plaza, Mayur Vihar, New Delhi",
    "description": "This 10,000 sq. ft. area, was originally established in 1983 and is now part of Ihg Hotels & Resorts. Atpl integrated the HomeWorks system at the property with international SeeTouch keypads installed across the Infinity restaurant, all day dining, lobby, and reception for lighting controls.",
    "imageUrl": "/images/projects/hospitality/crowne-plaza-mayur-vihar/kmqffabsernhoeceo0q.jfif",
    "type": "Hospitality"
  },
  {
    "title": "DoubleTree by Hilton, Goa Panaji",
    "description": "[Awaiting Description - Add your description here]",
    "imageUrl": "/images/projects/hospitality/double-tree-hilton-goa/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "Dusit Princess, Kathmandu, Nepal",
    "description": "Atpl delivered lighting control with Dali modules, phase-cut dimming, and SeeTouch keypads across public areas, lobby, restaurants, game pool, and all day dining.",
    "imageUrl": "/images/projects/hospitality/dusit-princess-nepal/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "Fortune Resort by Itc, Puri",
    "description": "Fortune Beachfront, Puri, launched in 2024 by Itc’s Fortune Hotels. The hotel offers 63 rooms and suites with modern amenities and interiors.Atpl integrated lighting automation such as Qsx Processor, Din Rail Phase Adaptive Modules, 0–10V Dimming, Switching Modules, and 8-Button International SeeTouch Keypads.",
    "imageUrl": "/images/projects/hospitality/itc-fortune-puri/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "Gorbandh Palace, Jaisalmer",
    "description": "Gorbandh Palace in Jaisalmer is a heritage hotel built in golden sandstone with 83 rooms, now managed by Ihcl under their SeleQtions brand as their 200th hotel. Atpl integrated Dali modules, switching modules, and phase-cut solutions across public areas, banquets, and restaurants.",
    "imageUrl": "/images/projects/hospitality/gorbandh-palace-jaisalmer/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "Grand Hyatt, Gurgaon",
    "description": "Grand Hyatt Gurgaon, opened in August 2022, spans 29 acres in Sector 58 with 442 rooms, suites, and service apartments.Atpl integrated processors, switching modules, thermostats, Palladiom keypads, occupancy sensors, shades, Pico keypads, and Qsm modules in both public areas and guest rooms.",
    "imageUrl": "/images/projects/hospitality/grand-hyatt-gurgaon/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "Hilton Garden Inn Baani Square, Gurgaon",
    "description": "Designed by @bobbymukherrjiarchitects. Lighting automation installed across the public areas. By installing 127 dimming circuits, 60,000 units are saved every year.",
    "imageUrl": "/images/projects/hospitality/hilton-baani-square-gurgaon/1.avif",
    "type": "Hospitality"
  },
  {
    "title": "Hilton, Surat",
    "description": "Hilton Garden Inn, Surat. Atpl integrated automation solutions for lighting and temperature control with energy-saving features. The setup includes guest presence detection in rooms, switching modules, occupancy sensors, Qsm, and Pico keypads for easy operation.",
    "imageUrl": "/images/projects/hospitality/hilton-surat/1.webp",
    "type": "Hospitality"
  },
  {
    "title": "Holiday Inn, Jaipur City Centre",
    "description": "Holiday Inn Jaipur City Centre is a centrally located business hotel in Jaipur with modern facilities.Opened in 2014, it offers rooms, banquet halls, and dining for both business and leisure guests. Atpl has integrated lighting control solutions, HomeWorks systems, and international seeTouch keypads across key public areas, including the lobby, reception, and restaurants",
    "imageUrl": "/images/projects/hospitality/holiday-inn-jaipur/1.webp",
    "type": "Hospitality"
  },
  {
    "title": "Holiday Inn, New Delhi",
    "description": "Atpl has integrated lighting, HomeWorks, and international SeeTouch keypads across the public areas, spa, restaurant, and banquet spaces.",
    "imageUrl": "/images/projects/hospitality/holiday-inn/1.avif",
    "type": "Hospitality"
  },
  {
    "title": "Hotel Bhagirathi, Uttarakhand",
    "description": "Bhagirathi, Haridwar — Completed in 2025. Atpl integrated lighting controls using Dali modules, phase-cut dimming, and switching solutions. The hotel features background music powered by Sonance speakers, Lab.gruppen and Russound amplifiers, and a Bose sound processor.",
    "imageUrl": "/images/projects/hospitality/bhagirathi-hotel/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "Hyatt Centric, Chandigarh",
    "description": "[Awaiting Description - Add your description here]",
    "imageUrl": "/images/projects/hospitality/hyatt-centric-chandigarh/1.avif",
    "type": "Hospitality"
  },
  {
    "title": "Hyatt Centric, Kathmandu, Nepal",
    "description": "the first Hyatt Centric-branded hotel in Nepal, officially opened in January 2025. Situated in the heart of Kathmandu, this hotel is a transformation of the former Hyatt Place Kathmandu, symbolizing a major step in Hyatt’s regional expansion.",
    "imageUrl": "/images/projects/hospitality/hyatt-centric-kathmandu/1.avif",
    "type": "Hospitality"
  },
  {
    "title": "Hyatt Place, Pune Hinjawadi",
    "description": "Hyatt Place Pune Hinjawadi was established in 2014 in the heart of Pune Atpl has integrated lighting control solutions, HomeWorks systems, and international seeTouch keypads across key public areas, including the lobby, reception, and restaurants",
    "imageUrl": "/images/projects/hospitality/hyatt-place-pune/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "Hyatt Regency, Jaipur Mansarovar",
    "description": "Atpl delivered lighting control with Dali modules, phase-cut dimming, and SeeTouch keypads across public areas, lobby, restaurants, game pool, and all day dining.",
    "imageUrl": "/images/projects/hospitality/hyatt-regency-jaipur/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "Hyatt Regency, Pune",
    "description": "Atpl has integrated lighting control solutions, HomeWorks systems, and international seeTouch keypads across key public areas, including the lobby, reception, and restaurants",
    "imageUrl": "/images/projects/hospitality/hyatt-regency-pune/hyatt-regency-pune-and-residences-hyatt-regency-pune-and-residences-1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "Itc Gardenia, Bengaluru",
    "description": "Itc Gardenia, opened in 2009 in Bengaluru, is a Luxury Collection hotel that pioneered eco-friendly hospitality as Asia’s first Leed Platinum–certified hotel Atpl has integrated lighting control solutions, HomeWorks systems, and international seeTouch keypads across key public areas, including the lobby, reception, and restaurants",
    "imageUrl": "/images/projects/hospitality/itc-gardenia-bangalore/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "Itc Grand Bharat Luxury Retreat, Gurugram",
    "description": "Itc Grand Bharat was established by Itc Hotels as a luxury retreat inspired by India’s royal palaces and heritage. Atpl has integrated advanced lighting control solutions, HomeWorks systems, and international seeTouch keypads across the lobby, reception, and restaurant, enhancing ambience and guest experience.",
    "imageUrl": "/images/projects/hospitality/itc-grand-bharat/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "Itc Grand Central, Mumbai",
    "description": "International seeTouch keypads by @lutronelectronics for lighting automation, integrated across public areas by Atpl",
    "imageUrl": "/images/projects/hospitality/itc-grand-central-mumbai/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "Itc Grand Chola, Chennai",
    "description": "The Itc Grand Chola Chennai, is spread across eight acres in Guindy. Inspired by the grandeur of the Chola dynasty, it blends majestic architecture with cutting-edge tech like iPad-enabled room controls. With the 26,450 sq ft Rajendra Hall and signature dining at Ottimo and Peshawari, it sets new benchmarks in Chennai hospitality. Atpl integrated Howeworks systems, lighting control, and international SeeTouch keypad covers across the public areas, lobby, restaurants, and banquets to enhance the hotel’s guest experience.",
    "imageUrl": "/images/projects/hospitality/itc-grand-chola/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "Itc Grand Goa Resort & Spa",
    "description": "Itc Grand Goa was established in 2018, when Itc Hotels acquired the former Park Hyatt Goa Resort & Spa at Arossim Beach and relaunched it under The Luxury Collection, blending Goan Indo-Portuguese heritage with refined luxury. Atpl has integrated advanced lighting control solutions, HomeWorks systems, and international seeTouch keypads across the lobby, reception, and restaurant, enhancing ambience and guest experience.",
    "imageUrl": "/images/projects/hospitality/itc-grand-goa/1.avif",
    "type": "Hospitality"
  },
  {
    "title": "Itc Kakatiya, Hyderabad",
    "description": "Itc Kakatiya, Hyderabad is a 5-star luxury hotel established in 1999, inspired by the Kakatiya dynasty with royal Deccan architecture. Atpl has implemented advanced lighting control using HomeWorks systems and international seeTouch keypads to enhance ambience and guest experience across key areas",
    "imageUrl": "/images/projects/hospitality/itc-kakatiya-hyderabad/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "Itc Kohenur, Hitec City, Hyderabad",
    "description": "Itc Kohenur is a luxury hotel in Hyderabad’s Hitec City, opened in 2017, offering premium stays, fine dining, and world-class banqueting",
    "imageUrl": "/images/projects/hospitality/itc-kohenur-hyderabad/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "Itc Maratha, Mumbai",
    "description": "Itc Maratha, a Luxury Collection Hotel, Mumbai was established in 2010, inspired by the architectural heritage of the Maratha dynasty. Atpl has integrated lighting control solutions, HomeWorks systems, and international seeTouch keypads across key public areas, including the lobby, reception, and restaurants",
    "imageUrl": "/images/projects/hospitality/itc-maratha-mumbai/1.jpeg",
    "type": "Hospitality"
  },
  {
    "title": "Itc Maurya, Diplomatic Enclave, New Delhi",
    "description": "Itc Maurya, Delhi features 440 rooms spread across 5.5 acres. The hotel also offers 25 suites with personalised butler service, conference room facilities, and airport lounge access. Atpl has integrated lighting control solutions, HomeWorks systems, and international seeTouch keypads across key public areas, including the lobby, reception, and restaurants.",
    "imageUrl": "/images/projects/hospitality/itc-maurya-delhi/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "Itc Narmada, Ahmedabad",
    "description": "Itc Narmada, Ahmedabad Itc Narmada is a luxury five-star hotel that opened in August 2022, becoming the 12th Itc Hotels property in Gujarat. Rising 19 floors high with 291 rooms, the hotel embodies a grand architectural presence complemented by signature restaurants, a world-class spa, and expansive banquet facilities. Atpl integrated Lutron HomeWorks, advanced lighting control, and international SeeTouch keypads across resturants, Banquet Areas and public areas",
    "imageUrl": "/images/projects/hospitality/itc-narmada-ahmedabad/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "Jc Courtyard by Marriott",
    "description": "Jc Courtyard Marriott, Ramnagar Situated at the gateway to Jim Corbett National Park, Courtyard by Marriott Ramnagar captures the spirit of the wild.Atpl integrated Lighting Processors, Wall-Mounted Dali Dimmer Modules, Pico Wireless Keypads, and Qsm Antennas for sensors.",
    "imageUrl": "/images/projects/hospitality/jc-courtyard-marriott/1.avif",
    "type": "Hospitality"
  },
  {
    "title": "Kochi Marriott Hotel, Kerala",
    "description": "Marriott International has opened the Kochi Marriott Hotel, the fifth hotel under the company’s Marriott Hotels brand in India and the second Marriott International property in Kochi. Kochi Marriott Hotel is an exciting addition to the Marriott Hotels portfolio,” says Rajeev Menon, Area Vice President – South Asia, Marriott International. Atpl integrated Homeworks systems, lighting control, and international SeeTouch keypad covers across the public areas, lobby, restaurants, and banquets to enhance the hotel’s guest experience.",
    "imageUrl": "/images/projects/hospitality/marriott-kochi/1.avif",
    "type": "Hospitality"
  },
  {
    "title": "Le Méridien Hotel, New Delhi",
    "description": "[Awaiting Description - Add your description here]",
    "imageUrl": "/images/projects/hospitality/le-meridien/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "Lemon Tree Premier",
    "description": "[Awaiting Description - Add your description here]",
    "imageUrl": "/images/projects/hospitality/lemontree/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "Nirvana Hotel, Banquets & Club, Ludhiana",
    "description": "Nirvana, Ludhiana. Completed in 2024. Atpl delivered automation solutions featuring keypads, switching modules, processors, and guest presence detection. Louvers installed within guestroom automation in hotel balconies for ventilation and shading.",
    "imageUrl": "/images/projects/hospitality/nirvana-hotel-ludhiana/1.webp",
    "type": "Hospitality"
  },
  {
    "title": "Novotel Goa Resort & Spa",
    "description": "[Awaiting Description - Add your description here]",
    "imageUrl": "/images/projects/hospitality/novotel-goa/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "Novotel New Delhi Aerocity",
    "description": "Situated in the prime location of Aerocity, Novotel New Delhi is a 670-room hotel where Atpl has integrated advanced automation solutions. The project features HomeWorks systems with international seeTouch keypads, with lighting automation implemented across key public areas including the restaurant and banquet lobby.",
    "imageUrl": "/images/projects/hospitality/novotel-delhi-aerocity/1.avif",
    "type": "Hospitality"
  },
  {
    "title": "Novotel Visakhapatnam Varun Beach",
    "description": "Atpl delivered lighting control with Dali modules, phase-cut dimming, and SeeTouch keypads across public areas, lobby, restaurants, game pool, and all day dining.",
    "imageUrl": "/images/projects/hospitality/novotel-visakhapatnam/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "Oberoi Rajgarh Palace, Madhya Pradesh",
    "description": "The Oberoi Rajgarh Palace, Khajuraho Established in 2025, The Oberoi Rajgarh Palace stands as a tribute to Khajuraho’s royal heritage. Designed by architect Hafeez Contractor, the palace reflects Bundelkhand’s regal architecture. Atpl integrated RA2, Athena Processor, Quantum, Adaptive Modules, SeeTouch Keypads, Dali Modules, and Pico Keypads across public areas, reception, lobby, restaurant, and dining spaces.",
    "imageUrl": "/images/projects/hospitality/oberoi-rajgarh-palace/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "Ozone Club & Hotel, Kolkata",
    "description": "[Awaiting Description - Add your description here]",
    "imageUrl": "/images/projects/hospitality/ozone-kolkata/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "Pradhanmantri Sangrahalaya (Pm Museum), New Delhi",
    "description": "[Awaiting Description - Add your description here]",
    "imageUrl": "/images/projects/hospitality/pm-museum-delhi/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "Radisson Blu Hotel, Bengaluru",
    "description": "[Awaiting Description - Add your description here]",
    "imageUrl": "/images/projects/hospitality/radisson-bangalore/1.avif",
    "type": "Hospitality"
  },
  {
    "title": "Radisson Blu Hotel, Jamshedpur",
    "description": "[Awaiting Description - Add your description here]",
    "imageUrl": "/images/projects/hospitality/radisson-jamshedpur/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "Sawai Man Mahal, Rambagh Palace, Jaipur",
    "description": "Sawai Man Mahal, a property of Taj, is located within the 47-acre estate that houses the iconic Rambagh Palace, often called “The Jewel of Jaipur.” Once the royal residence of the Maharaja of Jaipur, Rambagh Palace traces its origins to the early 19th century when it began as a modest garden house and later transformed into one of India’s most celebrated palaces.",
    "imageUrl": "/images/projects/hospitality/sawai-man-mahal/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "Shangri-La Eros Hotel, New Delhi",
    "description": "Shangri-La Eros New Delhi Atpl integrated automation across the award winning hotel’s lobby, reception, spa and other public areas. Processors, Dali modules, Adaptive modules, Switching modules, Palladiom keypads, Power supply were installed for this project.",
    "imageUrl": "/images/projects/hospitality/shangri-la-delhi/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "Sheraton Grand Bangalore at Brigade Gateway",
    "description": "Sheraton Grand Bangalore at Brigade Gateway is a luxury hotel by Brigade Group. Opened in 2011, it offers world-class hospitality in an integrated township and was awarded the prestigious “Sheraton Grand” status in 2015. Atpl has integrated advanced lighting control solutions, HomeWorks systems, and international seeTouch keypads across the lobby, reception, and restaurant areas.",
    "imageUrl": "/images/projects/hospitality/sheraton-grand-bangalore/1.avif",
    "type": "Hospitality"
  },
  {
    "title": "Six Senses Fort Barwara, Rajasthan",
    "description": "Guestroom control systems in suites by Atpl. This landmark project features integrated automation for lighting, shades, and climate. Custom-engraved backlit keypads and guest presence detection optimise energy use.",
    "imageUrl": "/images/projects/hospitality/six-senses-barwara/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "Taj Hotel & Resort, Puri",
    "description": "Atpl has integrated Lighting Control Processor, Adaptive Module, Switching Module, Wireless Occupancy Sensor, Sensor Module, and International See Touch Keypads across key areas, including the public spaces, banquet halls, restaurants, and spa",
    "imageUrl": "/images/projects/hospitality/taj-puri/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "Taj Lakefront, Bhopal",
    "description": "Complete guest room management system (Grms), grand ballroom lighting scene control, and centralized hotel public space automation.",
    "imageUrl": "/images/projects/hospitality/taj-lakefront-bhopal/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "Taj Tashi / Bhutan Luxury Resort, Paro",
    "description": "Himalayan luxury retreat with discreet architectural heating and ambient valley-facing lighting.",
    "imageUrl": "/images/projects/hospitality/taj-paro-bhutan/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "The Astor Goa - Villa in the Sky Penthouse",
    "description": "Atpl delivered lighting control with Dali modules, phase-cut dimming, and SeeTouch keypads across public areas, lobby, restaurants, game pool, and all day dining.",
    "imageUrl": "/images/projects/hospitality/astor-goa-penthouse/Villa-in-the-Sky-The-Astor-Goa-Penthouse-3-scaled.jpg",
    "type": "Hospitality"
  },
  {
    "title": "The Astor, Goa",
    "description": "Founded by Vikram Puri, Atpl integrated the space with complete lighting and shades automation including HomeWorks system, Palladiom keypads, dimming & switching modules, and automated drapery tracks.",
    "imageUrl": "/images/projects/hospitality/astor-goa/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "The Claridges, New Delhi",
    "description": "The Claridges, New Delhi Established in 1955, The Claridges stands in the heart of Lutyens Delhi, celebrated for its Indo-European architecture. Atpl integrated advanced lighting control, HomeWorks, and international SeeTouch keypad solutions across the public areas, reception, restaurant, and banquet spaces",
    "imageUrl": "/images/projects/hospitality/claridge-delhi/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "The Den Bengaluru, Whitefield",
    "description": "Contemporary tech-focused luxury hotel with seamless meeting room scheduling, dynamic lobby scene automation, and guestroom energy efficiency.",
    "imageUrl": "/images/projects/hospitality/the-den-bangalore/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "The Grand Dragon Ladakh, Leh",
    "description": "Located at an elevation of around 11,000 feet, The Grand Dragon Ladakh stands as the region’s first luxury hotel.Its gilded interiors and local woodwork reflect the spirit of Ladakh, with panoramic views of the Stok Kangri range. Atpl integrated intelligent lighting automation, including the HomeWorks Qs Single Link Processor, Adaptive Power Modules, Dali Module, and Switching Module in the conference and public areas.",
    "imageUrl": "/images/projects/hospitality/grand-dragon-laddakh/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "The Grand New Delhi, Vasant Kunj",
    "description": "The Grand Delhi With 33,000 sq. ft. of flexible banquet and meeting spaces, a modern fitness center, and impeccable service, it stands as one of Delhi’s top luxury hotels. Atpl integrated HomeWorks system, lighting control, and international See touch keypad covers across public areas, restaurants, and banquet spaces.",
    "imageUrl": "/images/projects/hospitality/the-grand/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "The Imperial, Janpath, New Delhi",
    "description": "Imperial, Delhi Atpl has integrated lighting, HomeWorks, and international SeeTouch keypads across the public areas, spa, restaurant, and banquet spaces.",
    "imageUrl": "/images/projects/hospitality/the-imperial-delhi/1.webp",
    "type": "Hospitality"
  },
  {
    "title": "The LaLiT, New Delhi",
    "description": "Atpl delivered lighting control with Dali modules, phase-cut dimming, and SeeTouch keypads across public areas, lobby, restaurants, game pool, and all day dining.",
    "imageUrl": "/images/projects/hospitality/the-lalit-delhi/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "The Leela Palace, Chanakyapuri, New Delhi",
    "description": "Atpl has integrated lighting control solutions, HomeWorks systems, and international seeTouch keypads across key public areas, including the lobby, reception, and restaurants",
    "imageUrl": "/images/projects/hospitality/the-leela-delhi/Photos/20260422_231023(1).jpg",
    "type": "Hospitality"
  },
  {
    "title": "The Leela Palace, Udaipur",
    "description": "The Leela Palace Udaipur Lake Villa Lighting controls done by Atpl",
    "imageUrl": "/images/projects/hospitality/The Leela Udaipur/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "The Leela Palace, Udaipur",
    "description": "The Leela Palace Udaipur Lake Villa Lighting controls done by Atpl",
    "imageUrl": "/images/projects/hospitality/the-leela-udaipur/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "The Oberoi Amarvilas, Agra",
    "description": "Oberoi Amarvilas Just 600 meters from the Taj Mahal, The Oberoi Amarvilas was built as a tribute to Mughal grandeur.Atpl enhances the experience by integrating T&J solutions, Palladiom thermostats, and advanced motorized systems",
    "imageUrl": "/images/projects/hospitality/oberoi-amarvillas/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "The Oberoi Grand, Kolkata",
    "description": "[Awaiting Description - Add your description here]",
    "imageUrl": "/images/projects/hospitality/oberoi-360-grand-kolkata/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "The Oberoi Rajvilas, Jaipur",
    "description": "Established in 1997, The Oberoi Rajvilas, Jaipur is a luxury resort by the Oberoi Group spread across 32 acres of landscaped gardens, inspired by traditional Rajasthani palace architecture. Atpl has integrated lighting control solutions including the Athena system, phase-cut dimming modules, and international seeTouch keypads across key public areas and restaurants",
    "imageUrl": "/images/projects/hospitality/oberoi-rajvillas/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "The Oberoi Sukhvilas Spa Resort, New Chandigarh",
    "description": "The Oberoi Sukhvilas Resort & Spa – Chandigarh Spread over 25 acres and surrounded by more than 8,000 acres of the Siswan Forest, this luxury resort sits at the foothills of the outer Himalayas. Known as the region’s first luxury destination spa, it features a 12,000 sq. ft. wellness centre set at the edge of the forest. Atpl has integrated advanced lighting control, HomeWorks, and international SeeTouch keypads across the public areas, reception, spa, and restaurant.",
    "imageUrl": "/images/projects/hospitality/oberoi-sukhvilas-chandigarh/1.webp",
    "type": "Hospitality"
  },
  {
    "title": "The Oberoi Vindhyavilas, Bandhavgarh",
    "description": "[Awaiting Description - Add your description here]",
    "imageUrl": "/images/projects/hospitality/oberoi-vindhyavilas/1.webp",
    "type": "Hospitality"
  },
  {
    "title": "The Oberoi, Gurugram",
    "description": "The Oberoi, Gurgaon, voted Asia’s Leading Luxury Hotel at the World Travel Awards 2011, defines the city hotel experience with its philosophy of height, light, and space. Spread across nine acres, the hotel features serene water bodies, a forested driveway, and beautifully landscaped greens. Atpl has integrated lighting control solutions, Lutron HomeWorks systems, and international seeTouch keypads across key public areas, including the lobby, reception, and restaurants.",
    "imageUrl": "/images/projects/hospitality/oberoi-gurugram/1.avif",
    "type": "Hospitality"
  },
  {
    "title": "The Oberoi, Nariman Point, Mumbai",
    "description": "The Oberoi Mumbai Conceptualised by Ad100 architect Akshat Bhatt of Architecture Discipline, The Oberoi Residential Suites blend timeless luxury with contemporary elegance. An icon born from Mumbai’s 1970s modernist wave, The Oberoi stands proudly along Marine Drive. Atpl has integrated MyRoom systems, Pico and Palladium keypads in guest rooms and suites, along with HomeWorks and international SeeTouch keypads across restaurants, banquet areas, and other public spaces.",
    "imageUrl": "/images/projects/hospitality/oberoi-mumbai/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "The Park, Hyderabad",
    "description": "The Park Hyderabad Opened in 2010 along the scenic Hussain Sagar Lake, The Park Hyderabad is a luxury boutique hotel known for its bold contemporary design and vibrant nightlife culture Atpl has integrated lighting control solutions, HomeWorks systems, and international seeTouch keypads across key public areas, including the lobby, reception, and restaurants",
    "imageUrl": "/images/projects/hospitality/the-park-hyderabad/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "The Park, Navi Mumbai",
    "description": "The Park, Mumbai Atpl has integrated lighting control solutions, HomeWorks systems, and international seeTouch keypads across key public areas, including the lobby, reception, and restaurants",
    "imageUrl": "/images/projects/hospitality/the-park-navi-mumbai/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "The Ritz-Carlton, Bangalore",
    "description": "The hotel offers seven dining venues, a wellness floor with a spa, gym, and temperature-controlled pool, along with 277 rooms and suites, a Club Lounge, and state-of-the-art conference spaces.Atpl integrated HomeWorks, international seeTouch keypads, and advanced lighting control across public areas including the lobby, reception, banquets, and restaurants.",
    "imageUrl": "/images/projects/hospitality/ritz-carlton-bangalore/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "The Ritz-Carlton, Pune",
    "description": "The Ritz-Carlton, Pune is a retreat located in the heart of the city, overlooking the Poona Club Golf Course. The 5 star hotel features 198 rooms and suites along with a Club Lounge. Atpl has integrated lighting control solutions, HomeWorks systems, and international seeTouch keypads across key public areas, including the lobby, reception, and restaurants.",
    "imageUrl": "/images/projects/hospitality/ritz-carlton-pune/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "The Soaltee, Kathmandu, Nepal",
    "description": "Atpl delivered lighting control with Dali modules, phase-cut dimming, and SeeTouch keypads across public areas, lobby, restaurants, game pool, and all day dining.",
    "imageUrl": "/images/projects/hospitality/soaltee-nepal/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "The Westin Hyderabad Mindspace",
    "description": "Westin Hyderabad Atpl has integrated lighting control solutions, HomeWorks systems, and international seeTouch keypads across key public areas, including the lobby, reception, and restaurants",
    "imageUrl": "/images/projects/hospitality/westin-hyderabad/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "The Westin Resort & Spa, Himalayas",
    "description": "Hillside wellness retreat automation with intelligent energy-saving thermostats, automated exterior façade lighting, and calm room scenes.",
    "imageUrl": "/images/projects/hospitality/westin-himalayas/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "Trident, Gurugram",
    "description": "Trident, Gurgaon Atpl has integrated lighting control solutions, HomeWorks systems, and international seeTouch keypads across key public areas, including the lobby, reception, and restaurants",
    "imageUrl": "/images/projects/hospitality/trident-gurgaon/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "Trident, Hitec City, Hyderabad",
    "description": "Developed by the Oberoi Group, this hotel is located in Hitec City, Hyderabad. Completed in 2026. Atpl integrated lighting automation with the Athena system, phase-cut & 0–10V modules, and International seeTouch keypads across public areas and restaurant spaces including Amara and Kanak. Atpl also integrated the Kaveri, Padma & Godavari Ballrooms, along with the Tulip & Iris meeting rooms for centralised lighting automation.",
    "imageUrl": "/images/projects/hospitality/trident-hyderabad/1.avif",
    "type": "Hospitality"
  },
  {
    "title": "Vivanta by Taj, Whitefield, Bengaluru",
    "description": "Atpl delivered integrated lighting control with HomeWorks systems and international seeTouch keypads across key public areas, including the lobby, reception, and restaurants.",
    "imageUrl": "/images/projects/hospitality/taj-vivanta-bangalore/1.avif",
    "type": "Hospitality"
  },
  {
    "title": "Welcomhotel by Itc Hotels",
    "description": "[Awaiting Description - Add your description here]",
    "imageUrl": "/images/projects/hospitality/welcomhotel-itc/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "Welcomhotel by Itc Hotels, Bhubaneswar",
    "description": "[Awaiting Description - Add your description here]",
    "imageUrl": "/images/projects/hospitality/welcomhotel-bhubaneswar/1.jpg",
    "type": "Hospitality"
  },
  {
    "title": "Ernst & Young (Ey) Corporate Campus, Gurgaon",
    "description": "Large-scale enterprise lighting automation, smart floor energy management, and executive conference facility audio-video orchestration.",
    "imageUrl": "/images/projects/commercial/ey-gurgaon/1.jpg",
    "type": "Commercial"
  },
  {
    "title": "Meta Corporate Office, Gurgaon",
    "description": "Lighting automation executed by Atpl for the Meta India office in Gurugram. Executed across four floors, the system includes daylight-based dimming near façade zones, wireless occupancy sensors across workstations, and scene-based lighting controls via Pico keypads in cabins and conference rooms. A central Quantum processor enables Bms integration and real-time energy monitoring.",
    "imageUrl": "/images/projects/commercial/meta-office-gurgaon/1.jpg",
    "type": "Commercial"
  },
  {
    "title": "Nvidia Corporate Campus, Bengaluru",
    "description": "High-performance tech headquarters with daylight-harvesting sensors, meeting room scheduling automation, and circadian lighting.",
    "imageUrl": "/images/projects/commercial/nvidia/1.jpg",
    "type": "Commercial"
  },
  {
    "title": "Barclays Bank Global Centre, Chennai",
    "description": "Atpl automated lighting controls for 3 floors with Quantum system & Pico keypads",
    "imageUrl": "/images/projects/commercial/barclays-bank-chennai/1.jpg",
    "type": "Commercial"
  },
  {
    "title": "Tiffany & Co. Flagship Boutique, Mumbai",
    "description": "Tiffany & Co., Jio World Plaza, Mumbai. The global jewellery brand features automation systems including lighting, audio-video and security. Atpl integrated Palladiom keypads, Elan processor, Bose speakers, Yamaha mixer, and an integrated fire alarm control. Completed in 2024.",
    "imageUrl": "/images/projects/commercial/tiffany-mumbai/1.jpg",
    "type": "Commercial"
  },
  {
    "title": "Bmw Experience Centre & Showroom, Gurugram",
    "description": "Dynamic automotive display spotlighting scenes, client consultation lounge automation, and customer delivery bay lighting effects.",
    "imageUrl": "/images/projects/commercial/bmw-showroom/1.jpg",
    "type": "Commercial"
  },
  {
    "title": "Ferrari Flagship Showroom, Bengaluru",
    "description": "Atpl integrated Athena Processor, Wire Landing Board, Dali Module and engraved Palladium Keypads.",
    "imageUrl": "/images/projects/commercial/ferrari-showroom/1.jpg",
    "type": "Commercial"
  },
  {
    "title": "Chennai Metro Rail Transit Hub, Chennai",
    "description": "Heavy infrastructure passenger transit lighting management operating across 24-hour cycles with high-efficiency daylight compensation.",
    "imageUrl": "/images/projects/commercial/chennai-metro/1.jpg",
    "type": "Commercial"
  },
  {
    "title": "Wave Cinemas Multiplex, Noida",
    "description": "Automated multiplex illumination synchronized with digital projection servers, managing smooth house light dim-to-black and intermission brightening.",
    "imageUrl": "/images/projects/commercial/wave-cinema/1.jpg",
    "type": "Commercial"
  },
  {
    "title": "Yashraj Studio Sound Stages, Mumbai",
    "description": "Atpl integrated standalone modules and SeeTouch keypads.",
    "imageUrl": "/images/projects/commercial/yashraj-studio/1.jpg",
    "type": "Commercial"
  },
  {
    "title": "Indian Oil Corporation (Iocl) Corporate Towers",
    "description": "Indian Oil Corporation Limited (Iocl) As India’s largest energy Psu, Indian Oil powers mobility, industry, and households with its vast network of refineries, pipelines, and retail outlets. In 2023, Atpl integrated lighting controls, Pico keypads, and Dali dimming solutions at Iocl, Delhi.",
    "imageUrl": "/images/projects/commercial/iocl/1.jpg",
    "type": "Commercial"
  },
  {
    "title": "Rio Tinto Corporate Office, Gurgaon",
    "description": "[Awaiting Description - Add your description here]",
    "imageUrl": "/images/projects/commercial/ey-gurgaon/2.jpg",
    "type": "Commercial"
  },
  {
    "title": "Lupin Corporate Office, Mumbai",
    "description": "[Awaiting Description - Add your description here]",
    "imageUrl": "/images/projects/commercial/meta-office-gurgaon/2.jpg",
    "type": "Commercial"
  },
  {
    "title": "Hsbc Corporate Office, Gurugram & Mumbai",
    "description": "[Awaiting Description - Add your description here]",
    "imageUrl": "/images/projects/commercial/nvidia/1.jpg",
    "type": "Commercial"
  },
  {
    "title": "J. M. Baxi & Co. Headquarters, Noida",
    "description": "[Awaiting Description - Add your description here]",
    "imageUrl": "/images/projects/commercial/iocl/1.jpg",
    "type": "Commercial"
  },
  {
    "title": "Anz Operations Hub, Bangalore",
    "description": "[Awaiting Description - Add your description here]",
    "imageUrl": "/images/projects/commercial/barclays-bank-chennai/2.jpg",
    "type": "Commercial"
  },
  {
    "title": "Serum Institute Corporate Office, Pune",
    "description": "[Awaiting Description - Add your description here]",
    "imageUrl": "/images/projects/commercial/meta-office-gurgaon/1.jpg",
    "type": "Commercial"
  },
  {
    "title": "Dior Flagship Boutique, Mumbai",
    "description": "Atpl integrated advanced lighting control systems with International SeeTouch keypads.",
    "imageUrl": "/images/projects/commercial/ey-gurgaon/1.jpg",
    "type": "Commercial"
  },
  {
    "title": "Louis Vuitton Flagship, Mumbai",
    "description": "Louis Vuitton Flagship Store, Mumbai. Lighting control systems by Atpl. Completed in 2023.",
    "imageUrl": "/images/projects/commercial/ey-gurgaon/1.jpg",
    "type": "Commercial"
  },
  {
    "title": "Iim Ranchi Campus, Jharkhand",
    "description": "[Awaiting Description - Add your description here]",
    "imageUrl": "/images/projects/commercial/ey-gurgaon/1.jpg",
    "type": "Commercial"
  },
  {
    "title": "Iit Kanpur & Iit Roorkee",
    "description": "[Awaiting Description - Add your description here]",
    "imageUrl": "/images/projects/commercial/ey-gurgaon/1.jpg",
    "type": "Commercial"
  },
  {
    "title": "Graphic Era University, Dehradun",
    "description": "[Awaiting Description - Add your description here]",
    "imageUrl": "/images/projects/commercial/wave-cinema/1.jpg",
    "type": "Commercial"
  },
  {
    "title": "T3 Vip Lounge, Delhi International Airport",
    "description": "[Awaiting Description - Add your description here]",
    "imageUrl": "/images/projects/restaurant/golden-dragon/1.jpg",
    "type": "Commercial"
  },
  {
    "title": "Global Tech Expo, Pragati Maidan, Delhi",
    "description": "[Awaiting Description - Add your description here]",
    "imageUrl": "/images/projects/commercial/ey-gurgaon/1.jpg",
    "type": "Commercial"
  },
  {
    "title": "Luxury Auto Showcase, Jio World Convention Centre, Mumbai",
    "description": "[Awaiting Description - Add your description here]",
    "imageUrl": "/images/projects/commercial/nvidia/1.jpg",
    "type": "Commercial"
  },
  {
    "title": "International Design Week, Biec, Bangalore",
    "description": "[Awaiting Description - Add your description here]",
    "imageUrl": "/images/projects/commercial/meta-office-gurgaon/1.jpg",
    "type": "Commercial"
  },
  {
    "title": "National Heritage Exhibition, New Delhi",
    "description": "[Awaiting Description - Add your description here]",
    "imageUrl": "/images/projects/commercial/tiffany-mumbai/1.jpg",
    "type": "Commercial"
  },
  {
    "title": "Akina Contemporary Japanese, Mumbai",
    "description": "Akina, Mumbai Akina is Bandra’s newest Japanese restaurant and bar, spanning 5,000 sq. ft. with seating for 85 guests. Atpl integrated lighting control with Qsx processor, Dali module, switching module, and international SeeTouch keypads, covering the entry area, bar, seating, washrooms, and passages.",
    "imageUrl": "/images/projects/restaurant/akina-mumbai/1.jpg",
    "type": "Commercial"
  },
  {
    "title": "Asian Restaurant Madam Chow, Mumbai",
    "description": "Bespoke Asian dining lounge featuring oriental warm-red architectural accents, table-focused dimming, and high-fidelity sound distribution.",
    "imageUrl": "/images/projects/restaurant/asian-restaurant-madam-chow/1.jpg",
    "type": "Commercial"
  },
  {
    "title": "Brunch & Cake, Mumbai / Delhi",
    "description": "Brunch & Cake, Mumbai From its roots in Barcelona to the world, Brunch & Cake opened doors in Worli at Raheja Altimus.Atpl integrated lighting automation with International SeeTouch keypads",
    "imageUrl": "/images/projects/restaurant/brunch-and-cake/1.avif",
    "type": "Commercial"
  },
  {
    "title": "Golden Dragon Restaurant, New Delhi",
    "description": "Celebrated legacy Asian restaurant enhanced with discreet modern lighting presets, custom crystal chandelier dimming, and banquet scene automation.",
    "imageUrl": "/images/projects/restaurant/golden-dragon/1.jpg",
    "type": "Commercial"
  },
  {
    "title": "Le Cirque, The Leela Palace, New Delhi",
    "description": "Le Cirque at The Leela Palace New Delhi brings the legacy of New York’s iconic fine-dining restaurant to India. Since its opening in 2011, Atpl integrated power supply, Athena modules, Dali modules, and international SeeTouch keypads throughout the space.",
    "imageUrl": "/images/projects/restaurant/le-cirque-delhi/1.png",
    "type": "Commercial"
  },
  {
    "title": "Mkt, The Chanakya, New Delhi",
    "description": "Mkt at The Chanakya Mall, Lutyens’ Delhi is a dining space within a 189,000 sq. ft. development, with lighting control commissioned by Atpl, featuring a HomeWorks system and international SeeTouch keypads.",
    "imageUrl": "/images/projects/restaurant/mkt-chanakya/1.jpg",
    "type": "Commercial"
  },
  {
    "title": "Nox Lounge & Dining, Mumbai",
    "description": "Located in the Westin, Powai, this restaurant was integrated by Atpl in 2025. Automation includes lighting controls, International Seetouch keypads, and motorised shades.",
    "imageUrl": "/images/projects/restaurant/nox-mumbai/1.jpg",
    "type": "Commercial"
  },
  {
    "title": "Oko Pan Asian Restaurant, Bengaluru",
    "description": "Rooftop pan-Asian restaurant with panoramic skyline views, automated solar glare shading, and ambient evening twilight illumination.",
    "imageUrl": "/images/projects/restaurant/oko/1.jpg",
    "type": "Commercial"
  },
  {
    "title": "Opa Kipos Greek Dining, Mumbai",
    "description": "Opa Kipos, Mumbai By Aspect Hospitality Group, led by Aksha Kamboj. Atpl integratesd lighting, switching, Dali modules, and Palladium & International See Touch keypads for the perfect ambiance.",
    "imageUrl": "/images/projects/restaurant/opa-kipos-mumbai/1.webp",
    "type": "Commercial"
  },
  {
    "title": "The Qube, The Leela Palace, New Delhi",
    "description": "Qube at The Leela Palace, New Delhi Established in April 2011, alongside the inauguration of The Leela Palace New Delhi, Qube was the hotel’s first restaurant, setting the standard for its culinary offerings. Atpl integrates power supply, Athena modules, Dali modules, and international SeeTouch keypads to enhance lighting, ambiance, and guest comfort throughout the space.",
    "imageUrl": "/images/projects/restaurant/qube-leela/1.jpg",
    "type": "Commercial"
  },
  {
    "title": "Rue Du Liban, Mumbai",
    "description": "Atpl delivered lighting control with Dali modules, phase-cut dimming, and SeeTouch keypads across public areas, lobby, restaurants, game pool, and all day dining.",
    "imageUrl": "/images/projects/restaurant/rue-du-liban/1.jpg",
    "type": "Commercial"
  },
  {
    "title": "Thai Naam, Mumbai",
    "description": "Atpl integrated this 2500 sq. ft. restaurant relocated to Bandra with advanced lighting automation. Completed in 2025.",
    "imageUrl": "/images/projects/restaurant/thai-naam-mumbai/1.jpg",
    "type": "Commercial"
  },
  {
    "title": "Unico Experiential Dining, Gurugram",
    "description": "Unico, Gurgaon offers a Mediterranean-European menu with fresh, plant-forward dishes and an in-house eggless bakery.Atpl integrated power supply, Dali modules, switching modules, adaptive modules, a single-line processor, Palladiom keypads, and occupancy sensor",
    "imageUrl": "/images/projects/restaurant/unico/1.jpg",
    "type": "Commercial"
  },
  {
    "title": "Ziya by Vineet Bhatia, The Oberoi Mumbai",
    "description": "Michelin-starred chef destination restaurant with bespoke table spotlighting, gold-leaf ceiling illumination, and panoramic sea views.",
    "imageUrl": "/images/projects/restaurant/ziya-oberoi/1.avif",
    "type": "Commercial"
  }
];

async function main() {
  console.log('Clearing existing projects...');
  await prisma.project.deleteMany();

  console.log(`Seeding ${REAL_PROJECTS.length} verified projects...`);
  for (const project of REAL_PROJECTS) {
    await prisma.project.create({
      data: project,
    });
  }

  console.log('Database successfully populated with verified projects!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
