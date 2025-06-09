
import React, { useState, useEffect } from 'react';
import { PlusCircle, TrendingUp, AlertTriangle, Target, Mic, Brain, Zap, Eye, Sun, Moon, Calendar, Receipt, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const Dashboard = () => {
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [aiActive, setAiActive] = useState(false);
  const [spentAmount, setSpentAmount] = useState(1250);
  const [emotionState, setEmotionState] = useState('good');
  const [darkMode, setDarkMode] = useState(true);
  const [quickMenuOpen, setQuickMenuOpen] = useState(false);
  const [dailyCapsuleIndex, setDailyCapsuleIndex] = useState(0);

  // Mock data for UI display
  const mockExpenses = [
    { category: 'food', amount: 450, date: new Date().toISOString().split('T')[0] },
    { category: 'transport', amount: 300, date: new Date().toISOString().split('T')[0] },
    { category: 'shopping', amount: 500, date: new Date().toISOString().split('T')[0] },
  ];

  const mockGoals = [
    { id: 1, goal_title: 'Emergency Fund', target_amount: 50000, saved_amount: 25000, is_completed: false },
    { id: 2, goal_title: 'Vacation', target_amount: 30000, saved_amount: 18000, is_completed: false },
  ];

  const mockSuggestions = [
    { suggestion_text: "You're doing great with your spending! Consider setting aside 20% more for savings." }
  ];

  const totalSpentToday = mockExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalSpentThisMonth = 12500;

  // Calculate spending by category
  const spendingByCategory = mockExpenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  const spendingData = Object.entries(spendingByCategory).map(([category, amount]) => ({
    category: category.charAt(0).toUpperCase() + category.slice(1),
    amount,
    color: getCategoryColor(category),
    icon: getCategoryIcon(category),
    percentage: (amount / totalSpentThisMonth) * 100
  }));

  // Daily capsules with mock data
  const dailyCapsules = [
    { 
      day: 'Today', 
      category: 'Food', 
      trend: `₹${totalSpentToday}`, 
      tip: 'Great spending control!', 
      emoji: '😊', 
      mood: 'happy' 
    },
    { 
      day: 'This Month', 
      category: 'Total', 
      trend: `₹${totalSpentThisMonth}`, 
      tip: '2 active goals', 
      emoji: '📊', 
      mood: 'neutral' 
    }
  ];

  // Animate spending counter
  useEffect(() => {
    const timer = setTimeout(() => {
      setSpentAmount(totalSpentToday);
    }, 500);
    return () => clearTimeout(timer);
  }, [totalSpentToday]);

  // Activate AI periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setAiActive(true);
      setTimeout(() => setAiActive(false), 2000);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  function getCategoryColor(category: string) {
    const colors: Record<string, string> = {
      food: '#F59E0B',
      transport: '#8B5CF6',
      shopping: '#EC4899',
      bills: '#10B981',
      entertainment: '#EF4444',
      health: '#06B6D4'
    };
    return colors[category.toLowerCase()] || '#6B7280';
  }

  function getCategoryIcon(category: string) {
    const icons: Record<string, string> = {
      food: '🍕',
      transport: '🚗',
      shopping: '🛍️',
      bills: '💡',
      entertainment: '🎬',
      health: '💊'
    };
    return icons[category.toLowerCase()] || '💰';
  }

  const getEmotionStyles = (emotion: string) => {
    if (darkMode) {
      switch (emotion) {
        case 'alert':
          return 'from-red-500/20 to-red-600/10 border-red-500/30 bg-red-900/10';
        case 'warning':
          return 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/30 bg-yellow-900/10';
        default:
          return 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30 bg-emerald-900/10';
      }
    } else {
      switch (emotion) {
        case 'alert':
          return 'from-red-100 to-red-50 border-red-200 bg-red-50';
        case 'warning':
          return 'from-yellow-100 to-yellow-50 border-yellow-200 bg-yellow-50';
        default:
          return 'from-emerald-100 to-emerald-50 border-emerald-200 bg-emerald-50';
      }
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('light-mode');
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${darkMode ? 'bg-neubrutalist-bg' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'} particle-bg p-4 space-y-6 pb-20 font-inter`}>
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 w-12 h-12 rounded-full glass-card-intense flex items-center justify-center magnetic-hover transition-all duration-300 z-50 ripple-effect"
      >
        {darkMode ? (
          <Sun className="w-5 h-5 text-amber-400 animate-bounce-gentle" />
        ) : (
          <Moon className="w-5 h-5 text-indigo-600 animate-bounce-gentle" />
        )}
      </button>

      {/* Daily Capsule */}
      <div className="relative overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-spring"
          style={{ transform: `translateX(-${dailyCapsuleIndex * 100}%)` }}
        >
          {dailyCapsules.map((capsule, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <Card className={`glass-card-intense border-primary/30 animate-slide-up magnetic-hover card-reflection ${getEmotionStyles(capsule.mood)}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl animate-bounce-gentle">{capsule.emoji}</span>
                      <div>
                        <h3 className={`font-bold ${darkMode ? 'text-white' : 'text-slate-800'}`}>{capsule.day}</h3>
                        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-slate-600'}`}>Top: {capsule.category} - {capsule.trend}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`text-xs ${darkMode ? 'text-primary' : 'text-indigo-600'} shimmer-text`}>{capsule.tip}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-2 gap-2">
          {dailyCapsules.map((_, index) => (
            <button
              key={index}
              onClick={() => setDailyCapsuleIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === dailyCapsuleIndex 
                  ? (darkMode ? 'bg-primary' : 'bg-indigo-500') 
                  : (darkMode ? 'bg-white/30' : 'bg-slate-300')
              }`}
            />
          ))}
        </div>
      </div>

      {/* AI Assistant Card */}
      <Card className={`glass-card-intense border-primary/30 animate-slide-up magnetic-hover card-reflection ${aiActive ? 'animate-pulse-glow' : ''} ${getEmotionStyles(emotionState)}`}>
        <CardHeader className="pb-3">
          <CardTitle className={`text-xl font-bold ${darkMode ? 'text-primary' : 'text-indigo-600'} flex items-center gap-3`}>
            <div className={`relative ${aiActive ? 'animate-bounce-gentle' : ''}`}>
              <Brain className="w-8 h-8 animate-holographic" />
              {aiActive && (
                <div className="absolute -top-1 -right-1">
                  <Eye className={`w-4 h-4 ${darkMode ? 'text-accent' : 'text-emerald-500'} animate-pulse`} />
                </div>
              )}
            </div>
            <span className={`${darkMode ? 'gradient-text' : 'text-indigo-600'} font-poppins`}>AI Financial Assistant</span>
            {aiActive && <Zap className="w-5 h-5 text-fintech-neon-yellow animate-pulse" />}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-slate-800'} mb-2`}>
                You spent ₹
                <span className={`${darkMode ? 'gradient-text' : 'text-indigo-600'} animate-neon-flicker counter-animation`}>
                  {spentAmount.toLocaleString()}
                </span> today
              </p>
              <p className={`${darkMode ? 'text-emerald-400' : 'text-emerald-600'} font-medium text-lg animate-slide-up`}>
                Great spending control! 🎉
              </p>
            </div>
            <div className={`bg-gradient-to-r ${getEmotionStyles(emotionState)} p-4 rounded-xl border transition-all duration-500 magnetic-hover`}>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-slate-600'}`}>
                <span className="text-2xl mr-2">🤖</span>
                <span className={`${darkMode ? 'text-primary' : 'text-indigo-600'} font-medium`}>AI Insight:</span> 
                {mockSuggestions[0].suggestion_text}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Spending Chart */}
      <Card className="glass-card border-white/20 animate-slide-up magnetic-hover card-reflection" style={{ animationDelay: '0.1s' }}>
        <CardHeader>
          <CardTitle className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-800'} flex items-center gap-2`}>
            <TrendingUp className={`w-6 h-6 ${darkMode ? 'text-accent' : 'text-emerald-500'} animate-bounce-gentle`} />
            This Month's Spending Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {spendingData.map((item, index) => (
              <div 
                key={item.category} 
                className="flex items-center justify-between animate-stagger-left motion-blur magnetic-hover ripple-effect"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl animate-bounce-gentle" style={{ animationDelay: `${index * 0.2}s` }}>
                    {item.icon}
                  </span>
                  <span className={`${darkMode ? 'text-white' : 'text-slate-700'} font-medium`}>{item.category}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-28 relative">
                    <Progress 
                      value={item.percentage} 
                      className={`h-3 ${darkMode ? 'bg-white/10' : 'bg-slate-200'}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse opacity-60"></div>
                  </div>
                  <span className={`${darkMode ? 'text-white gradient-text' : 'text-slate-700'} font-bold text-right w-20`}>₹{item.amount.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Goals Progress */}
      <Card className="glass-card border-white/20 animate-slide-up magnetic-hover card-reflection" style={{ animationDelay: '0.2s' }}>
        <CardHeader>
          <CardTitle className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-800'} flex items-center gap-2`}>
            <Target className={`w-6 h-6 ${darkMode ? 'text-fintech-lime' : 'text-emerald-500'} animate-pulse-glow`} />
            Savings Goals Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockGoals.map((goal, index) => (
              <div key={goal.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className={`${darkMode ? 'text-white' : 'text-slate-700'} font-medium`}>{goal.goal_title}</span>
                  <span className={`${darkMode ? 'text-primary' : 'text-indigo-600'} font-bold`}>
                    ₹{goal.saved_amount.toLocaleString()} / ₹{goal.target_amount.toLocaleString()}
                  </span>
                </div>
                <Progress 
                  value={(goal.saved_amount / goal.target_amount) * 100} 
                  className={`h-2 ${darkMode ? 'bg-white/10' : 'bg-slate-200'}`}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-20 right-4 flex flex-col gap-4">
        <Button
          onClick={() => setIsVoiceModalOpen(true)}
          className={`w-16 h-16 rounded-full bg-gradient-to-r ${darkMode ? 'from-purple-500 via-pink-500 to-purple-600' : 'from-purple-400 via-pink-400 to-purple-500'} hover:scale-110 shadow-2xl magnetic-hover magnetic-glow animate-bounce-gentle ripple-effect`}
        >
          <Mic className="w-7 h-7 text-white" />
        </Button>
        
        <Button
          onClick={() => setIsExpenseModalOpen(true)}
          className={`w-18 h-18 rounded-full bg-gradient-to-r ${darkMode ? 'from-primary via-accent to-fintech-lime text-black' : 'from-indigo-500 via-blue-500 to-emerald-500 text-white'} hover:scale-110 shadow-2xl magnetic-glow animate-bounce-gentle magnetic-hover ripple-effect brutal-shadow`}
        >
          <PlusCircle className="w-8 h-8" />
        </Button>
      </div>

      {/* Background Particle Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 ${darkMode ? 'bg-primary' : 'bg-emerald-400'} rounded-full opacity-30 animate-float-coins`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
