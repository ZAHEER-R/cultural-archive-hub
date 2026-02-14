import { useState, useEffect, useRef } from "react";
import { Search, X, Clock, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { cities, countries } from "@/data/cities";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      const saved = localStorage.getItem("searchHistory");
      if (saved) setHistory(JSON.parse(saved));
    }
  }, [open]);

  const suggestions = query.length > 0
    ? [
        ...cities.filter(c => c.name.toLowerCase().includes(query.toLowerCase()) || c.country.toLowerCase().includes(query.toLowerCase())),
        ...countries.filter(c => c.toLowerCase().includes(query.toLowerCase()) && !cities.find(city => city.country === c)).slice(0, 10).map(c => ({ name: c, country: c, id: c.toLowerCase().replace(/\s/g, "-") }))
      ].slice(0, 12)
    : cities;

  const handleSelect = (name: string, id: string) => {
    const newHistory = [name, ...history.filter(h => h !== name)].slice(0, 10);
    setHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
    onClose();
    setQuery("");
    const city = cities.find(c => c.id === id);
    if (city) navigate(`/city/${city.id}`);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("searchHistory");
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4 pt-4 max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl bg-card border shadow-lg">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search cities, countries, cultures..."
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <button onClick={onClose} className="p-3 rounded-xl bg-card border hover:bg-secondary transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search History */}
          {query.length === 0 && history.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Recent Searches
                </h3>
                <button onClick={clearHistory} className="text-xs text-accent hover:underline">Clear</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {history.map((h, i) => (
                  <button key={i} className="px-3 py-1.5 rounded-full bg-secondary text-sm hover:bg-accent hover:text-accent-foreground transition-colors">
                    {h}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[70vh] overflow-y-auto pb-20">
            {suggestions.map((item: any, i) => {
              const city = cities.find(c => c.id === item.id);
              return (
                <motion.button
                  key={item.id || i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  onClick={() => handleSelect(item.name, item.id)}
                  className="group text-left rounded-xl overflow-hidden bg-card border hover:shadow-gold transition-all duration-300"
                >
                  {city ? (
                    <>
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={getCityImage(city.image)}
                          alt={city.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-3">
                        <p className="font-heading font-semibold text-sm">{city.name}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {city.country}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="p-4 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

function getCityImage(imageKey: string): string {
  const images: Record<string, string> = {};
  const modules = import.meta.glob("@/assets/*.jpg", { eager: true }) as Record<string, { default: string }>;
  for (const path in modules) {
    const name = path.split("/").pop()?.replace(".jpg", "") || "";
    images[name] = modules[path].default;
  }
  return images[imageKey] || images["delhi"] || "";
}
