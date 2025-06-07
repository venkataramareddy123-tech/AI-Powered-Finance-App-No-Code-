
import React, { useState } from 'react';
import { X, CreditCard, Smartphone, Banknote } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ExpenseModal: React.FC<ExpenseModalProps> = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const categories = [
    { value: 'food', label: 'Food & Dining', icon: '🍕' },
    { value: 'transport', label: 'Transport', icon: '🚗' },
    { value: 'shopping', label: 'Shopping', icon: '🛍️' },
    { value: 'bills', label: 'Bills & Utilities', icon: '💡' },
    { value: 'entertainment', label: 'Entertainment', icon: '🎬' },
    { value: 'health', label: 'Health & Fitness', icon: '💊' },
  ];

  const paymentMethods = [
    { value: 'upi', label: 'UPI', icon: <Smartphone className="w-4 h-4" /> },
    { value: 'card', label: 'Card', icon: <CreditCard className="w-4 h-4" /> },
    { value: 'cash', label: 'Cash', icon: <Banknote className="w-4 h-4" /> },
  ];

  const handleSave = () => {
    // Add expense logic here
    console.log('Saving expense:', { amount, category, notes, paymentMethod });
    onClose();
    setAmount('');
    setCategory('');
    setNotes('');
    setPaymentMethod('');
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
            <Label htmlFor="amount" className="text-white font-medium">Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary font-bold text-lg">₹</span>
              <Input
                id="amount"
                type="number"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-8 bg-white/5 border-white/20 text-white placeholder-gray-400 text-lg font-bold focus:border-primary"
              />
            </div>
          </div>

          {/* Category Selection */}
          <div className="space-y-2">
            <Label className="text-white font-medium">Category</Label>
            <Select value={category} onValueChange={setCategory}>
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

          {/* Payment Method */}
          <div className="space-y-2">
            <Label className="text-white font-medium">Payment Method</Label>
            <div className="grid grid-cols-3 gap-2">
              {paymentMethods.map((method) => (
                <Button
                  key={method.value}
                  variant={paymentMethod === method.value ? "default" : "outline"}
                  onClick={() => setPaymentMethod(method.value)}
                  className={`p-3 ${
                    paymentMethod === method.value
                      ? 'bg-primary text-white'
                      : 'bg-white/5 border-white/20 text-white hover:bg-white/10'
                  }`}
                >
                  <div className="flex flex-col items-center gap-1">
                    {method.icon}
                    <span className="text-xs">{method.label}</span>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-white font-medium">Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add a note..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="bg-white/5 border-white/20 text-white placeholder-gray-400 resize-none"
              rows={3}
            />
          </div>

          {/* AI Suggestion */}
          {category === 'food' && (
            <div className="bg-primary/10 p-3 rounded-lg border border-primary/20 animate-fade-in">
              <p className="text-sm text-primary">
                🤖 <span className="font-medium">AI Suggestion:</span> Looks like Food. Want to auto-tag as "Lunch"?
              </p>
            </div>
          )}

          {/* Save Button */}
          <Button
            onClick={handleSave}
            disabled={!amount || !category}
            className="w-full bg-neon-glow hover:bg-primary text-white font-bold py-3 rounded-xl neon-glow transition-all duration-200"
          >
            Save Expense
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExpenseModal;
