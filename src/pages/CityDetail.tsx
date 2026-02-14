import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Users, Languages, Star, Heart, Share2, CheckCircle } from "lucide-react";
import { cities } from "@/data/cities";
import { useState } from "react";

function getCityImage(imageKey: string): string {
  const modules = import.meta.glob("@/assets/*.jpg", { eager: true }) as Record<string, { default: string }>;
  for (const path in modules) {
    const name = path.split("/").pop()?.replace(".jpg", "") || "";
    if (name === imageKey) return modules[path].default;
  }
  return "";
}

export default function CityDetail() {
  const { id } = useParams();
  const city = cities.find(c => c.id === id);
  const [liked, setLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<"cultures" | "reviews">("cultures");

  if (!city) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-heading mb-4">City not found</p>
          <Link to="/" className="text-accent hover:underline">Go Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20 md:pb-0">
      {/* Hero */}
      <div className="relative h-[50vh] overflow-hidden">
        <img src={getCityImage(city.image)} alt={city.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <div className="absolute top-4 left-4">
          <Link to="/" className="p-2 rounded-full glass-card hover:bg-secondary transition-colors inline-flex">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </div>
        <div className="absolute bottom-6 left-6 right-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-2">{city.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {city.country}, {city.region}</span>
              <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {city.population}</span>
              <span className="flex items-center gap-1"><Languages className="w-4 h-4" /> {city.languages.join(", ")}</span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Actions */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => setLiked(!liked)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${liked ? "bg-red-500/10 border-red-500/30 text-red-500" : "hover:bg-secondary"}`}
          >
            <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
            <span className="text-sm">{liked ? "Liked" : "Like"}</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full border hover:bg-secondary transition-colors">
            <Share2 className="w-4 h-4" />
            <span className="text-sm">Share</span>
          </button>
          <div className="ml-auto flex items-center gap-1 text-gold">
            <Star className="w-4 h-4 fill-current" />
            <span className="font-medium">4.8</span>
            <span className="text-muted-foreground text-sm">(128 reviews)</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b">
          <button
            onClick={() => setActiveTab("cultures")}
            className={`pb-3 text-sm font-medium transition-colors ${activeTab === "cultures" ? "border-b-2 border-accent text-accent" : "text-muted-foreground"}`}
          >
            Cultures & Traditions ({city.cultures.length})
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`pb-3 text-sm font-medium transition-colors ${activeTab === "reviews" ? "border-b-2 border-accent text-accent" : "text-muted-foreground"}`}
          >
            Experiences & Reviews
          </button>
        </div>

        {activeTab === "cultures" && (
          <div className="grid gap-4 md:grid-cols-2">
            {city.cultures.map((culture, i) => (
              <motion.div
                key={i}
                className="p-6 rounded-xl bg-card border shadow-sm hover:shadow-gold transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-heading font-semibold text-lg flex items-center gap-2">
                      {culture.title}
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                    </h3>
                    <div className="flex gap-2 mt-1">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent">{culture.category}</span>
                      {culture.religion && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{culture.religion}</span>
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{culture.description}</p>
                {culture.celebrationDate && (
                  <p className="text-xs text-accent font-medium">Celebrated: {culture.celebrationDate}</p>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="font-heading text-lg mb-2">Share Your Experience</p>
            <p className="text-sm mb-4">Sign in to share photos, videos, and stories about this place</p>
            <Link to="/auth" className="inline-block px-6 py-2 rounded-full bg-gradient-gold text-sm font-medium" style={{ color: "hsl(20 25% 10%)" }}>
              Sign In to Review
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
