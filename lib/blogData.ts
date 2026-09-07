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

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    slug: "lighting-as-architecture",
    category: "Smart Living",
    date: "May 15, 2026",
    title: "Lighting as Architecture",
    excerpt: "Why human-centric lighting is the most important element in modern luxury interior design.",
    image: "/assets/residential/project/delhi-residence/delhi-residence-1.jpg",
    readTime: "4 Min Read",
    content: `
      <p>In the realm of luxury residential design, lighting is no longer just a functional necessity; it is a fundamental architectural element. The days of simply illuminating a space are gone. Today, we architect light to sculpt environments, alter moods, and redefine spatial perception.</p>
      
      <h2>The Shift to Human-Centric Lighting</h2>
      <p>Human-centric lighting (HCL) aligns our indoor environments with natural circadian rhythms. By dynamically adjusting the color temperature and intensity of light throughout the day, intelligent lighting systems can profoundly impact wellness, energy levels, and sleep cycles. A home should wake you up with crisp, cool daylight and wind you down with warm, amber glows reminiscent of a sunset.</p>

      <h2>Invisible Integration</h2>
      <p>True luxury is invisible. The best lighting designs hide the source, emphasizing the effect. Using recessed linear fixtures, plaster-in downlights, and smart dimming curves, we create spaces where light feels entirely natural, devoid of visible hardware or glaring bulbs. This is the essence of architectural lighting automation.</p>
    `
  },
  {
    id: "2",
    slug: "the-zero-friction-hotel-room",
    category: "Hospitality",
    date: "April 28, 2026",
    title: "The Zero-Friction Hotel Room",
    excerpt: "Engineering predictive automation systems that anticipate guest needs without requiring complex interfaces.",
    image: "/assets/residential/project/delhi-residence/delhi-residence-2.jpg",
    readTime: "6 Min Read",
    content: `
      <p>The luxury hospitality experience is defined by anticipation. A truly premium hotel room doesn't just respond to a guest's commands—it predicts their needs. This is the concept behind the zero-friction hotel room.</p>
      
      <h2>Predictive Comfort</h2>
      <p>When a guest enters the room, the environment should already be tailored to their preferences. The HVAC system has pre-cooled the room, the shades are drawn just enough to reveal the view while maintaining privacy, and a soft, welcoming lighting scene is active. The guest should never have to search for a light switch.</p>

      <h2>Intuitive Interfaces</h2>
      <p>If an interface is required, it must be instantly understandable. We replace banks of confusing switches with elegantly engraved, minimalist keypads or simple bedside tablets that offer one-touch scenes like "Relax," "Work," or "Sleep." The technology acts as a silent concierge, elevating the guest experience through seamless, invisible engineering.</p>
    `
  },
  {
    id: "3",
    slug: "acoustics-and-aesthetics",
    category: "Home Automation",
    date: "April 10, 2026",
    title: "Acoustics & Aesthetics",
    excerpt: "Integrating high-fidelity audio systems completely invisibly into the structural fabric of a room.",
    image: "/assets/residential/project/delhi-residence/delhi-residence-3.jpg",
    readTime: "5 Min Read",
    content: `
      <p>Audiophiles and interior designers have traditionally been at odds. High-fidelity sound often required massive floor-standing speakers that dominated a room's aesthetic. However, the future of luxury audio is entirely invisible.</p>
      
      <h2>Plaster-In Audio</h2>
      <p>Modern acoustic engineering allows us to install high-performance speakers directly into drywall or ceilings, which are then plastered over and painted. The result is a room with zero visible speakers or grilles that still delivers breathtaking, immersive, room-filling sound.</p>

      <h2>Acoustic Tuning</h2>
      <p>It's not just about hiding the speakers; it's about tuning the room. Advanced DSP (Digital Signal Processing) allows us to analyze the acoustic properties of a space—accounting for glass, marble, and soft furnishings—and perfectly calibrate the audio output to ensure flawless fidelity in every corner of the room.</p>
    `
  },
  {
    id: "4",
    slug: "circadian-rhythm-engineering",
    category: "Lighting Design",
    date: "March 22, 2026",
    title: "Circadian Rhythm Engineering",
    excerpt: "How dynamic lighting control improves wellness, sleep cycles, and daily energy levels.",
    image: "/assets/residential/project/delhi-residence/delhi-residence-4.jpg",
    readTime: "7 Min Read",
    content: `
      <p>Our biology is fundamentally tied to the rising and setting of the sun. For millions of years, human bodies have synchronized their internal clocks (circadian rhythms) to natural daylight. However, modern lifestyles keep us indoors, bathed in static, artificial light, disrupting our natural cycles.</p>
      
      <h2>Dynamic Color Tuning</h2>
      <p>Circadian rhythm engineering uses advanced LED technology to replicate the natural progression of sunlight. In the morning, the system produces cool, blue-enriched light to suppress melatonin and stimulate alertness. As the day progresses, the light slowly warms, eventually shifting to deep amber hues in the evening to prepare the body for restful sleep.</p>

      <h2>The Wellness Impact</h2>
      <p>The impact of biologically accurate lighting is profound. Clients report improved sleep quality, sustained energy levels throughout the workday, and an overall enhancement in well-being. By integrating these dynamic lighting algorithms directly into the home's automation processor, the environment works silently in the background to support human health.</p>
    `
  }
];

export const FEATURED_POST = {
  id: "featured",
  slug: "the-invisible-interface",
  category: "Architectural Technology",
  date: "May 28, 2026",
  title: "The Invisible Interface: Designing Automation That Disappears",
  excerpt: "Explore how modern architectural integration is shifting away from visible wall-acne and complex panels, moving towards ambient, predictive systems that seamlessly blend into luxury interiors.",
  image: "/assets/residential/project/delhi-residence/delhi-residence-1.jpg", // Note: The actual path used earlier was an import, but for data consistency we use a string.
  readTime: "6 Min Read",
  content: `
    <p>The ultimate goal of home automation is not to add screens to every wall, but to remove them entirely. In the highest echelons of luxury design, technology must be felt, not seen. We call this the invisible interface.</p>
    
    <h2>The End of Wall Acne</h2>
    <p>For decades, smart homes were characterized by a clutter of thermostats, light switches, intercoms, and touch panels scattered across beautiful architectural walls. Today, we consolidate these disparate controls into a single, elegantly engraved keypad, or better yet, we remove the need for manual control entirely through intelligent sensors and geofencing.</p>

    <h2>Predictive Environments</h2>
    <p>A true smart home doesn't wait for a command; it anticipates it. By utilizing invisible environmental sensors, a home can detect occupancy, ambient light levels, and temperature, adjusting the climate and lighting in real-time. When you walk into a room, it simply comes alive, exactly as it should, without a single button press.</p>
  `
};
