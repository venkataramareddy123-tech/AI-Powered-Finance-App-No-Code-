
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import AuthScreen from '@/components/AuthScreen';
import Welcome from '@/components/Welcome';
import Dashboard from '@/components/Dashboard';
import TransactionHistory from '@/components/TransactionHistory';
import BudgetScreen from '@/components/BudgetScreen';
import InsightsScreen from '@/components/InsightsScreen';
import ProfileScreen from '@/components/ProfileScreen';
import Navigation from '@/components/Navigation';
import { Skeleton } from '@/components/ui/skeleton';

const Index = () => {
  const { user, loading } = useAuth();
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeTab, setActiveTab] = useState('home');

  const handleGetStarted = () => {
    setShowWelcome(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-fintech-gradient flex items-center justify-center">
        <div className="space-y-4 w-full max-w-md p-4">
          <Skeleton className="h-8 w-full bg-white/10" />
          <Skeleton className="h-32 w-full bg-white/10" />
          <Skeleton className="h-8 w-3/4 bg-white/10" />
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthScreen />;
  }

  if (showWelcome) {
    return <Welcome onGetStarted={handleGetStarted} />;
  }

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <Dashboard />;
      case 'transactions':
        return <TransactionHistory />;
      case 'budget':
        return <BudgetScreen />;
      case 'insights':
        return <InsightsScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-fintech-navy">
      {renderScreen()}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
