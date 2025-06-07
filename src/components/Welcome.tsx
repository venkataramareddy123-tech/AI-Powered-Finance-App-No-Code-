
import React from 'react';
import { ArrowRight, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WelcomeProps {
  onGetStarted: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-fintech-gradient flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full animate-bounce-gentle"></div>
        <div className="absolute top-40 right-16 w-12 h-12 bg-fintech-lime/30 rounded-full animate-bounce-gentle" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-32 left-20 w-16 h-16 bg-fintech-teal/25 rounded-full animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 right-12 w-8 h-8 bg-primary/40 rounded-full animate-bounce-gentle" style={{ animationDelay: '1.5s' }}></div>
      </div>

      {/* Logo Animation */}
      <div className="relative mb-8 animate-slide-up">
        <div className="w-32 h-32 bg-gradient-to-br from-primary to-fintech-lime rounded-3xl flex items-center justify-center shadow-2xl neon-glow">
          <Coins className="w-16 h-16 text-white animate-bounce-gentle" />
        </div>
      </div>

      {/* Main Content */}
      <div className="text-center space-y-6 max-w-md animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="space-y-3">
          <h1 className="text-5xl font-bold text-white leading-tight">
            Fin<span className="text-primary">Smart</span> AI
          </h1>
          <p className="text-xl text-fintech-lime font-medium">
            The AI that saves your money—daily.
          </p>
        </div>

        <div className="space-y-4 text-gray-300">
          <p className="text-lg">Track. Save. Grow.</p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              <span>AI-powered expense tracking</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-fintech-lime rounded-full"></span>
              <span>Smart budgeting & predictions</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-fintech-teal rounded-full"></span>
              <span>Automated savings goals</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-12 animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <Button
          onClick={onGetStarted}
          className="bg-neon-glow hover:bg-primary text-black font-bold text-lg px-8 py-4 rounded-2xl neon-glow transition-all duration-300 hover:scale-105 hover:shadow-2xl"
        >
          Get Started
          <ArrowRight className="w-6 h-6 ml-2" />
        </Button>
      </div>

      {/* Progress Dots */}
      <div className="absolute bottom-8 flex space-x-2 animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <div className="w-3 h-3 bg-primary rounded-full"></div>
        <div className="w-3 h-3 bg-white/30 rounded-full"></div>
        <div className="w-3 h-3 bg-white/30 rounded-full"></div>
      </div>

      {/* Floating coins animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute text-primary opacity-30 animate-bounce-gentle"
            style={{
              left: `${20 + (i * 15)}%`,
              top: `${30 + (i * 10)}%`,
              animationDelay: `${i * 0.3}s`,
              fontSize: `${1.5 + (i * 0.2)}rem`,
            }}
          >
            💰
          </div>
        ))}
      </div>
    </div>
  );
};

export default Welcome;
