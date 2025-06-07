
import React, { useState, useEffect } from 'react';
import { PlusCircle, TrendingUp, AlertTriangle, Target, Mic, Brain, Zap, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import ExpenseModal from './ExpenseModal';
import VoiceExpenseModal from './VoiceExpenseModal';

const Dashboard = () => {
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [aiActive, setAiActive] = useState(false);
  const [spentAmount, setSpentAmount] = useState(0);
  const [emotionColor, setEmotionColor] = useState('green');

  const spendingData = [
    { category: 'Food', amount: 320, color: '#F59E0B', icon: '🍕', percentage: 0 },
    { category: 'Transport', amount: 180, color: '#8B5CF6', icon: '🚗', percentage: 0 },
    { category: 'Shopping', amount: 220, color: '#EC4899', icon: '🛍️', percentage: 0 },
    { category: 'Bills', amount: 122, color: '#10B981', icon: '💡', percentage: 0 },
  ];

  const upcomingPayments = [
    { name: 'Netflix', amount: 499, date: 'Dec 15', icon: '📺' },
    { name: 'Rent', amount: 10000, date: 'Dec 1', icon: '🏠' },
    { name: 'Internet', amount: 899, date: 'Dec 20', icon: '📡' },
  ];

  const totalSpent = spendingData.reduce((sum, item) => sum + item.amount, 0);

  // Animate spending counter
  useEffect(() => {
    const timer = setInterval(() => {
      setSpentAmount(prev => {
        if (prev < totalSpent) {
          return prev + Math.ceil((totalSpent - prev) / 10);
        }
        clearInterval(timer);
        return totalSpent;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [totalSpent]);

  // Calculate percentages for pie chart animation
  useEffect(() => {
    spendingData.forEach((item, index) => {
      setTimeout(() => {
        item.percentage = (item.amount / totalSpent) * 100;
      }, index * 200);
    });
  }, []);

  // AI emotion based on spending
  useEffect(() => {
    if (totalSpent > 1000) {
      setEmotionColor('red');
    } else if (totalSpent > 600) {
      setEmotionColor('yellow');
    } else {
      setEmotionColor('green');
    }
  }, [totalSpent]);

  // Activate AI periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setAiActive(true);
      setTimeout(() => setAiActive(false), 2000);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getEmotionStyles = (emotion: string) => {
    switch (emotion) {
      case 'red':
        return 'from-red-500/20 to-red-600/10 border-red-500/30';
      case 'yellow':
        return 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/30';
      default:
        return 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-neubrutalist-bg particle-bg p-4 space-y-6 pb-20 font-inter">
      {/* Holographic AI Assistant Card */}
      <Card className={`glass-card-intense border-primary/30 animate-slide-up tilt-hover ${aiActive ? 'animate-pulse-glow' : ''}`}>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-bold text-primary flex items-center gap-3">
            <div className={`relative ${aiActive ? 'animate-bounce-gentle' : ''}`}>
              <Brain className="w-8 h-8 animate-holographic" />
              {aiActive && (
                <div className="absolute -top-1 -right-1">
                  <Eye className="w-4 h-4 text-accent animate-pulse" />
                </div>
              )}
            </div>
            <span className="gradient-text font-poppins">AI Financial Assistant</span>
            {aiActive && <Zap className="w-5 h-5 text-fintech-neon-yellow animate-pulse" />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-white mb-2">
                You spent ₹
                <span className="gradient-text animate-neon-flicker">
                  {spentAmount.toLocaleString()}
                </span> today
              </p>
              <p className="text-emerald-400 font-medium text-lg animate-slide-up">
                That's 16% less than usual! 🎉
              </p>
            </div>
            <div className={`bg-gradient-to-r ${getEmotionStyles(emotionColor)} p-4 rounded-xl border transition-all duration-500`}>
              <p className="text-sm text-gray-300">
                <span className="text-2xl mr-2">🤖</span>
                <span className="text-primary font-medium">AI Insight:</span> 
                {emotionColor === 'green' && " Excellent spending habits! You're on track to save ₹2,400 this month!"}
                {emotionColor === 'yellow' && " Moderate spending detected. Consider reducing food expenses by 10%."}
                {emotionColor === 'red' && " High spending alert! Time to review your budget and cut unnecessary expenses."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Animated Spending Chart */}
      <Card className="glass-card border-white/20 animate-slide-up tilt-hover" style={{ animationDelay: '0.1s' }}>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-accent animate-bounce-gentle" />
            Today's Spending Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {spendingData.map((item, index) => (
              <div 
                key={item.category} 
                className="flex items-center justify-between animate-stagger-left motion-blur"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl animate-bounce-gentle" style={{ animationDelay: `${index * 0.2}s` }}>
                    {item.icon}
                  </span>
                  <span className="text-white font-medium">{item.category}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-28 relative">
                    <Progress 
                      value={item.percentage} 
                      className="h-3 bg-white/10"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse opacity-60"></div>
                  </div>
                  <span className="text-white font-bold text-right w-20 gradient-text">₹{item.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Interactive Upcoming Payments */}
      <Card className="glass-card border-white/20 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
            <Target className="w-6 h-6 text-fintech-lime animate-pulse-glow" />
            Upcoming Payments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {upcomingPayments.map((payment, index) => (
              <div 
                key={payment.name} 
                className="glass-card p-4 rounded-xl min-w-[140px] tilt-hover transition-all duration-300 hover:neon-glow animate-slide-up"
                style={{ animationDelay: `${(index + 3) * 0.1}s` }}
              >
                <div className="text-center space-y-2">
                  <span className="text-2xl animate-bounce-gentle" style={{ animationDelay: `${index * 0.3}s` }}>
                    {payment.icon}
                  </span>
                  <p className="text-white font-medium text-sm">{payment.name}</p>
                  <p className="text-primary font-bold animate-pulse-glow">₹{payment.amount.toLocaleString()}</p>
                  <p className="text-gray-400 text-xs">{payment.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Smart Alerts with Dynamic Colors */}
      <Card className="glass-card border-yellow-500/20 animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500 animate-pulse" />
            Smart Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/10 p-4 rounded-xl border border-yellow-500/30 animate-slide-up">
              <p className="text-sm text-yellow-300">
                <span className="text-xl mr-2">🎯</span>
                <span className="font-medium">Budget Alert:</span> You've used 78% of your food budget
              </p>
            </div>
            <div className="bg-gradient-to-r from-red-500/20 to-red-600/10 p-4 rounded-xl border border-red-500/30 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <p className="text-sm text-red-300">
                <span className="text-xl mr-2">🔄</span>
                <span className="font-medium">Subscription:</span> Gym membership unused for 30 days (₹1,000/month)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Floating Action Buttons */}
      <div className="fixed bottom-20 right-4 flex flex-col gap-4">
        <Button
          onClick={() => setIsVoiceModalOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 hover:scale-110 shadow-2xl neon-pink animate-bounce-gentle tilt-hover ripple-effect"
        >
          <Mic className="w-7 h-7 text-white" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-30 animate-pulse"></div>
        </Button>
        
        <Button
          onClick={() => setIsExpenseModalOpen(true)}
          className="w-18 h-18 rounded-full bg-gradient-to-r from-primary via-accent to-fintech-lime hover:scale-110 shadow-2xl neon-glow animate-bounce-gentle tilt-hover ripple-effect brutal-shadow"
        >
          <PlusCircle className="w-8 h-8 text-black" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent opacity-40 animate-pulse"></div>
        </Button>
      </div>

      {/* Background Particle Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full opacity-30 animate-float-coins"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
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
