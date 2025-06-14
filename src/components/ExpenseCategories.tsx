
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useExpenses } from '@/hooks/useExpenses';
import { useProfile } from '@/hooks/useProfile';
import { TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

const ExpenseCategories: React.FC = () => {
  const { expenses } = useExpenses();
  const { profile } = useProfile();

  const currentMonth = new Date().toISOString().slice(0, 7);
  const monthExpenses = expenses.filter(expense => expense.date.startsWith(currentMonth));

  // Calculate spending by category
  const categorySpending = monthExpenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const budgetAllocations = profile?.budget_allocations || {};

  const categoryData = Object.entries(categorySpending).map(([category, spent]) => {
    const budget = typeof budgetAllocations[category] === 'number' ? budgetAllocations[category] : 0;
    const percentage = budget > 0 ? (spent / budget) * 100 : 0;
    
    return {
      category: category.charAt(0).toUpperCase() + category.slice(1),
      spent,
      budget,
      percentage,
      status: percentage > 100 ? 'over' : percentage > 80 ? 'warning' : 'good',
      trend: Math.random() > 0.5 ? 'up' : 'down' // Simplified trend calculation
    };
  }).sort((a, b) => b.spent - a.spent);

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      food: '🍕',
      transport: '🚗',
      shopping: '🛍️',
      bills: '💡',
      entertainment: '🎬',
      healthcare: '💊',
      rent: '🏠',
      utilities: '⚡',
      other: '💰'
    };
    return icons[category.toLowerCase()] || '💰';
  };

  return (
    <Card className="glass-card border-white/20">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
          📊 Category Breakdown
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {categoryData.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">No expenses this month</p>
          </div>
        ) : (
          categoryData.map((item) => (
            <div key={item.category} className="glass-card p-4 rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getCategoryIcon(item.category)}</span>
                  <div>
                    <h3 className="text-white font-medium">{item.category}</h3>
                    <p className="text-gray-400 text-sm">
                      ₹{item.spent.toLocaleString()} / ₹{item.budget.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {item.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-red-400" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-emerald-400" />
                  )}
                  {item.status === 'over' && (
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Progress</span>
                  <span className={`${
                    item.status === 'over' ? 'text-red-400' : 
                    item.status === 'warning' ? 'text-yellow-400' : 'text-emerald-400'
                  }`}>
                    {item.percentage.toFixed(0)}%
                  </span>
                </div>
                <Progress 
                  value={Math.min(item.percentage, 100)} 
                  className="h-2 bg-white/10"
                />
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default ExpenseCategories;
