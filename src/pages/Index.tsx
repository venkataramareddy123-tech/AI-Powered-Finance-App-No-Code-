
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import AuthScreen from '@/components/AuthScreen';
import Dashboard from '@/components/Dashboard';
import TransactionHistory from '@/components/TransactionHistory';
import BudgetScreen from '@/components/BudgetScreen';
import InsightsScreen from '@/components/InsightsScreen';
import ProfileScreen from '@/components/ProfileScreen';
import Navigation from '@/components/Navigation';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

const AppContent = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen bg-fintech-gradient flex items-center justify-center">
        <div className="animate-spin">
          <Loader2 className="w-8 h-8 text-primary" />
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthScreen />;
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
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
    <div className="min-h-screen">
      {renderActiveTab()}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default Index;
