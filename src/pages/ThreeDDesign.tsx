import { Zap, Lightbulb, Power, Plug } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const rooms = [
  { name: "Living Room", points: 8, circuits: 2, icon: Lightbulb },
  { name: "Kitchen", points: 12, circuits: 3, icon: Power },
  { name: "Bedroom", points: 6, circuits: 1, icon: Plug },
  { name: "Bathroom", points: 4, circuits: 1, icon: Zap },
];

const ThreeDDesign = () => {
  return (
    <div className="min-h-screen pt-20">
      <section className="py-24 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6">
              3D Home <span className="text-gradient">Electrical Design</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              We design detailed electrical layouts for your home before installation begins
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Interactive Layout Preview */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <AnimatedSection className="mb-16 text-center">
            <h2 className="text-3xl font-heading font-bold text-foreground mb-4">
              Home Electrical <span className="text-gradient">Layout Preview</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Explore how we plan electrical points, circuits, and wiring for each room
            </p>
          </AnimatedSection>

          {/* 3D-like floor plan */}
          <AnimatedSection>
            <div className="max-w-4xl mx-auto glass-card rounded-2xl p-8 border border-primary/20">
              <div className="grid grid-cols-2 gap-4 mb-8">
                {rooms.map((room, i) => (
                  <div key={i} className="relative glass-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all duration-300 group cursor-pointer hover:-translate-y-1" style={{ perspective: "1000px" }}>
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <room.icon className="w-4 h-4 text-primary" />
                    </div>
                    <h3 className="font-heading font-bold text-foreground mb-4">{room.name}</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Electrical Points</span>
                        <span className="text-primary font-semibold">{room.points}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Circuits</span>
                        <span className="text-primary font-semibold">{room.circuits}</span>
                      </div>
                    </div>
                    {/* Connection lines */}
                    <div className="absolute -bottom-2 left-1/2 w-0.5 h-4 bg-primary/30 group-hover:bg-primary/60 transition-colors" />
                  </div>
                ))}
              </div>

              {/* Central distribution */}
              <div className="glass-card rounded-xl p-6 text-center border border-primary/30 bg-primary/5">
                <Zap className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="font-heading font-bold text-foreground mb-1">Main Distribution Board</h3>
                <p className="text-sm text-muted-foreground">Central MCB panel with circuit breakers</p>
                <div className="flex justify-center gap-8 mt-4">
                  <div className="text-center">
                    <p className="text-2xl font-heading font-bold text-primary">30</p>
                    <p className="text-xs text-muted-foreground">Total Points</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-heading font-bold text-primary">7</p>
                    <p className="text-xs text-muted-foreground">Circuits</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-heading font-bold text-primary">3</p>
                    <p className="text-xs text-muted-foreground">Phase</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Process */}
          <div className="max-w-3xl mx-auto mt-16">
            <AnimatedSection className="text-center mb-12">
              <h2 className="text-3xl font-heading font-bold text-foreground">
                Our Design <span className="text-gradient">Process</span>
              </h2>
            </AnimatedSection>
            <div className="space-y-6">
              {[
                { step: "01", title: "Site Survey", desc: "We visit your home to understand the layout and your electrical needs." },
                { step: "02", title: "Design Planning", desc: "Our team creates a detailed electrical layout with optimal point placement." },
                { step: "03", title: "Client Review", desc: "We present the design for your approval and incorporate feedback." },
                { step: "04", title: "Installation", desc: "Precise installation following the approved electrical design plan." },
              ].map((item, i) => (
                <AnimatedSection key={i} delay={i * 0.1}>
                  <div className="glass-card rounded-xl p-6 flex items-start gap-6">
                    <span className="text-3xl font-heading font-bold text-primary/30">{item.step}</span>
                    <div>
                      <h3 className="font-heading font-bold text-foreground mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ThreeDDesign;
