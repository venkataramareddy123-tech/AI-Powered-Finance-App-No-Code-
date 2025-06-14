
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useExpenses } from '@/hooks/useExpenses';
import { useGoals } from '@/hooks/useGoals';
import { Plus, Target, Coffee, Car, Home, ShoppingBag } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const QuickActions: React.FC = () => {
  const { addExpense } = useExpenses();
  const { addGoal } = useGoals();

  const quickExpenses = [
    { icon: Coffee, label: 'Coffee', amount: 150, category: 'food' },
    { icon: Car, label: 'Fuel', amount: 2000, category: 'transport' },
    { icon: Home, label: 'Groceries', amount: 1500, category: 'food' },
    { icon: ShoppingBag, label: 'Shopping', amount: 3000, category: 'shopping' }
  ];

  const handleQuickExpense = async (expense: typeof quickExpenses[0]) => {
    const result = await addExpense({
      amount: expense.amount,
      category: expense.category,
      description: expense.label,
      date: new Date().toISOString().split('T')[0],
      is_necessary: true,
      is_recurring: false
    });

    if (!result.error) {
      toast({
        title: "Quick expense added!",
        description: `₹${expense.amount} for ${expense.label}`
      });
    }
  };

  const handleQuickGoal = async () => {
    const goals = [
      { title: 'Emergency Fund', amount: 100000 },
      { title: 'Vacation', amount: 50000 },
      { title: 'New Phone', amount: 25000 }
    ];
    
    const randomGoal = goals[Math.floor(Math.random() * goals.length)];
    
    const result = await addGoal({
      goal_title: randomGoal.title,
      target_amount: randomGoal.amount,
      saved_amount: 0,
      target_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] // 3 months from now
    });

    if (!result.error) {
      toast({
        title: "Goal created!",
        description: `Target: ₹${randomGoal.amount} for ${randomGoal.title}`
      });
    }
  };

  return (
    <Card className="glass-card border-white/20">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
          ⚡ Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Expenses */}
        <div>
          <h3 className="text-white font-medium mb-3">Quick Add Expenses</h3>
          <div className="grid grid-cols-2 gap-2">
            {quickExpenses.map((expense) => (
              <Button
                key={expense.label}
                onClick={() => handleQuickExpense(expense)}
                variant="outline"
                className="glass-card border-white/20 text-white hover:bg-white/10 flex items-center gap-2 p-3 h-auto"
              >
                <expense.icon className="w-4 h-4" />
                <div className="text-left">
                  <div className="text-sm">{expense.label}</div>
                  <div className="text-xs text-gray-400">₹{expense.amount}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Quick Goal */}
        <div>
          <h3 className="text-white font-medium mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <Button
              onClick={handleQuickGoal}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:opacity-80 flex items-center gap-2"
            >
              <Target className="w-4 h-4" />
              Create Random Goal
            </Button>
            <Button
              variant="outline"
              className="w-full glass-card border-white/20 text-white hover:bg-white/10 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Custom Expense
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
