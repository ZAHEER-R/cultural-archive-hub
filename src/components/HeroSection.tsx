import { motion } from "framer-motion";
import { ChevronDown, Globe, BookOpen, Shield } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const floatingIcons = [
  { icon: "🏛", x: "10%", y: "20%", delay: 0 },
  { icon: "🕌", x: "85%", y: "15%", delay: 0.5 },
  { icon: "⛩", x: "75%", y: "70%", delay: 1 },
  { icon: "🏰", x: "15%", y: "75%", delay: 1.5 },
  { icon: "📜", x: "50%", y: "10%", delay: 0.8 },
  { icon: "🎭", x: "90%", y: "45%", delay: 1.2 },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Floating cultural icons */}
      {floatingIcons.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-3xl md:text-5xl opacity-20 pointer-events-none select-none"
          style={{ left: item.x, top: item.y }}
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 3, delay: item.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          {item.icon}
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/10 mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Globe className="w-4 h-4 text-gold-light" />
            <span className="text-sm text-gold-light font-medium">UNESCO Recognized Heritage</span>
          </motion.div>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold text-primary-foreground leading-tight mb-6 max-w-4xl mx-auto" style={{ color: "hsl(35 33% 96%)" }}>
            Preserving the World's{" "}
            <span className="text-gradient-gold">Intangible Cultural</span>{" "}
            Heritage
          </h1>

          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed" style={{ color: "hsl(35 20% 80%)" }}>
            A trusted digital platform to document, verify, preserve, and protect cultural knowledge for future generations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="#cultures"
              className="px-8 py-4 rounded-full bg-gradient-gold font-semibold text-sm tracking-wide shadow-gold transition-all hover:scale-105"
              style={{ color: "hsl(20 25% 10%)" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Cultural Archive
            </motion.a>
            <motion.a
              href="#about"
              className="px-8 py-4 rounded-full border font-semibold text-sm tracking-wide transition-all hover:bg-primary-foreground/10"
              style={{ color: "hsl(35 33% 90%)", borderColor: "hsl(35 33% 90% / 0.3)" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Learn More
            </motion.a>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          {[
            { icon: Globe, label: "Countries", value: "195+" },
            { icon: BookOpen, label: "Cultures", value: "10K+" },
            { icon: Shield, label: "Verified", value: "100%" },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <stat.icon className="w-5 h-5 mx-auto mb-2 text-gold" />
              <p className="text-2xl font-heading font-bold" style={{ color: "hsl(35 33% 96%)" }}>{stat.value}</p>
              <p className="text-xs" style={{ color: "hsl(35 20% 70%)" }}>{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6" style={{ color: "hsl(35 20% 70%)" }} />
        </motion.div>
      </div>
    </section>
  );
}
