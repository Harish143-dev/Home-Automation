export interface ProjectData {
  id: string;
  slug: string;
  title: string;
  category: 'Residential' | 'Hospitality' | 'Commercial' | 'Restaurant';
  location: string;
  image: string;
  gallery?: string[];
  description: string;
  usps?: string[];
  features?: string[];
  date: string;
  readTime: string;
  href: string;
}

export const RESIDENTIAL_PROJECTS: ProjectData[] = [
  {
    id: 'res-anubhav-jain',
    slug: 'anubhav-jain-farmhouse',
    title: 'Anubhav Jain Farmhouse',
    category: 'Residential',
    location: 'New Delhi',
    image: '/images/projects/residential/anubhav-jain-farmhouse/1.jpg',
    gallery: [
      '/images/projects/residential/anubhav-jain-farmhouse/1.jpg',
      '/images/projects/residential/anubhav-jain-farmhouse/2.jpg'
    ],
    description: 'Curated architectural lighting controls, automated climate regulation, and comprehensive security integration across an expansive 15,000 sq.ft. private luxury estate in New Delhi.',
    usps: ['Lutron HomeWorks QSX', 'HVAC Integration', 'Perimeter Biometrics'],
    features: ['Scene-based keypad engraving', 'Circadian rhythm lighting', 'Motorized drapery tracks'],
    date: 'Jan 2024',
    readTime: '4 min read',
    href: '/projects/anubhav-jain-farmhouse'
  },
  {
    id: 'res-bhartiya',
    slug: 'bhartiya-residence',
    title: 'Bhartiya Residence',
    category: 'Residential',
    location: 'Bengaluru',
    image: '/images/projects/residential/bhartiya-residence/1.jpg',
    gallery: [
      '/images/projects/residential/bhartiya-residence/1.jpg',
      '/images/projects/residential/bhartiya-residence/2.jpg'
    ],
    description: 'Integrated whole-home automation featuring Lutron motorized drapery, architectural scene recall, and multi-zone entertainment systems in Bangalore.',
    usps: ['Whole-Home Automation', 'Motorized Drapery', 'Multi-Zone AV'],
    features: ['Custom solid-brass keypads', 'Automated daylight harvesting', 'Zero-latency mobile app control'],
    date: 'Nov 2023',
    readTime: '3 min read',
    href: '/projects/bhartiya-residence'
  },
  {
    id: 'res-vishal-udani',
    slug: 'vishal-udani-residence',
    title: 'Vishal Udani Residence',
    category: 'Residential',
    location: 'Mumbai',
    image: '/images/projects/residential/vishal-udani/1.jpg',
    gallery: [
      '/images/projects/residential/vishal-udani/1.jpg',
      '/images/projects/residential/vishal-udani/2.jpg'
    ],
    description: 'Seamless multi-room high-resolution audio distribution, customized tactile keypad interfaces, and intelligent climate automation overlooking Mumbai coastline.',
    usps: ['High-Res Audio Routing', 'Tactile Keypad Design', 'Intelligent Climate'],
    features: ['Acoustic isolation zones', 'Automated sunset & party scenes', 'Lutron Palladiom keypads'],
    date: 'Dec 2023',
    readTime: '4 min read',
    href: '/projects/vishal-udani-residence'
  },
  {
    id: 'res-sanjeet-bhasin',
    slug: 'sanjeet-bhasin-residence',
    title: 'Sanjeet Bhasin Residence',
    category: 'Residential',
    location: 'New Delhi',
    image: '/images/projects/residential/sanjeet-bhasin/1.jpg',
    gallery: [
      '/images/projects/residential/sanjeet-bhasin/1.jpg',
      '/images/projects/residential/sanjeet-bhasin/2.jpg'
    ],
    description: 'Smart ambient scene setting, biometric perimeter security, and integrated high-fidelity AV zones with acoustic isolation in an ultra-prime New Delhi enclave.',
    usps: ['Biometric Access Control', 'Acoustic AV Zones', 'Architectural Dimming'],
    features: ['Warm-dim 2200K cove illumination', 'Silent motorized shades', 'Whole-home energy telemetry'],
    date: 'Feb 2024',
    readTime: '3 min read',
    href: '/projects/sanjeet-bhasin-residence'
  },
  {
    id: 'res-sournika-villa',
    slug: 'sournika-villa',
    title: 'Sournika Villa',
    category: 'Residential',
    location: 'Goa',
    image: '/images/projects/residential/sournika-villa/1.jpg',
    gallery: [
      '/images/projects/residential/sournika-villa/1.jpg',
      '/images/projects/residential/sournika-villa/2.jpg'
    ],
    description: 'Luxury coastal estate automation featuring integrated exterior landscaping lights, pool controls, and bespoke bedside master scene keypads in Goa.',
    usps: ['Landscape Illumination', 'Pool & Spa Automation', 'Bedside Master Keypads'],
    features: ['Salt-air resilient enclosures', 'Astrological dusk-to-dawn triggers', 'Guest suite privacy management'],
    date: 'Mar 2024',
    readTime: '5 min read',
    href: '/projects/sournika-villa'
  },
  {
    id: 'res-aranyak-farmhouse',
    slug: 'aranyak-farmhouse',
    title: 'Aranyak Farmhouse',
    category: 'Residential',
    location: 'New Delhi',
    image: '/images/projects/residential/aranyak-farmhouse/1.jpg',
    gallery: [
      '/images/projects/residential/aranyak-farmhouse/1.jpg',
      '/images/projects/residential/aranyak-farmhouse/2.jpg'
    ],
    description: 'Expansive private farmhouse automation combining centralized HVAC management, daylight sensors, and Lutron HomeWorks QSX lighting throughout 20,000 sq.ft.',
    usps: ['Lutron QSX Integration', 'Centralized HVAC', 'Solar Harvesting'],
    features: ['Multi-acre perimeter security', 'Master entertainment pavilion', 'Custom architectural scenes'],
    date: 'Apr 2024',
    readTime: '4 min read',
    href: '/projects/aranyak-farmhouse'
  },
  {
    id: 'res-nakul-bhatia',
    slug: 'nakul-bhatia-residence',
    title: 'Nakul Bhatia Residence',
    category: 'Residential',
    location: 'Gurugram',
    image: '/images/projects/residential/nakul-bhatia/1.jpg',
    gallery: [
      '/images/projects/residential/nakul-bhatia/1.jpg',
      '/images/projects/residential/nakul-bhatia/2.jpg'
    ],
    description: 'Bespoke residential smart automation with motorized blackout shading, architectural warm-dim downlights, and smart distribution panels.',
    usps: ['Blackout Shading', 'Warm-Dim Downlights', 'Smart Panels'],
    features: ['Circadian wake-up sequences', 'Tactile button feedback', 'Single-touch "All Off" departure mode'],
    date: 'May 2024',
    readTime: '3 min read',
    href: '/projects/nakul-bhatia-residence'
  }
];

export const COMMERCIAL_PROJECTS: ProjectData[] = [
  {
    id: 'com-meta',
    slug: 'meta-office-gurgaon',
    title: 'Meta Corporate Office',
    category: 'Commercial',
    location: 'Gurugram',
    image: '/images/projects/commercial/meta-office-gurgaon/1.jpg',
    gallery: [
      '/images/projects/commercial/meta-office-gurgaon/1.jpg',
      '/images/projects/commercial/meta-office-gurgaon/2.jpg'
    ],
    description: 'State-of-the-art collaborative enterprise headquarters equipped with dynamic daylight-harvesting lighting, intelligent occupancy sensors, and smart boardroom AV orchestration.',
    usps: ['Lutron Athena Backbone', 'Occupancy-Driven Lighting', 'Conferencing AV Sync'],
    features: ['Automated motorized solar shades', 'Dynamic workspace zoning', 'Enterprise energy analytics'],
    date: 'Jan 2024',
    readTime: '5 min read',
    href: '/projects/meta-office-gurgaon'
  },
  {
    id: 'com-ey',
    slug: 'ey-gurgaon',
    title: 'Ernst & Young (EY) Corporate Campus',
    category: 'Commercial',
    location: 'Gurugram',
    image: '/images/projects/commercial/ey-gurgaon/1.jpg',
    gallery: [
      '/images/projects/commercial/ey-gurgaon/1.jpg',
      '/images/projects/commercial/ey-gurgaon/2.jpg'
    ],
    description: 'Large-scale corporate campus lighting automation spanning 150,000 sq.ft., integrating floor-by-floor energy management and high-reliability executive boardroom control.',
    usps: ['Enterprise Lighting Controls', '22% Peak Energy Savings', 'BMS Cross-Talk'],
    features: ['DALI-2 addressable fixtures', 'Daylight harvesting corridors', 'Executive board matrix control'],
    date: 'Dec 2023',
    readTime: '4 min read',
    href: '/projects/ey-gurgaon'
  },
  {
    id: 'com-nvidia',
    slug: 'nvidia-campus',
    title: 'NVIDIA Corporate Campus',
    category: 'Commercial',
    location: 'Bengaluru',
    image: '/images/projects/commercial/nvidia/1.jpg',
    gallery: [
      '/images/projects/commercial/nvidia/1.jpg',
      '/images/projects/commercial/nvidia/2.jpg'
    ],
    description: 'High-performance technology campus engineered with circadian lighting algorithms, intelligent meeting space schedulers, and zero-downtime control panels.',
    usps: ['Circadian Lighting', 'Meeting Room Automation', 'Zero-Downtime Panels'],
    features: ['Tunable white CRI 95+ LEDs', 'Presence telemetry triggers', 'Custom facility management dashboard'],
    date: 'Feb 2024',
    readTime: '4 min read',
    href: '/projects/nvidia-campus'
  },
  {
    id: 'com-barclays',
    slug: 'barclays-bank-chennai',
    title: 'Barclays Bank Global Centre',
    category: 'Commercial',
    location: 'Chennai',
    image: '/images/projects/commercial/barclays-bank-chennai/1.jpg',
    gallery: [
      '/images/projects/commercial/barclays-bank-chennai/1.jpg',
      '/images/projects/commercial/barclays-bank-chennai/2.jpg'
    ],
    description: 'Institutional financial services center with centralized Building Management System (BMS) integration, strict ISO compliance, and redundant power-line controls.',
    usps: ['BMS Protocol Integration', 'ISO Energy Compliance', 'Redundant Hardware'],
    features: ['High-security access lockout', 'Automated after-hours dimming', 'Emergency egress lighting recall'],
    date: 'Mar 2024',
    readTime: '4 min read',
    href: '/projects/barclays-bank-chennai'
  },
  {
    id: 'com-tiffany',
    slug: 'tiffany-mumbai',
    title: 'Tiffany & Co. Flagship Boutique',
    category: 'Commercial',
    location: 'Mumbai',
    image: '/images/projects/commercial/tiffany-mumbai/1.jpg',
    gallery: [
      '/images/projects/commercial/tiffany-mumbai/1.jpg',
      '/images/projects/commercial/tiffany-mumbai/2.jpg'
    ],
    description: 'Ultra-luxury retail illumination with museum-grade color rendering (CRI 98+), automated display showcase dimming, and private client VIP salon scene presets.',
    usps: ['Museum-Grade CRI 98+', 'Automated Display Lighting', 'VIP Salon Presets'],
    features: ['Discreet keypad aesthetics', 'Multi-zone showcase dimming', 'High-fidelity acoustic isolation'],
    date: 'Apr 2024',
    readTime: '3 min read',
    href: '/projects/tiffany-mumbai'
  },
  {
    id: 'com-bmw',
    slug: 'bmw-showroom',
    title: 'BMW Experience Centre & Showroom',
    category: 'Commercial',
    location: 'Gurugram',
    image: '/images/projects/commercial/bmw-showroom/1.jpg',
    gallery: [
      '/images/projects/commercial/bmw-showroom/1.jpg',
      '/images/projects/commercial/bmw-showroom/2.jpg'
    ],
    description: 'Dynamic automotive showroom lighting with synchronized vehicle unveil spotlighting scenes, client consultation lounge automation, and customer delivery bay effects.',
    usps: ['Automotive Unveil Scenes', 'Delivery Bay Lighting', 'Client Lounge Automation'],
    features: ['High-output spotlighting tracks', 'One-touch presentation modes', 'Custom architectural color temp'],
    date: 'Jan 2024',
    readTime: '3 min read',
    href: '/projects/bmw-showroom'
  },
  {
    id: 'com-ferrari',
    slug: 'ferrari-showroom',
    title: 'Ferrari Flagship Showroom',
    category: 'Commercial',
    location: 'Bengaluru',
    image: '/images/projects/commercial/ferrari-showroom/1.jpg',
    gallery: [
      '/images/projects/commercial/ferrari-showroom/1.jpg',
      '/images/projects/commercial/ferrari-showroom/2.jpg'
    ],
    description: 'Iconic Italian supercar showroom illumination highlighting Rosso Corsa paintwork with high-precision optics, dynamic glare control, and VIP lounge audio.',
    usps: ['Precision Optics', 'Dynamic Glare Control', 'Supercar Spotlight Scenes'],
    features: ['Tunable kelvin calibration', 'Automated curtain drapery', 'Centralized iPad command hub'],
    date: 'May 2024',
    readTime: '3 min read',
    href: '/projects/ferrari-showroom'
  },
  {
    id: 'com-chennai-metro',
    slug: 'chennai-metro',
    title: 'Chennai Metro Rail Transit Hub',
    category: 'Commercial',
    location: 'Chennai',
    image: '/images/projects/commercial/chennai-metro/1.jpg',
    gallery: [
      '/images/projects/commercial/chennai-metro/1.jpg',
      '/images/projects/commercial/chennai-metro/2.jpg'
    ],
    description: 'Heavy infrastructure passenger transit lighting management operating across 24-hour cycles with high-efficiency daylight compensation and centralized monitoring.',
    usps: ['Heavy Infrastructure Lighting', '24/7 Reliability', 'Daylight Compensation'],
    features: ['Automated public zone schedules', 'Vandal-resistant sensors', 'Central operations station telemetry'],
    date: 'Jun 2024',
    readTime: '4 min read',
    href: '/projects/chennai-metro'
  },
  {
    id: 'com-wave-cinema',
    slug: 'wave-cinema',
    title: 'Wave Cinemas Multiplex',
    category: 'Commercial',
    location: 'Noida',
    image: '/images/projects/commercial/wave-cinema/1.jpg',
    gallery: [
      '/images/projects/commercial/wave-cinema/1.jpg',
      '/images/projects/commercial/wave-cinema/2.jpg'
    ],
    description: 'Automated multiplex illumination synchronized with digital projection servers, managing smooth house light dim-to-black and intermission brightening.',
    usps: ['DCP Server Synchronization', 'Auditorium Dim-to-Black', 'Concession Area Automation'],
    features: ['Seamless fade curves', 'Staff override keypads', 'Automated cleaning & safety scene recall'],
    date: 'Jul 2024',
    readTime: '3 min read',
    href: '/projects/wave-cinema'
  },
  {
    id: 'com-yashraj',
    slug: 'yashraj-studio',
    title: 'Yashraj Studio Sound Stages',
    category: 'Commercial',
    location: 'Mumbai',
    image: '/images/projects/commercial/yashraj-studio/1.jpg',
    gallery: [
      '/images/projects/commercial/yashraj-studio/1.jpg',
      '/images/projects/commercial/yashraj-studio/2.jpg'
    ],
    description: 'World-class film production sound stages featuring silent low-voltage dimming, acoustically treated control room lighting, and studio screening suite automation.',
    usps: ['Silent Low-Voltage Dimming', 'Studio Screening Suites', 'Acoustic Control Lighting'],
    features: ['Zero electromagnetic interference', 'On-air indicator integration', 'Director review lounge presets'],
    date: 'Aug 2024',
    readTime: '4 min read',
    href: '/projects/yashraj-studio'
  },
  {
    id: 'com-iocl',
    slug: 'iocl-headquarters',
    title: 'Indian Oil Corporation (IOCL) Corporate Towers',
    category: 'Commercial',
    location: 'New Delhi',
    image: '/images/projects/commercial/iocl/1.jpg',
    gallery: [
      '/images/projects/commercial/iocl/1.jpg',
      '/images/projects/commercial/iocl/2.jpg'
    ],
    description: 'Public sector energy enterprise headquarters with multi-story intelligent lighting management, automated auditorium stages, and conference control.',
    usps: ['Centralized Facility Controls', 'Energy Metering', 'Conference Audio-Visual'],
    features: ['Automated conference schedules', 'Occupancy-triggered corridors', 'Centralized facility maintenance alerts'],
    date: 'Sep 2024',
    readTime: '4 min read',
    href: '/projects/iocl-headquarters'
  }
];

export const HOSPITALITY_PROJECTS: ProjectData[] = [
  {
    id: 'hosp-six-senses',
    slug: 'six-senses-fort-barwara',
    title: 'Six Senses Fort Barwara',
    category: 'Hospitality',
    location: 'Sawai Madhopur, Rajasthan',
    image: '/images/projects/hospitality/six-senses-barwara/1.jpg',
    gallery: [
      '/images/projects/hospitality/six-senses-barwara/1.jpg',
      '/images/projects/hospitality/six-senses-barwara/2.jpg'
    ],
    description: 'Restoration of a 14th-century royal fortress into a 5-star sanctuary resort, featuring low-profile guestroom management (GRMS), wellness spa lighting, and majestic courtyards.',
    usps: ['Discreet Heritage GRMS', 'Circadian Spa Wellness', 'Courtyard Architectural Scenes'],
    features: ['Custom brass tactile keypads', 'Automated curtain tracking', 'Centralized resort BMS connectivity'],
    date: 'Oct 2023',
    readTime: '5 min read',
    href: '/projects/six-senses-fort-barwara'
  },
  {
    id: 'hosp-oberoi-amarvillas',
    slug: 'oberoi-amarvillas-agra',
    title: 'Oberoi Amarvilas',
    category: 'Hospitality',
    location: 'Agra',
    image: '/images/projects/hospitality/oberoi-amarvillas/1.jpg',
    gallery: [
      '/images/projects/hospitality/oberoi-amarvillas/1.jpg',
      '/images/projects/hospitality/oberoi-amarvillas/2.jpg'
    ],
    description: 'Iconic luxury resort overlooking the Taj Mahal with bespoke presidential suite controls, illuminated fountains, and public foyer architectural lighting.',
    usps: ['Presidential Suite Controls', 'Fountain Illumination Scenes', 'Discreet Guest Interfaces'],
    features: ['Intuitive bedside touch points', 'Seamless staff service calls', 'Warm architectural dimming'],
    date: 'Nov 2023',
    readTime: '4 min read',
    href: '/projects/oberoi-amarvillas-agra'
  },
  {
    id: 'hosp-oberoi-rajvillas',
    slug: 'oberoi-rajvillas-jaipur',
    title: 'Oberoi Rajvilas',
    category: 'Hospitality',
    location: 'Jaipur',
    image: '/images/projects/hospitality/oberoi-rajvillas/1.jpg',
    gallery: [
      '/images/projects/hospitality/oberoi-rajvillas/1.jpg',
      '/images/projects/hospitality/oberoi-rajvillas/2.jpg'
    ],
    description: 'Heritage palace resort with luxury tent and villa environmental automation, preserving classical Rajasthani craftsmanship while offering frictionless modern climate control.',
    usps: ['Heritage Villa Automation', 'Automated Climate Stability', 'Ambient Night Pathways'],
    features: ['Discreet architectural keypads', 'Custom welcome sequences', 'Low-impact electrical infrastructure'],
    date: 'Dec 2023',
    readTime: '4 min read',
    href: '/projects/oberoi-rajvillas-jaipur'
  },
  {
    id: 'hosp-taj-lakefront',
    slug: 'taj-lakefront-bhopal',
    title: 'Taj Lakefront',
    category: 'Hospitality',
    location: 'Bhopal',
    image: '/images/projects/hospitality/taj-lakefront-bhopal/1.jpg',
    gallery: [
      '/images/projects/hospitality/taj-lakefront-bhopal/1.jpg',
      '/images/projects/hospitality/taj-lakefront-bhopal/2.jpg'
    ],
    description: 'Comprehensive Guest Room Management System (GRMS) across 152 luxury rooms, grand lakefront ballroom lighting, and public lobby automation.',
    usps: ['Complete GRMS Deployment', 'Grand Ballroom Automation', 'Lakefront Lighting Scenes'],
    features: ['Door sensor occupancy logic', 'Automated energy setbacks', 'Central reception DND/MUR display'],
    date: 'Jan 2024',
    readTime: '4 min read',
    href: '/projects/taj-lakefront-bhopal'
  },
  {
    id: 'hosp-ritz-carlton-blr',
    slug: 'ritz-carlton-bangalore',
    title: 'The Ritz-Carlton',
    category: 'Hospitality',
    location: 'Bengaluru',
    image: '/images/projects/hospitality/ritz-carlton-bangalore/1.jpg',
    gallery: [
      '/images/projects/hospitality/ritz-carlton-bangalore/1.jpg',
      '/images/projects/hospitality/ritz-carlton-bangalore/2.jpg'
    ],
    description: 'Signature grand ballroom lighting scene control, VIP conference rooms, and centralized hotel public space architectural illumination.',
    usps: ['Signature Ballroom Lighting', 'Executive VIP Meeting Rooms', 'Centralized Public Space Control'],
    features: ['DMX color tuning capabilities', 'High-speed event scene changes', 'Central Lutron management'],
    date: 'Feb 2024',
    readTime: '4 min read',
    href: '/projects/ritz-carlton-bangalore'
  },
  {
    id: 'hosp-itc-grand-chola',
    slug: 'itc-grand-chola-chennai',
    title: 'ITC Grand Chola',
    category: 'Hospitality',
    location: 'Chennai',
    image: '/images/projects/hospitality/itc-grand-chola/1.jpg',
    gallery: [
      '/images/projects/hospitality/itc-grand-chola/1.jpg',
      '/images/projects/hospitality/itc-grand-chola/2.jpg'
    ],
    description: 'Grand architectural lighting controls across regal Chola dynasty inspired lobbies, extensive convention centers, and high-security luxury presidential suites.',
    usps: ['Monumental Lobby Illumination', 'Convention Center Zoning', 'High-Security Suite Controls'],
    features: ['LEED Platinum energy logic', 'Daylight tracking atrium sensors', 'Centralized engineering monitoring'],
    date: 'Mar 2024',
    readTime: '5 min read',
    href: '/projects/itc-grand-chola-chennai'
  },
  {
    id: 'hosp-westin-himalayas',
    slug: 'westin-resort-spa-himalayas',
    title: 'The Westin Resort & Spa, Himalayas',
    category: 'Hospitality',
    location: 'Rishikesh, Uttarakhand',
    image: '/images/projects/hospitality/westin-himalayas/1.jpg',
    gallery: [
      '/images/projects/hospitality/westin-himalayas/1.jpg',
      '/images/projects/hospitality/westin-himalayas/2.jpg'
    ],
    description: 'Hillside wellness retreat automation with intelligent energy-saving thermostats, automated exterior façade lighting, and tranquil circadian spa suites.',
    usps: ['Circadian Wellness Suites', 'Façade Architectural Lighting', 'Smart Energy Thermostats'],
    features: ['Mountain view daylight balancing', 'Intuitive wellness scene keypads', 'Automated outdoor fire pit lighting'],
    date: 'Apr 2024',
    readTime: '4 min read',
    href: '/projects/westin-resort-spa-himalayas'
  },
  {
    id: 'hosp-sawai-man-mahal',
    slug: 'sawai-man-mahal-jaipur',
    title: 'Sawai Man Mahal',
    category: 'Hospitality',
    location: 'Jaipur',
    image: '/images/projects/hospitality/sawai-man-mahal/1.jpg',
    gallery: [
      '/images/projects/hospitality/sawai-man-mahal/1.jpg',
      '/images/projects/hospitality/sawai-man-mahal/2.jpg'
    ],
    description: 'Historic palace restoration featuring integrated guest room automation systems, public heritage salons, and ornate royal banquet halls.',
    usps: ['Heritage Palace Restoration', 'Royal Banquet Automation', 'Guest Room Automation'],
    features: ['Discreet hardware finishes', 'Multi-zone chandelier dimming', 'Instant grand banquet scene recall'],
    date: 'May 2024',
    readTime: '4 min read',
    href: '/projects/sawai-man-mahal-jaipur'
  },
  {
    id: 'hosp-le-meridien',
    slug: 'le-meridien',
    title: 'Le Méridien Hotel',
    category: 'Hospitality',
    location: 'New Delhi',
    image: '/images/projects/hospitality/le-meridien/1.jpg',
    gallery: [
      '/images/projects/hospitality/le-meridien/1.jpg',
      '/images/projects/hospitality/le-meridien/2.jpg'
    ],
    description: 'Iconic modern city-centre hotel featuring automated atrium lighting, guest suite climate and drapery orchestration, and executive lounge control.',
    usps: ['Central Atrium Lighting', 'Guest Suite Motorized Drapery', 'Executive Lounge Scenes'],
    features: ['Daylight responsive glass roof', 'Smooth transition dimming', 'Centralized staff monitoring'],
    date: 'Jun 2024',
    readTime: '3 min read',
    href: '/projects/le-meridien'
  },
  {
    id: 'hosp-the-den',
    slug: 'the-den-bengaluru',
    title: 'The Den Bengaluru',
    category: 'Hospitality',
    location: 'Bengaluru',
    image: '/images/projects/hospitality/the-den-bangalore/1.jpg',
    gallery: [
      '/images/projects/hospitality/the-den-bangalore/1.jpg',
      '/images/projects/hospitality/the-den-bangalore/2.jpg'
    ],
    description: 'Contemporary tech-focused luxury hotel with seamless meeting room scheduling, dynamic lobby scene automation, and guestroom energy efficiency.',
    usps: ['Tech-Forward Hospitality', 'Meeting Room Sync', 'Dynamic Lobby Presets'],
    features: ['One-touch corporate presentations', 'App-free guest convenience', 'Smart environmental setbacks'],
    date: 'Jul 2024',
    readTime: '3 min read',
    href: '/projects/the-den-bengaluru'
  },
  {
    id: 'hosp-grand-hyatt-ggn',
    slug: 'grand-hyatt-gurgaon',
    title: 'Grand Hyatt',
    category: 'Hospitality',
    location: 'Gurugram',
    image: '/images/projects/hospitality/grand-hyatt-gurgaon/1.jpg',
    gallery: [
      '/images/projects/hospitality/grand-hyatt-gurgaon/1.jpg',
      '/images/projects/hospitality/grand-hyatt-gurgaon/2.jpg'
    ],
    description: 'Multi-zone architectural lighting automation, international conference centers, and high-end hospitality controls across luxury suites and fine-dining spaces.',
    usps: ['International Conference Hub', 'Luxury Suite Automation', 'Fine Dining Scene Settings'],
    features: ['Lutron Athena centralized processor', 'High-capacity dimming panels', 'Intuitive guest room bedside pads'],
    date: 'Aug 2024',
    readTime: '4 min read',
    href: '/projects/grand-hyatt-gurgaon'
  },
  {
    id: 'hosp-claridge',
    slug: 'the-claridges-new-delhi',
    title: 'The Claridges',
    category: 'Hospitality',
    location: 'New Delhi',
    image: '/images/projects/hospitality/claridge-delhi/1.jpg',
    gallery: [
      '/images/projects/hospitality/claridge-delhi/1.jpg',
      '/images/projects/hospitality/claridge-delhi/2.jpg'
    ],
    description: 'Colonial heritage landmark hotel featuring warm architectural illumination, courtyard garden lighting, and private dining salon automation.',
    usps: ['Heritage Architectural Glow', 'Courtyard Garden Lighting', 'Private Dining Presets'],
    features: ['Preserved vintage aesthetics', 'Modern digital control backbones', 'Acoustic background audio zones'],
    date: 'Sep 2024',
    readTime: '4 min read',
    href: '/projects/the-claridges-new-delhi'
  }
];

export const RESTAURANT_PROJECTS: ProjectData[] = [
  {
    id: 'rest-nox',
    slug: 'nox-lounge-mumbai',
    title: 'NOX Lounge & Dining',
    category: 'Restaurant',
    location: 'Mumbai',
    image: '/images/projects/restaurant/nox-mumbai/1.jpg',
    gallery: [
      '/images/projects/restaurant/nox-mumbai/1.jpg',
      '/images/projects/restaurant/nox-mumbai/2.jpg'
    ],
    description: 'High-energy dining and lounge venue with programmable ambient lighting scenes, automated bass acoustics, and multi-zone sound distribution.',
    usps: ['Dynamic Dining Transitions', 'Multi-Zone Audio Routing', 'Bass Acoustic Orchestration'],
    features: ['Day-to-night scene transitions', 'DJ booth lighting triggers', 'Private VIP cabana control'],
    date: 'Jan 2024',
    readTime: '3 min read',
    href: '/projects/nox-lounge-mumbai'
  },
  {
    id: 'rest-akina',
    slug: 'akina-japanese-mumbai',
    title: 'Akina Contemporary Japanese',
    category: 'Restaurant',
    location: 'Mumbai',
    image: '/images/projects/restaurant/akina-mumbai/1.jpg',
    gallery: [
      '/images/projects/restaurant/akina-mumbai/1.jpg',
      '/images/projects/restaurant/akina-mumbai/2.jpg'
    ],
    description: 'Contemporary Japanese dining automation featuring subtle mood transitions between daytime lunch service and vibrant evening cocktail dining.',
    usps: ['Japanese Minimalism Lighting', 'Warm 2000K Dimming', 'Subtle Scene Modulation'],
    features: ['Counter-top spotlight precision', 'Custom brass control stations', 'Acoustic isolation between bar and dining'],
    date: 'Feb 2024',
    readTime: '4 min read',
    href: '/projects/akina-japanese-mumbai'
  },
  {
    id: 'rest-rue-du-liban',
    slug: 'rue-du-liban-mumbai',
    title: 'Rue Du Liban',
    category: 'Restaurant',
    location: 'Mumbai',
    image: '/images/projects/restaurant/rue-du-liban/1.jpg',
    gallery: [
      '/images/projects/restaurant/rue-du-liban/1.jpg',
      '/images/projects/restaurant/rue-du-liban/2.jpg'
    ],
    description: 'Boutique Levantine fine-dining establishment with custom solid brass keypad controls, warm 2200K dimming, and high-fidelity acoustic background audio.',
    usps: ['Solid Brass Tactile Controls', '2200K Candlelight Glow', 'Acoustic Background Audio'],
    features: ['Lutron QSX scene presets', 'Discrete table spotlighting', 'Staff single-touch service modes'],
    date: 'Mar 2024',
    readTime: '3 min read',
    href: '/projects/rue-du-liban-mumbai'
  },
  {
    id: 'rest-thai-naam',
    slug: 'thai-naam-mumbai',
    title: 'Thai Naam Fine Dining',
    category: 'Restaurant',
    location: 'Mumbai',
    image: '/images/projects/restaurant/thai-naam-mumbai/1.jpg',
    gallery: [
      '/images/projects/restaurant/thai-naam-mumbai/1.jpg',
      '/images/projects/restaurant/thai-naam-mumbai/2.jpg'
    ],
    description: 'Atmospheric hospitality automation with synchronized mood lighting, climate zoning, and serene Southeast Asian background music presets.',
    usps: ['Atmospheric Mood Lighting', 'Integrated Climate Comfort', 'Acoustic Music Zones'],
    features: ['Time-locked daylight sequences', 'Private dining room controls', 'Energy efficient LED integration'],
    date: 'Apr 2024',
    readTime: '3 min read',
    href: '/projects/thai-naam-mumbai'
  },
  {
    id: 'rest-unico',
    slug: 'unico-experiential-dining',
    title: 'UNICO Experiential Dining',
    category: 'Restaurant',
    location: 'Gurugram',
    image: '/images/projects/restaurant/unico/1.jpg',
    gallery: [
      '/images/projects/restaurant/unico/1.jpg',
      '/images/projects/restaurant/unico/2.jpg'
    ],
    description: 'Futuristic dining experience with integrated scene presets, architectural cove illumination, and smart automation synced to culinary courses.',
    usps: ['Experiential Course Sync', 'Architectural Cove Illumination', 'Immersive Scene Recall'],
    features: ['Dynamic table projection integration', 'Gradual sensory transitions', 'Central iPad station control'],
    date: 'May 2024',
    readTime: '4 min read',
    href: '/projects/unico-experiential-dining'
  },
  {
    id: 'rest-golden-dragon',
    slug: 'golden-dragon-restaurant',
    title: 'Golden Dragon Restaurant',
    category: 'Restaurant',
    location: 'New Delhi',
    image: '/images/projects/restaurant/golden-dragon/1.jpg',
    gallery: [
      '/images/projects/restaurant/golden-dragon/1.jpg',
      '/images/projects/restaurant/golden-dragon/2.jpg'
    ],
    description: 'Celebrated legacy Asian restaurant enhanced with discreet modern lighting presets, custom crystal chandelier dimming, and banquet scene automation.',
    usps: ['Legacy Asian Dining Lighting', 'Chandelier Dimming Logic', 'Private Dining Presets'],
    features: ['Pre-programmed lunch and dinner scenes', 'Automated cellar climate monitor', 'Smooth fade transitions'],
    date: 'Jun 2024',
    readTime: '3 min read',
    href: '/projects/golden-dragon-restaurant'
  },
  {
    id: 'rest-oko',
    slug: 'oko-pan-asian',
    title: 'OKO Pan Asian Restaurant',
    category: 'Restaurant',
    location: 'Bengaluru',
    image: '/images/projects/restaurant/oko/1.jpg',
    gallery: [
      '/images/projects/restaurant/oko/1.jpg',
      '/images/projects/restaurant/oko/2.jpg'
    ],
    description: 'Rooftop pan-Asian restaurant with panoramic skyline views, automated solar glare shading, and ambient evening twilight illumination.',
    usps: ['Rooftop Skyline Illumination', 'Automated Glare Shading', 'Twilight Scene Presets'],
    features: ['Motorized façade louvers', 'Weather sensor automation', 'Central host stand touch panel'],
    date: 'Jul 2024',
    readTime: '3 min read',
    href: '/projects/oko-pan-asian'
  },
  {
    id: 'rest-madam-chow',
    slug: 'madam-chow-asian',
    title: 'Madam Chow Asian Restaurant',
    category: 'Restaurant',
    location: 'Mumbai',
    image: '/images/projects/restaurant/asian-restaurant-madam-chow/1.jpg',
    gallery: [
      '/images/projects/restaurant/asian-restaurant-madam-chow/1.jpg',
      '/images/projects/restaurant/asian-restaurant-madam-chow/2.jpg'
    ],
    description: 'Bespoke Asian dining lounge featuring oriental warm-red architectural accents, table-focused dimming, and high-fidelity sound distribution.',
    usps: ['Accentuated Table Lighting', 'Warm Oriental Ambiance', 'Sound Masking Zones'],
    features: ['Dim-to-warm LED integration', 'Zoned audio distribution', 'Simple tactile staff switchboards'],
    date: 'Aug 2024',
    readTime: '3 min read',
    href: '/projects/madam-chow-asian'
  }
];

export const ALL_PROJECTS: ProjectData[] = [
  ...RESIDENTIAL_PROJECTS,
  ...HOSPITALITY_PROJECTS,
  ...COMMERCIAL_PROJECTS,
  ...RESTAURANT_PROJECTS
];

export function getProjectsByCategory(category: string): ProjectData[] {
  if (category === 'All Projects') return ALL_PROJECTS;
  return ALL_PROJECTS.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase()
  );
}

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return ALL_PROJECTS.find((p) => p.slug === slug);
}
