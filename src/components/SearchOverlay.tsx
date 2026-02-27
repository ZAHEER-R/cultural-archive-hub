import { useState, useEffect, useRef } from "react";
import { Search, X, Clock, MapPin, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { cities } from "@/data/cities";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  open: boolean;
  onClose: () => void;
}

function getCityImage(imageKey: string): string {
  const modules = import.meta.glob("@/assets/*.jpg", { eager: true }) as Record<string, { default: string }>;
  for (const path in modules) {
    const name = path.split("/").pop()?.replace(".jpg", "") || "";
    if (name === imageKey) return modules[path].default;
  }
  return "";
}

interface AIResult {
  id: string;
  name: string;
  country: string;
  region: string;
  continent: string;
  image?: string;
}

export default function SearchOverlay({ open, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [aiResults, setAiResults] = useState<AIResult[]>([]);
  const [aiLoading, setAiLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      const saved = localStorage.getItem("searchHistory");
      if (saved) setHistory(JSON.parse(saved));
    }
  }, [open]);

  // Search local cities by name, country, culture, food, festival
  const localSuggestions = query.length > 0
    ? cities.filter(c =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        c.country.toLowerCase().includes(query.toLowerCase()) ||
        c.cultures.some(cu =>
          cu.title.toLowerCase().includes(query.toLowerCase()) ||
          cu.category.toLowerCase().includes(query.toLowerCase())
        ) ||
        c.famousFood?.some(f => f.toLowerCase().includes(query.toLowerCase())) ||
        c.touristPlaces?.some(p => p.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 20)
    : cities.slice(0, 24);

  // AI search for places not in local data
  useEffect(() => {
    if (query.length >= 3 && localSuggestions.length < 5) {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
      searchTimeout.current = setTimeout(() => searchAI(query), 800);
    } else {
      setAiResults([]);
    }
    return () => { if (searchTimeout.current) clearTimeout(searchTimeout.current); };
  }, [query]);

  const searchAI = async (q: string) => {
    setAiLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-place-info", { body: { query: q } });
      if (data?.success && data.data) {
        const place = data.data;
        // Check not already in local
        if (!cities.find(c => c.id === place.id)) {
          setAiResults([{ id: place.id, name: place.name, country: place.country, region: place.region, continent: place.continent }]);
        }
      }
    } catch {}
    setAiLoading(false);
  };

  const handleSelect = (name: string, id: string) => {
    const newHistory = [name, ...history.filter(h => h !== name)].slice(0, 10);
    setHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
    onClose();
    setQuery("");
    navigate(`/city/${id}`);
  };

  const handleAISelect = async (result: AIResult) => {
    const newHistory = [result.name, ...history.filter(h => h !== result.name)].slice(0, 10);
    setHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
    // Store the AI result temporarily in sessionStorage for the city detail page
    sessionStorage.setItem(`ai-place-${result.id}`, JSON.stringify(result));
    onClose();
    setQuery("");
    navigate(`/city/${result.id}`);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("searchHistory");
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 pt-4 max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-xl bg-card border shadow-lg">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)}
                placeholder="Search cities, festivals, cultures, food..."
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground" />
              {aiLoading && <Loader2 className="w-4 h-4 animate-spin text-accent" />}
            </div>
            <button onClick={onClose} className="p-3 rounded-xl bg-card border hover:bg-secondary transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search History */}
          {query.length === 0 && history.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2"><Clock className="w-4 h-4" /> Recent Searches</h3>
                <button onClick={clearHistory} className="text-xs text-accent hover:underline">Clear</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {history.map((h, i) => (
                  <button key={i} className="px-3 py-1.5 rounded-full bg-secondary text-sm hover:bg-accent hover:text-accent-foreground transition-colors">{h}</button>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[70vh] overflow-y-auto pb-20">
            {localSuggestions.map((item, i) => (
              <motion.button key={item.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}
                onClick={() => handleSelect(item.name, item.id)}
                className="group text-left rounded-xl overflow-hidden bg-card border hover:shadow-gold transition-all duration-300">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img src={getCityImage(item.image) || `https://source.unsplash.com/400x300/?${encodeURIComponent(item.name + " city")}&sig=${item.id}`}
                    alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-0.5 rounded-full bg-black/50 text-white text-[10px] font-medium backdrop-blur-sm">{item.continent}</span>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-0.5 rounded-full bg-accent/80 text-accent-foreground text-[10px] font-medium backdrop-blur-sm">
                      {item.population ? "City" : "Place"}
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  <p className="font-heading font-semibold text-sm">{item.name}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" /> {item.country}</p>
                </div>
              </motion.button>
            ))}

            {/* AI Results */}
            {aiResults.map((result, i) => (
              <motion.button key={result.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                onClick={() => handleAISelect(result)}
                className="group text-left rounded-xl overflow-hidden bg-card border border-accent/30 hover:shadow-gold transition-all duration-300">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img src={`https://source.unsplash.com/400x300/?${encodeURIComponent(result.name + " " + result.country)}&sig=${result.id}`}
                    alt={result.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-0.5 rounded-full bg-black/50 text-white text-[10px] font-medium backdrop-blur-sm">{result.continent}</span>
                  </div>
                </div>
                <div className="p-3">
                  <p className="font-heading font-semibold text-sm">{result.name}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" /> {result.country}</p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
