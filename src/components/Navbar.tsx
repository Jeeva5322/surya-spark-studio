import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "Projects", path: "/projects" },
  { label: "Gallery", path: "/gallery" },
  { label: "3D Home Design", path: "/3d-design" },
  { label: "AI Chatbot", path: "/chatbot" },
  { label: "Contact Us", path: "/contact" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    window.location.href = "/";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center electric-glow transition-all duration-300 group-hover:electric-glow-strong">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>

            <div>
              <span className="text-lg font-heading font-bold text-foreground">
                Surya
              </span>

              <span className="text-lg font-heading font-bold text-primary ml-1">
                Electrical
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:text-primary hover:bg-primary/10 ${
                  location.pathname === link.path
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {token ? (
              <>
                <Link
                  to={
                    role === "admin"
                      ? "/admin/dashboard"
                      : "/customer/dashboard"
                  }
                  className="px-4 py-2 rounded-lg bg-primary text-white hover:opacity-90 transition-all"
                >
                  Dashboard
                </Link>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition-all"
                >
                  Sign Up
                </Link>

                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg bg-primary text-white hover:opacity-90 transition-all"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">

              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 hover:text-primary hover:bg-primary/10 ${
                    location.pathname === link.path
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="flex flex-col gap-2 mt-4">

                {token ? (
                  <>
                    <Link
                      to={
                        role === "admin"
                          ? "/admin/dashboard"
                          : "/customer/dashboard"
                      }
                      onClick={() => setIsOpen(false)}
                      className="text-center px-4 py-3 rounded-lg bg-primary text-white"
                    >
                      Dashboard
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="text-center px-4 py-3 rounded-lg border border-primary text-primary"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="text-center px-4 py-3 rounded-lg border border-primary text-primary"
                    >
                      Sign Up
                    </Link>

                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="text-center px-4 py-3 rounded-lg bg-primary text-white"
                    >
                      Sign In
                    </Link>
                  </>
                )}

              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;