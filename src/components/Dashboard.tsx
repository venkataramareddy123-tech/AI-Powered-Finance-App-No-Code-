
import React, { useState, useEffect } from 'react';
import { PlusCircle, TrendingUp, AlertTriangle, Target, Mic, Brain, Zap, Eye, Sun, Moon, Calendar, Receipt, BarChart3 } from 'lucide-react';
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
  const [emotionState, setEmotionState] = useState('good'); // 'good', 'warning', 'alert'
  const [darkMode, setDarkMode] = useState(true);
  const [quickMenuOpen, setQuickMenuOpen] = useState(false);
  const [dailyCapsuleIndex, setDailyCapsuleIndex] = useState(0);

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

  const dailyCapsules = [
    { day: 'Today', category: 'Food', trend: '↓ 16%', tip: 'Great savings on lunch!', emoji: '😊', mood: 'happy' },
    { day: 'Yesterday', category: 'Transport', trend: '↑ 8%', tip: 'Consider carpooling', emoji: '🤔', mood: 'neutral' },
    { day: 'Tuesday', category: 'Shopping', trend: '↑ 25%', tip: 'Impulse buy alert!', emoji: '😅', mood: 'warning' },
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

  // Emotion state based on spending
  useEffect(() => {
    if (totalSpent > 1000) {
      setEmotionState('alert');
    } else if (totalSpent > 600) {
      setEmotionState('warning');
    } else {
      setEmotionState('good');
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

  const handleQuickMenuToggle = () => {
    setQuickMenuOpen(!quickMenuOpen);
  };

  return (
    <div className={`min-h-screen transition-all duration-700 ${darkMode ? 'bg-neubrutalist-bg' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50'} particle-bg p-4 space-y-6 pb-20 font-inter ${emotionState === 'good' ? 'particle-coins' : ''}`}>
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
                        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-slate-600'}`}>Top: {capsule.category} {capsule.trend}</p>
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

      {/* Holographic AI Assistant Card */}
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
              <p className={`${emotionState === 'good' ? (darkMode ? 'text-emerald-400' : 'text-emerald-600') : (darkMode ? 'text-yellow-400' : 'text-yellow-600')} font-medium text-lg animate-slide-up`}>
                {emotionState === 'good' ? "That's 16% less than usual! 🎉" : emotionState === 'warning' ? "Getting close to budget 🤔" : "Budget exceeded! Time to save 😅"}
              </p>
            </div>
            <div className={`bg-gradient-to-r ${getEmotionStyles(emotionState)} p-4 rounded-xl border transition-all duration-500 magnetic-hover`}>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-slate-600'}`}>
                <span className="text-2xl mr-2">🤖</span>
                <span className={`${darkMode ? 'text-primary' : 'text-indigo-600'} font-medium`}>AI Insight:</span> 
                {emotionState === 'good' && " Looking good, genius! You're on track to save ₹2,400 this month!"}
                {emotionState === 'warning' && " Time to ease up a bit 😉 Consider reducing food expenses by 10%."}
                {emotionState === 'alert' && " Whoa there! High spending detected. Let's review your budget together."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Animated Spending Chart */}
      <Card className="glass-card border-white/20 animate-slide-up magnetic-hover card-reflection" style={{ animationDelay: '0.1s' }}>
        <CardHeader>
          <CardTitle className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-800'} flex items-center gap-2`}>
            <TrendingUp className={`w-6 h-6 ${darkMode ? 'text-accent' : 'text-emerald-500'} animate-bounce-gentle`} />
            Today's Spending Breakdown
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
                  <span className={`${darkMode ? 'text-white gradient-text' : 'text-slate-700'} font-bold text-right w-20`}>₹{item.amount}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Interactive Upcoming Payments */}
      <Card className="glass-card border-white/20 animate-slide-up magnetic-hover card-reflection" style={{ animationDelay: '0.2s' }}>
        <CardHeader>
          <CardTitle className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-800'} flex items-center gap-2`}>
            <Target className={`w-6 h-6 ${darkMode ? 'text-fintech-lime' : 'text-emerald-500'} animate-pulse-glow`} />
            Upcoming Payments
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {upcomingPayments.map((payment, index) => (
              <div 
                key={payment.name} 
                className="glass-card p-4 rounded-xl min-w-[140px] magnetic-hover transition-all duration-300 hover:magnetic-glow animate-slide-up ripple-effect card-reflection"
                style={{ animationDelay: `${(index + 3) * 0.1}s` }}
              >
                <div className="text-center space-y-2">
                  <span className="text-2xl animate-bounce-gentle" style={{ animationDelay: `${index * 0.3}s` }}>
                    {payment.icon}
                  </span>
                  <p className={`${darkMode ? 'text-white' : 'text-slate-700'} font-medium text-sm`}>{payment.name}</p>
                  <p className={`${darkMode ? 'text-primary' : 'text-indigo-600'} font-bold animate-pulse-glow`}>₹{payment.amount.toLocaleString()}</p>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-slate-500'} text-xs`}>{payment.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Smart Alerts with Dynamic Colors */}
      <Card className={`glass-card ${emotionState === 'alert' ? 'border-red-500/20' : 'border-yellow-500/20'} animate-slide-up magnetic-hover card-reflection`} style={{ animationDelay: '0.3s' }}>
        <CardHeader>
          <CardTitle className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-slate-800'} flex items-center gap-2`}>
            <AlertTriangle className="w-5 h-5 text-yellow-500 animate-pulse" />
            Smart Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className={`bg-gradient-to-r ${darkMode ? 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/30' : 'from-yellow-100 to-yellow-50 border-yellow-200'} p-4 rounded-xl border animate-slide-up magnetic-hover ripple-effect`}>
              <p className={`text-sm ${darkMode ? 'text-yellow-300' : 'text-yellow-700'}`}>
                <span className="text-xl mr-2">🎯</span>
                <span className="font-medium">Budget Alert:</span> You've used 78% of your food budget
              </p>
            </div>
            <div className={`bg-gradient-to-r ${darkMode ? 'from-red-500/20 to-red-600/10 border-red-500/30' : 'from-red-100 to-red-50 border-red-200'} p-4 rounded-xl border animate-slide-up magnetic-hover ripple-effect`} style={{ animationDelay: '0.1s' }}>
              <p className={`text-sm ${darkMode ? 'text-red-300' : 'text-red-700'}`}>
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
          className={`w-16 h-16 rounded-full bg-gradient-to-r ${darkMode ? 'from-purple-500 via-pink-500 to-purple-600' : 'from-purple-400 via-pink-400 to-purple-500'} hover:scale-110 shadow-2xl magnetic-hover magnetic-glow animate-bounce-gentle ripple-effect`}
        >
          <Mic className="w-7 h-7 text-white" />
          <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${darkMode ? 'from-purple-400 to-pink-400' : 'from-purple-300 to-pink-300'} opacity-30 animate-pulse`}></div>
        </Button>
        
        <Button
          onClick={() => setIsExpenseModalOpen(true)}
          className={`w-18 h-18 rounded-full bg-gradient-to-r ${darkMode ? 'from-primary via-accent to-fintech-lime text-black' : 'from-indigo-500 via-blue-500 to-emerald-500 text-white'} hover:scale-110 shadow-2xl magnetic-glow animate-bounce-gentle magnetic-hover ripple-effect brutal-shadow`}
        >
          <PlusCircle className="w-8 h-8" />
          <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${darkMode ? 'from-primary to-accent' : 'from-indigo-400 to-emerald-400'} opacity-40 animate-pulse`}></div>
        </Button>
      </div>

      {/* Quick Access Radial Menu */}
      {quickMenuOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in" onClick={handleQuickMenuToggle}>
          <div className="absolute bottom-32 right-4 animate-radial-reveal">
            <div className="relative">
              <Button className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-green-500 magnetic-hover ripple-effect">
                <Receipt className="w-6 h-6 text-white" />
              </Button>
              <Button className="absolute -top-16 -left-16 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 magnetic-hover ripple-effect">
                <Calendar className="w-6 h-6 text-white" />
              </Button>
              <Button className="absolute -top-16 -right-16 w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 magnetic-hover ripple-effect">
                <BarChart3 className="w-6 h-6 text-white" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Background Particle Effects with Emotion State */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(emotionState === 'good' ? 30 : 10)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 ${
              emotionState === 'good' 
                ? (darkMode ? 'bg-primary' : 'bg-emerald-400') 
                : emotionState === 'alert' 
                ? (darkMode ? 'bg-red-400' : 'bg-red-300')
                : (darkMode ? 'bg-yellow-400' : 'bg-yellow-300')
            } rounded-full opacity-30 animate-float-coins`}
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
