
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import AuthScreen from '@/components/AuthScreen';
import Welcome from '@/components/Welcome';
import Dashboard from '@/components/Dashboard';
import TransactionHistory from '@/components/TransactionHistory';
import BudgetScreen from '@/components/BudgetScreen';
import InsightsScreen from '@/components/InsightsScreen';
import ProfileScreen from '@/components/ProfileScreen';
import MockScreen from '@/components/MockScreen';
import Navigation from '@/components/Navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { Receipt, Target, TrendingUp, Home, User, Brain } from 'lucide-react';

const Index = () => {
  const { user, loading } = useAuth();
  const [showWelcome, setShowWelcome] = useState(false); // Set to false to skip welcome for testing
  const [activeTab, setActiveTab] = useState('home');

  const handleGetStarted = () => {
    setShowWelcome(false);
  };

  const handleTabChange = (tab: string) => {
    console.log(`Navigating to tab: ${tab}`);
    setActiveTab(tab);
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

  // For demo purposes, show content even without user
  const shouldShowContent = true; // user || true for demo

  if (!shouldShowContent) {
    return <AuthScreen />;
  }

  if (showWelcome) {
    return <Welcome onGetStarted={handleGetStarted} />;
  }

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        try {
          return <Dashboard />;
        } catch (error) {
          console.log('Dashboard not available, showing mock');
          return (
            <MockScreen
              title="Dashboard"
              icon={<Home className="w-8 h-8 text-primary" />}
              description="Your financial overview at a glance"
              features={[
                "Total balance and spending summary",
                "Recent transactions overview",
                "Smart insights and recommendations",
                "Quick actions for common tasks"
              ]}
            />
          );
        }
      case 'transactions':
        try {
          return <TransactionHistory />;
        } catch (error) {
          console.log('Transactions not available, showing mock');
          return (
            <MockScreen
              title="Transactions"
              icon={<Receipt className="w-8 h-8 text-primary" />}
              description="Track and categorize all your expenses"
              features={[
                "Real-time transaction sync",
                "Smart categorization",
                "Search and filter options",
                "Export transaction history"
              ]}
            />
          );
        }
      case 'budget':
        try {
          return <BudgetScreen />;
        } catch (error) {
          console.log('Budget not available, showing mock');
          return (
            <MockScreen
              title="Budget"
              icon={<Target className="w-8 h-8 text-primary" />}
              description="Set and track your spending goals"
              features={[
                "Category-wise budget limits",
                "Progress tracking",
                "Overspending alerts",
                "Budget recommendations"
              ]}
            />
          );
        }
      case 'insights':
        try {
          return <InsightsScreen />;
        } catch (error) {
          console.log('Insights not available, showing mock');
          return (
            <MockScreen
              title="Insights"
              icon={<TrendingUp className="w-8 h-8 text-primary" />}
              description="AI-powered financial insights"
              features={[
                "Spending pattern analysis",
                "Personalized recommendations",
                "Savings opportunities",
                "Financial health score"
              ]}
            />
          );
        }
      case 'profile':
        return <ProfileScreen />;
      default:
        return (
          <MockScreen
            title="Feature"
            icon={<Brain className="w-8 h-8 text-primary" />}
            description="This feature is coming soon"
            features={[
              "Advanced functionality",
              "Enhanced user experience", 
              "Smart automation",
              "Secure data handling"
            ]}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-fintech-navy">
      {renderScreen()}
      <Navigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default Index;
