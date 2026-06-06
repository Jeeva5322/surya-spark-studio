import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Zap } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";

interface Message {
  role: "user" | "bot";
  text: string;
}

const botResponses: Record<string, string> = {
  "price": "Our pricing varies depending on the type and scope of work. Residential wiring starts from ₹5,000, office setups from ₹15,000, and industrial installations are quoted based on site survey. Contact us for a free detailed quote!",
  "cost": "Our pricing varies depending on the type and scope of work. Residential wiring starts from ₹5,000, office setups from ₹15,000, and industrial installations are quoted based on site survey. Contact us for a free detailed quote!",
  "available": "We are available Monday to Saturday, 8:00 AM to 8:00 PM. For emergency services, we offer 24/7 support. Call us at +91 98765 43210.",
  "safety": "Here are some electrical safety tips:\n• Never overload power outlets\n• Use proper circuit breakers\n• Keep water away from electrical appliances\n• Get regular electrical inspections\n• Always hire licensed electricians for repairs",
  "services": "We offer: Apartment Wiring, House Wiring, Industrial Installation, Office Setup, Kitchen Electrical, Lighting, Maintenance, Power Backup, and Smart Home Systems. Visit our Services page for details!",
  "contact": "You can reach us at:\n📞 +91 98765 43210\n📧 info@suryaelectrical.com\n📍 Hyderabad, Telangana\n\nOr visit our Contact page to send us a message!",
  "hello": "Hello! Welcome to Surya Electrical Works. How can I help you today? You can ask about our services, pricing, availability, or electrical safety tips.",
  "hi": "Hi there! Welcome to Surya Electrical Works. How can I assist you? Feel free to ask about our services, pricing, or availability.",
};

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const [key, response] of Object.entries(botResponses)) {
    if (lower.includes(key)) return response;
  }
  return "Thank you for your message! For specific inquiries, please contact us at +91 98765 43210 or visit our Contact page. I can help with questions about our services, pricing, availability, and electrical safety tips.";
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "👋 Hello! I'm the Surya Electrical assistant. How can I help you today?\n\nYou can ask about:\n• Service pricing\n• Work availability\n• Electrical safety tips\n• Our services" },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "bot", text: getBotResponse(userMsg) }]);
    }, 800);
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="py-24 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6">
              AI <span className="text-gradient">Assistant</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Ask our chatbot about services, pricing, and electrical safety tips
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 max-w-2xl">
          <AnimatedSection>
            <div className="glass-card rounded-2xl overflow-hidden border border-primary/20">
              {/* Header */}
              <div className="p-4 border-b border-border flex items-center gap-3 bg-primary/5">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-heading font-bold text-foreground text-sm">Surya Electrical Bot</p>
                  <p className="text-xs text-muted-foreground">Online • Ready to help</p>
                </div>
              </div>

              {/* Messages */}
              <div className="h-[400px] overflow-y-auto p-4 space-y-4">
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}
                  >
                    {msg.role === "bot" && (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                    )}
                    <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm whitespace-pre-line ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-br-md"
                        : "bg-secondary text-secondary-foreground rounded-bl-md"
                    }`}>
                      {msg.text}
                    </div>
                    {msg.role === "user" && (
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                        <User className="w-4 h-4 text-muted-foreground" />
                      </div>
                    )}
                  </motion.div>
                ))}
                <div ref={endRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Ask about our services..."
                    className="flex-1 bg-secondary rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                  <button
                    onClick={sendMessage}
                    className="w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center hover:electric-glow transition-all duration-300 hover:scale-105"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Chatbot;
