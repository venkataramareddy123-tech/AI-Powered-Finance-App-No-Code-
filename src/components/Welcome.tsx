
import React, { useState, useEffect } from 'react';
import { ArrowRight, Coins, Sparkles, TrendingUp, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WelcomeProps {
  onGetStarted: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onGetStarted }) => {
  const [titleVisible, setTitleVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);

  useEffect(() => {
    const titleTimer = setTimeout(() => setTitleVisible(true), 500);
    const subtitleTimer = setTimeout(() => setSubtitleVisible(true), 2500);
    const ctaTimer = setTimeout(() => setCtaVisible(true), 4000);

    return () => {
      clearTimeout(titleTimer);
      clearTimeout(subtitleTimer);
      clearTimeout(ctaTimer);
    };
  }, []);

  const handleGetStarted = () => {
    // Add burst ripple effect
    const button = document.querySelector('.cta-button');
    button?.classList.add('animate-confetti-burst');
    
    setTimeout(() => {
      onGetStarted();
    }, 300);
  };

  return (
    <div className="min-h-screen bg-neubrutalist-bg particle-bg flex flex-col items-center justify-center p-6 relative overflow-hidden font-inter">
      {/* Dynamic Particle Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Finance Icons */}
        <div className="absolute top-20 left-10 w-12 h-12 opacity-20 animate-float-coins">
          <TrendingUp className="w-full h-full text-primary" />
        </div>
        <div className="absolute top-32 right-16 w-8 h-8 opacity-30 animate-float-coins" style={{ animationDelay: '1s' }}>
          <Coins className="w-full h-full text-fintech-lime" />
        </div>
        <div className="absolute bottom-40 left-20 w-10 h-10 opacity-25 animate-float-coins" style={{ animationDelay: '2s' }}>
          <Brain className="w-full h-full text-accent" />
        </div>
        <div className="absolute bottom-20 right-12 w-6 h-6 opacity-40 animate-float-coins" style={{ animationDelay: '0.5s' }}>
          <Sparkles className="w-full h-full text-fintech-neon-cyan" />
        </div>

        {/* Orbiting Elements */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative w-48 h-48">
            <div className="absolute inset-0 animate-orbit">
              <div className="w-4 h-4 bg-primary rounded-full neon-glow"></div>
            </div>
            <div className="absolute inset-0 animate-orbit" style={{ animationDelay: '2s', animationDuration: '8s' }}>
              <div className="w-3 h-3 bg-accent rounded-full neon-cyan"></div>
            </div>
            <div className="absolute inset-0 animate-orbit" style={{ animationDelay: '4s', animationDuration: '12s' }}>
              <div className="w-2 h-2 bg-fintech-lime rounded-full neon-glow"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Central Glassmorphic Card */}
      <div className="glass-card-intense p-8 rounded-3xl max-w-md w-full text-center relative z-10 tilt-hover animate-slide-up-spring">
        {/* AI Orb with Floating Coins */}
        <div className="relative mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-primary via-accent to-fintech-lime rounded-full flex items-center justify-center mx-auto shadow-2xl neon-glow animate-pulse-glow holographic">
            <div className="relative">
              <Coins className="w-16 h-16 text-white animate-bounce-gentle" />
              
              {/* Floating coins around the orb */}
              <div className="absolute -top-8 -left-8 animate-float-coins">
                <span className="text-2xl">💰</span>
              </div>
              <div className="absolute -top-6 right-4 animate-float-coins" style={{ animationDelay: '1s' }}>
                <span className="text-xl">🪙</span>
              </div>
              <div className="absolute bottom-2 -left-6 animate-float-coins" style={{ animationDelay: '2s' }}>
                <span className="text-lg">💎</span>
              </div>
            </div>
          </div>
        </div>

        {/* Typewriter Title */}
        <div className="space-y-4 mb-8">
          {titleVisible && (
            <h1 className={`text-5xl font-black leading-tight ${titleVisible ? 'animate-typewriter' : 'opacity-0'}`}>
              <span className="gradient-text font-poppins">Fin</span>
              <span className="text-white">Smart</span>
              <span className="gradient-text"> AI</span>
            </h1>
          )}
          
          {subtitleVisible && (
            <p className={`text-xl text-gray-300 font-medium ${subtitleVisible ? 'animate-letter-spacing' : 'opacity-0'}`}>
              Let's get you financially smarter
            </p>
          )}
        </div>

        {/* Feature Pills */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center justify-center gap-3 animate-slide-up" style={{ animationDelay: '3s' }}>
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse-glow"></div>
            <span className="text-sm text-gray-300">AI-powered expense tracking</span>
          </div>
          <div className="flex items-center justify-center gap-3 animate-slide-up" style={{ animationDelay: '3.2s' }}>
            <div className="w-2 h-2 bg-fintech-lime rounded-full animate-pulse-glow"></div>
            <span className="text-sm text-gray-300">Smart budgeting & predictions</span>
          </div>
          <div className="flex items-center justify-center gap-3 animate-slide-up" style={{ animationDelay: '3.4s' }}>
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse-glow"></div>
            <span className="text-sm text-gray-300">Automated savings goals</span>
          </div>
        </div>

        {/* Glowing CTA Button */}
        {ctaVisible && (
          <Button
            onClick={handleGetStarted}
            className="cta-button w-full bg-gradient-to-r from-primary via-accent to-fintech-lime hover:scale-105 text-black font-bold text-lg px-8 py-4 rounded-2xl neon-glow transition-all duration-300 ripple-effect brutal-shadow animate-slide-up-spring"
          >
            Get Started
            <ArrowRight className="w-6 h-6 ml-2 animate-bounce-gentle" />
          </Button>
        )}
      </div>

      {/* Progress Dots */}
      <div className="absolute bottom-8 flex space-x-3 animate-fade-in z-10" style={{ animationDelay: '4.5s' }}>
        <div className="w-3 h-3 bg-primary rounded-full animate-pulse-glow"></div>
        <div className="w-3 h-3 bg-white/30 rounded-full"></div>
        <div className="w-3 h-3 bg-white/30 rounded-full"></div>
      </div>

      {/* Ambient Effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none"></div>
    </div>
  );
};

export default Welcome;
