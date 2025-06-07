
import React, { useState } from 'react';
import { X, CreditCard, Smartphone, Banknote } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useExpenses } from '@/hooks/useExpenses';
import { toast } from '@/components/ui/use-toast';

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExpenseModal: React.FC<ExpenseModalProps> = ({ isOpen, onClose }) => {
  const { addExpense } = useExpenses();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    is_recurring: false,
    is_necessary: true,
    date: new Date().toISOString().split('T')[0]
  });

  const categories = [
    { value: 'food', label: 'Food & Dining', icon: '🍕' },
    { value: 'transport', label: 'Transport', icon: '🚗' },
    { value: 'shopping', label: 'Shopping', icon: '🛍️' },
    { value: 'bills', label: 'Bills & Utilities', icon: '💡' },
    { value: 'entertainment', label: 'Entertainment', icon: '🎬' },
    { value: 'health', label: 'Health & Fitness', icon: '💊' },
  ];

  const handleSave = async () => {
    if (!formData.amount || !formData.category) {
      toast({
        title: "Please fill required fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    const { error } = await addExpense({
      amount: parseFloat(formData.amount),
      category: formData.category,
      description: formData.description,
      is_recurring: formData.is_recurring,
      is_necessary: formData.is_necessary,
      date: formData.date
    });

    if (!error) {
      onClose();
      setFormData({
        amount: '',
        category: '',
        description: '',
        is_recurring: false,
        is_necessary: true,
        date: new Date().toISOString().split('T')[0]
      });
    }
    setLoading(false);
  };

  const getSuggestedCategory = (description: string) => {
    const desc = description.toLowerCase();
    if (desc.includes('food') || desc.includes('restaurant') || desc.includes('cafe')) return 'food';
    if (desc.includes('uber') || desc.includes('taxi') || desc.includes('bus')) return 'transport';
    if (desc.includes('shop') || desc.includes('amazon') || desc.includes('flipkart')) return 'shopping';
    if (desc.includes('bill') || desc.includes('electricity') || desc.includes('water')) return 'bills';
    return '';
  };

  const handleDescriptionChange = (value: string) => {
    setFormData(prev => ({ ...prev, description: value }));
    if (!formData.category) {
      const suggested = getSuggestedCategory(value);
      if (suggested) {
        setFormData(prev => ({ ...prev, category: suggested }));
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card border-primary/20 max-w-md mx-auto animate-slide-up">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white flex items-center justify-between">
            Add Expense
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-white font-medium">Amount *</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary font-bold text-lg">₹</span>
              <Input
                id="amount"
                type="number"
                placeholder="0"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                className="pl-8 bg-white/5 border-white/20 text-white placeholder-gray-400 text-lg font-bold focus:border-primary"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-white font-medium">Description</Label>
            <Input
              id="description"
              placeholder="What did you buy?"
              value={formData.description}
              onChange={(e) => handleDescriptionChange(e.target.value)}
              className="bg-white/5 border-white/20 text-white placeholder-gray-400"
            />
          </div>

          {/* Category Selection */}
          <div className="space-y-2">
            <Label className="text-white font-medium">Category *</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
              <SelectTrigger className="bg-white/5 border-white/20 text-white">
                <SelectValue placeholder="Choose category" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-white/20">
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value} className="text-white hover:bg-white/10">
                    <div className="flex items-center gap-2">
                      <span>{cat.icon}</span>
                      <span>{cat.label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date */}
          <div className="space-y-2">
            <Label htmlFor="date" className="text-white font-medium">Date</Label>
            <Input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className="bg-white/5 border-white/20 text-white"
            />
          </div>

          {/* AI Suggestion */}
          {formData.category === 'food' && formData.description && (
            <div className="bg-primary/10 p-3 rounded-lg border border-primary/20 animate-fade-in">
              <p className="text-sm text-primary">
                🤖 <span className="font-medium">AI Suggestion:</span> Looks like food expenses. Consider setting a daily food budget!
              </p>
            </div>
          )}

          {/* Save Button */}
          <Button
            onClick={handleSave}
            disabled={loading || !formData.amount || !formData.category}
            className="w-full bg-neon-glow hover:bg-primary text-white font-bold py-3 rounded-xl neon-glow transition-all duration-200"
          >
            {loading ? 'Saving...' : 'Save Expense'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExpenseModal;
