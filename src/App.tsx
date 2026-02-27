import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/auth-context";
import Layout from "@/components/Layout";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import SettingsPage from "./pages/SettingsPage";
import CityDetail from "./pages/CityDetail";
import MapPage from "./pages/MapPage";
import ResetPassword from "./pages/ResetPassword";
import FriendsChat from "./pages/FriendsChat";
import NotFound from "./pages/NotFound";
import ConsentAlerts from "@/components/CookieConsent";
import { useEffect } from "react";

const queryClient = new QueryClient();

function ThemeInit() {
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") document.documentElement.classList.add("dark");
  }, []);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <ThemeInit />
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/city/:id" element={<CityDetail />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/friends" element={<FriendsChat />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
          <ConsentAlerts />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
