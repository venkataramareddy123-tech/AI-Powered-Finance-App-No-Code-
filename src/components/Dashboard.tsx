
import React, { useState } from 'react';
import { PlusCircle, TrendingUp, AlertTriangle, Target, Mic } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import ExpenseModal from './ExpenseModal';
import VoiceExpenseModal from './VoiceExpenseModal';

const Dashboard = () => {
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);

  const spendingData = [
    { category: 'Food', amount: 320, color: '#F59E0B', icon: '🍕' },
    { category: 'Transport', amount: 180, color: '#8B5CF6', icon: '🚗' },
    { category: 'Shopping', amount: 220, color: '#EC4899', icon: '🛍️' },
    { category: 'Bills', amount: 122, color: '#10B981', icon: '💡' },
  ];

  const upcomingPayments = [
    { name: 'Netflix', amount: 499, date: 'Dec 15', icon: '📺' },
    { name: 'Rent', amount: 10000, date: 'Dec 1', icon: '🏠' },
    { name: 'Internet', amount: 899, date: 'Dec 20', icon: '📡' },
  ];

  const totalSpent = spendingData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="min-h-screen bg-fintech-gradient p-4 space-y-6">
      {/* AI Summary Card */}
      <Card className="glass-card border-primary/20 animate-slide-up">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-bold text-primary flex items-center gap-2">
            <TrendingUp className="w-6 h-6" />
            AI Daily Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <p className="text-2xl font-bold text-white">
              You spent ₹{totalSpent} today
            </p>
            <p className="text-emerald-400 font-medium">
              That's 16% less than usual! 🎉
            </p>
            <div className="bg-primary/10 p-3 rounded-lg border border-primary/20">
              <p className="text-sm text-gray-300">
                💡 <span className="text-primary font-medium">AI Tip:</span> You're on track to save ₹2,400 this month!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Spending Chart */}
      <Card className="glass-card border-white/20 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white">Today's Spending</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {spendingData.map((item) => (
              <div key={item.category} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-white font-medium">{item.category}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24">
                    <Progress 
                      value={(item.amount / totalSpent) * 100} 
                      className="h-2"
                      style={{ 
                        backgroundColor: 'rgba(255,255,255,0.1)',
                      }}
                    />
                  </div>
                  <span className="text-white font-bold text-right w-16">₹{item.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Payments */}
      <Card className="glass-card border-white/20 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white">Upcoming Payments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {upcomingPayments.map((payment) => (
              <div key={payment.name} className="glass-card p-4 rounded-xl min-w-[140px] hover:scale-105 transition-transform">
                <div className="text-center space-y-2">
                  <span className="text-2xl">{payment.icon}</span>
                  <p className="text-white font-medium text-sm">{payment.name}</p>
                  <p className="text-primary font-bold">₹{payment.amount}</p>
                  <p className="text-gray-400 text-xs">{payment.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="glass-card border-yellow-500/20 animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            Smart Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="bg-yellow-500/10 p-3 rounded-lg border border-yellow-500/20">
              <p className="text-sm text-yellow-300">
                🎯 <span className="font-medium">Budget Alert:</span> You've used 78% of your food budget
              </p>
            </div>
            <div className="bg-red-500/10 p-3 rounded-lg border border-red-500/20">
              <p className="text-sm text-red-300">
                🔄 <span className="font-medium">Subscription:</span> Gym membership unused for 30 days (₹1,000/month)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-20 right-4 flex flex-col gap-3">
        <Button
          onClick={() => setIsVoiceModalOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg neon-glow animate-bounce-gentle"
        >
          <Mic className="w-6 h-6" />
        </Button>
        <Button
          onClick={() => setIsExpenseModalOpen(true)}
          className="w-16 h-16 rounded-full bg-neon-glow hover:bg-primary shadow-lg neon-glow animate-bounce-gentle"
        >
          <PlusCircle className="w-8 h-8" />
        </Button>
      </div>

      <ExpenseModal 
        isOpen={isExpenseModalOpen} 
        onClose={() => setIsExpenseModalOpen(false)} 
      />
      <VoiceExpenseModal 
        isOpen={isVoiceModalOpen} 
        onClose={() => setIsVoiceModalOpen(false)} 
      />
    </div>
  );
};

export default Dashboard;
