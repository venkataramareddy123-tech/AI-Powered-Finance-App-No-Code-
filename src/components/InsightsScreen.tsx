
import React from 'react';
import { TrendingUp, Calendar, MessageCircle, Brain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const InsightsScreen = () => {
  const insights = [
    {
      icon: '📊',
      title: 'Spending Pattern Alert',
      description: 'You spend 40% more on weekends. Try planning activities that cost less.',
      impact: 'Could save ₹1,200/month',
      priority: 'high'
    },
    {
      icon: '🏃‍♂️',
      title: 'Unused Gym Membership',
      description: 'Your gym membership (₹1,000/month) has been unused for 30 days.',
      impact: 'Potential savings: ₹12,000/year',
      priority: 'high'
    },
    {
      icon: '☕',
      title: 'Coffee Spending Trend',
      description: 'Daily coffee purchases increased by 25% this month. Consider brewing at home.',
      impact: 'Could save ₹800/month',
      priority: 'medium'
    },
    {
      icon: '🚖',
      title: 'Transport Optimization',
      description: 'Taking metro instead of Uber for work could reduce transport costs.',
      impact: 'Could save ₹2,400/month',
      priority: 'medium'
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500/20 bg-red-500/10 text-red-400';
      case 'medium': return 'border-yellow-500/20 bg-yellow-500/10 text-yellow-400';
      case 'low': return 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400';
      default: return 'border-gray-500/20 bg-gray-500/10 text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-fintech-gradient p-4 space-y-6 pb-20">
      {/* Calendar Heatmap */}
      <Card className="glass-card border-primary/20 animate-slide-up">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-primary" />
            Spending Heatmap
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
              <div key={day} className="text-center text-gray-400 text-sm font-medium">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 28 }, (_, i) => {
              const intensity = Math.random();
              return (
                <div
                  key={i}
                  className={`w-8 h-8 rounded flex items-center justify-center text-xs font-medium ${
                    intensity > 0.7 ? 'bg-red-500 text-white' :
                    intensity > 0.4 ? 'bg-yellow-500 text-white' :
                    intensity > 0.2 ? 'bg-emerald-500 text-white' :
                    'bg-white/10 text-gray-400'
                  }`}
                >
                  {i + 1}
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-between mt-4 text-sm">
            <span className="text-gray-400">Less spending</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-white/10 rounded"></div>
              <div className="w-3 h-3 bg-emerald-500 rounded"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <div className="w-3 h-3 bg-red-500 rounded"></div>
            </div>
            <span className="text-gray-400">More spending</span>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card className="glass-card border-primary/20 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
            <Brain className="w-6 h-6 text-primary" />
            AI Insights & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <div
                key={index}
                className={`glass-card p-4 rounded-xl border animate-slide-up hover:scale-[1.02] transition-transform ${getPriorityColor(insight.priority)}`}
                style={{ animationDelay: `${(index + 2) * 0.1}s` }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{insight.icon}</span>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-white font-medium">{insight.title}</h3>
                    <p className="text-gray-300 text-sm">{insight.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-400 text-sm font-medium">{insight.impact}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(insight.priority)}`}>
                        {insight.priority.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Chatbot CTA */}
      <Card className="glass-card border-primary/20 animate-slide-up" style={{ animationDelay: '0.6s' }}>
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
              <MessageCircle className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Ask FinBot 🤖</h3>
              <p className="text-gray-400 text-sm">Get personalized financial advice instantly</p>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300">
                "How much did I spend on travel?"
              </span>
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300">
                "Suggest ways to save ₹500"
              </span>
            </div>
            <Button className="bg-neon-glow hover:bg-primary text-black font-bold px-6 py-2 rounded-xl neon-glow">
              Start Chatting
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsightsScreen;
