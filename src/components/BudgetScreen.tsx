
import React from 'react';
import { Target, TrendingDown, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';

const BudgetScreen = () => {
  const budgetCategories = [
    {
      name: 'Food & Dining',
      icon: '🍕',
      spent: 3200,
      budget: 5000,
      color: 'bg-orange-500',
      riskLevel: 'medium'
    },
    {
      name: 'Transportation',
      icon: '🚗',
      spent: 1800,
      budget: 3000,
      color: 'bg-purple-500',
      riskLevel: 'low'
    },
    {
      name: 'Shopping',
      icon: '🛍️',
      spent: 4500,
      budget: 4000,
      color: 'bg-pink-500',
      riskLevel: 'high'
    },
    {
      name: 'Bills & Utilities',
      icon: '💡',
      spent: 2800,
      budget: 3500,
      color: 'bg-blue-500',
      riskLevel: 'low'
    },
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case 'low': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-fintech-gradient p-4 space-y-6 pb-20">
      <Card className="glass-card border-primary/20 animate-slide-up">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
            <Target className="w-6 h-6 text-primary" />
            Smart Budget Manager
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {budgetCategories.map((category, index) => {
              const percentage = (category.spent / category.budget) * 100;
              const remaining = category.budget - category.spent;
              
              return (
                <div
                  key={category.name}
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
                          <p className="text-gray-400 text-sm">₹{category.spent} / ₹{category.budget}</p>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getRiskColor(category.riskLevel)}`}>
                        {category.riskLevel.toUpperCase()}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <Progress value={percentage} className="h-3" />
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">{percentage.toFixed(0)}% used</span>
                        <span className={remaining >= 0 ? 'text-emerald-400' : 'text-red-400'}>
                          ₹{Math.abs(remaining)} {remaining >= 0 ? 'remaining' : 'over budget'}
                        </span>
                      </div>
                    </div>

                    {/* Budget Slider */}
                    <div className="space-y-2">
                      <p className="text-white text-sm font-medium">Adjust Budget</p>
                      <Slider
                        defaultValue={[category.budget]}
                        max={10000}
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
      <Card className="glass-card border-primary/20 animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <CardHeader>
          <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            AI Budget Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="bg-primary/10 p-3 rounded-lg border border-primary/20">
              <p className="text-sm text-primary">
                🎯 <span className="font-medium">Smart Tip:</span> Try reducing Zomato orders by 15% to meet your food goal. You could save ₹480 this month!
              </p>
            </div>
            <div className="bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
              <p className="text-sm text-yellow-300">
                🚨 <span className="font-medium">Alert:</span> You're 12% over your shopping budget. Consider postponing non-essential purchases.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetScreen;
