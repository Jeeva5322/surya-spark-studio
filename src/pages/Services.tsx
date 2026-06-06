import { Home, Building, Factory, Building2, UtensilsCrossed, Lightbulb, Wrench, BatteryCharging, Cpu } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const services = [
  { icon: Building, title: "Apartment Electrical Works", desc: "Complete electrical wiring, switchboard installation, and maintenance for apartments and residential complexes." },
  { icon: Home, title: "Independent House Wiring", desc: "Full house wiring solutions including concealed wiring, MCB panels, and earthing systems." },
  { icon: Factory, title: "Industrial Electrical Installation", desc: "Heavy-duty electrical installations for factories including motor wiring, control panels, and power distribution." },
  { icon: Building2, title: "Office Electrical Setup", desc: "Professional office electrical infrastructure including network cabling, UPS systems, and lighting." },
  { icon: UtensilsCrossed, title: "Kitchen Electrical Setup", desc: "Specialized kitchen electrical work including high-power appliance wiring and exhaust systems." },
  { icon: Lightbulb, title: "Lighting Installation", desc: "Interior and exterior lighting design and installation for aesthetic and functional illumination." },
  { icon: Wrench, title: "Electrical Maintenance", desc: "Regular maintenance, troubleshooting, and repair services to keep your electrical systems running safely." },
  { icon: BatteryCharging, title: "Power Backup Systems", desc: "Installation of inverters, generators, and UPS systems for uninterrupted power supply." },
  { icon: Cpu, title: "Smart Home Electrical Systems", desc: "Home automation, smart switches, voice-controlled lighting, and IoT-enabled electrical solutions." },
];

const Services = () => {
  return (
    <div className="min-h-screen pt-20">
      <section className="py-24 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6">
              Our <span className="text-gradient">Services</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              From residential wiring to industrial installations, we offer comprehensive electrical services.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div className="glass-card rounded-xl p-8 h-full group hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-3">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
