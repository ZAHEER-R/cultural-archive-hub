
-- User uploaded photos for cities
CREATE TABLE public.city_photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  city_id TEXT NOT NULL,
  photo_url TEXT NOT NULL,
  place_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.city_photos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view city photos" ON public.city_photos FOR SELECT USING (true);
CREATE POLICY "Authenticated users can upload photos" ON public.city_photos FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own photos" ON public.city_photos FOR DELETE USING (auth.uid() = user_id);

-- User experiences/reviews
CREATE TABLE public.experiences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  city_id TEXT NOT NULL,
  text TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view experiences" ON public.experiences FOR SELECT USING (true);
CREATE POLICY "Auth users can create experiences" ON public.experiences FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own experiences" ON public.experiences FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own experiences" ON public.experiences FOR DELETE USING (auth.uid() = user_id);

-- Experience likes tracking
CREATE TABLE public.experience_likes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  experience_id UUID NOT NULL REFERENCES public.experiences(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, experience_id)
);
ALTER TABLE public.experience_likes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view likes" ON public.experience_likes FOR SELECT USING (true);
CREATE POLICY "Auth users can like" ON public.experience_likes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can unlike" ON public.experience_likes FOR DELETE USING (auth.uid() = user_id);

-- Friends / follow system
CREATE TABLE public.follows (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  follower_id UUID NOT NULL,
  following_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(follower_id, following_id)
);
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view follows" ON public.follows FOR SELECT USING (true);
CREATE POLICY "Auth users can follow" ON public.follows FOR INSERT WITH CHECK (auth.uid() = follower_id);
CREATE POLICY "Users can unfollow" ON public.follows FOR DELETE USING (auth.uid() = follower_id);

-- Chat messages
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID NOT NULL,
  receiver_id UUID NOT NULL,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own messages" ON public.messages FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = receiver_id);
CREATE POLICY "Auth users can send messages" ON public.messages FOR INSERT WITH CHECK (auth.uid() = sender_id);
CREATE POLICY "Receiver can mark as read" ON public.messages FOR UPDATE USING (auth.uid() = receiver_id);

-- Enable realtime for messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;

-- Storage bucket for city photos
INSERT INTO storage.buckets (id, name, public) VALUES ('city-photos', 'city-photos', true);
CREATE POLICY "Anyone can view city photos storage" ON storage.objects FOR SELECT USING (bucket_id = 'city-photos');
CREATE POLICY "Auth users can upload city photos" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'city-photos' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can delete own city photos" ON storage.objects FOR DELETE USING (bucket_id = 'city-photos' AND auth.uid()::text = (storage.foldername(name))[1]);
