
import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useExpenses } from '@/hooks/useExpenses';
import { useProfile } from '@/hooks/useProfile';
import { useToast } from '@/hooks/use-toast';
import { Bell, X, AlertTriangle, TrendingUp, Target } from 'lucide-react';

interface Notification {
  id: string;
  type: 'warning' | 'info' | 'success';
  title: string;
  message: string;
  action?: () => void;
  actionLabel?: string;
}

const SmartNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { expenses } = useExpenses();
  const { profile } = useProfile();
  const { toast } = useToast();

  useEffect(() => {
    generateSmartNotifications();
  }, [expenses, profile]);

  const generateSmartNotifications = () => {
    const newNotifications: Notification[] = [];
    const currentMonth = new Date().toISOString().slice(0, 7);
    const monthExpenses = expenses.filter(expense => expense.date.startsWith(currentMonth));
    
    // Budget overspend warnings
    if (profile?.budget_allocations) {
      const categorySpending = monthExpenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
      }, {} as Record<string, number>);

      Object.entries(profile.budget_allocations).forEach(([category, budget]) => {
        const spent = categorySpending[category] || 0;
        const budgetAmount = typeof budget === 'number' ? budget : 0;
        
        if (budgetAmount > 0 && spent > budgetAmount * 0.8) {
          newNotifications.push({
            id: `budget-${category}`,
            type: spent > budgetAmount ? 'warning' : 'info',
            title: `${category.charAt(0).toUpperCase() + category.slice(1)} Budget Alert`,
            message: spent > budgetAmount 
              ? `You've exceeded your budget by ₹${(spent - budgetAmount).toLocaleString()}`
              : `You've used ${Math.round((spent / budgetAmount) * 100)}% of your budget`,
            action: () => toast({
              title: "Budget Adjusted",
              description: "Consider reviewing your spending in this category",
            }),
            actionLabel: "View Budget"
          });
        }
      });
    }

    // Spending pattern insights
    const dailyAverage = monthExpenses.length > 0 ? 
      monthExpenses.reduce((sum, exp) => sum + exp.amount, 0) / new Date().getDate() : 0;
    
    const today = new Date().toISOString().split('T')[0];
    const todaySpending = expenses.filter(exp => exp.date === today)
      .reduce((sum, exp) => sum + exp.amount, 0);

    if (todaySpending > dailyAverage * 1.5) {
      newNotifications.push({
        id: 'high-spending-day',
        type: 'warning',
        title: 'High Spending Day',
        message: `Today's spending (₹${todaySpending.toLocaleString()}) is above your daily average`,
        action: () => toast({
          title: "Spending Tracked",
          description: "Keep an eye on your expenses for the rest of the day",
        }),
        actionLabel: "Review Expenses"
      });
    }

    // Savings goal reminders
    const monthlyIncome = profile?.monthly_income || 0;
    const monthlySpending = monthExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const potentialSavings = monthlyIncome - monthlySpending;

    if (monthlyIncome > 0 && potentialSavings > 0) {
      newNotifications.push({
        id: 'savings-opportunity',
        type: 'success',
        title: 'Great Savings Potential!',
        message: `You could save ₹${potentialSavings.toLocaleString()} this month`,
        action: () => toast({
          title: "Goal Created",
          description: "Consider setting a savings goal for this amount",
        }),
        actionLabel: "Set Goal"
      });
    }

    setNotifications(newNotifications);
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-red-400" />;
      case 'success':
        return <Target className="w-5 h-5 text-emerald-400" />;
      default:
        return <TrendingUp className="w-5 h-5 text-blue-400" />;
    }
  };

  if (notifications.length === 0) return null;

  return (
    <div className="space-y-3">
      {notifications.slice(0, 3).map((notification) => (
        <Card key={notification.id} className="glass-card border-white/20 animate-slide-up">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              {getNotificationIcon(notification.type)}
              <div className="flex-1">
                <h4 className="text-white font-medium text-sm">{notification.title}</h4>
                <p className="text-gray-400 text-xs mt-1">{notification.message}</p>
                {notification.action && (
                  <Button
                    onClick={notification.action}
                    variant="ghost"
                    size="sm"
                    className="mt-2 text-primary hover:text-primary/80 h-auto p-0 text-xs"
                  >
                    {notification.actionLabel}
                  </Button>
                )}
              </div>
              <Button
                onClick={() => dismissNotification(notification.id)}
                variant="ghost"
                size="sm"
                className="w-6 h-6 p-0 text-gray-400 hover:text-white"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SmartNotifications;
