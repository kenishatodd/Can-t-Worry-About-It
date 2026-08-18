DROP VIEW IF EXISTS public.guide_chapter_previews;

CREATE TABLE IF NOT EXISTS public.guide_chapter_content (
  chapter_id uuid PRIMARY KEY REFERENCES public.guide_chapters(id) ON DELETE CASCADE,
  content text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.guide_chapter_content TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.guide_chapter_content TO authenticated;
GRANT ALL ON public.guide_chapter_content TO service_role;
ALTER TABLE public.guide_chapter_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Chapter text for free chapters, buyers and admins"
ON public.guide_chapter_content FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.guide_chapters gc
    WHERE gc.id = chapter_id
      AND (gc.is_free = true
           OR public.has_role(auth.uid(), 'admin')
           OR public.has_guide_access(auth.uid()))
  )
);
CREATE POLICY "Admins manage chapter text"
ON public.guide_chapter_content FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.guide_chapter_content (chapter_id, content)
SELECT id, content FROM public.guide_chapters
ON CONFLICT (chapter_id) DO NOTHING;

ALTER TABLE public.guide_chapters DROP COLUMN content;

DROP POLICY IF EXISTS "Free chapters public, paid chapters for buyers" ON public.guide_chapters;
CREATE POLICY "Anyone can view chapter listings" ON public.guide_chapters
  FOR SELECT USING (true);

CREATE TRIGGER update_guide_chapter_content_updated_at
BEFORE UPDATE ON public.guide_chapter_content
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

REVOKE EXECUTE ON FUNCTION public.has_guide_access(uuid) FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM anon, authenticated;