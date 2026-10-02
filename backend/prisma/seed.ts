import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const blogPosts = [
  {
    title: "Building a Market Before the Market Existed",
    content: `
      <p>"I asked Lutron to send me to India. They said yes, with some reservations.</p>
      <br/>
      <p>It was 2000. I genuinely believed this market was going to be big. So I went to Lutron and made them an offer: give me a year or two on the ground here. They agreed.</p>
      <br/>
      <p>When I arrived, there was no base to work with. No category. No awareness. No budgets. Architects weren't specifying lighting controls because they'd never been asked to. The only real demand was coming from international lighting designers on a small number of 5-star hotel projects and chains that were used to seeing it abroad and expected the same here.</p>
    `,
    author: "Admin",
    createdAt: new Date("2026-09-10T00:00:00Z"),
  },
  {
    title: "Starting Anusha Technovision: Building From a Foundation of Trust",
    content: `
      <p>In October 2002, I started Anusha Technovision. I had spent two years building people into distributors across India, who were now my competition.</p>
      <br/>
      <p>I had trained some of them. I had shared contacts with them. I had introduced them to clients who were just beginning to understand what building automation could do. And now I was on the other side of that equation. Building a new company with no capital, no ready team, and no guarantee that any of those clients would choose to work with me over the people I had placed in the market myself.</p>
    `,
    author: "Admin",
    createdAt: new Date("2026-09-11T00:00:00Z"),
  },
  {
    title: "Preparation Meets Opportunity",
    content: `
      <p>"For over a year, I kept visiting an architect in Bombay who had no project to give me.</p>
      <br/>
      <p>No order on the table. Just a relationship I was building because I believed the market was heading somewhere. These were people who would eventually shape some of the biggest projects in India. I was two years into ATPL at that point. Small team. Not many orders.</p>
    `,
    author: "Admin",
    createdAt: new Date("2026-09-12T00:00:00Z"),
  }
];

async function main() {
  console.log('Start seeding ...');

  // Seed Admin
  const hashedPassword = await bcrypt.hash('password123', 10);
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
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
