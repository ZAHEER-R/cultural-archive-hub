import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Users, Languages, Star, Heart, Share2, CheckCircle, Camera, MessageSquare, Image } from "lucide-react";
import { cities } from "@/data/cities";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

function getCityImage(imageKey: string): string {
  const modules = import.meta.glob("@/assets/*.jpg", { eager: true }) as Record<string, { default: string }>;
  for (const path in modules) {
    const name = path.split("/").pop()?.replace(".jpg", "") || "";
    if (name === imageKey) return modules[path].default;
  }
  return "";
}

// Sample review data
const sampleReviews = [
  { id: 1, user: "Sarah M.", avatar: "S", text: "An absolutely magical experience visiting during the festival season. The colors, sounds, and energy were unforgettable!", rating: 5, likes: 24, date: "2 weeks ago" },
  { id: 2, user: "Marco R.", avatar: "M", text: "The local food was incredible. Every street corner had something new to try. The cultural heritage sites were well preserved.", rating: 4, likes: 18, date: "1 month ago" },
  { id: 3, user: "Aisha K.", avatar: "A", text: "I learned so much about the traditions here. The guides were knowledgeable and passionate about their heritage.", rating: 5, likes: 31, date: "3 weeks ago" },
];

export default function CityDetail() {
  const { id } = useParams();
  const city = cities.find(c => c.id === id);
  const [liked, setLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<"cultures" | "reviews" | "photos" | "info">("cultures");
  const [likedReviews, setLikedReviews] = useState<number[]>([]);
  const { toast } = useToast();

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

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: `${city.name} - CultureVault`, url });
      } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      toast({ title: "Link copied!", description: "Share this page with friends." });
    }
  };

  const toggleReviewLike = (reviewId: number) => {
    setLikedReviews(prev =>
      prev.includes(reviewId) ? prev.filter(id => id !== reviewId) : [...prev, reviewId]
    );
  };

  const tabs = [
    { key: "cultures", label: `Cultures (${city.cultures.length})` },
    { key: "info", label: "Info & Places" },
    { key: "photos", label: "Photos & Videos" },
    { key: "reviews", label: "Experiences" },
  ] as const;

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
          <button onClick={handleShare} className="flex items-center gap-2 px-4 py-2 rounded-full border hover:bg-secondary transition-colors">
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
        <div className="flex gap-4 mb-8 border-b overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`pb-3 text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab.key ? "border-b-2 border-accent text-accent" : "text-muted-foreground"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cultures Tab */}
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
                    <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {place}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {city.famousFood && city.famousFood.length > 0 && (
              <div className="p-6 rounded-xl bg-card border">
                <h3 className="font-heading font-semibold text-lg mb-3">🍽 Famous Food</h3>
                <div className="flex flex-wrap gap-2">
                  {city.famousFood.map((food, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm">{food}</span>
                  ))}
                </div>
              </div>
            )}
            {city.famousRestaurants && city.famousRestaurants.length > 0 && (
              <div className="p-6 rounded-xl bg-card border">
                <h3 className="font-heading font-semibold text-lg mb-3">🏪 Famous Restaurants</h3>
                <ul className="space-y-2">
                  {city.famousRestaurants.map((r, i) => (
                    <li key={i} className="text-sm text-muted-foreground">{r}</li>
                  ))}
                </ul>
              </div>
            )}
            {city.beaches && city.beaches.length > 0 && (
              <div className="p-6 rounded-xl bg-card border">
                <h3 className="font-heading font-semibold text-lg mb-3">🏖 Beaches</h3>
                <div className="flex flex-wrap gap-2">
                  {city.beaches.map((b, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm">{b}</span>
                  ))}
                </div>
              </div>
            )}
            {city.rivers && city.rivers.length > 0 && (
              <div className="p-6 rounded-xl bg-card border">
                <h3 className="font-heading font-semibold text-lg mb-3">🌊 Rivers & Water Bodies</h3>
                <div className="flex flex-wrap gap-2">
                  {city.rivers.map((r, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm">{r}</span>
                  ))}
                </div>
              </div>
            )}
            {city.parks && city.parks.length > 0 && (
              <div className="p-6 rounded-xl bg-card border">
                <h3 className="font-heading font-semibold text-lg mb-3">🌳 Parks</h3>
                <div className="flex flex-wrap gap-2">
                  {city.parks.map((p, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm">{p}</span>
                  ))}
                </div>
              </div>
            )}
            {city.malls && city.malls.length > 0 && (
              <div className="p-6 rounded-xl bg-card border">
                <h3 className="font-heading font-semibold text-lg mb-3">🛍 Shopping Malls</h3>
                <div className="flex flex-wrap gap-2">
                  {city.malls.map((m, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm">{m}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Photos & Videos Tab */}
        {activeTab === "photos" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="aspect-square rounded-xl overflow-hidden bg-secondary flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Camera className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-xs">Photo {i}</p>
                    <p className="text-[10px] opacity-50">{city.name}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[1, 2].map(i => (
                <div key={i} className="aspect-video rounded-xl overflow-hidden bg-secondary flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Image className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-xs">Video {i} — {city.name}</p>
                    <p className="text-[10px] opacity-50">Coming soon</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Sign in to upload your own photos and videos of {city.name}
            </p>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <div className="space-y-6">
            {sampleReviews.map(review => (
              <motion.div
                key={review.id}
                className="p-6 rounded-xl bg-card border"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                    {review.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{review.user}</p>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < review.rating ? "fill-gold text-gold" : "text-muted"}`} />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{review.text}</p>
                <button
                  onClick={() => toggleReviewLike(review.id)}
                  className={`flex items-center gap-1 text-sm transition-colors ${likedReviews.includes(review.id) ? "text-red-500" : "text-muted-foreground hover:text-foreground"}`}
                >
                  <Heart className={`w-4 h-4 ${likedReviews.includes(review.id) ? "fill-current" : ""}`} />
                  <span>{review.likes + (likedReviews.includes(review.id) ? 1 : 0)}</span>
                </button>
              </motion.div>
            ))}
            <div className="text-center py-6">
              <Link to="/auth" className="inline-block px-6 py-2 rounded-full bg-gradient-gold text-sm font-medium" style={{ color: "hsl(20 25% 10%)" }}>
                Sign In to Share Your Experience
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
