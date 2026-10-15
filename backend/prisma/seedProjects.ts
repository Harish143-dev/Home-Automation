import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const REAL_PROJECTS = [
  // Residential
  {
    title: 'Anubhav Jain Farmhouse, New Delhi',
    description: 'Curated architectural lighting controls, automated climate regulation, and comprehensive security integration across a 15,000 sq.ft. private luxury estate.',
    imageUrl: '/images/projects/residential/anubhav-jain-farmhouse/1.jpg',
    type: 'Residential',
  },
  {
    title: 'Bhartiya Residence',
    description: 'Integrated whole-home automation featuring Lutron motorized drapery, architectural scene recall, and multi-zone entertainment systems.',
    imageUrl: '/images/projects/residential/bhartiya-residence/1.jpg',
    type: 'Residential',
  },
  {
    title: 'Vishal Udani Residence',
    description: 'Seamless multi-room high-resolution audio distribution, customized tactile keypad interfaces, and intelligent climate automation.',
    imageUrl: '/images/projects/residential/vishal-udani/1.jpg',
    type: 'Residential',
  },
  {
    title: 'Sanjeet Bhasin Residence',
    description: 'Smart ambient scene setting, biometric perimeter security, and integrated high-fidelity AV zones with acoustic isolation.',
    imageUrl: '/images/projects/residential/sanjeet-bhasin/1.jpg',
    type: 'Residential',
  },
  {
    title: 'Sournika Villa',
    description: 'Luxury estate automation featuring integrated exterior landscaping lights, pool controls, and bespoke bedside master scene keypads.',
    imageUrl: '/images/projects/residential/sournika-villa/1.jpg',
    type: 'Residential',
  },
  {
    title: 'Aranyak Farmhouse',
    description: 'Expansive private farmhouse automation combining centralized HVAC management, daylight sensors, and Lutron Homeworks QSX lighting.',
    imageUrl: '/images/projects/residential/aranyak-farmhouse/1.jpg',
    type: 'Residential',
  },
  {
    title: 'Nakul Bhatia Residence',
    description: 'Bespoke residential smart automation with motorized blackout shading, architectural warm-dim downlights, and smart distribution panels.',
    imageUrl: '/images/projects/residential/nakul-bhatia/1.jpg',
    type: 'Residential',
  },

  // Hospitality
  {
    title: 'Six Senses Fort Barwara',
    description: 'Sustainable smart luxury controls for a 14th-century fort palace restoration, sanctuary suites, and holistic spa wellness pavilions.',
    imageUrl: '/images/projects/hospitality/six-senses-barwara/1.jpg',
    type: 'Hospitality',
  },
  {
    title: 'Oberoi Amarvilas, Agra',
    description: 'Prestigious guest room automation, public areas architectural lighting control, and energy management overlooking the iconic Taj Mahal.',
    imageUrl: '/images/projects/hospitality/oberoi-amarvillas/1.jpg',
    type: 'Hospitality',
  },
  {
    title: 'Oberoi Rajvilas, Jaipur',
    description: 'Heritage resort luxury lighting scenes, central energy monitoring, and discreet architectural automation honoring traditional Rajasthani architecture.',
    imageUrl: '/images/projects/hospitality/oberoi-rajvillas/1.jpg',
    type: 'Hospitality',
  },
  {
    title: 'Taj Lakefront, Bhopal',
    description: 'Complete guest room management system (GRMS), grand ballroom lighting scene control, and centralized hotel public space automation.',
    imageUrl: '/images/projects/hospitality/taj-lakefront-bhopal/1.jpg',
    type: 'Hospitality',
  },
  {
    title: 'The Ritz-Carlton, Bangalore',
    description: 'Signature ballroom lighting management, VIP meeting room automation, and centralized luxury hotel lighting ecosystem.',
    imageUrl: '/images/projects/hospitality/ritz-carlton-bangalore/1.jpg',
    type: 'Hospitality',
  },
  {
    title: 'ITC Grand Chola, Chennai',
    description: 'State-of-the-art hospitality automation across presidential suites, banquet halls, and magnificent grand lobby zones.',
    imageUrl: '/images/projects/hospitality/itc-grand-chola/1.jpg',
    type: 'Hospitality',
  },
  {
    title: 'The Westin Resort & Spa, Himalayas',
    description: 'Hillside wellness retreat automation with intelligent energy-saving thermostats, automated exterior façade lighting, and calm room scenes.',
    imageUrl: '/images/projects/hospitality/westin-himalayas/1.jpg',
    type: 'Hospitality',
  },
  {
    title: 'Sawai Man Mahal',
    description: 'Historic palace restoration featuring integrated guest room automation systems, public heritage salons, and royal banquet halls.',
    imageUrl: '/images/projects/hospitality/sawai-man-mahal/1.jpg',
    type: 'Hospitality',
  },
  {
    title: 'Le Méridien Hotel',
    description: 'Modern city-centre luxury hotel with automated atrium illumination, guest suite climate and drapery orchestration.',
    imageUrl: '/images/projects/hospitality/le-meridien/1.jpg',
    type: 'Hospitality',
  },
  {
    title: 'Grand Hyatt, Gurgaon',
    description: 'Multi-zone architectural lighting automation, international conference centers, and high-end hospitality controls.',
    imageUrl: '/images/projects/hospitality/grand-hyatt-gurgaon/1.jpg',
    type: 'Hospitality',
  },
  {
    title: 'The Claridges, New Delhi',
    description: 'Colonial heritage landmark hotel featuring warm architectural illumination, courtyard garden lighting, and private dining salon automation.',
    imageUrl: '/images/projects/hospitality/claridge-delhi/1.jpg',
    type: 'Hospitality',
  },
  {
    title: 'The Den Bengaluru',
    description: 'Contemporary tech-focused luxury hotel with seamless meeting room scheduling, dynamic lobby scene automation, and guestroom energy efficiency.',
    imageUrl: '/images/projects/hospitality/the-den-bangalore/1.jpg',
    type: 'Hospitality',
  },

  // Commercial
  {
    title: 'Meta Corporate Office, Gurgaon',
    description: 'Modern collaborative workspace automation with occupancy-driven lighting, boardroom video integration, and smart network interfaces.',
    imageUrl: '/images/projects/commercial/meta-office-gurgaon/1.jpg',
    type: 'Commercial',
  },
  {
    title: 'Ernst & Young (EY) Corporate Campus, Gurgaon',
    description: 'Large-scale enterprise lighting automation, smart floor energy management, and executive conference facility AV orchestration.',
    imageUrl: '/images/projects/commercial/ey-gurgaon/1.jpg',
    type: 'Commercial',
  },
  {
    title: 'NVIDIA Corporate Campus',
    description: 'High-performance tech headquarters with daylight-harvesting sensors, meeting room scheduling automation, and circadian lighting.',
    imageUrl: '/images/projects/commercial/nvidia/1.jpg',
    type: 'Commercial',
  },
  {
    title: 'Tiffany & Co., Mumbai',
    description: 'Ultra-luxury retail jewelry lighting with pinpoint color rendering (CRI 98+), automated display case controls, and integrated security lockouts.',
    imageUrl: '/images/projects/commercial/tiffany-mumbai/1.jpg',
    type: 'Commercial',
  },
  {
    title: 'Barclays Bank, Chennai',
    description: 'Financial institution lighting management, centralized building management system (BMS) integration, and ISO energy compliance.',
    imageUrl: '/images/projects/commercial/barclays-bank-chennai/1.jpg',
    type: 'Commercial',
  },
  {
    title: 'BMW Experience Centre & Showroom',
    description: 'Dynamic automotive display spotlighting scenes, client consultation lounge automation, and customer delivery bay lighting effects.',
    imageUrl: '/images/projects/commercial/bmw-showroom/1.jpg',
    type: 'Commercial',
  },
  {
    title: 'Ferrari Flagship Showroom, Bengaluru',
    description: 'Signature supercar showroom illumination, color temperature-tuned lighting (CRI 95+), and interactive luxury vehicle presentation controls.',
    imageUrl: '/images/projects/commercial/ferrari-showroom/1.jpg',
    type: 'Commercial',
  },
  {
    title: 'Chennai Metro Rail Transit Hub',
    description: 'Heavy infrastructure passenger transit lighting management operating across 24-hour cycles with high-efficiency daylight compensation.',
    imageUrl: '/images/projects/commercial/chennai-metro/1.jpg',
    type: 'Commercial',
  },
  {
    title: 'Wave Cinemas Multiplex',
    description: 'Automated multiplex illumination synchronized with digital projection servers, managing smooth house light dim-to-black and intermission brightening.',
    imageUrl: '/images/projects/commercial/wave-cinema/1.jpg',
    type: 'Commercial',
  },
  {
    title: 'Yashraj Studio, Mumbai',
    description: 'Studio production stage lighting controls, soundproof acoustic suite AV integration, and executive screening theater automation.',
    imageUrl: '/images/projects/commercial/yashraj-studio/1.jpg',
    type: 'Commercial',
  },
  {
    title: 'Indian Oil Corporation (IOCL) Corporate Towers',
    description: 'Public sector energy enterprise headquarters with multi-story intelligent lighting management, automated auditorium stages, and conference control.',
    imageUrl: '/images/projects/commercial/iocl/1.jpg',
    type: 'Commercial',
  },

  // Restaurant
  {
    title: 'NOX Lounge & Dining, Mumbai',
    description: 'High-energy dining and lounge venue with programmable ambient lighting scenes, automated bass acoustics, and multi-zone sound distribution.',
    imageUrl: '/images/projects/restaurant/nox-mumbai/1.jpg',
    type: 'Restaurant',
  },
  {
    title: 'Akina Contemporary Japanese, Mumbai',
    description: 'Japanese dining automation featuring subtle mood transitions between daytime lunch service and vibrant evening cocktail dining.',
    imageUrl: '/images/projects/restaurant/akina-mumbai/1.jpg',
    type: 'Restaurant',
  },
  {
    title: 'Rue Du Liban',
    description: 'Boutique fine-dining establishment with custom solid brass keypad controls, warm 2200K dimming, and high-fidelity acoustic background audio.',
    imageUrl: '/images/projects/restaurant/rue-du-liban/1.jpg',
    type: 'Restaurant',
  },
  {
    title: 'Thai Naam, Mumbai',
    description: 'Atmospheric hospitality automation with synchronized mood lighting, climate zoning, and background music presets.',
    imageUrl: '/images/projects/restaurant/thai-naam-mumbai/1.jpg',
    type: 'Restaurant',
  },
  {
    title: 'UNICO Experiential Dining',
    description: 'Futuristic dining experience with integrated scene presets, architectural cove illumination, and smart automation.',
    imageUrl: '/images/projects/restaurant/unico/1.jpg',
    type: 'Restaurant',
  },
  {
    title: 'Golden Dragon Restaurant',
    description: 'Celebrated legacy Asian restaurant enhanced with discreet modern lighting presets, custom crystal chandelier dimming, and banquet scene automation.',
    imageUrl: '/images/projects/restaurant/golden-dragon/1.jpg',
    type: 'Restaurant',
  },
  {
    title: 'OKO Pan Asian Restaurant',
    description: 'Rooftop pan-Asian restaurant with panoramic skyline views, automated solar glare shading, and ambient evening twilight illumination.',
    imageUrl: '/images/projects/restaurant/oko/1.jpg',
    type: 'Restaurant',
  },
  {
    title: 'Madam Chow Asian Restaurant',
    description: 'Bespoke Asian dining lounge featuring oriental warm-red architectural accents, table-focused dimming, and high-fidelity sound distribution.',
    imageUrl: '/images/projects/restaurant/asian-restaurant-madam-chow/1.jpg',
    type: 'Restaurant',
  },
];

async function main() {
  console.log('Seeding real ATPL projects into backend database...');

  for (const proj of REAL_PROJECTS) {
    const existing = await prisma.project.findFirst({
      where: { title: proj.title },
    });

    if (!existing) {
      await prisma.project.create({
        data: proj,
      });
      console.log(`+ Created [${proj.type}]: ${proj.title}`);
    } else {
      await prisma.project.update({
        where: { id: existing.id },
        data: proj,
      });
      console.log(`= Updated [${proj.type}]: ${proj.title}`);
    }
  }

  const count = await prisma.project.count();
  console.log(`Total projects in database: ${count}`);
}

main()
  .catch((e) => {
    console.error('Error seeding projects:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
