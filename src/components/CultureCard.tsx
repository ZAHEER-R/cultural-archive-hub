import { motion } from "framer-motion";
import { MapPin, Star, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
import { CityData } from "@/data/cities";

interface Props {
  city: CityData;
  index: number;
}

function getCityImage(imageKey: string): string {
  const modules = import.meta.glob("@/assets/*.jpg", { eager: true }) as Record<string, { default: string }>;
  for (const path in modules) {
    const name = path.split("/").pop()?.replace(".jpg", "") || "";
    if (name === imageKey) return modules[path].default;
  }
  return "";
}

export default function CultureCard({ city, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/city/${city.id}`} className="culture-card block bg-card border shadow-sm">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={getCityImage(city.image)}
            alt={city.name}
            className="w-full h-full object-cover transition-transform duration-700"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
          <div className="absolute top-3 right-3 flex gap-2">
            <button className="p-2 rounded-full glass-card hover:bg-accent transition-colors" onClick={(e) => e.preventDefault()}>
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="font-heading text-xl font-bold" style={{ color: "hsl(35 33% 96%)" }}>{city.name}</h3>
            <p className="text-sm flex items-center gap-1" style={{ color: "hsl(35 20% 80%)" }}>
              <MapPin className="w-3 h-3" /> {city.country}
            </p>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs px-2 py-1 rounded-full bg-accent/10 text-accent font-medium">
              {city.region}
            </span>
            <div className="flex items-center gap-1 text-gold">
              <Star className="w-3 h-3 fill-current" />
              <span className="text-xs font-medium">4.8</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            {city.cultures.length} cultural traditions | {city.languages.join(", ")}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
