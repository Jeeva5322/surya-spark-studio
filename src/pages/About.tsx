import { Target, Eye, Zap, Home, Building2, Factory, Cpu, Wrench, Award } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const skills = [
  { icon: Home, label: "Residential Wiring" },
  { icon: Factory, label: "Industrial Electrical Work" },
  { icon: Building2, label: "Office Electrical Setup" },
  { icon: Cpu, label: "Smart Home Systems" },
  { icon: Wrench, label: "Electrical Maintenance" },
  { icon: Zap, label: "Power Backup Solutions" },
];

const About = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-24 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6">
              About <span className="text-gradient">Surya Electricals</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              With over 12 years of experience, Surya Electrical Works has been delivering professional and reliable electrical solutions across residential, commercial, and industrial sectors.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection>
              <div className="glass-card rounded-xl p-10 h-full">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To provide safe, efficient, and innovative electrical solutions that power every space. We are committed to delivering quality workmanship, timely project completion, and exceptional customer service.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <div className="glass-card rounded-xl p-10 h-full">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-primary" />
                </div>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-4">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To be the most trusted electrical service provider, recognized for innovation, reliability, and customer satisfaction. We envision a future where every space is powered safely and efficiently.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
              Our <span className="text-gradient">Expertise</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Decades of experience across diverse electrical domains
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {skills.map((skill, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="glass-card rounded-xl p-6 text-center group hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
                  <skill.icon className="w-10 h-10 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <p className="font-medium text-foreground text-sm">{skill.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
              Why Choose <span className="text-gradient">Us?</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection>
            <div className="space-y-6">
              {[
                { icon: Award, title: "Licensed & Certified", desc: "All our electricians are licensed and certified professionals." },
                { icon: Zap, title: "Fast & Reliable", desc: "We deliver projects on time without compromising on quality." },
                { icon: Wrench, title: "24/7 Support", desc: "Emergency electrical services available round the clock." },
              ].map((item, i) => (
                <div key={i} className="glass-card rounded-xl p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default About;
