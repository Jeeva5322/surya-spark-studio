import { Link } from "react-router-dom";
import { Zap, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-heading font-bold text-foreground">
                Surya <span className="text-primary">Electrical</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Professional electrical solutions for homes, offices & industries. Trusted by hundreds of satisfied customers.
            </p>
            <div className="flex gap-3 mt-6">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-foreground mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2">
              {["About Us", "Services", "Portfolio", "Projects", "Contact Us"].map((link) => (
                <Link key={link} to={`/${link.toLowerCase().replace(/\s+/g, '-').replace('us', '')}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {link}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-heading font-bold text-foreground mb-4">Our Services</h3>
            <div className="flex flex-col gap-2">
              {["Residential Wiring", "Industrial Installation", "Office Setup", "Smart Home Systems", "Lighting Installation"].map((s) => (
                <span key={s} className="text-sm text-muted-foreground">{s}</span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-bold text-foreground mb-4">Contact Info</h3>
            <div className="flex flex-col gap-3">
              <a href="tel:+919876543210" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Phone className="w-4 h-4 text-primary" /> +91 98765 43210
              </a>
              <a href="mailto:info@suryaelectrical.com" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-4 h-4 text-primary" /> info@suryaelectrical.com
              </a>
              <div className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary mt-0.5" /> Hyderabad, Telangana, India
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Surya Electrical Works. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
