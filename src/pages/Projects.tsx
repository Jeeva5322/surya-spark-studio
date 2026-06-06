import { Star } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const projects = [
  { title: "Sunrise Apartments Complex", desc: "Complete electrical installation for a 200-unit residential complex including common areas, parking lighting, and generator backup systems.", client: "Sunrise Builders", feedback: "Excellent work quality and completed within the deadline. Highly recommended!", rating: 5 },
  { title: "TechPark IT Office", desc: "Modern office electrical setup with structured cabling, server room power, UPS integration, and energy-efficient lighting across 3 floors.", client: "TechPark Solutions", feedback: "Professional team with great attention to detail. The smart lighting system they installed is fantastic.", rating: 5 },
  { title: "GreenLeaf Manufacturing", desc: "Industrial-grade power distribution, motor control panels, and safety systems for a large-scale manufacturing plant.", client: "GreenLeaf Industries", feedback: "Reliable and experienced team. They handled our complex requirements perfectly.", rating: 5 },
  { title: "Royal Villa Smart Home", desc: "Luxury smart home automation including voice-controlled lighting, automated blinds, security systems, and whole-house audio.", client: "Private Client", feedback: "Transformed our home into a truly smart living space. The team was professional and knowledgeable.", rating: 5 },
];

const Projects = () => {
  return (
    <div className="min-h-screen pt-20">
      <section className="py-24 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6">
              Completed <span className="text-gradient">Projects</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              A showcase of our successfully delivered electrical projects
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-8">
            {projects.map((project, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="glass-card rounded-xl overflow-hidden">
                  <div className="h-40 bg-gradient-to-r from-primary/10 via-secondary to-primary/5 flex items-center justify-center">
                    <span className="text-6xl font-heading font-bold text-primary/20">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-heading font-bold text-foreground mb-3">{project.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">{project.desc}</p>
                    <div className="glass-card rounded-lg p-5 bg-secondary/50">
                      <div className="flex gap-1 mb-2">
                        {Array.from({ length: project.rating }).map((_, j) => (
                          <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground italic mb-2">"{project.feedback}"</p>
                      <p className="text-xs font-medium text-primary">— {project.client}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Projects;
