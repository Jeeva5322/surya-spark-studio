import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Zap, Home, Building2, Factory, Lightbulb, Shield, Award, Users, CheckCircle, Star, ArrowRight } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import HeroAnimation from "@/components/HeroAnimation";
import { useEffect, useState, useRef } from "react";

const stats = [
  { icon: CheckCircle, value: 500, suffix: "+", label: "Projects Completed" },
  { icon: Users, value: 350, suffix: "+", label: "Satisfied Clients" },
  { icon: Award, value: 12, suffix: "+", label: "Years Experience" },
  { icon: Star, value: 4.9, suffix: "", label: "Average Rating" },
];

const services = [
  { icon: Home, title: "Residential Wiring", desc: "Complete home electrical solutions" },
  { icon: Building2, title: "Office Setup", desc: "Modern office electrical installations" },
  { icon: Factory, title: "Industrial Works", desc: "Heavy-duty industrial electrical systems" },
  { icon: Lightbulb, title: "Smart Lighting", desc: "Energy-efficient lighting solutions" },
  { icon: Shield, title: "Safety Audits", desc: "Comprehensive electrical safety checks" },
  { icon: Zap, title: "Power Backup", desc: "Reliable backup power systems" },
];

const testimonials = [
  { name: "Rajesh Kumar", role: "Homeowner", text: "Surya Electrical Works did an excellent job rewiring our entire home. Professional, on time, and very reasonable pricing.", rating: 5 },
  { name: "Priya Sharma", role: "Business Owner", text: "We hired them for our new office setup. The work quality was outstanding and they finished ahead of schedule.", rating: 5 },
  { name: "Anil Reddy", role: "Factory Manager", text: "Their industrial electrical work is top-notch. They handled our entire factory's electrical infrastructure perfectly.", rating: 5 },
];

function CountUp({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const isDecimal = end % 1 !== 0;
    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(isDecimal ? parseFloat(current.toFixed(1)) : Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, end]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
       <div className="absolute inset-0">
  <HeroAnimation />

  <div className="absolute inset-0 bg-black/20" />

  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

  <div
    className="absolute inset-0"
    style={{
      background:
        "radial-gradient(circle at center, rgba(250,204,21,0.12), transparent 60%)",
    }}
  />
</div>
        <div className="container mx-auto px-4 relative z-10 text-center pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black/40 backdrop-blur-md border border-yellow-500/50 mb-8">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Trusted Electrical Experts</span>
            </div>
            <motion.h1
  className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-6"
  animate={{
    textShadow: [
      "0 0 10px rgba(250,204,21,0.2)",
      "0 0 30px rgba(250,204,21,0.6)",
      "0 0 60px rgba(250,204,21,1)",
      "0 0 30px rgba(250,204,21,0.6)",
      "0 0 10px rgba(250,204,21,0.2)",
    ],
  }}
  transition={{
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut",
  }}
>
  <span className="text-white">Surya</span>{" "}
  <span className="text-gradient">Electrical</span>{" "}
  <span className="text-white">Works</span>
</motion.h1>
            <p className="text-lg md:text-2xl text-white/90 font-medium max-w-3xl mx-auto mb-10">
  Professional Electrical Solutions for Homes, Offices & Industries
</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
               className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-500 text-black rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-110 hover:shadow-[0_0_35px_rgba(250,204,21,0.8)]"
              >
                Get a Free Quote <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/services"
className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-500 text-black rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-110 hover:shadow-[0_0_35px_rgba(250,204,21,0.8)]"
              >
                Our Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <AnimatedSection key={i} delay={i * 0.1} className="text-center">
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Services Highlights */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Our <span className="text-gradient">Services</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Comprehensive electrical solutions tailored to your needs
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="glass-card rounded-xl p-8 group hover:border-primary/50 transition-all duration-300 hover:-translate-y-1">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm">{service.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
              Client <span className="text-gradient">Testimonials</span>
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="glass-card rounded-xl p-8 h-full">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">"{t.text}"</p>
                  <div>
                    <p className="font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="relative rounded-2xl overflow-hidden p-12 md:p-20 text-center bg-gradient-to-br from-primary/20 via-card to-primary/10 border border-primary/30">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                Ready to Start Your Project?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Get in touch today for a free consultation and quote on your electrical project.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-yellow-500 text-black rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-110 hover:shadow-[0_0_35px_rgba(250,204,21,0.8)]"
              >
                Contact Us Now <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Index;
