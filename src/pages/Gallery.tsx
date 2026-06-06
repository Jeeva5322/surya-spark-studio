import { useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

const galleryItems = [
  { title: "Switchboard Installation", color: "from-yellow-600/20 to-amber-900/20" },
  { title: "Concealed Wiring", color: "from-orange-600/20 to-yellow-900/20" },
  { title: "Industrial Panel", color: "from-amber-600/20 to-yellow-800/20" },
  { title: "LED Lighting Setup", color: "from-yellow-500/20 to-orange-900/20" },
  { title: "Smart Switch Panel", color: "from-amber-500/20 to-yellow-700/20" },
  { title: "Office Electrical Work", color: "from-yellow-700/20 to-amber-800/20" },
  { title: "Generator Installation", color: "from-orange-500/20 to-amber-700/20" },
  { title: "Home Automation", color: "from-yellow-600/20 to-orange-800/20" },
  { title: "Safety Inspection", color: "from-amber-600/20 to-yellow-900/20" },
];

const Gallery = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="min-h-screen pt-20">
      <section className="py-24 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6">
              Our <span className="text-gradient">Gallery</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Visual showcase of our electrical installations and projects
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryItems.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.05}>
                <div
                  onClick={() => setSelected(i)}
                  className={`relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer group bg-gradient-to-br ${item.color} border border-border hover:border-primary/50 transition-all duration-300`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-7xl font-heading font-bold text-primary/10 group-hover:text-primary/20 transition-colors group-hover:scale-110 duration-500">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-xl p-4"
            onClick={() => setSelected(null)}
          >
            <button onClick={() => setSelected(null)} className="absolute top-6 right-6 text-foreground hover:text-primary transition-colors">
              <X className="w-8 h-8" />
            </button>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className={`w-full max-w-2xl aspect-[4/3] rounded-2xl bg-gradient-to-br ${galleryItems[selected].color} border border-border flex items-center justify-center`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <span className="text-8xl font-heading font-bold text-primary/20">{String(selected + 1).padStart(2, '0')}</span>
                <p className="text-xl font-heading font-bold text-foreground mt-4">{galleryItems[selected].title}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
