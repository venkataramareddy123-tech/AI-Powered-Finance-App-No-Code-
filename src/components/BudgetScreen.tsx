
import React, { useState, useEffect } from 'react';
import { Target, TrendingDown, Lightbulb, Plus, Edit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { useExpenses } from '@/hooks/useExpenses';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

const BudgetScreen = () => {
  const { user } = useAuth();
  const { expenses } = useExpenses();
  const [budgetData, setBudgetData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Get current month expenses
  const currentMonth = new Date().toISOString().slice(0, 7);
  const monthExpenses = expenses.filter(expense => expense.date.startsWith(currentMonth));

  // Calculate spending by category
  const spendingByCategory = monthExpenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const budgetCategories = [
    {
      key: 'food',
      name: 'Food & Dining',
      icon: '🍕',
      color: 'bg-orange-500',
      spent: spendingByCategory.food || 0,
      budget: budgetData?.budget_allocations?.food ? parseFloat(budgetData.budget_allocations.food) : 5000,
    },
    {
      key: 'transport',
      name: 'Transportation',
      icon: '🚗',
      color: 'bg-purple-500', 
      spent: spendingByCategory.transport || 0,
      budget: budgetData?.budget_allocations?.transport ? parseFloat(budgetData.budget_allocations.transport) : 3000,
    },
    {
      key: 'shopping',
      name: 'Shopping',
      icon: '🛍️',
      color: 'bg-pink-500',
      spent: spendingByCategory.shopping || 0,
      budget: budgetData?.budget_allocations?.entertainment ? parseFloat(budgetData.budget_allocations.entertainment) : 4000,
    },
    {
      key: 'bills',
      name: 'Bills & Utilities',
      icon: '💡',
      color: 'bg-blue-500',
      spent: spendingByCategory.bills || 0,
      budget: budgetData?.budget_allocations?.rent ? parseFloat(budgetData.budget_allocations.rent) : 3500,
    },
  ];

  // Fetch user's budget data
  useEffect(() => {
    const fetchBudgetData = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('budget_allocations, monthly_income')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        setBudgetData(data);
      } catch (error) {
        console.log('Error fetching budget data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBudgetData();
  }, [user]);

  const getRiskLevel = (spent: number, budget: number) => {
    const percentage = (spent / budget) * 100;
    if (percentage >= 90) return 'high';
    if (percentage >= 70) return 'medium';
    return 'low';
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case 'low': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="animate-spin">
          <Target className="w-8 h-8 text-emerald-400" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 space-y-6 pb-20">
      {/* Header */}
      <Card className="glass-card-intense border-emerald-500/30 animate-slide-up">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
            <Target className="w-6 h-6 text-emerald-400" />
            Smart Budget Manager
          </CardTitle>
          <p className="text-gray-300">Track your spending limits and stay on budget</p>
        </CardHeader>
      </Card>

      {/* Budget Overview */}
      {!budgetData?.budget_allocations && (
        <Card className="glass-card border-yellow-500/30 animate-slide-up">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto flex items-center justify-center">
                <Plus className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Set Up Your Budget</h3>
                <p className="text-gray-400 mb-4">Create spending limits to track your financial goals</p>
                <Button className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Budget
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Budget Categories */}
      <Card className="glass-card border-white/20 animate-slide-up">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-cyan-400" />
              Monthly Budget Breakdown
            </CardTitle>
            <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {budgetCategories.map((category, index) => {
              const percentage = (category.spent / category.budget) * 100;
              const remaining = category.budget - category.spent;
              const riskLevel = getRiskLevel(category.spent, category.budget);
              
              return (
                <div
                  key={category.key}
                  className="glass-card p-4 rounded-xl animate-slide-up hover:scale-[1.02] transition-transform"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="space-y-4">
                    {/* Category Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{category.icon}</span>
                        <div>
                          <p className="text-white font-medium">{category.name}</p>
                          <p className="text-gray-400 text-sm">₹{category.spent.toLocaleString()} / ₹{category.budget.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getRiskColor(riskLevel)}`}>
                        {riskLevel.toUpperCase()}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <Progress value={Math.min(percentage, 100)} className="h-3" />
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">{percentage.toFixed(0)}% used</span>
                        <span className={remaining >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                          ₹{Math.abs(remaining).toLocaleString()} {remaining >= 0 ? 'remaining' : 'over budget'}
                        </span>
                      </div>
                    </div>

                    {/* Budget Slider */}
                    <div className="space-y-2">
                      <p className="text-white text-sm font-medium">Adjust Budget</p>
                      <Slider
                        defaultValue={[category.budget]}
                        max={20000}
                        min={1000}
                        step={500}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* AI Suggestions */}
      <Card className="glass-card border-emerald-500/30 animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <CardHeader>
          <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            AI Budget Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="bg-emerald-500/10 p-4 rounded-lg border border-emerald-500/20">
              <p className="text-sm text-emerald-400">
                🎯 <span className="font-medium">Smart Tip:</span> Try reducing food delivery orders by 15% to meet your food goal. You could save ₹{Math.floor((spendingByCategory.food || 0) * 0.15).toLocaleString()} this month!
              </p>
            </div>
            
            {budgetCategories.some(cat => cat.spent > cat.budget) && (
              <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/20">
                <p className="text-sm text-yellow-300">
                  🚨 <span className="font-medium">Alert:</span> You're over budget in some categories. Consider postponing non-essential purchases.
                </p>
              </div>
            )}

            <div className="bg-blue-500/10 p-4 rounded-lg border border-blue-500/20">
              <p className="text-sm text-blue-400">
                💡 <span className="font-medium">Insight:</span> Your spending pattern shows you're most active on weekends. Plan your budget accordingly!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetScreen;
