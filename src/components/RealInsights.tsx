import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calendar,
  Target,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react';
import { useExpenses } from '@/hooks/useExpenses';
import { useProfile } from '@/hooks/useProfile';
import { useAISuggestions } from '@/hooks/useAISuggestions';

const RealInsights: React.FC = () => {
  const { expenses, loading: expensesLoading } = useExpenses();
  const { profile, loading: profileLoading } = useProfile();
  const { suggestions, loading: suggestionsLoading } = useAISuggestions();

  // Calculate spending trends
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const currentMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
  });
  
  const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  
  const lastMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === lastMonth && expenseDate.getFullYear() === lastMonthYear;
  });

  const currentMonthTotal = currentMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const lastMonthTotal = lastMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  const spendingChange = lastMonthTotal > 0 ? ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100 : 0;

  // Category analysis
  const categoryTotals = currentMonthExpenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const topCategory = Object.entries(categoryTotals).sort(([,a], [,b]) => b - a)[0];

  // Budget analysis - fix the type conversion issue
  const budgetAllocations = profile?.budget_allocations || {};
  const budgetInsights = Object.entries(budgetAllocations).map(([category, budget]) => {
    const budgetAmount = typeof budget === 'number' ? budget : 0;
    const spent = categoryTotals[category] || 0;
    const percentage = budgetAmount > 0 ? (spent / budgetAmount) * 100 : 0;
    
    return {
      category,
      budget: budgetAmount,
      spent,
      percentage,
      status: percentage > 100 ? 'over' : percentage > 80 ? 'warning' : 'good'
    };
  }).filter(insight => insight.budget > 0);

  if (expensesLoading || profileLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-32 bg-white/10 rounded-xl"></div>
        <div className="h-48 bg-white/10 rounded-xl"></div>
        <div className="h-64 bg-white/10 rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Spending Overview */}
      <Card className="glass-card border-white/20">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Spending Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-400">This Month</span>
              </div>
              <div className="text-2xl font-bold text-white">
                ₹{currentMonthTotal.toLocaleString()}
              </div>
            </div>
            
            <div className="glass-card p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-gray-400">Last Month</span>
              </div>
              <div className="text-2xl font-bold text-white">
                ₹{lastMonthTotal.toLocaleString()}
              </div>
            </div>
          </div>

          {spendingChange !== 0 && (
            <div className="flex items-center gap-2">
              {spendingChange > 0 ? (
                <TrendingUp className="w-4 h-4 text-red-400" />
              ) : (
                <TrendingDown className="w-4 h-4 text-emerald-400" />
              )}
              <span className={`text-sm ${spendingChange > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                {Math.abs(spendingChange).toFixed(1)}% {spendingChange > 0 ? 'increase' : 'decrease'} from last month
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Top Category */}
      {topCategory && (
        <Card className="glass-card border-white/20">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-white">Top Spending Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white capitalize">{topCategory[0]}</h3>
                <p className="text-gray-400">
                  {((topCategory[1] / currentMonthTotal) * 100).toFixed(1)}% of total spending
                </p>
              </div>
              <div className="text-2xl font-bold text-emerald-400">
                ₹{topCategory[1].toLocaleString()}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Budget Status */}
      {budgetInsights.length > 0 && (
        <Card className="glass-card border-white/20">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
              <Target className="w-5 h-5" />
              Budget Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {budgetInsights.map(insight => (
              <div key={insight.category} className="glass-card p-3 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white capitalize font-medium">{insight.category}</span>
                  <div className="flex items-center gap-2">
                    {insight.status === 'over' ? (
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                    ) : insight.status === 'warning' ? (
                      <Info className="w-4 h-4 text-yellow-400" />
                    ) : (
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    )}
                    <Badge 
                      variant={insight.status === 'over' ? 'destructive' : insight.status === 'warning' ? 'secondary' : 'default'}
                      className="text-xs"
                    >
                      {insight.percentage.toFixed(0)}%
                    </Badge>
                  </div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">
                    ₹{insight.spent.toLocaleString()} / ₹{insight.budget.toLocaleString()}
                  </span>
                  <span className={`${
                    insight.status === 'over' ? 'text-red-400' : 
                    insight.status === 'warning' ? 'text-yellow-400' : 'text-emerald-400'
                  }`}>
                    {insight.status === 'over' ? 'Over Budget' : 
                     insight.status === 'warning' ? 'Near Limit' : 'On Track'}
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                  <div 
                    className={`h-2 rounded-full ${
                      insight.status === 'over' ? 'bg-red-400' : 
                      insight.status === 'warning' ? 'bg-yellow-400' : 'bg-emerald-400'
                    }`}
                    style={{ width: `${Math.min(insight.percentage, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* AI Suggestions */}
      {!suggestionsLoading && suggestions.length > 0 && (
        <Card className="glass-card border-white/20">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-white">AI Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {suggestions.slice(0, 3).map(suggestion => (
              <div key={suggestion.id} className="glass-card p-3 rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="text-lg">{suggestion.emoji_reaction}</span>
                  <p className="text-white text-sm flex-1">{suggestion.suggestion_text}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* No Data State */}
      {expenses.length === 0 && (
        <Card className="glass-card border-white/20">
          <CardContent className="text-center py-8">
            <DollarSign className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">No Expenses Yet</h3>
            <p className="text-gray-400">
              Start adding your expenses to see personalized insights and trends.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RealInsights;
