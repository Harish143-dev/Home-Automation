export interface BlogPost {
  id: string;
  slug: string;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  image: string; // use static image import path if possible, or public string
  readTime: string;
  content: string; // Markdown or simple HTML for the article body
}

export const FEATURED_POST: BlogPost = {
  id: "featured",
  slug: "building-a-market-before-the-market-existed",
  category: "Origin Story",
  date: "September 10, 2026",
  title: "Building a Market Before the Market Existed",
  excerpt: "The foundation you lay when nobody is watching is exactly what becomes impossible to replicate when everyone starts paying attention.",
  image: "/assets/residential/project/delhi-residence/delhi-residence-1.jpg", 
  readTime: "3 Min Read",
  content: `
    <p>"I asked Lutron to send me to India. They said yes, with some reservations.</p>
    <br/>
    <p>It was 2000. I genuinely believed this market was going to be big. So I went to Lutron and made them an offer: give me a year or two on the ground here. They agreed.</p>
    <br/>
    <p>When I arrived, there was no base to work with. No category. No awareness. No budgets. Architects weren't specifying lighting controls because they'd never been asked to. The only real demand was coming from international lighting designers on a small number of 5-star hotel projects and chains that were used to seeing it abroad and expected the same here.</p>
    <br/>
    <p>So I did what the situation called for. I used to carry a demo box in my car everywhere I went. Every meeting, I'd pull it out, plug it in, show the client what dimming looked like, how the light changed, how the room felt different. Most of them had never seen anything like it. I was educating far more than I was selling.</p>
    <br/>
    <p>Little by little, the market started to respond.</p>
    <br/>
    <p>The Grand Hyatt Delhi. The Oberoi Delhi. The Oberoi Rajvilas, Jaipur. Those were the first few orders. Each one took months, meetings, follow-ups, site visits, budget approvals that had to be justified from scratch because nobody had planned for this in their original construction budget. Nothing moved quickly.</p>
    <br/>
    <p>Lutron eventually opened their own India office around 2015.</p>
    <br/>
    <p>India’s market opportunity was always real. It just took time for everyone else to see it.</p>
    <br/>
    <p>If you're building something in a market that doesn't fully exist yet, stay. Do the unglamorous work. The foundation you lay when nobody is watching is exactly what becomes impossible to replicate when everyone starts paying attention."</p>
  `
};

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "2",
    slug: "starting-anusha-technovision-building-from-trust",
    category: "Origin Story",
    date: "September 11, 2026",
    title: "Starting Anusha Technovision: Building From a Foundation of Trust",
    excerpt: "Everything we built came from a foundation that was already in place before the company even existed.",
    image: "/assets/residential/project/delhi-residence/delhi-residence-2.jpg", 
    readTime: "4 Min Read",
    content: `
      <p>In October 2002, I started Anusha Technovision. I had spent two years building people into distributors across India, who were now my competition.</p>
      <br/>
      <p>I had trained some of them. I had shared contacts with them. I had introduced them to clients who were just beginning to understand what building automation could do. And now I was on the other side of that equation. Building a new company with no capital, no ready team, and no guarantee that any of those clients would choose to work with me over the people I had placed in the market myself.</p>
      <br/>
      <p>The trust that architects and consultants had placed in me over two years of showing up, following through and never overpromising, remained. In a market where very few people truly understood lighting controls, the individual counted for more than the organisation behind them. Clients were not buying a brand. They were buying the confidence that someone knew what they were doing.</p>
      <br/>
      <p>Building the team was the harder challenge. There was no existing talent pool for this work in India at the time. Automation as a discipline was still being defined. Every person I brought in had to be trained from the ground up. Every process had to be developed internally because there was no industry template to follow.</p>
      <br/>
      <p>The projects came. Slowly at first, then with more consistency as the market began to understand what was possible. Residences where the entire environment responded to how a family actually lived. Hotels where the guest experience was shaped by systems working quietly in the background. Commercial spaces where energy, comfort and control were managed as a single integrated system rather than separate afterthoughts.</p>
      <br/>
      <p>Today Anusha Technovision has completed over 1000 projects: 600 residences, 250 hotels and 150 commercial spaces. When I look at that number, I do not think about the scale of it. I think about the first few years when none of it existed yet, and the only thing that made the next step possible was refusing to take shortcuts on the current one.</p>
      <br/>
      <p>Everything we built came from a foundation that was already in place before the company even existed. You start from everything you refused to compromise on.</p>
    `
  },
  {
    id: "3",
    slug: "preparation-meets-opportunity",
    category: "Origin Story",
    date: "September 12, 2026",
    title: "Preparation Meets Opportunity",
    excerpt: "When someone asks me what the difference is between a company that makes it and one that does not, I always come back to the same thing.",
    image: "/assets/residential/project/delhi-residence/delhi-residence-3.jpg", 
    readTime: "5 Min Read",
    content: `
      <p>"For over a year, I kept visiting an architect in Bombay who had no project to give me.</p>
      <br/>
      <p>No order on the table. Just a relationship I was building because I believed the market was heading somewhere. These were people who would eventually shape some of the biggest projects in India. I was two years into ATPL at that point. Small team. Not many orders.</p>
      <br/>
      <p>Then in 2004, a $250,000 project appeared: the Lakshmi Niwas Mittal residence. LN Mittal, the steel magnate. The home was being designed in the US by a lighting consultant who had specified Lutron controls throughout the entire property. When it came to execution in India, the lead went to a much bigger, more established company — a distributor I had actually appointed during my years as a Lutron employee. On every measure, that project should have been theirs.</p>
      <br/>
      <p>What changed everything was something I had not planned.</p>
      <br/>
      <p>The US lighting consultant had been collaborating with an Indian architect to adapt the design for the local site. This turned out to be the same architect I had been visiting in Bombay for over a year.</p>
      <br/>
      <p>When a dispute arose internally about who in India should handle the project, my ex-boss, David Odess, called the US consultant directly and asked whether anyone representing the company had actually visited him locally. The consultant gave my name. It was decided the project should go to Anusha Technovision.</p>
      <br/>
      <p>We were three people. We had never handled a project at that scale. But we were the ones who had done the groundwork. We trained, we prepared, and we delivered it.</p>
      <br/>
      <p>From that project came Sonali Farms. From those two orders came the first real belief that what we were building was going to last.</p>
      <br/>
      <p>Until the Mittal project, I still had doubt. After it, I did not.</p>
      <br/>
      <p>That is what one well-prepared moment can do.</p>
      <br/>
      <p>The name LN Mittal on our client list opened doors for years after the project ended. In a market still learning to trust this technology, a client of that credibility made every future conversation easier.</p>
      <br/>
      <p>When someone asks me what the difference is between a company that makes it and one that does not, I always come back to the same thing.</p>
      <br/>
      <p>High-ticket clients judge you on three things before they place an order.</p>
      <br/>
      <p>First, how confident you are in what you are saying.</p>
      <br/>
      <p>Second, whether they can trust you to do what you promise.</p>
      <br/>
      <p>Third, whether you have the sincerity to tell them the truth, even when it costs you the room.</p>
      <br/>
      <p>Those things do not change. They were true in 2004 and they are true now.</p>
      <br/>
      <p>You cannot manufacture the moment when everything comes together. But you can spend years putting yourself in a position where it finds you.</p>
      <br/>
      <p>My ex-boss, Boon Liang Seng, used to say that in business there is no such thing as pure luck. Luck is where preparation meets opportunity.</p>
      <br/>
      <p>You cannot manufacture the moment.</p>
      <br/>
      <p>But you can put in the work long before it arrives so that when it does, you're ready."</p>
    `
  },
  {
    id: "4",
    slug: "the-invisible-interface",
    category: "Architectural Technology",
    date: "May 28, 2026",
    title: "The Invisible Interface: Designing Automation That Disappears",
    excerpt: "Explore how modern architectural integration is shifting away from visible wall-acne and complex panels, moving towards ambient, predictive systems that seamlessly blend into luxury interiors.",
    image: "/assets/projects/SawaiManMahal.jpg",
    readTime: "6 Min Read",
    content: `
      <p>In luxury architectural spaces, technology should be experienced through its absence, not its presence.</p>
      <br/>
      <p>For decades, smart homes were defined by banks of switches, glowing touchscreens mounted on every partition, and complicated button pads. But true luxury does not demand cognitive effort from the resident. It anticipates needs silently.</p>
      <br/>
      <p>Today, the focus is on the invisible interface: flush-mounted sensors, concealed keypads matching Venetian plaster, automated circadian scenes tailored to the time of day, and motorized elements that glide into architectural pockets with zero motor hum.</p>
      <br/>
      <p>When design and engineering collaborate from the conceptual phase, technology ceases to be an add-on and becomes part of the architecture itself.</p>
    `
  }
];
