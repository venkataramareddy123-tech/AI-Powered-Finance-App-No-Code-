
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface Profile {
  id: string;
  email?: string;
  full_name?: string;
  monthly_income?: number;
  budget_allocations?: {
    food?: number;
    transport?: number;
    entertainment?: number;
    rent?: number;
    utilities?: number;
    healthcare?: number;
    shopping?: number;
    other?: number;
  };
  onboarding_completed?: boolean;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        setProfile(null);
      } else {
        // Properly handle the budget_allocations type conversion
        const profileData: Profile = {
          ...data,
          budget_allocations: typeof data.budget_allocations === 'object' && data.budget_allocations !== null 
            ? data.budget_allocations as Profile['budget_allocations']
            : undefined
        };
        setProfile(profileData);
      }
    } catch (error) {
      console.error('Error in fetchProfile:', error);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user?.id]);

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      
      // Properly handle the response data type conversion
      const profileData: Profile = {
        ...data,
        budget_allocations: typeof data.budget_allocations === 'object' && data.budget_allocations !== null 
          ? data.budget_allocations as Profile['budget_allocations']
          : undefined
      };
      setProfile(profileData);
      return { error: null };
    } catch (error: any) {
      console.error('Error updating profile:', error);
      return { error };
    }
  };

  return {
    profile,
    loading,
    updateProfile,
    refetch: fetchProfile
  };
};
