
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface MockScreenProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  features: string[];
}

const MockScreen: React.FC<MockScreenProps> = ({ title, icon, description, features }) => {
  return (
    <div className="min-h-screen bg-fintech-gradient p-4 space-y-6 pb-20">
      {/* Header */}
      <Card className="glass-card border-primary/20 animate-slide-up">
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
            {icon}
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
          <p className="text-gray-400">{description}</p>
        </CardContent>
      </Card>

      {/* Features */}
      <Card className="glass-card border-white/20 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <CardHeader>
          <CardTitle className="text-lg font-bold text-white">Coming Soon</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="glass-card p-3 rounded-lg flex items-center gap-3 animate-slide-up"
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-white">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Mock Data Visualization */}
      <Card className="glass-card border-white/20 animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="glass-card p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-primary">₹12,500</div>
              <div className="text-sm text-gray-400">This Month</div>
            </div>
            <div className="glass-card p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-fintech-lime">₹8,750</div>
              <div className="text-sm text-gray-400">Last Month</div>
            </div>
          </div>
          
          {/* Mock Chart Area */}
          <div className="glass-card p-4 rounded-lg h-32 flex items-center justify-center">
            <div className="text-gray-400 text-center">
              <div className="w-12 h-12 border-2 border-primary/30 rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-sm">Interactive charts coming soon</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Button */}
      <Card className="glass-card border-white/20 animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <CardContent className="p-6 text-center">
          <Button 
            onClick={() => console.log(`${title} action clicked`)}
            className="bg-primary hover:bg-primary/80 text-white font-bold px-8 py-3 rounded-xl transition-all duration-200 hover:scale-105"
          >
            Explore {title}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default MockScreen;
