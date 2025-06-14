
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from '@/hooks/use-toast';

export interface AISuggestion {
  id: string;
  user_id: string;
  suggestion_text: string;
  type: string;
  emoji_reaction: string | null;
  is_saved: boolean | null;
  generated_at: string;
}

export const useAISuggestions = () => {
  const { user } = useAuth();
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const channelRef = useRef<any>(null);
  const isSubscribedRef = useRef(false);

  useEffect(() => {
    if (!user?.id) {
      setSuggestions([]);
      setLoading(false);
      return;
    }

    fetchSuggestions();
    setupRealtimeSubscription();

    return () => {
      cleanupSubscription();
    };
  }, [user?.id]);

  const cleanupSubscription = () => {
    if (channelRef.current && isSubscribedRef.current) {
      try {
        supabase.removeChannel(channelRef.current);
      } catch (error) {
        console.log('Error removing channel:', error);
      }
      channelRef.current = null;
      isSubscribedRef.current = false;
    }
  };

  const setupRealtimeSubscription = () => {
    if (!user?.id || isSubscribedRef.current) return;

    cleanupSubscription(); // Ensure cleanup before creating new subscription

    const channelName = `suggestions-${user.id}-${Date.now()}`;
    channelRef.current = supabase
      .channel(channelName)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'ai_suggestions',
        filter: `user_id=eq.${user.id}`
      }, (payload) => {
        console.log('AI Suggestions change:', payload);
        fetchSuggestions();
      })
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          isSubscribedRef.current = true;
        }
      });
  };

  const fetchSuggestions = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_suggestions')
        .select('*')
        .eq('user_id', user.id)
        .order('generated_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setSuggestions(data || []);
    } catch (error: any) {
      console.error('Error fetching suggestions:', error);
      toast({
        title: "Error fetching suggestions",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const saveSuggestion = async (id: string) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { error } = await supabase
        .from('ai_suggestions')
        .update({ is_saved: true })
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      
      toast({
        title: "Suggestion saved!"
      });
      
      return { error: null };
    } catch (error: any) {
      toast({
        title: "Error saving suggestion",
        description: error.message,
        variant: "destructive"
      });
      return { error };
    }
  };

  return {
    suggestions,
    loading,
    saveSuggestion,
    refetch: fetchSuggestions
  };
};
