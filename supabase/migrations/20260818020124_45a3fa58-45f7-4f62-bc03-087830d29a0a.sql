CREATE TABLE IF NOT EXISTS public.guide_access (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  has_access boolean NOT NULL DEFAULT false,
  granted_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.guide_access TO authenticated;
GRANT ALL ON public.guide_access TO service_role;
ALTER TABLE public.guide_access ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own guide access" ON public.guide_access
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage guide access" ON public.guide_access
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.has_guide_access(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.guide_access WHERE user_id = _user_id AND has_access = true)
$$;

DROP POLICY IF EXISTS "Anyone can view guide chapters" ON public.guide_chapters;
CREATE POLICY "Free chapters public, paid chapters for buyers" ON public.guide_chapters
  FOR SELECT USING (
    is_free = true
    OR public.has_role(auth.uid(), 'admin')
    OR public.has_guide_access(auth.uid())
  );

CREATE OR REPLACE VIEW public.guide_chapter_previews AS
  SELECT id, slug, title, description, capacity_results, is_free, sort_order
  FROM public.guide_chapters;
GRANT SELECT ON public.guide_chapter_previews TO anon, authenticated;

DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;
CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all roles" ON public.user_roles
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

REVOKE SELECT ON public.profiles FROM anon;
REVOKE SELECT ON public.user_roles FROM anon;