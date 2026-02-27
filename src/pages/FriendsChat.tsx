import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Search, Send, ArrowLeft, Users, MessageSquare, MapPin } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  id: string;
  user_id: string;
  full_name: string | null;
  username: string | null;
  avatar_url: string | null;
  location: string | null;
  languages_known: string[] | null;
  bio: string | null;
}

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  read: boolean;
  created_at: string;
}

export default function FriendsChat() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tab, setTab] = useState<"friends" | "chat">("friends");
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [following, setFollowing] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) { navigate("/auth"); return; }
    loadFollowing();
  }, [user]);

  useEffect(() => {
    if (selectedUser && user) {
      loadMessages(selectedUser.user_id);
      // Subscribe to realtime messages
      const channel = supabase
        .channel("messages-" + selectedUser.user_id)
        .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, (payload) => {
          const msg = payload.new as Message;
          if ((msg.sender_id === user.id && msg.receiver_id === selectedUser.user_id) ||
              (msg.sender_id === selectedUser.user_id && msg.receiver_id === user.id)) {
            setMessages(prev => [...prev, msg]);
          }
        })
        .subscribe();
      return () => { supabase.removeChannel(channel); };
    }
  }, [selectedUser]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const loadFollowing = async () => {
    if (!user) return;
    const { data } = await supabase.from("follows").select("following_id").eq("follower_id", user.id);
    if (data) setFollowing(data.map(f => f.following_id));
  };

  const searchUsers = async (q: string) => {
    setSearchQuery(q);
    if (q.length < 2) { setUsers([]); return; }
    const { data } = await supabase.from("profiles").select("*")
      .or(`full_name.ilike.%${q}%,username.ilike.%${q}%`)
      .neq("user_id", user?.id || "")
      .limit(20);
    if (data) setUsers(data);
  };

  const toggleFollow = async (targetUserId: string) => {
    if (!user) return;
    if (following.includes(targetUserId)) {
      await supabase.from("follows").delete().eq("follower_id", user.id).eq("following_id", targetUserId);
      setFollowing(prev => prev.filter(id => id !== targetUserId));
      toast({ title: "Unfollowed" });
    } else {
      await supabase.from("follows").insert({ follower_id: user.id, following_id: targetUserId });
      setFollowing(prev => [...prev, targetUserId]);
      toast({ title: "Following!" });
    }
  };

  const loadMessages = async (otherUserId: string) => {
    if (!user) return;
    const { data } = await supabase.from("messages").select("*")
      .or(`and(sender_id.eq.${user.id},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${user.id})`)
      .order("created_at", { ascending: true });
    if (data) setMessages(data);
  };

  const sendMessage = async () => {
    if (!user || !selectedUser || !newMessage.trim()) return;
    const { error } = await supabase.from("messages").insert({
      sender_id: user.id,
      receiver_id: selectedUser.user_id,
      content: newMessage.trim(),
    });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setNewMessage("");
    }
  };

  const openChat = (profile: UserProfile) => {
    setSelectedUser(profile);
    setTab("chat");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate("/profile")} className="p-2 rounded-full hover:bg-secondary transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="font-heading text-2xl font-bold">Friends & Chat</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button onClick={() => { setTab("friends"); setSelectedUser(null); }}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${tab === "friends" ? "bg-accent text-accent-foreground" : "bg-secondary hover:bg-secondary/80"}`}>
            <Users className="w-4 h-4" /> Friends
          </button>
          <button onClick={() => setTab("chat")}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${tab === "chat" ? "bg-accent text-accent-foreground" : "bg-secondary hover:bg-secondary/80"}`}>
            <MessageSquare className="w-4 h-4" /> Chat
          </button>
        </div>

        {/* Friends Tab */}
        {tab === "friends" && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-card border">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input value={searchQuery} onChange={e => searchUsers(e.target.value)}
                placeholder="Search by name or username..."
                className="flex-1 bg-transparent outline-none text-sm" />
            </div>

            {users.length > 0 && (
              <div className="space-y-2">
                {users.map(u => (
                  <motion.div key={u.user_id} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="p-4 rounded-xl bg-card border flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                      {u.avatar_url ? <img src={u.avatar_url} className="w-full h-full rounded-full object-cover" /> : (u.full_name?.[0]?.toUpperCase() || "?")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{u.full_name || "Unknown"}</p>
                      {u.username && <p className="text-xs text-muted-foreground">@{u.username}</p>}
                      {u.location && <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" />{u.location}</p>}
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => toggleFollow(u.user_id)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${following.includes(u.user_id) ? "bg-accent/10 text-accent" : "bg-accent text-accent-foreground"}`}>
                        {following.includes(u.user_id) ? "Following" : "Follow"}
                      </button>
                      <button onClick={() => openChat(u)}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-secondary hover:bg-secondary/80 transition-colors">
                        Chat
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {searchQuery.length < 2 && (
              <p className="text-center text-sm text-muted-foreground py-8">Search for users by name or username to connect</p>
            )}
          </div>
        )}

        {/* Chat Tab */}
        {tab === "chat" && !selectedUser && (
          <div className="text-center py-12">
            <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground text-sm">Select a friend to start chatting</p>
            <button onClick={() => setTab("friends")} className="mt-4 px-4 py-2 rounded-full bg-accent text-accent-foreground text-sm">
              Find Friends
            </button>
          </div>
        )}

        {tab === "chat" && selectedUser && (
          <div className="flex flex-col h-[60vh]">
            {/* Chat Header */}
            <div className="flex items-center gap-3 pb-4 border-b mb-4">
              <button onClick={() => setSelectedUser(null)} className="p-1 rounded hover:bg-secondary">
                <ArrowLeft className="w-4 h-4" />
              </button>
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">
                {selectedUser.avatar_url ? <img src={selectedUser.avatar_url} className="w-full h-full rounded-full object-cover" /> : (selectedUser.full_name?.[0]?.toUpperCase() || "?")}
              </div>
              <div>
                <p className="font-medium text-sm">{selectedUser.full_name || "Unknown"}</p>
                {selectedUser.location && <p className="text-xs text-muted-foreground">{selectedUser.location}</p>}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-3 px-1">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.sender_id === user.id ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${msg.sender_id === user.id ? "bg-accent text-accent-foreground rounded-br-sm" : "bg-secondary rounded-bl-sm"}`}>
                    {msg.content}
                    <p className="text-[10px] opacity-60 mt-1">{new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 pt-4 border-t mt-4">
              <input value={newMessage} onChange={e => setNewMessage(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-3 rounded-xl bg-secondary border-0 text-sm outline-none focus:ring-2 focus:ring-accent" />
              <button onClick={sendMessage} disabled={!newMessage.trim()}
                className="p-3 rounded-xl bg-accent text-accent-foreground hover:opacity-90 transition-opacity disabled:opacity-50">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
