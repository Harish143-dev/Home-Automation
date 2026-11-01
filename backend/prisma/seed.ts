import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const blogPosts = [
  {
    title: "Building a Market Before the Market Existed",
    description: "The founding journey of architectural lighting automation in India and pioneering the category from scratch in 2000.",
    category: "Smart Living",
    imageUrl: "/assets/residential/project/delhi-residence/delhi-residence-1.jpg",
    keyTakeaways: "• Lighting control was virtually non-existent in India in 2000.\n• Early adoption was spearheaded by international 5-star hotel chains.\n• Long-term persistence and education paved the way for luxury smart homes.",
    content: `
      <h2>The Genesis: A Market Waiting to Be Discovered</h2>
      <p>"I asked Lutron to send me to India. They said yes, with some reservations.</p>
      <p>It was 2000. I genuinely believed this market was going to be big. So I went to Lutron and made them an offer: give me a year or two on the ground here. They agreed.</p>
      
      <h2>Overcoming Category Unawareness</h2>
      <p>When I arrived, there was no base to work with. No category. No awareness. No budgets. Architects weren't specifying lighting controls because they'd never been asked to. The only real demand was coming from international lighting designers on a small number of 5-star hotel projects and chains that were used to seeing it abroad and expected the same here.</p>
      
      <blockquote>"True market creation begins when you stop waiting for demand and start building the foundation through continuous education and trust."</blockquote>
      
      <h2>From Commercial Hotels to Luxury Residences</h2>
      <p>Over the next two decades, that foundation transformed into India's premier luxury automation sector, seamlessly blending architectural aesthetics with intelligent living.</p>
    `,
    author: "Alok Hada",
    createdAt: new Date("2026-09-10T00:00:00Z"),
  },
  {
    title: "Starting Anusha Technovision: Building From a Foundation of Trust",
    description: "Reflections on launching ATPL in 2002, cultivating long-term client relationships, and establishing an engineering-first culture.",
    category: "Lighting Design",
    imageUrl: "/assets/residential/project/delhi-residence/delhi-residence-2.jpg",
    keyTakeaways: "• Trust is the most resilient competitive advantage in luxury automation.\n• Relationships forged early on outlast transactional market cycles.\n• Engineering precision must accompany every aesthetic promise.",
    content: `
      <h2>The Leap of Faith</h2>
      <p>In October 2002, I started Anusha Technovision. I had spent two years building people into distributors across India, who were now my competition.</p>
      <p>I had trained some of them. I had shared contacts with them. I had introduced them to clients who were just beginning to understand what building automation could do. And now I was on the other side of that equation. Building a new company with no capital, no ready team, and no guarantee that any of those clients would choose to work with me over the people I had placed in the market myself.</p>
      
      <h2>Integrity as a Competitive Moat</h2>
      <p>Clients choose engineering partners not based on marketing claims, but on the certainty that when an issue arises at 8 PM on a Saturday, someone will be there to resolve it. That commitment formed ATPL's core identity.</p>
    `,
    author: "Alok Hada",
    createdAt: new Date("2026-09-11T00:00:00Z"),
  },
  {
    title: "Preparation Meets Opportunity",
    description: "How patience, regular visits to architects, and unshakeable market conviction shaped landmark automation projects.",
    category: "Architecture",
    imageUrl: "/assets/residential/project/delhi-residence/delhi-residence-3.jpg",
    keyTakeaways: "• Meaningful architectural partnerships require months of non-transactional dialogue.\n• Demonstrating technical depth before asking for business creates enduring loyalty.\n• Today's exploratory conversations become tomorrow's flagship commissions.",
    content: `
      <h2>The Long Game in Architectural Design</h2>
      <p>"For over a year, I kept visiting an architect in Bombay who had no project to give me.</p>
      <p>No order on the table. Just a relationship I was building because I believed the market was heading somewhere. These were people who would eventually shape some of the biggest projects in India. I was two years into ATPL at that point. Small team. Not many orders.</p>
      
      <h2>When the Opportunity Arrived</h2>
      <p>When their landmark residential high-rise project finally broke ground, ATPL was the only team they called. The preparation had already been done.</p>
    `,
    author: "Alok Hada",
    createdAt: new Date("2026-09-12T00:00:00Z"),
  }
];

async function main() {
  console.log('Start seeding ...');

  // Seed Admin
  const hashedPassword = await bcrypt.hash('Anusha@2026', 10);
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@anushagroup.com' },
    update: {},
    create: {
      email: 'admin@anushagroup.com',
      password: hashedPassword,
    },
  });
  console.log(`Created admin user with email: ${admin.email}`);

  // Seed Blogs
  for (const post of blogPosts) {
    const blog = await prisma.blog.create({
      data: post,
    });
    console.log(`Created blog post: ${blog.title}`);
  }

  // Seed Projects
  const project = await prisma.project.create({
    data: {
      title: 'Delhi Residence',
      description: 'Complete home automation for a premium residence in Delhi.',
      imageUrl: '/assets/residential/project/delhi-residence/delhi-residence-1.jpg',
    }
  });
  console.log(`Created project: ${project.title}`);

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
