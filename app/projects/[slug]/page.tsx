import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const PROJECTS_DATA = [
  {
    id: "dixit-nene",
    title: "The Dixit-Nene Residence, Mumbai",
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
    year: "",
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
    year: "2024",
    description: "Advanced architectural lighting controls, chiller-based HVAC integration, and secure electronic access control systems.",
    images: [
      "/assets/residential/project/mumbai-residence-2/mumbai-residence-2-1.jpg",
      "/assets/residential/project/mumbai-residence-2/mumbai-residence-2-2.jpg",
      "/assets/residential/project/mumbai-residence-2/mumbai-residence-2-3.jpg",
      "/assets/residential/project/mumbai-residence-2/mumbai-residence-2-4.jpg"
    ]
  }
];

export async function generateStaticParams() {
  return PROJECTS_DATA.map((project) => ({
    slug: project.id,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = PROJECTS_DATA.find((p) => p.id === params.slug);
  if (!project) return { title: "Not Found" };
  
  return {
    title: `${project.title} | AT Smart Living Projects`,
    description: project.description,
  };
}

export default function ProjectDetailsPage({ params }: { params: { slug: string } }) {
  const project = PROJECTS_DATA.find((p) => p.id === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="relative min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative w-full pt-32 md:pt-40 pb-16 md:pb-24 px-6 sm:px-12 lg:px-24 flex flex-col items-center text-center">
        <h5 className="mb-6">
          PROJECT GALLERY {project.year && `• ${project.year}`}
        </h5>
        <h1 className="max-w-5xl text-foreground mb-8">
          {project.title}
        </h1>
        <p className="text-muted text-lg md:text-xl font-light leading-relaxed max-w-3xl">
          {project.description}
        </p>
      </section>

      {/* Image Gallery */}
      <section className="w-full px-4 sm:px-8 md:px-16 lg:px-24 pb-24 md:pb-32">
        <div className="flex flex-col gap-8 md:gap-12">
          {/* Main Feature Image */}
          {project.images[0] && (
            <div className="w-full aspect-[16/9] sm:aspect-[21/9] relative rounded-2xl overflow-hidden bg-secondary shadow-lg">
              <img 
                src={project.images[0]} 
                alt={`${project.title} Feature`} 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          )}
          
          {/* Secondary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {project.images.slice(1).map((img, idx) => (
              <div key={idx} className="w-full aspect-[4/3] relative rounded-xl overflow-hidden bg-secondary group shadow-sm hover:shadow-md transition-shadow">
                <img 
                  src={img} 
                  alt={`${project.title} Detail ${idx + 1}`} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="w-full bg-panel py-20 md:py-32 px-6 flex flex-col items-center text-center">
        <h2 className="text-foreground mb-6">Inspired by this project?</h2>
        <p className="text-muted text-lg md:text-xl font-light max-w-2xl mb-10 text-balance">
          Let us engineer a bespoke automation architecture tailored to your lifestyle and design preferences.
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
