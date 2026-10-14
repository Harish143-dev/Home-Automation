import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const REAL_PROJECTS = [
  // Residential
  {
    title: 'Anubhav Jain Farmhouse, New Delhi',
    description: 'Curated architectural lighting controls, automated climate regulation, and comprehensive security integration across a 15,000 sq.ft. private luxury estate.',
    imageUrl: '/images/projects/residential/anubhav-jain-farmhouse/1.jpg',
  },
  {
    title: 'Bhartiya Residence',
    description: 'Integrated whole-home automation featuring Lutron motorized drapery, architectural scene recall, and multi-zone entertainment systems.',
    imageUrl: '/images/projects/residential/bhartiya-residence/1.jpg',
  },
  {
    title: 'Vishal Udani Residence',
    description: 'Seamless multi-room high-resolution audio distribution, customized tactile keypad interfaces, and intelligent climate automation.',
    imageUrl: '/images/projects/residential/vishal-udani/1.jpg',
  },
  {
    title: 'Sanjeet Bhasin Residence',
    description: 'Smart ambient scene setting, biometric perimeter security, and integrated high-fidelity AV zones with acoustic isolation.',
    imageUrl: '/images/projects/residential/sanjeet-bhasin/1.jpg',
  },
  {
    title: 'Sournika Villa',
    description: 'Luxury estate automation featuring integrated exterior landscaping lights, pool controls, and bespoke bedside master scene keypads.',
    imageUrl: '/images/projects/residential/sournika-villa/1.jpg',
  },
  {
    title: 'Aranyak Farmhouse',
    description: 'Expansive private farmhouse automation combining centralized HVAC management, daylight sensors, and Lutron Homeworks QSX lighting.',
    imageUrl: '/images/projects/residential/aranyak-farmhouse/1.jpg',
  },
  {
    title: 'Nakul Bhatia Residence',
    description: 'Bespoke residential smart automation with motorized blackout shading, architectural warm-dim downlights, and smart distribution panels.',
    imageUrl: '/images/projects/residential/nakul-bhatia/1.jpg',
  },

  // Hospitality
  {
    title: 'Oberoi Amarvillas, Agra',
    description: 'Prestigious guest room automation, public areas architectural lighting control, and energy management overlooking the iconic Taj Mahal.',
    imageUrl: '/images/projects/hospitality/oberoi-amarvillas/1.jpg',
  },
  {
    title: 'Oberoi Rajvillas, Jaipur',
    description: 'Heritage resort luxury lighting scenes, central energy monitoring, and discreet architectural automation honoring traditional Rajasthani architecture.',
    imageUrl: '/images/projects/hospitality/oberoi-rajvillas/1.jpg',
  },
  {
    title: 'Six Senses Fort Barwara',
    description: 'Sustainable smart luxury controls for a 14th-century fort palace restoration, sanctuary suites, and holistic spa wellness pavilions.',
    imageUrl: '/images/projects/hospitality/six-senses-barwara/1.jpg',
  },
  {
    title: 'Taj Lakefront, Bhopal',
    description: 'Complete guest room management system (GRMS), grand ballroom lighting scene control, and centralized hotel public space automation.',
    imageUrl: '/images/projects/hospitality/taj-lakefront-bhopal/1.jpg',
  },
  {
    title: 'The Ritz-Carlton, Bangalore',
    description: 'Signature ballroom lighting management, VIP meeting room automation, and centralized luxury hotel lighting ecosystem.',
    imageUrl: '/images/projects/hospitality/ritz-carlton-bangalore/1.jpg',
  },
  {
    title: 'ITC Grand Chola, Chennai',
    description: 'State-of-the-art hospitality automation across presidential suites, banquet halls, and magnificent grand lobby zones.',
    imageUrl: '/images/projects/hospitality/itc-grand-chola/1.jpg',
  },
  {
    title: 'Grand Hyatt, Gurgaon',
    description: 'Multi-zone architectural lighting automation, international conference centers, and high-end hospitality controls.',
    imageUrl: '/images/projects/hospitality/grand-hyatt-gurgaon/1.jpg',
  },
  {
    title: 'The Westin Resort & Spa, Himalayas',
    description: 'Hillside wellness retreat automation with intelligent energy-saving thermostats, automated exterior façade lighting, and calm room scenes.',
    imageUrl: '/images/projects/hospitality/westin-himalayas/1.jpg',
  },

  // Commercial
  {
    title: 'NVIDIA Corporate Campus',
    description: 'High-performance tech headquarters with daylight-harvesting sensors, meeting room scheduling automation, and circadian lighting.',
    imageUrl: '/images/projects/commercial/nvidia/1.jpg',
  },
  {
    title: 'Meta Office, Gurgaon',
    description: 'Modern collaborative workspace automation with occupancy-driven lighting, boardroom video integration, and smart network interfaces.',
    imageUrl: '/images/projects/commercial/meta-office-gurgaon/1.jpg',
  },
  {
    title: 'Ernst & Young (EY), Gurgaon',
    description: 'Large-scale enterprise lighting automation, smart floor energy management, and executive conference facility AV orchestration.',
    imageUrl: '/images/projects/commercial/ey-gurgaon/1.jpg',
  },
  {
    title: 'Barclays Bank, Chennai',
    description: 'Financial institution lighting management, centralized building management system (BMS) integration, and ISO energy compliance.',
    imageUrl: '/images/projects/commercial/barclays-bank-chennai/1.jpg',
  },
  {
    title: 'BMW Showroom',
    description: 'Dynamic automotive display spotlighting scenes, client consultation lounge automation, and customer delivery bay lighting effects.',
    imageUrl: '/images/projects/commercial/bmw-showroom/1.jpg',
  },
  {
    title: 'Ferrari Showroom',
    description: 'Signature supercar showroom illumination, color temperature-tuned lighting (CRI 95+), and interactive luxury vehicle presentation controls.',
    imageUrl: '/images/projects/commercial/ferrari-showroom/1.jpg',
  },
  {
    title: 'Tiffany & Co., Mumbai',
    description: 'Ultra-luxury retail jewelry lighting with pinpoint color rendering, automated display case controls, and integrated security lockouts.',
    imageUrl: '/images/projects/commercial/tiffany-mumbai/1.jpg',
  },
  {
    title: 'Yashraj Studio, Mumbai',
    description: 'Studio production stage lighting controls, soundproof acoustic suite AV integration, and executive screening theater automation.',
    imageUrl: '/images/projects/commercial/yashraj-studio/1.jpg',
  },

  // Restaurant
  {
    title: 'NOX Lounge & Dining, Mumbai',
    description: 'High-energy dining and lounge venue with programmable ambient lighting scenes, automated bass acoustics, and multi-zone sound distribution.',
    imageUrl: '/images/projects/restaurant/nox-mumbai/1.jpg',
  },
  {
    title: 'Akina Contemporary Japanese, Mumbai',
    description: 'Japanese dining automation featuring subtle mood transitions between daytime lunch service and vibrant evening cocktail dining.',
    imageUrl: '/images/projects/restaurant/akina-mumbai/1.jpg',
  },
  {
    title: 'Rue Du Liban',
    description: 'Boutique fine-dining establishment with custom solid brass keypad controls, warm 2200K dimming, and high-fidelity acoustic background audio.',
    imageUrl: '/images/projects/restaurant/rue-du-liban/1.jpg',
  },
  {
    title: 'Thai Naam, Mumbai',
    description: 'Atmospheric hospitality automation with synchronized mood lighting, climate zoning, and background music presets.',
    imageUrl: '/images/projects/restaurant/thai-naam-mumbai/1.jpg',
  },
  {
    title: 'UNICO Experiential Dining',
    description: 'Futuristic dining experience with integrated scene presets, architectural cove illumination, and smart automation.',
    imageUrl: '/images/projects/restaurant/unico/1.jpg',
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
      console.log(`+ Created: ${proj.title}`);
    } else {
      await prisma.project.update({
        where: { id: existing.id },
        data: proj,
      });
      console.log(`= Updated: ${proj.title}`);
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
