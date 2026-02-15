import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, MapPin, Bell, X } from "lucide-react";

type AlertStep = "cookie" | "location" | "notification" | "done";

export default function ConsentAlerts() {
  const [step, setStep] = useState<AlertStep>("done");

  useEffect(() => {
    const accepted = localStorage.getItem("cookieConsent");
    if (!accepted) {
      setStep("cookie");
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setStep("location");
  };

  const handleLocation = async (allow: boolean) => {
    if (allow && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(() => {}, () => {});
    }
    localStorage.setItem("locationAccess", allow ? "granted" : "denied");
    setStep("notification");
  };

  const handleNotification = async (allow: boolean) => {
    if (allow && "Notification" in window) {
      await Notification.requestPermission();
    }
    localStorage.setItem("notificationAccess", allow ? "granted" : "denied");
    setStep("done");
  };

  if (step === "done") return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="bg-card rounded-2xl border shadow-2xl p-6 max-w-md w-full"
        >
          {step === "cookie" && (
            <>
              <div className="flex items-center gap-3 mb-4">
                <Cookie className="w-8 h-8 text-accent" />
                <h3 className="font-heading text-lg font-bold">Cookie Consent</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                We use cookies to enhance your experience, save preferences, and provide personalized cultural recommendations.
              </p>
              <div className="flex gap-3">
                <button onClick={acceptCookies} className="flex-1 py-2.5 rounded-xl bg-gradient-gold text-sm font-semibold" style={{ color: "hsl(20 25% 10%)" }}>
                  Accept All
                </button>
                <button onClick={acceptCookies} className="flex-1 py-2.5 rounded-xl border text-sm font-medium hover:bg-secondary transition-colors">
                  Essential Only
                </button>
              </div>
            </>
          )}
          {step === "location" && (
            <>
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-8 h-8 text-accent" />
                <h3 className="font-heading text-lg font-bold">Location Access</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                Allow location access to discover cultural heritage near you and get personalized recommendations.
              </p>
              <div className="flex gap-3">
                <button onClick={() => handleLocation(true)} className="flex-1 py-2.5 rounded-xl bg-gradient-gold text-sm font-semibold" style={{ color: "hsl(20 25% 10%)" }}>
                  Allow
                </button>
                <button onClick={() => handleLocation(false)} className="flex-1 py-2.5 rounded-xl border text-sm font-medium hover:bg-secondary transition-colors">
                  Not Now
                </button>
              </div>
            </>
          )}
          {step === "notification" && (
            <>
              <div className="flex items-center gap-3 mb-4">
                <Bell className="w-8 h-8 text-accent" />
                <h3 className="font-heading text-lg font-bold">Notifications</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                Enable notifications to stay updated on cultural events, festival reminders, and new heritage discoveries.
              </p>
              <div className="flex gap-3">
                <button onClick={() => handleNotification(true)} className="flex-1 py-2.5 rounded-xl bg-gradient-gold text-sm font-semibold" style={{ color: "hsl(20 25% 10%)" }}>
                  Enable
                </button>
                <button onClick={() => handleNotification(false)} className="flex-1 py-2.5 rounded-xl border text-sm font-medium hover:bg-secondary transition-colors">
                  Skip
                </button>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
