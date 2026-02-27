import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Users, Languages, Star, Heart, Share2, CheckCircle, Camera, ExternalLink, Navigation, Upload, Image } from "lucide-react";
import { cities } from "@/data/cities";
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/integrations/supabase/client";

function getCityImage(imageKey: string): string {
  const modules = import.meta.glob("@/assets/*.jpg", { eager: true }) as Record<string, { default: string }>;
  for (const path in modules) {
    const name = path.split("/").pop()?.replace(".jpg", "") || "";
    if (name === imageKey) return modules[path].default;
  }
  return "";
}

// Unsplash photo URLs for different categories - unique per city
function getPlacePhotos(cityName: string, places: string[]): { url: string; label: string }[] {
  return places.map((place, i) => ({
    url: `https://source.unsplash.com/800x600/?${encodeURIComponent(place + " " + cityName)}&sig=${cityName}${i}`,
    label: place,
  }));
}

function getGoogleMapsLink(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function getGoogleSearchLink(query: string): string {
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

interface AIPlaceData {
  history?: string;
  dressingStyle?: string;
  traditions?: string;
  practices?: string;
  festivals?: { name: string; date: string; description: string }[];
}

export default function CityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const city = cities.find(c => c.id === id);
  const [liked, setLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<"cultures" | "reviews" | "photos" | "info">("cultures");
  const { toast } = useToast();
  const topRef = useRef<HTMLDivElement>(null);

  // AI-generated extended data
  const [aiData, setAiData] = useState<AIPlaceData | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  // User photos from DB
  const [userPhotos, setUserPhotos] = useState<{ id: string; photo_url: string; place_name: string | null; user_id: string }[]>([]);
  const [uploading, setUploading] = useState(false);

  // Experiences from DB
  const [experiences, setExperiences] = useState<any[]>([]);
  const [newExperience, setNewExperience] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [likedExps, setLikedExps] = useState<string[]>([]);

  // Scroll to top when city changes
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "auto" });
  }, [id]);

  useEffect(() => {
    if (id) {
      loadUserPhotos();
      loadExperiences();
      // Load AI data for extended info
      if (city) loadAIData(city.name + ", " + city.country);
    }
  }, [id]);

  const loadAIData = async (query: string) => {
    setAiLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-place-info", { body: { query } });
      if (data?.success && data.data) {
        setAiData({
          history: data.data.history,
          dressingStyle: data.data.dressingStyle,
          traditions: data.data.traditions,
          practices: data.data.practices,
          festivals: data.data.festivals,
        });
      }
    } catch {}
    setAiLoading(false);
  };

  const loadUserPhotos = async () => {
    const { data } = await supabase.from("city_photos").select("*").eq("city_id", id || "").order("created_at", { ascending: false });
    if (data) setUserPhotos(data);
  };

  const loadExperiences = async () => {
    const { data } = await supabase.from("experiences").select("*").eq("city_id", id || "").order("created_at", { ascending: false });
    if (data) setExperiences(data);
    // Load likes
    if (user) {
      const { data: likes } = await supabase.from("experience_likes").select("experience_id").eq("user_id", user.id);
      if (likes) setLikedExps(likes.map(l => l.experience_id));
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user || !id) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${user.id}/${id}-${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage.from("city-photos").upload(path, file);
    if (uploadError) { toast({ title: "Upload failed", variant: "destructive" }); setUploading(false); return; }
    const { data: { publicUrl } } = supabase.storage.from("city-photos").getPublicUrl(path);
    const placeName = prompt("What place is this photo of?") || city?.name || "";
    await supabase.from("city_photos").insert({ user_id: user.id, city_id: id, photo_url: publicUrl, place_name: placeName });
    toast({ title: "Photo uploaded!" });
    loadUserPhotos();
    setUploading(false);
  };

  const submitExperience = async () => {
    if (!user || !id || !newExperience.trim()) return;
    const { error } = await supabase.from("experiences").insert({ user_id: user.id, city_id: id, text: newExperience.trim(), rating: newRating });
    if (error) toast({ title: "Error", description: error.message, variant: "destructive" });
    else { toast({ title: "Experience shared!" }); setNewExperience(""); loadExperiences(); }
  };

  const toggleExpLike = async (expId: string) => {
    if (!user) { navigate("/auth"); return; }
    if (likedExps.includes(expId)) {
      await supabase.from("experience_likes").delete().eq("user_id", user.id).eq("experience_id", expId);
      setLikedExps(prev => prev.filter(id => id !== expId));
    } else {
      await supabase.from("experience_likes").insert({ user_id: user.id, experience_id: expId });
      setLikedExps(prev => [...prev, expId]);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: `${city?.name || id} - CultureVault`, url }); } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      toast({ title: "Link copied!" });
    }
  };

  if (!city) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-heading mb-4">Place not found</p>
          <Link to="/" className="text-accent hover:underline">Go Home</Link>
        </div>
      </div>
    );
  }

  // Generate place-specific photos from tourist places + landmarks
  const allPlaces = [...(city.touristPlaces || []), ...(city.parks || []), ...(city.beaches || [])];
  const placePhotos = getPlacePhotos(city.name, allPlaces.length > 0 ? allPlaces : [city.name]);

  const tabs = [
    { key: "cultures", label: `Cultures (${city.cultures.length})` },
    { key: "info", label: "Info & Places" },
    { key: "photos", label: "Photos & Videos" },
    { key: "reviews", label: "Experiences" },
  ] as const;

  return (
    <div className="pb-20 md:pb-0" ref={topRef}>
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
          <button onClick={() => setLiked(!liked)} className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all ${liked ? "bg-red-500/10 border-red-500/30 text-red-500" : "hover:bg-secondary"}`}>
            <Heart className={`w-4 h-4 ${liked ? "fill-current" : ""}`} />
            <span className="text-sm">{liked ? "Liked" : "Like"}</span>
          </button>
          <button onClick={handleShare} className="flex items-center gap-2 px-4 py-2 rounded-full border hover:bg-secondary transition-colors">
            <Share2 className="w-4 h-4" /><span className="text-sm">Share</span>
          </button>
          <a href={getGoogleMapsLink(city.name + " " + city.country)} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full border hover:bg-secondary transition-colors">
            <Navigation className="w-4 h-4" /><span className="text-sm">Directions</span>
          </a>
          <div className="ml-auto flex items-center gap-1 text-gold">
            <Star className="w-4 h-4 fill-current" /><span className="font-medium">4.8</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b overflow-x-auto">
          {tabs.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`pb-3 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab.key ? "border-b-2 border-accent text-accent" : "text-muted-foreground"}`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cultures Tab */}
        {activeTab === "cultures" && (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              {city.cultures.map((culture, i) => (
                <motion.div key={i} className="p-6 rounded-xl bg-card border shadow-sm hover:shadow-gold transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-heading font-semibold text-lg flex items-center gap-2">
                        {culture.title}<CheckCircle className="w-4 h-4 text-emerald-500" />
                      </h3>
                      <div className="flex gap-2 mt-1">
                        <span className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent">{culture.category}</span>
                        {culture.religion && <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{culture.religion}</span>}
                      </div>
                    </div>
                    <a href={getGoogleSearchLink(culture.title + " " + city.name)} target="_blank" rel="noopener noreferrer"
                      className="p-1.5 rounded-lg hover:bg-secondary transition-colors" title="Search on web">
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    </a>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{culture.description}</p>
                  {culture.celebrationDate && <p className="text-xs text-accent font-medium">Celebrated: {culture.celebrationDate}</p>}
                </motion.div>
              ))}
            </div>

            {/* AI-generated extended info */}
            {aiLoading && <div className="text-center py-6"><div className="animate-spin-slow w-6 h-6 border-2 border-accent border-t-transparent rounded-full mx-auto" /></div>}
            {aiData && (
              <div className="space-y-4 mt-6">
                {aiData.history && (
                  <div className="p-6 rounded-xl bg-card border">
                    <h3 className="font-heading font-semibold text-lg mb-3">📜 History</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{aiData.history}</p>
                  </div>
                )}
                {aiData.traditions && (
                  <div className="p-6 rounded-xl bg-card border">
                    <h3 className="font-heading font-semibold text-lg mb-3">🎭 Traditions</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{aiData.traditions}</p>
                  </div>
                )}
                {aiData.dressingStyle && (
                  <div className="p-6 rounded-xl bg-card border">
                    <h3 className="font-heading font-semibold text-lg mb-3">👘 Dressing Style</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{aiData.dressingStyle}</p>
                  </div>
                )}
                {aiData.practices && (
                  <div className="p-6 rounded-xl bg-card border">
                    <h3 className="font-heading font-semibold text-lg mb-3">🙏 Cultural Practices</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{aiData.practices}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Info & Places Tab */}
        {activeTab === "info" && (
          <div className="grid gap-6 md:grid-cols-2">
            {city.touristPlaces && city.touristPlaces.length > 0 && (
              <div className="p-6 rounded-xl bg-card border">
                <h3 className="font-heading font-semibold text-lg mb-3 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-accent" /> Tourist Places
                </h3>
                <ul className="space-y-2">
                  {city.touristPlaces.map((place, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-center justify-between">
                      <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-accent" />{place}</span>
                      <div className="flex gap-1">
                        <a href={getGoogleMapsLink(place + " " + city.name)} target="_blank" rel="noopener noreferrer"
                          className="p-1 rounded hover:bg-secondary" title="Directions"><Navigation className="w-3.5 h-3.5" /></a>
                        <a href={getGoogleSearchLink(place + " " + city.name)} target="_blank" rel="noopener noreferrer"
                          className="p-1 rounded hover:bg-secondary" title="Search"><ExternalLink className="w-3.5 h-3.5" /></a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {city.famousFood && city.famousFood.length > 0 && (
              <div className="p-6 rounded-xl bg-card border">
                <h3 className="font-heading font-semibold text-lg mb-3">🍽 Famous Food</h3>
                <div className="space-y-2">
                  {city.famousFood.map((food, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm">{food}</span>
                      <a href={getGoogleSearchLink(food + " " + city.name + " recipe")} target="_blank" rel="noopener noreferrer"
                        className="p-1 rounded hover:bg-secondary" title="Search"><ExternalLink className="w-3.5 h-3.5 text-muted-foreground" /></a>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {city.famousRestaurants && city.famousRestaurants.length > 0 && (
              <div className="p-6 rounded-xl bg-card border">
                <h3 className="font-heading font-semibold text-lg mb-3">🏪 Famous Restaurants</h3>
                <ul className="space-y-2">
                  {city.famousRestaurants.map((r, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-center justify-between">
                      <span>{r}</span>
                      <a href={getGoogleMapsLink(r + " " + city.name)} target="_blank" rel="noopener noreferrer"
                        className="p-1 rounded hover:bg-secondary" title="Directions"><Navigation className="w-3.5 h-3.5" /></a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {city.beaches && city.beaches.length > 0 && (
              <div className="p-6 rounded-xl bg-card border">
                <h3 className="font-heading font-semibold text-lg mb-3">🏖 Beaches</h3>
                <div className="space-y-2">
                  {city.beaches.map((b, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm">{b}</span>
                      <a href={getGoogleMapsLink(b + " " + city.name)} target="_blank" rel="noopener noreferrer"
                        className="p-1 rounded hover:bg-secondary"><Navigation className="w-3.5 h-3.5 text-muted-foreground" /></a>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {city.rivers && city.rivers.length > 0 && (
              <div className="p-6 rounded-xl bg-card border">
                <h3 className="font-heading font-semibold text-lg mb-3">🌊 Rivers & Water Bodies</h3>
                <div className="flex flex-wrap gap-2">
                  {city.rivers.map((r, i) => <span key={i} className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm">{r}</span>)}
                </div>
              </div>
            )}
            {city.parks && city.parks.length > 0 && (
              <div className="p-6 rounded-xl bg-card border">
                <h3 className="font-heading font-semibold text-lg mb-3">🌳 Parks</h3>
                <div className="space-y-2">
                  {city.parks.map((p, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm">{p}</span>
                      <a href={getGoogleMapsLink(p + " " + city.name)} target="_blank" rel="noopener noreferrer"
                        className="p-1 rounded hover:bg-secondary"><Navigation className="w-3.5 h-3.5 text-muted-foreground" /></a>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {city.malls && city.malls.length > 0 && (
              <div className="p-6 rounded-xl bg-card border">
                <h3 className="font-heading font-semibold text-lg mb-3">🛍 Shopping Malls</h3>
                <div className="space-y-2">
                  {city.malls.map((m, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm">{m}</span>
                      <a href={getGoogleMapsLink(m + " " + city.name)} target="_blank" rel="noopener noreferrer"
                        className="p-1 rounded hover:bg-secondary"><Navigation className="w-3.5 h-3.5 text-muted-foreground" /></a>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Photos & Videos Tab */}
        {activeTab === "photos" && (
          <div className="space-y-6">
            {/* Place photos from Unsplash */}
            <div>
              <h3 className="font-heading font-semibold text-lg mb-3">📸 Place Photos</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {placePhotos.slice(0, 9).map((photo, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
                    <img src={photo.url} alt={photo.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; (e.target as HTMLImageElement).nextElementSibling?.classList.remove("hidden"); }} />
                    <div className="hidden absolute inset-0 bg-secondary flex items-center justify-center">
                      <div className="text-center text-muted-foreground">
                        <Camera className="w-6 h-6 mx-auto mb-1 opacity-50" />
                        <p className="text-xs">Not available</p>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                      <p className="text-white text-xs font-medium">{photo.label}</p>
                      <p className="text-white/60 text-[10px]">{city.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* User uploaded photos */}
            {userPhotos.length > 0 && (
              <div>
                <h3 className="font-heading font-semibold text-lg mb-3">📷 Community Photos</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {userPhotos.map(photo => (
                    <div key={photo.id} className="relative aspect-square rounded-xl overflow-hidden">
                      <img src={photo.photo_url} alt={photo.place_name || city.name} className="w-full h-full object-cover" />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                        <p className="text-white text-xs font-medium">{photo.place_name || city.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload button */}
            {user ? (
              <div className="text-center py-4">
                <label className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-gold text-sm font-semibold cursor-pointer hover:opacity-90 transition-opacity"
                  style={{ color: "hsl(20 25% 10%)" }}>
                  <Upload className="w-4 h-4" />
                  {uploading ? "Uploading..." : "Upload Photo"}
                  <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} disabled={uploading} />
                </label>
              </div>
            ) : (
              <p className="text-center text-sm text-muted-foreground">
                <Link to="/auth" className="text-accent hover:underline">Sign in</Link> to upload photos
              </p>
            )}
          </div>
        )}

        {/* Experiences Tab */}
        {activeTab === "reviews" && (
          <div className="space-y-6">
            {/* Submit experience */}
            {user ? (
              <div className="p-6 rounded-xl bg-card border">
                <h3 className="font-heading font-semibold text-sm mb-3">Share Your Experience</h3>
                <div className="flex gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map(s => (
                    <button key={s} onClick={() => setNewRating(s)}>
                      <Star className={`w-5 h-5 ${s <= newRating ? "fill-gold text-gold" : "text-muted"}`} />
                    </button>
                  ))}
                </div>
                <textarea value={newExperience} onChange={e => setNewExperience(e.target.value)}
                  placeholder="Describe your experience..."
                  className="w-full p-3 rounded-xl bg-secondary border-0 text-sm outline-none focus:ring-2 focus:ring-accent resize-none h-20 mb-3" />
                <button onClick={submitExperience} disabled={!newExperience.trim()}
                  className="px-6 py-2 rounded-full bg-gradient-gold text-sm font-semibold hover:opacity-90 disabled:opacity-50"
                  style={{ color: "hsl(20 25% 10%)" }}>
                  Post Experience
                </button>
              </div>
            ) : (
              <div className="text-center py-6">
                <Link to="/auth" className="inline-block px-6 py-2 rounded-full bg-gradient-gold text-sm font-medium" style={{ color: "hsl(20 25% 10%)" }}>
                  Sign In to Share Your Experience
                </Link>
              </div>
            )}

            {/* Experiences list */}
            {experiences.map(exp => (
              <motion.div key={exp.id} className="p-6 rounded-xl bg-card border" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">?</div>
                  <div className="flex-1">
                    <div className="flex gap-0.5 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-3 h-3 ${i < (exp.rating || 5) ? "fill-gold text-gold" : "text-muted"}`} />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">{new Date(exp.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{exp.text}</p>
                <button onClick={() => toggleExpLike(exp.id)}
                  className={`flex items-center gap-1 text-sm transition-colors ${likedExps.includes(exp.id) ? "text-red-500" : "text-muted-foreground hover:text-foreground"}`}>
                  <Heart className={`w-4 h-4 ${likedExps.includes(exp.id) ? "fill-current" : ""}`} />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
