import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { useMemo, useState } from "react";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/CategoriesSection";
import ProblemSection from "@/components/ProblemSection";
import WorkflowSection from "@/components/WorkflowSection";
import CultureCard from "@/components/CultureCard";
import CTASection from "@/components/CTASection";
import { cities } from "@/data/cities";

const INITIAL_SHOW = 24;

export default function Index() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "";
  const [showCount, setShowCount] = useState(INITIAL_SHOW);

  const filteredCities = useMemo(() => {
    if (!activeCategory) return cities;
    return cities.filter(c => c.cultures.some(cu => cu.category === activeCategory));
  }, [activeCategory]);

  const visibleCities = filteredCities.slice(0, showCount);

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
            {activeCategory && (
              <div className="mt-4 flex items-center justify-center gap-2">
                <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                  {activeCategory}
                </span>
                <button
                  onClick={() => { setSearchParams({}); setShowCount(INITIAL_SHOW); }}
                  className="text-xs text-muted-foreground hover:text-foreground underline"
                >
                  Clear filter
                </button>
              </div>
            )}
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {visibleCities.map((city, i) => (
              <CultureCard key={city.id} city={city} index={i} />
            ))}
          </div>

          {showCount < filteredCities.length && (
            <div className="text-center mt-10">
              <button
                onClick={() => setShowCount(prev => prev + 24)}
                className="px-8 py-3 rounded-full bg-gradient-gold text-sm font-semibold hover:opacity-90 transition-opacity"
                style={{ color: "hsl(20 25% 10%)" }}
              >
                Load More ({filteredCities.length - showCount} remaining)
              </button>
            </div>
          )}
        </div>
      </section>

      <ProblemSection />
      <WorkflowSection />
      <CTASection />
    </div>
  );
}
