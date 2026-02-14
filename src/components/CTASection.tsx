import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

export default function CTASection() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6 max-w-3xl mx-auto" style={{ color: "hsl(35 33% 96%)" }}>
            Preserve Culture. Protect Identity.{" "}
            <span className="text-gradient-gold">Empower Generations.</span>
          </h2>
          <p className="mb-10 max-w-xl mx-auto" style={{ color: "hsl(35 20% 75%)" }}>
            Join thousands of contributors, researchers, and cultural enthusiasts in preserving our shared heritage.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to="/auth"
              className="inline-block px-10 py-4 rounded-full bg-gradient-gold font-semibold text-sm tracking-wide shadow-gold animate-glow-pulse"
              style={{ color: "hsl(20 25% 10%)" }}
            >
              Join the Cultural Preservation Movement
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
