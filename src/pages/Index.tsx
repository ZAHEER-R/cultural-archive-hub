import { motion } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import ProblemSection from "@/components/ProblemSection";
import WorkflowSection from "@/components/WorkflowSection";
import CultureCard from "@/components/CultureCard";
import CTASection from "@/components/CTASection";
import { cities } from "@/data/cities";

export default function Index() {
  return (
    <div className="pb-16 md:pb-0">
      <HeroSection />
      <CategoriesSection />

      {/* City Culture Cards */}
      <section id="cultures" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">
              Explore Cultural <span className="text-gradient-gold">Heritage</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Discover traditions, rituals, and knowledge from cities around the world
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cities.map((city, i) => (
              <CultureCard key={city.id} city={city} index={i} />
            ))}
          </div>
        </div>
      </section>

      <ProblemSection />
      <WorkflowSection />
      <CTASection />
    </div>
  );
}
