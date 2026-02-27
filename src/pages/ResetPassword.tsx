import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, ArrowRight, Eye, EyeOff, Globe } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [valid, setValid] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if we have a recovery token in the URL hash
    const hash = window.location.hash;
    if (hash.includes("type=recovery")) {
      setValid(true);
    } else {
      // Also check for access_token which means the recovery link was followed
      supabase.auth.getSession().then(({ data }) => {
        if (data.session) setValid(true);
      });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      toast({ title: "Error", description: "Passwords do not match", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast({ title: "Password updated!", description: "You can now sign in with your new password." });
      navigate("/auth");
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  if (!valid) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <Globe className="w-12 h-12 text-accent mx-auto mb-4" />
          <h1 className="font-heading text-2xl font-bold mb-2">Invalid Reset Link</h1>
          <p className="text-muted-foreground text-sm mb-4">This password reset link is invalid or has expired.</p>
          <button onClick={() => navigate("/auth")} className="px-6 py-2 rounded-full bg-gradient-gold text-sm font-medium" style={{ color: "hsl(20 25% 10%)" }}>
            Back to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-earth">
      <motion.div className="w-full max-w-md" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center mb-8">
          <Globe className="w-12 h-12 text-accent mx-auto mb-4" />
          <h1 className="font-heading text-3xl font-bold mb-2">Set New Password</h1>
          <p className="text-muted-foreground text-sm">Enter your new password below</p>
        </div>
        <div className="bg-card rounded-2xl border shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type={showPw ? "text" : "password"} placeholder="New Password" value={password} onChange={e => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-secondary border-0 text-sm outline-none focus:ring-2 focus:ring-accent" required minLength={6} />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2">
                {showPw ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4 text-muted-foreground" />}
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input type={showPw ? "text" : "password"} placeholder="Confirm Password" value={confirm} onChange={e => setConfirm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-secondary border-0 text-sm outline-none focus:ring-2 focus:ring-accent" required minLength={6} />
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-gold font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
              style={{ color: "hsl(20 25% 10%)" }}>
              {loading ? "Updating..." : "Update Password"} <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
