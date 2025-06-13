
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from '@/hooks/use-toast';

export interface UserProfile {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  monthly_income: number | null;
  budget_allocations: Record<string, any> | null;
  onboarding_completed: boolean | null;
  created_at: string;
  updated_at: string;
}

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Profile fetch error:', error);
          toast({
            title: "Error fetching profile",
            description: error.message,
            variant: "destructive"
          });
        } else if (data) {
          // Transform the data to match our interface
          const profileData: UserProfile = {
            id: data.id,
            email: data.email,
            full_name: data.full_name,
            avatar_url: data.avatar_url,
            monthly_income: data.monthly_income,
            budget_allocations: data.budget_allocations as Record<string, any>,
            onboarding_completed: data.onboarding_completed,
            created_at: data.created_at,
            updated_at: data.updated_at
          };
          setProfile(profileData);
        }
      } catch (error: any) {
        console.error('Profile fetch error:', error);
        toast({
          title: "Error fetching profile",
          description: error.message,
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;

      // Update local state
      setProfile(prev => prev ? { ...prev, ...updates } : null);
      
      toast({
        title: "Profile updated successfully"
      });
      
      return { error: null };
    } catch (error: any) {
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive"
      });
      return { error };
    }
  };

  return {
    profile,
    loading,
    updateProfile
  };
};
