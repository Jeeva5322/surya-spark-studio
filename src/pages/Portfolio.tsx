import AnimatedSection from "@/components/AnimatedSection";

const portfolioItems = [
  { title: "Modern Apartment Wiring", category: "Residential", desc: "Complete rewiring of a 3BHK apartment with concealed wiring and smart switches." },
  { title: "Factory Power Distribution", category: "Industrial", desc: "220kV power distribution system for a manufacturing unit." },
  { title: "Corporate Office Setup", category: "Commercial", desc: "Full electrical infrastructure for a 50,000 sq ft office space." },
  { title: "Smart Home Installation", category: "Residential", desc: "IoT-enabled home automation with voice-controlled lighting." },
  { title: "Shopping Mall Lighting", category: "Commercial", desc: "Energy-efficient LED lighting design for a retail complex." },
  { title: "Warehouse Electrical", category: "Industrial", desc: "Heavy-duty electrical installation for a logistics warehouse." },
];

const Portfolio = () => {
  return (
    <div className="min-h-screen pt-20">
      <section className="py-24 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6">
              Our <span className="text-gradient">Portfolio</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Showcasing our best electrical work across various sectors
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioItems.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="glass-card rounded-xl overflow-hidden group hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
                  <div className="h-48 bg-gradient-to-br from-primary/20 via-secondary to-primary/10 flex items-center justify-center group-hover:from-primary/30 transition-all duration-500">
                    <span className="text-5xl font-heading font-bold text-primary/30 group-hover:text-primary/50 transition-colors">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">{item.category}</span>
                    <h3 className="text-lg font-heading font-bold text-foreground mt-3 mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
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

export default Portfolio;
