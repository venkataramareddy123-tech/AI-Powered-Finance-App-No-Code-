
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { 
  Target, 
  Save, 
  X,
  DollarSign
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import { toast } from '@/hooks/use-toast';

interface BudgetEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const BudgetEditor: React.FC<BudgetEditorProps> = ({ isOpen, onClose, onSave }) => {
  const { user } = useAuth();
  const { profile, updateProfile } = useProfile();
  const [budgetData, setBudgetData] = useState({
    monthlyIncome: 0,
    food: 5000,
    transport: 3000,
    entertainment: 4000,
    rent: 3500,
    utilities: 2000,
    healthcare: 2500,
    shopping: 3000,
    other: 2000
  });

  useEffect(() => {
    if (profile) {
      setBudgetData({
        monthlyIncome: profile.monthly_income || 0,
        food: profile.budget_allocations?.food || 5000,
        transport: profile.budget_allocations?.transport || 3000,
        entertainment: profile.budget_allocations?.entertainment || 4000,
        rent: profile.budget_allocations?.rent || 3500,
        utilities: profile.budget_allocations?.utilities || 2000,
        healthcare: profile.budget_allocations?.healthcare || 2500,
        shopping: profile.budget_allocations?.shopping || 3000,
        other: profile.budget_allocations?.other || 2000
      });
    }
  }, [profile]);

  const budgetCategories = [
    { key: 'food', name: 'Food & Dining', icon: '🍕', color: 'bg-orange-500' },
    { key: 'transport', name: 'Transport', icon: '🚗', color: 'bg-purple-500' },
    { key: 'entertainment', name: 'Entertainment', icon: '🎬', color: 'bg-pink-500' },
    { key: 'rent', name: 'Rent & Housing', icon: '🏠', color: 'bg-blue-500' },
    { key: 'utilities', name: 'Utilities', icon: '💡', color: 'bg-yellow-500' },
    { key: 'healthcare', name: 'Healthcare', icon: '🏥', color: 'bg-red-500' },
    { key: 'shopping', name: 'Shopping', icon: '🛍️', color: 'bg-green-500' },
    { key: 'other', name: 'Other', icon: '📦', color: 'bg-gray-500' }
  ];

  const totalBudget = budgetCategories.reduce((sum, category) => sum + budgetData[category.key as keyof typeof budgetData], 0);
  const remainingIncome = budgetData.monthlyIncome - totalBudget;

  const handleSave = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "User not authenticated",
        variant: "destructive"
      });
      return;
    }

    const budget_allocations = {
      food: budgetData.food,
      transport: budgetData.transport,
      entertainment: budgetData.entertainment,
      rent: budgetData.rent,
      utilities: budgetData.utilities,
      healthcare: budgetData.healthcare,
      shopping: budgetData.shopping,
      other: budgetData.other
    };

    const { error } = await updateProfile({
      monthly_income: budgetData.monthlyIncome,
      budget_allocations: budget_allocations,
      updated_at: new Date().toISOString()
    });

    if (!error) {
      toast({
        title: "Budget updated successfully",
        description: "Your budget allocations have been saved"
      });
      onSave();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="glass-card border-white/20 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
              <Target className="w-5 h-5" />
              Edit Budget
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Monthly Income */}
          <div className="space-y-3">
            <Label className="text-white font-medium flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Monthly Income
            </Label>
            <Input
              type="number"
              value={budgetData.monthlyIncome}
              onChange={(e) => setBudgetData(prev => ({ ...prev, monthlyIncome: parseFloat(e.target.value) || 0 }))}
              placeholder="Enter your monthly income"
              className="bg-white/10 border-white/20 text-white"
            />
          </div>

          <Separator className="bg-white/20" />

          {/* Budget Summary */}
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white">Total Allocated:</span>
              <span className="text-white font-bold">₹{totalBudget.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white">Remaining:</span>
              <span className={`font-bold ${remainingIncome >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                ₹{remainingIncome.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Budget Categories */}
          <div className="space-y-4">
            {budgetCategories.map((category) => (
              <div key={category.key} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{category.icon}</span>
                    <Label className="text-white">{category.name}</Label>
                  </div>
                  <span className="text-emerald-400 font-medium">
                    ₹{budgetData[category.key as keyof typeof budgetData].toLocaleString()}
                  </span>
                </div>
                <Slider
                  value={[budgetData[category.key as keyof typeof budgetData]]}
                  onValueChange={(value) => setBudgetData(prev => ({ ...prev, [category.key]: value[0] }))}
                  max={Math.min(20000, budgetData.monthlyIncome)}
                  min={0}
                  step={500}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-400">
                  <span>₹0</span>
                  <span>₹{Math.min(20000, budgetData.monthlyIncome).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>

          <Separator className="bg-white/20" />

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 border-white/20 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Budget
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetEditor;
