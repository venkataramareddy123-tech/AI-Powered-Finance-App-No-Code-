
import React, { useState } from 'react';
import Welcome from '@/components/Welcome';
import Dashboard from '@/components/Dashboard';
import TransactionHistory from '@/components/TransactionHistory';
import BudgetScreen from '@/components/BudgetScreen';
import InsightsScreen from '@/components/InsightsScreen';
import ProfileScreen from '@/components/ProfileScreen';
import Navigation from '@/components/Navigation';

const Index = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeTab, setActiveTab] = useState('home');

  const handleGetStarted = () => {
    setShowWelcome(false);
  };

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
