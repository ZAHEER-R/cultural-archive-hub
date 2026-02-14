import { ReactNode, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal, Home, User, Settings, Globe, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import SearchOverlay from "./SearchOverlay";

function ThemeToggle() {
  const [dark, setDark] = useState(document.documentElement.classList.contains("dark"));
  const toggle = () => {
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
    localStorage.setItem("theme", !dark ? "dark" : "light");
  };
  return (
    <button onClick={toggle} className="p-2 rounded-lg hover:bg-secondary transition-colors" aria-label="Toggle theme">
      {dark ? <Sun className="w-5 h-5 text-gold" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Desktop Header */}
      <header className="sticky top-0 z-50 glass-card border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Globe className="w-7 h-7 text-accent" />
            <span className="font-heading text-xl font-bold hidden sm:block">CultureVault</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors text-muted-foreground text-sm"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Search cultures, cities...</span>
            </button>
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-lg hover:bg-secondary transition-colors sm:hidden"
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            <Link to="/" className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive("/") ? "bg-accent text-accent-foreground" : "hover:bg-secondary"}`}>
              Home
            </Link>
            <Link to="/map" className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive("/map") ? "bg-accent text-accent-foreground" : "hover:bg-secondary"}`}>
              Map
            </Link>
            <ThemeToggle />
            {user ? (
              <Link to="/profile" className="p-2 rounded-lg hover:bg-secondary transition-colors">
                <User className="w-5 h-5" />
              </Link>
            ) : (
              <Link to="/auth" className="px-4 py-2 rounded-lg bg-gradient-gold text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
                Sign In
              </Link>
            )}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer - Desktop */}
      <footer className="hidden md:block border-t bg-card py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p className="font-heading text-lg font-semibold text-foreground mb-2">CultureVault</p>
          <p>Preserving Traditions. Protecting Identity. Empowering Future Generations.</p>
          <p className="mt-2">Team Peaky RX - Rachakula Zaheer & Jayasri</p>
        </div>
      </footer>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass-card border-t">
        <div className="flex items-center justify-around py-2">
          <Link to="/" className={`flex flex-col items-center gap-1 p-2 rounded-lg ${isActive("/") ? "text-accent" : "text-muted-foreground"}`}>
            <Home className="w-5 h-5" />
            <span className="text-[10px]">Home</span>
          </Link>
          <Link to="/map" className={`flex flex-col items-center gap-1 p-2 rounded-lg ${isActive("/map") ? "text-accent" : "text-muted-foreground"}`}>
            <Globe className="w-5 h-5" />
            <span className="text-[10px]">Map</span>
          </Link>
          <Link to={user ? "/profile" : "/auth"} className={`flex flex-col items-center gap-1 p-2 rounded-lg ${isActive("/profile") || isActive("/auth") ? "text-accent" : "text-muted-foreground"}`}>
            <User className="w-5 h-5" />
            <span className="text-[10px]">Profile</span>
          </Link>
          <Link to="/settings" className={`flex flex-col items-center gap-1 p-2 rounded-lg ${isActive("/settings") ? "text-accent" : "text-muted-foreground"}`}>
            <Settings className="w-5 h-5" />
            <span className="text-[10px]">Settings</span>
          </Link>
        </div>
      </nav>

      {/* Search Overlay */}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}
