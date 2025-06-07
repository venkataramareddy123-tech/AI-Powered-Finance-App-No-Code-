
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from '@/components/ui/use-toast';

export interface Expense {
  id: string;
  user_id: string;
  amount: number;
  category: string;
  date: string;
  description?: string;
  is_recurring: boolean;
  is_necessary: boolean;
  created_at: string;
}

export const useExpenses = () => {
  const { user } = useAuth();
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchExpenses();
      
      // Set up real-time subscription
      const subscription = supabase
        .channel('expenses-changes')
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'expenses',
          filter: `user_id=eq.${user.id}`
        }, () => {
          fetchExpenses();
        })
        .subscribe();

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [user]);

  const fetchExpenses = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) throw error;
      setExpenses(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching expenses",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expenseData: Omit<Expense, 'id' | 'user_id' | 'created_at'>) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { error } = await supabase
        .from('expenses')
        .insert([{
          ...expenseData,
          user_id: user.id
        }]);

      if (error) throw error;
      
      toast({
        title: "Expense added successfully",
        description: `₹${expenseData.amount} for ${expenseData.category}`
      });
      
      return { error: null };
    } catch (error: any) {
      toast({
        title: "Error adding expense",
        description: error.message,
        variant: "destructive"
      });
      return { error };
    }
  };

  const updateExpense = async (id: string, updates: Partial<Expense>) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { error } = await supabase
        .from('expenses')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      
      toast({
        title: "Expense updated successfully"
      });
      
      return { error: null };
    } catch (error: any) {
      toast({
        title: "Error updating expense",
        description: error.message,
        variant: "destructive"
      });
      return { error };
    }
  };

  const deleteExpense = async (id: string) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { error } = await supabase
        .from('expenses')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      
      toast({
        title: "Expense deleted successfully"
      });
      
      return { error: null };
    } catch (error: any) {
      toast({
        title: "Error deleting expense",
        description: error.message,
        variant: "destructive"
      });
      return { error };
    }
  };

  return {
    expenses,
    loading,
    addExpense,
    updateExpense,
    deleteExpense,
    refetch: fetchExpenses
  };
};
