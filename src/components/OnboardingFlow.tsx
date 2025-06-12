
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, CreditCard, Target, DollarSign, Car, Home, Building, ShoppingBag, Coffee, Calendar, ChevronRight, Skip } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface OnboardingData {
  profilePicture?: string;
  monthlyIncome: string;
  budgetAllocations: {
    rent: string;
    food: string;
    transport: string;
    emi: string;
    entertainment: string;
    savings: string;
  };
  financialGoals: string;
  cardDetails: {
    hasCards: boolean;
    cardCount: string;
  };
}

interface OnboardingFlowProps {
  onComplete: () => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    monthlyIncome: '',
    budgetAllocations: {
      rent: '',
      food: '',
      transport: '',
      emi: '',
      entertainment: '',
      savings: '',
    },
    financialGoals: '',
    cardDetails: {
      hasCards: false,
      cardCount: '',
    },
  });

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const steps = [
    { 
      title: "Welcome to FinTracker!", 
      subtitle: "Let's personalize your financial journey",
      icon: <Target className="w-8 h-8" />
    },
    { 
      title: "Monthly Income", 
      subtitle: "Help us understand your earning capacity",
      icon: <DollarSign className="w-8 h-8" />
    },
    { 
      title: "Budget Allocation", 
      subtitle: "Set smart spending limits for each category",
      icon: <Building className="w-8 h-8" />
    },
    { 
      title: "Payment Methods", 
      subtitle: "Connect your cards for better tracking",
      icon: <CreditCard className="w-8 h-8" />
    },
    { 
      title: "Financial Goals", 
      subtitle: "What are you saving for?",
      icon: <Target className="w-8 h-8" />
    },
  ];

  const budgetCategories = [
    { key: 'rent', label: 'Rent/Housing', icon: <Home className="w-5 h-5" />, color: 'text-blue-400' },
    { key: 'food', label: 'Food & Dining', icon: <Coffee className="w-5 h-5" />, color: 'text-orange-400' },
    { key: 'transport', label: 'Transportation', icon: <Car className="w-5 h-5" />, color: 'text-purple-400' },
    { key: 'emi', label: 'EMI/Loans', icon: <Building className="w-5 h-5" />, color: 'text-red-400' },
    { key: 'entertainment', label: 'Entertainment', icon: <ShoppingBag className="w-5 h-5" />, color: 'text-pink-400' },
    { key: 'savings', label: 'Savings', icon: <Target className="w-5 h-5" />, color: 'text-emerald-400' },
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = async () => {
    try {
      // Save onboarding data to user profile
      const { error } = await supabase
        .from('profiles')
        .update({
          onboarding_completed: true,
          monthly_income: data.monthlyIncome ? parseFloat(data.monthlyIncome) : null,
          budget_allocations: data.budgetAllocations,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user?.id);

      if (error) throw error;

      toast({
        title: "Welcome aboard! 🎉",
        description: "Your financial journey starts now!",
      });

      onComplete();
    } catch (error: any) {
      toast({
        title: "Setup incomplete",
        description: "Don't worry, you can complete this later in settings.",
      });
      onComplete();
    }
  };

  const updateBudgetAllocation = (category: string, value: string) => {
    setData(prev => ({
      ...prev,
      budgetAllocations: {
        ...prev.budgetAllocations,
        [category]: value,
      },
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="text-center space-y-6 py-8">
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-emerald-400 via-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
              <Target className="w-12 h-12 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
                Welcome to FinTracker!
              </h2>
              <p className="text-xl text-gray-300 mb-6">
                Your AI-powered financial companion
              </p>
              <p className="text-gray-400 max-w-md mx-auto">
                Let's set up your profile in just a few steps. Don't worry - you can always update these details later or skip any step.
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <DollarSign className="w-16 h-16 mx-auto mb-4 text-emerald-400" />
              <h3 className="text-2xl font-bold text-white mb-2">Monthly Income</h3>
              <p className="text-gray-400">This helps us suggest better budget allocations</p>
            </div>
            
            <div className="space-y-4">
              <Label htmlFor="income" className="text-white text-lg">Monthly Income (₹)</Label>
              <Input
                id="income"
                type="number"
                placeholder="Enter your monthly income"
                value={data.monthlyIncome}
                onChange={(e) => setData(prev => ({ ...prev, monthlyIncome: e.target.value }))}
                className="text-xl h-14 bg-white/10 border-emerald-400/30 text-white placeholder:text-gray-400 focus:border-emerald-400 focus:ring-emerald-400"
              />
              <p className="text-sm text-gray-500">This information is private and secure</p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Building className="w-16 h-16 mx-auto mb-4 text-blue-400" />
              <h3 className="text-2xl font-bold text-white mb-2">Budget Allocation</h3>
              <p className="text-gray-400">Set spending limits for each category</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {budgetCategories.map((category) => (
                <div key={category.key} className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`${category.color}`}>
                      {category.icon}
                    </div>
                    <Label className="text-white font-medium">{category.label}</Label>
                  </div>
                  <Input
                    type="number"
                    placeholder="₹ 0"
                    value={data.budgetAllocations[category.key as keyof typeof data.budgetAllocations]}
                    onChange={(e) => updateBudgetAllocation(category.key, e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
              ))}
            </div>
            
            {data.monthlyIncome && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4">
                <p className="text-emerald-400 text-sm">
                  💡 Tip: Follow the 50/30/20 rule - 50% needs, 30% wants, 20% savings
                </p>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <CreditCard className="w-16 h-16 mx-auto mb-4 text-purple-400" />
              <h3 className="text-2xl font-bold text-white mb-2">Payment Methods</h3>
              <p className="text-gray-400">Connect your cards for automatic expense tracking</p>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-white font-medium">Do you have credit/debit cards?</h4>
                </div>
                
                <div className="flex gap-4">
                  <Button
                    variant={data.cardDetails.hasCards ? "default" : "outline"}
                    onClick={() => setData(prev => ({ 
                      ...prev, 
                      cardDetails: { ...prev.cardDetails, hasCards: true } 
                    }))}
                    className="flex-1"
                  >
                    Yes
                  </Button>
                  <Button
                    variant={!data.cardDetails.hasCards ? "default" : "outline"}
                    onClick={() => setData(prev => ({ 
                      ...prev, 
                      cardDetails: { ...prev.cardDetails, hasCards: false } 
                    }))}
                    className="flex-1"
                  >
                    No
                  </Button>
                </div>
              </div>

              {data.cardDetails.hasCards && (
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <Label htmlFor="cardCount" className="text-white mb-3 block">How many cards do you use regularly?</Label>
                  <Input
                    id="cardCount"
                    type="number"
                    placeholder="Number of cards"
                    value={data.cardDetails.cardCount}
                    onChange={(e) => setData(prev => ({ 
                      ...prev, 
                      cardDetails: { ...prev.cardDetails, cardCount: e.target.value } 
                    }))}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
              )}

              <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
                <p className="text-blue-400 text-sm">
                  🔒 We use bank-level security. Card linking will be available soon!
                </p>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Target className="w-16 h-16 mx-auto mb-4 text-pink-400" />
              <h3 className="text-2xl font-bold text-white mb-2">Financial Goals</h3>
              <p className="text-gray-400">What are you working towards?</p>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { goal: 'Emergency Fund', emoji: '🚨' },
                  { goal: 'Vacation', emoji: '✈️' },
                  { goal: 'New Car', emoji: '🚗' },
                  { goal: 'House Down Payment', emoji: '🏠' },
                  { goal: 'Investment', emoji: '📈' },
                  { goal: 'Education', emoji: '🎓' },
                ].map((item) => (
                  <Button
                    key={item.goal}
                    variant={data.financialGoals === item.goal ? "default" : "outline"}
                    onClick={() => setData(prev => ({ ...prev, financialGoals: item.goal }))}
                    className="h-16 flex-col gap-2 text-sm"
                  >
                    <span className="text-xl">{item.emoji}</span>
                    {item.goal}
                  </Button>
                ))}
              </div>
              
              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <Label htmlFor="customGoal" className="text-white mb-3 block">Or enter a custom goal:</Label>
                <Input
                  id="customGoal"
                  placeholder="e.g., Wedding, Business, Gadget..."
                  value={data.financialGoals.startsWith('Emergency') || data.financialGoals.startsWith('Vacation') || data.financialGoals.startsWith('New Car') || data.financialGoals.startsWith('House') || data.financialGoals.startsWith('Investment') || data.financialGoals.startsWith('Education') ? '' : data.financialGoals}
                  onChange={(e) => setData(prev => ({ ...prev, financialGoals: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Animated background particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-emerald-400 rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <Card className="w-full max-w-2xl glass-card-intense border-emerald-500/30 animate-slide-up">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2">
              {[...Array(totalSteps)].map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    i < currentStep 
                      ? 'bg-emerald-400 shadow-lg shadow-emerald-400/50' 
                      : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
            <span className="text-emerald-400 font-medium text-sm">
              {currentStep} of {totalSteps}
            </span>
          </div>
          <Progress value={progress} className="h-2 bg-white/10" />
        </CardHeader>

        <CardContent className="space-y-8">
          {renderStepContent()}

          <div className="flex gap-4 pt-6">
            <Button
              variant="outline"
              onClick={handleSkip}
              className="flex-1 border-white/20 text-white hover:bg-white/10"
            >
              <Skip className="w-4 h-4 mr-2" />
              Skip
            </Button>
            <Button
              onClick={handleNext}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-bold shadow-lg shadow-emerald-500/25"
            >
              {currentStep === totalSteps ? 'Complete Setup' : 'Continue'}
              {currentStep < totalSteps && <ChevronRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingFlow;
