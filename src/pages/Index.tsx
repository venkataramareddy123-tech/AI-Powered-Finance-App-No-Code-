import { AuthProvider, useAuth } from '@/hooks/useAuth';
import AuthScreen from '@/components/AuthScreen';
import OnboardingFlow from '@/components/OnboardingFlow';
import Dashboard from '@/components/Dashboard';
import TransactionHistory from '@/components/TransactionHistory';
import BudgetScreen from '@/components/BudgetScreen';
import InsightsScreen from '@/components/InsightsScreen';
import ProfileScreen from '@/components/ProfileScreen';
import Navigation from '@/components/Navigation';
import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const AppContent = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [checkingOnboarding, setCheckingOnboarding] = useState(true);

  // Check if user needs onboarding
  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (!user) {
        setCheckingOnboarding(false);
        return;
      }

      try {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('onboarding_completed, budget_allocations, monthly_income')
          .eq('id', user.id)
          .single();

        if (error) {
          console.log('Profile check error:', error);
          setShowOnboarding(true);
        } else {
          setShowOnboarding(!profile?.onboarding_completed);
        }
      } catch (error) {
        console.log('Onboarding check error:', error);
        setShowOnboarding(true);
      } finally {
        setCheckingOnboarding(false);
      }
    };

    if (user && !loading) {
      checkOnboardingStatus();
    } else if (!loading) {
      setCheckingOnboarding(false);
    }
  }, [user, loading]);

  if (loading || checkingOnboarding) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-900 via-purple-900 to-fuchsia-900 flex items-center justify-center">
        <div className="animate-spin">
          <Loader2 className="w-8 h-8 text-emerald-400" />
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthScreen />;
  }

  if (showOnboarding) {
    return <OnboardingFlow onComplete={() => setShowOnboarding(false)} />;
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
