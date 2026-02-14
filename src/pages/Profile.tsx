import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Camera, MapPin, Languages, Calendar, Edit2, Save, X } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface ProfileData {
  full_name: string;
  username: string;
  location: string;
  languages_known: string[];
  bio: string;
  avatar_url: string;
}

export default function Profile() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    full_name: "", username: "", location: "", languages_known: [], bio: "", avatar_url: ""
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate("/auth"); return; }
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    const { data } = await supabase.from("profiles").select("*").eq("user_id", user.id).single();
    if (data) {
      setProfile({
        full_name: data.full_name || "",
        username: data.username || "",
        location: data.location || "",
        languages_known: data.languages_known || [],
        bio: data.bio || "",
        avatar_url: data.avatar_url || "",
      });
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!user) return;
    const { error } = await supabase.from("profiles").update({
      full_name: profile.full_name,
      username: profile.username,
      location: profile.location,
      languages_known: profile.languages_known,
      bio: profile.bio,
    }).eq("user_id", user.id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Profile updated!" });
      setEditing(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    const ext = file.name.split(".").pop();
    const path = `${user.id}/avatar.${ext}`;
    const { error: uploadError } = await supabase.storage.from("avatars").upload(path, file, { upsert: true });
    if (uploadError) { toast({ title: "Upload failed", description: uploadError.message, variant: "destructive" }); return; }
    const { data: { publicUrl } } = supabase.storage.from("avatars").getPublicUrl(path);
    await supabase.from("profiles").update({ avatar_url: publicUrl }).eq("user_id", user.id);
    setProfile(p => ({ ...p, avatar_url: publicUrl }));
    toast({ title: "Photo updated!" });
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin-slow w-8 h-8 border-2 border-accent border-t-transparent rounded-full" /></div>;

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <div className="h-32 bg-gradient-gold" />
      <div className="container mx-auto px-4 -mt-16 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-card rounded-2xl border shadow-lg p-8">
          {/* Avatar */}
          <div className="flex items-end gap-4 mb-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-secondary border-4 border-card overflow-hidden flex items-center justify-center">
                {profile.avatar_url ? (
                  <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl font-heading font-bold text-muted-foreground">
                    {profile.full_name?.[0]?.toUpperCase() || "?"}
                  </span>
                )}
              </div>
              <label className="absolute bottom-0 right-0 p-1.5 rounded-full bg-accent text-accent-foreground cursor-pointer hover:opacity-80 transition-opacity">
                <Camera className="w-3.5 h-3.5" />
                <input type="file" className="hidden" accept="image/*" onChange={handleAvatarUpload} />
              </label>
            </div>
            <div className="flex-1">
              <h1 className="font-heading text-2xl font-bold">{profile.full_name || "Your Name"}</h1>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
            <button
              onClick={() => editing ? handleSave() : setEditing(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/10 text-accent text-sm font-medium hover:bg-accent/20 transition-colors"
            >
              {editing ? <><Save className="w-4 h-4" /> Save</> : <><Edit2 className="w-4 h-4" /> Edit</>}
            </button>
            {editing && (
              <button onClick={() => setEditing(false)} className="p-2 rounded-lg hover:bg-secondary transition-colors">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Fields */}
          <div className="space-y-5">
            <Field label="Full Name" icon={<span className="text-sm">👤</span>} value={profile.full_name} editing={editing}
              onChange={v => setProfile(p => ({ ...p, full_name: v }))} />
            <Field label="Username" icon={<span className="text-sm">@</span>} value={profile.username} editing={editing}
              onChange={v => setProfile(p => ({ ...p, username: v }))} />
            <Field label="Location" icon={<MapPin className="w-4 h-4" />} value={profile.location} editing={editing}
              onChange={v => setProfile(p => ({ ...p, location: v }))} />
            <Field label="Languages Known" icon={<Languages className="w-4 h-4" />} value={profile.languages_known.join(", ")} editing={editing}
              onChange={v => setProfile(p => ({ ...p, languages_known: v.split(",").map(s => s.trim()) }))} />
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1 block">Bio</label>
              {editing ? (
                <textarea value={profile.bio} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))}
                  className="w-full p-3 rounded-xl bg-secondary border-0 text-sm outline-none focus:ring-2 focus:ring-accent resize-none h-20" />
              ) : (
                <p className="text-sm">{profile.bio || "No bio yet"}</p>
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              <span>Joined {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "Recently"}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Field({ label, icon, value, editing, onChange }: { label: string; icon: React.ReactNode; value: string; editing: boolean; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">{icon} {label}</label>
      {editing ? (
        <input value={value} onChange={e => onChange(e.target.value)}
          className="w-full p-3 rounded-xl bg-secondary border-0 text-sm outline-none focus:ring-2 focus:ring-accent" />
      ) : (
        <p className="text-sm">{value || `No ${label.toLowerCase()} set`}</p>
      )}
    </div>
  );
}
