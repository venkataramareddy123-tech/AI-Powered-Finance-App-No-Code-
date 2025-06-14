
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from '@/hooks/use-toast';

export interface Goal {
  id: string;
  user_id: string;
  goal_title: string;
  target_amount: number;
  saved_amount: number;
  target_date?: string;
  is_completed: boolean;
  created_at: string;
}

export const useGoals = () => {
  const { user } = useAuth();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const channelRef = useRef<any>(null);
  const isSubscribedRef = useRef(false);

  useEffect(() => {
    if (!user?.id) {
      setGoals([]);
      setLoading(false);
      return;
    }

    fetchGoals();
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

    const channelName = `goals-${user.id}-${Date.now()}`;
    channelRef.current = supabase
      .channel(channelName)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'goals',
        filter: `user_id=eq.${user.id}`
      }, (payload) => {
        console.log('Goals change:', payload);
        fetchGoals();
      })
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          isSubscribedRef.current = true;
        }
      });
  };

  const fetchGoals = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGoals(data || []);
    } catch (error: any) {
      console.error('Error fetching goals:', error);
      toast({
        title: "Error fetching goals",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addGoal = async (goalData: Omit<Goal, 'id' | 'user_id' | 'created_at' | 'is_completed'>) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { error } = await supabase
        .from('goals')
        .insert([{
          ...goalData,
          user_id: user.id
        }]);

      if (error) throw error;
      
      toast({
        title: "Goal created successfully",
        description: `Target: ₹${goalData.target_amount}`
      });
      
      return { error: null };
    } catch (error: any) {
      toast({
        title: "Error creating goal",
        description: error.message,
        variant: "destructive"
      });
      return { error };
    }
  };

  const updateGoal = async (id: string, updates: Partial<Goal>) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { error } = await supabase
        .from('goals')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      
      toast({
        title: "Goal updated successfully"
      });
      
      return { error: null };
    } catch (error: any) {
      toast({
        title: "Error updating goal",
        description: error.message,
        variant: "destructive"
      });
      return { error };
    }
  };

  return {
    goals,
    loading,
    addGoal,
    updateGoal,
    refetch: fetchGoals
  };
};
