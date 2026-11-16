-- ===========================================================================
-- Curiosity Passport — Commercial Multi-Tenant Database Schema (PostgreSQL)
-- ===========================================================================

-- 1. Profiles Table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  discipline TEXT,
  university TEXT,
  grad_year TEXT,
  location TEXT,
  avatar_url TEXT,
  cover_tag TEXT,
  intro TEXT,
  career_aspirations TEXT,
  interests TEXT[] DEFAULT '{}',
  role TEXT CHECK (role IN ('student', 'recruiter', 'mentor', 'admin')) DEFAULT 'student',
  cq_index INTEGER DEFAULT 0,
  xp INTEGER DEFAULT 0,
  streak INTEGER DEFAULT 0,
  last_visit_day DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Curiosity Trails Table
CREATE TABLE IF NOT EXISTS public.curiosity_trails (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  short_label TEXT NOT NULL,
  subtitle TEXT,
  why_curious TEXT NOT NULL,
  key_insight TEXT,
  status TEXT DEFAULT 'Synthesized & Published',
  started_date TEXT,
  completed_date TEXT,
  read_time TEXT,
  tags TEXT[] DEFAULT '{}',
  curiosity_rating TEXT DEFAULT 'Original Inquiry',
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Trail Nodes / Milestones Table
CREATE TABLE IF NOT EXISTS public.trail_nodes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trail_id UUID REFERENCES public.curiosity_trails(id) ON DELETE CASCADE NOT NULL,
  step_number TEXT NOT NULL,
  phase TEXT NOT NULL,
  title TEXT NOT NULL,
  date TEXT,
  evidence_type TEXT,
  summary TEXT,
  body TEXT NOT NULL,
  key_takeaway TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Tangible Artifacts Table
CREATE TABLE IF NOT EXISTS public.tangible_artifacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  trail_id UUID REFERENCES public.curiosity_trails(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  summary TEXT,
  deliverable_type TEXT,
  live_url TEXT,
  metrics TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Peer Reviews Table
CREATE TABLE IF NOT EXISTS public.peer_reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  trail_id UUID REFERENCES public.curiosity_trails(id) ON DELETE CASCADE NOT NULL,
  reviewer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  focus TEXT NOT NULL,
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(trail_id, reviewer_id)
);

-- 6. Recruiter Outreach Communications Table
CREATE TABLE IF NOT EXISTS public.recruiter_outreach (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  recruiter_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  candidate_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  company_name TEXT NOT NULL,
  role_type TEXT NOT NULL,
  personal_note TEXT NOT NULL,
  stage TEXT CHECK (stage IN ('Sent', 'Replied', 'Interview', 'Offer')) DEFAULT 'Sent',
  candidate_response TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Candidate Shortlists Table
CREATE TABLE IF NOT EXISTS public.shortlists (
  recruiter_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  candidate_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (recruiter_id, candidate_id)
);

-- 8. Field Office Meeting Attendance & Quests Table
CREATE TABLE IF NOT EXISTS public.field_office_attendance (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  meeting_id TEXT NOT NULL,
  week_number INTEGER NOT NULL DEFAULT 1,
  choice_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ===========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ===========================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.curiosity_trails ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trail_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tangible_artifacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.peer_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recruiter_outreach ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shortlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.field_office_attendance ENABLE ROW LEVEL SECURITY;

-- Profiles: Public read, self write
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Trails: Public read, author write
CREATE POLICY "Trails are viewable by everyone" ON public.curiosity_trails FOR SELECT USING (true);
CREATE POLICY "Authors can insert trails" ON public.curiosity_trails FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Authors can update trails" ON public.curiosity_trails FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Authors can delete trails" ON public.curiosity_trails FOR DELETE USING (auth.uid() = author_id);

-- Trail Nodes: Public read, author write
CREATE POLICY "Nodes are viewable by everyone" ON public.trail_nodes FOR SELECT USING (true);
CREATE POLICY "Author can manage nodes" ON public.trail_nodes FOR ALL USING (
  EXISTS (SELECT 1 FROM public.curiosity_trails WHERE id = trail_id AND author_id = auth.uid())
);

-- Artifacts: Public read, author write
CREATE POLICY "Artifacts viewable by everyone" ON public.tangible_artifacts FOR SELECT USING (true);
CREATE POLICY "Authors manage artifacts" ON public.tangible_artifacts FOR ALL USING (auth.uid() = author_id);

-- Peer Reviews: Public read, reviewer write
CREATE POLICY "Reviews viewable by everyone" ON public.peer_reviews FOR SELECT USING (true);
CREATE POLICY "Reviewers can insert review" ON public.peer_reviews FOR INSERT WITH CHECK (auth.uid() = reviewer_id);

-- Recruiter Outreach: Isolated to recruiter and candidate
CREATE POLICY "Recruiter and candidate see outreach" ON public.recruiter_outreach
  FOR SELECT USING (auth.uid() = recruiter_id OR auth.uid() = candidate_id);
CREATE POLICY "Recruiters can create outreach" ON public.recruiter_outreach
  FOR INSERT WITH CHECK (auth.uid() = recruiter_id);
CREATE POLICY "Recruiters and candidates can update outreach stage" ON public.recruiter_outreach
  FOR UPDATE USING (auth.uid() = recruiter_id OR auth.uid() = candidate_id);

-- Shortlists: Recruiter private
CREATE POLICY "Recruiters manage shortlist" ON public.shortlists
  FOR ALL USING (auth.uid() = recruiter_id);

-- Attendance: User private
CREATE POLICY "Users manage attendance" ON public.field_office_attendance
  FOR ALL USING (auth.uid() = user_id);
