import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import { toast } from "sonner";

const workTypes = [
  "Residential Wiring",
  "Industrial Installation",
  "Office Electrical Setup",
  "Kitchen Electrical",
  "Lighting Installation",
  "Electrical Maintenance",
  "Power Backup Systems",
  "Smart Home Systems",
  "Other",
];

const Contact = () => {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", address: "", workType: "", description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you! We'll get back to you within 24 hours.");
    setForm({ name: "", email: "", phone: "", address: "", workType: "", description: "" });
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="py-24 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6">
              Contact <span className="text-gradient">Us</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Get in touch for a free consultation and quote
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-10 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatedSection>
                <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Get In Touch</h2>
                <div className="space-y-5">
                  {[
                    { icon: Phone, label: "Phone", value: "+91 98765 43210", href: "tel:+919876543210" },
                    { icon: Mail, label: "Email", value: "info@suryaelectrical.com", href: "mailto:info@suryaelectrical.com" },
                    { icon: MapPin, label: "Location", value: "Hyderabad, Telangana, India" },
                    { icon: Clock, label: "Working Hours", value: "Mon-Sat: 8AM - 8PM" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-0.5">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-sm font-medium text-foreground hover:text-primary transition-colors">{item.value}</a>
                        ) : (
                          <p className="text-sm font-medium text-foreground">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {/* Map Placeholder */}
              <AnimatedSection delay={0.1}>
                <div className="glass-card rounded-xl overflow-hidden h-48 flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary">
                  <div className="text-center">
                    <MapPin className="w-8 h-8 text-primary/40 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Google Maps Location</p>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Form */}
            <AnimatedSection delay={0.15} className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 space-y-5">
                <h2 className="text-2xl font-heading font-bold text-foreground mb-2">Request a Quote</h2>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Full Name *</label>
                    <input required value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full bg-secondary rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="Your full name" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email Address *</label>
                    <input required type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="w-full bg-secondary rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="your@email.com" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Phone Number *</label>
                    <input required value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} className="w-full bg-secondary rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Type of Work *</label>
                    <select required value={form.workType} onChange={(e) => setForm({...form, workType: e.target.value})} className="w-full bg-secondary rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/50 transition-all">
                      <option value="">Select type</option>
                      {workTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Address</label>
                  <input value={form.address} onChange={(e) => setForm({...form, address: e.target.value})} className="w-full bg-secondary rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/50 transition-all" placeholder="Your address" />
                </div>

                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Project Description</label>
                  <textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} rows={4} className="w-full bg-secondary rounded-lg px-4 py-3 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none" placeholder="Describe your electrical work requirements..." />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:electric-glow transition-all duration-300"
                >
                  <Send className="w-5 h-5" /> Submit Request
                </motion.button>
              </form>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
