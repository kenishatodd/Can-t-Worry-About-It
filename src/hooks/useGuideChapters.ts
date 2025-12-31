import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface GuideChapter {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  capacity_results: string[];
  is_free: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface GuideChapterInput {
  slug: string;
  title: string;
  description: string;
  content: string;
  capacity_results?: string[];
  is_free?: boolean;
  sort_order?: number;
}

export const useGuideChapters = () => {
  return useQuery({
    queryKey: ['guide-chapters'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('guide_chapters')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;
      return data as GuideChapter[];
    },
  });
};

export const useCreateChapter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (chapter: GuideChapterInput) => {
      const { data, error } = await supabase
        .from('guide_chapters')
        .insert(chapter)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guide-chapters'] });
    },
  });
};

export const useUpdateChapter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<GuideChapter> & { id: string }) => {
      const { data, error } = await supabase
        .from('guide_chapters')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guide-chapters'] });
    },
  });
};

export const useDeleteChapter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('guide_chapters')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guide-chapters'] });
    },
  });
};
