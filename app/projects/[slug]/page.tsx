import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getApiBaseUrl } from "@/lib/api";

export const dynamicParams = true;

interface ProjectItem {
  id: string;
  title: string;
  category?: string;
  year?: string;
  description: string;
  images: string[];
}

const STATIC_PROJECTS: ProjectItem[] = [
  {
    id: "dixit-nene",
    title: "The Dixit-Nene Residence, Mumbai",
    category: "Residential Architecture",
    year: "2024",
    description: "A complete integration of synchronized motorized shades, backlit custom-engraved keypads, zone climate logic, and full audio-video app orchestration.",
    images: [
      "/assets/residential/project/delhi-residence/delhi-residence-1.jpg",
      "/assets/residential/project/delhi-residence/delhi-residence-2.jpg",
      "/assets/residential/project/delhi-residence/delhi-residence-3.jpg",
      "/assets/residential/project/delhi-residence/delhi-residence-4.jpg"
    ]
  },
  {
    id: "rajan-mittal",
    title: "The Rajan Mittal Villa, New Delhi",
    category: "Luxury Estate",
    year: "2023",
    description: "A four-storey architectural masterwork in Shanti Niketan designed by Morphogenesis, powered by an enterprise-grade automation backbone.",
    images: [
      "/assets/residential/project/mumbai-residence-1/mumbai-residence-1-1.jpg",
      "/assets/residential/project/mumbai-residence-1/mumbai-residence-1-2.jpg",
      "/assets/residential/project/mumbai-residence-1/mumbai-residence-1-3.jpg",
      "/assets/residential/project/mumbai-residence-1/mumbai-residence-1-4.jpg"
    ]
  },
  {
    id: "bkt-farms",
    title: "BKT Farms, New Delhi",
    category: "Architectural Farmhouse",
    year: "2024",
    description: "Advanced architectural lighting controls, chiller-based HVAC integration, and secure electronic access control systems.",
    images: [
      "/assets/residential/project/mumbai-residence-2/mumbai-residence-2-1.jpg",
      "/assets/residential/project/mumbai-residence-2/mumbai-residence-2-2.jpg",
      "/assets/residential/project/mumbai-residence-2/mumbai-residence-2-3.jpg",
      "/assets/residential/project/mumbai-residence-2/mumbai-residence-2-4.jpg"
    ]
  },
  {
    id: "horizon-estate",
    title: "The Horizon Estate, Bengaluru",
    category: "Residential Villa",
    year: "2024",
    description: "Complete private residence lighting scenes, circadian rhythm alignment, and silent motorized drapery systems overlooking tranquil landscaped gardens.",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200",
      "/assets/residential/project/delhi-residence/delhi-residence-2.jpg",
      "/assets/residential/project/delhi-residence/delhi-residence-3.jpg"
    ]
  },
  {
    id: "lumina-hq",
    title: "Lumina Corporate Headquarters",
    category: "Commercial Enterprise",
    year: "2023",
    description: "Precision conference room automation, occupancy-based thermal conservation, and high-efficiency DALI-2 architectural lighting grid.",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
      "/assets/residential/project/mumbai-residence-1/mumbai-residence-1-2.jpg",
      "/assets/residential/project/mumbai-residence-1/mumbai-residence-1-3.jpg"
    ]
  },
  {
    id: "azure-resort",
    title: "Azure Resort & Spa, Goa",
    category: "Hospitality Retreat",
    year: "2024",
    description: "Immersive guest room environmental controls, acoustic multi-zone background sound, and architectural facade illumination.",
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200",
      "/assets/residential/project/mumbai-residence-2/mumbai-residence-2-2.jpg",
      "/assets/residential/project/mumbai-residence-2/mumbai-residence-2-3.jpg"
    ]
  },
  {
    id: "penthouse-42",
    title: "Penthouse 42, Worli Sea Face",
    category: "Penthouse Residence",
    year: "2024",
    description: "Panoramic oceanfront automation with motorized sheer screens, biometric elevator foyer access, and reference-grade Bowers & Wilkins audio.",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200",
      "/assets/residential/project/delhi-residence/delhi-residence-1.jpg",
      "/assets/residential/project/delhi-residence/delhi-residence-4.jpg"
    ]
  },
  {
    id: "silicon-valley",
    title: "Cyber City Executive Campus",
    category: "Commercial Tech Park",
    year: "2023",
    description: "Multi-tenant environmental monitoring, centralized energy metering, and motorized louver facade sun tracking.",
    images: [
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200",
      "/assets/residential/project/mumbai-residence-1/mumbai-residence-1-1.jpg"
    ]
  },
  {
    id: "glass-house",
    title: "The Glass House Pavilion, Alibaug",
    category: "Architectural Retreat",
    year: "2024",
    description: "Minimalist floor-to-ceiling glass automation, automated skylights, integrated pool terrace audio, and invisible wall controls.",
    images: [
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200",
      "/assets/residential/project/mumbai-residence-2/mumbai-residence-2-1.jpg"
    ]
  }
];

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

async function getProject(slug: string): Promise<ProjectItem | null> {
  const normalizedSlug = slug.toLowerCase();
  const staticMatch = STATIC_PROJECTS.find(
    (p) => p.id.toLowerCase() === normalizedSlug || slugify(p.title) === normalizedSlug
  );
  if (staticMatch) return staticMatch;

  try {
    const res = await fetch(`${getApiBaseUrl()}/projects`, { cache: 'no-store' });
    const data = await res.json();
    if (data.success && Array.isArray(data.data)) {
      const dbMatch = data.data.find(
        (p: any) =>
          String(p.id) === normalizedSlug ||
          `db-project-${p.id}` === normalizedSlug ||
          slugify(p.title) === normalizedSlug
      );
      if (dbMatch) {
        return {
          id: String(dbMatch.id),
          title: dbMatch.title,
          category: "Featured Project",
          year: new Date(dbMatch.createdAt).getFullYear().toString(),
          description: dbMatch.description,
          images: [
            dbMatch.imageUrl || "/assets/residential/project/delhi-residence/delhi-residence-1.jpg",
            "/assets/residential/project/delhi-residence/delhi-residence-2.jpg",
            "/assets/residential/project/delhi-residence/delhi-residence-3.jpg"
          ]
        };
      }
    }
  } catch (err) {
    console.error("Failed to query backend projects:", err);
  }

  return null;
}

export async function generateStaticParams() {
  return STATIC_PROJECTS.map((project) => ({
    slug: project.id,
  }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const project = await getProject(params.slug);
  if (!project) return { title: "Project Not Found | AT Smart Living" };

  return {
    title: `${project.title} | AT Smart Living Projects`,
    description: project.description,
  };
}

export default async function ProjectDetailsPage(
  props: { params: Promise<{ slug: string }> }
) {
  const params = await props.params;
  const project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative w-full pt-32 md:pt-40 pb-16 md:pb-24 px-6 sm:px-12 lg:px-24 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/80 text-muted-foreground text-xs font-mono uppercase tracking-widest mb-6">
          {project.category || "PROJECT GALLERY"} {project.year && `• ${project.year}`}
        </div>
        <h1 className="max-w-5xl text-foreground text-3xl sm:text-5xl md:text-6xl font-light tracking-tight mb-8">
          {project.title}
        </h1>
        <p className="text-muted text-lg md:text-xl font-light leading-relaxed max-w-3xl">
          {project.description}
        </p>
      </section>

      {/* Image Gallery */}
      <section className="w-full px-4 sm:px-8 md:px-16 lg:px-24 pb-24 md:pb-32">
        <div className="flex flex-col gap-8 md:gap-12 max-w-7xl mx-auto">
          {/* Main Feature Image */}
          {project.images[0] && (
            <div className="w-full aspect-video sm:aspect-21/9 relative rounded-2xl overflow-hidden bg-secondary shadow-lg">
              <img 
                src={project.images[0]} 
                alt={`${project.title} Feature`} 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          )}
          
          {/* Secondary Grid */}
          {project.images.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {project.images.slice(1).map((img, idx) => (
                <div key={idx} className="w-full aspect-4/3 relative rounded-xl overflow-hidden bg-secondary group shadow-sm hover:shadow-md transition-shadow">
                  <img 
                    src={img} 
                    alt={`${project.title} Detail ${idx + 1}`} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="w-full bg-panel py-20 md:py-32 px-6 flex flex-col items-center text-center border-t border-border/40">
        <h2 className="text-foreground text-2xl sm:text-4xl font-light mb-6">Inspired by this project?</h2>
        <p className="text-muted text-lg md:text-xl font-light max-w-2xl mb-10 text-balance">
          Let us engineer a bespoke automation architecture tailored to your lifestyle and architectural preferences.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/contact" className="w-full sm:w-auto">
            <Button variant="interactive" size="lg" className="w-full sm:w-auto">
              Request Architectural Consultation
            </Button>
          </Link>
          <Link href="/projects" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              View All Projects
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
