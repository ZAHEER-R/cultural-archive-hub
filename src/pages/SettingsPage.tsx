import { useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun, Bell, MapPin, LogOut, Shield, Globe } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useNavigate } from "react-router-dom";

export default function SettingsPage() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [dark, setDark] = useState(document.documentElement.classList.contains("dark"));

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
    localStorage.setItem("theme", !dark ? "dark" : "light");
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen pb-20 md:pb-0 py-8">
      <div className="container mx-auto px-4 max-w-lg">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-heading text-3xl font-bold mb-8">Settings</h1>

          <div className="space-y-3">
            {/* Theme */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-card border">
              <div className="flex items-center gap-3">
                {dark ? <Moon className="w-5 h-5 text-accent" /> : <Sun className="w-5 h-5 text-accent" />}
                <div>
                  <p className="text-sm font-medium">Theme</p>
                  <p className="text-xs text-muted-foreground">{dark ? "Dark mode" : "Light mode"}</p>
                </div>
              </div>
              <button
                onClick={toggleTheme}
                className={`w-12 h-6 rounded-full transition-colors relative ${dark ? "bg-accent" : "bg-muted"}`}
              >
                <div className={`w-5 h-5 rounded-full bg-card shadow absolute top-0.5 transition-transform ${dark ? "translate-x-6" : "translate-x-0.5"}`} />
              </button>
            </div>

            {/* Notifications */}
            <SettingItem icon={Bell} title="Notifications" desc="Push notification preferences" />
            <SettingItem icon={MapPin} title="Location Access" desc="Allow location for map features" />
            <SettingItem icon={Shield} title="Privacy" desc="Profile visibility and data settings" />
            <SettingItem icon={Globe} title="Language" desc="App display language" />

            {user && (
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 p-4 rounded-xl bg-destructive/5 border border-destructive/20 text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm font-medium">Log Out</span>
              </button>
            )}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-8">
            CultureVault v1.0 | Team Peaky RX
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function SettingItem({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-card border cursor-pointer hover:shadow-sm transition-shadow">
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-accent" />
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xs text-muted-foreground">{desc}</p>
        </div>
      </div>
      <span className="text-muted-foreground text-xs">→</span>
    </div>
  );
}
