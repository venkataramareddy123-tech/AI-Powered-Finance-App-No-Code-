
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useExpenses } from '@/hooks/useExpenses';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, Coffee, Car, ShoppingBag, Home, Zap, Stethoscope } from 'lucide-react';

const QuickActions: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const { addExpense } = useExpenses();
  const { toast } = useToast();

  const quickCategories = [
    { id: 'food', name: 'Food', icon: Coffee, color: 'from-orange-500 to-red-500' },
    { id: 'transport', name: 'Transport', icon: Car, color: 'from-blue-500 to-purple-500' },
    { id: 'shopping', name: 'Shopping', icon: ShoppingBag, color: 'from-pink-500 to-rose-500' },
    { id: 'rent', name: 'Rent', icon: Home, color: 'from-emerald-500 to-teal-500' },
    { id: 'utilities', name: 'Utilities', icon: Zap, color: 'from-yellow-500 to-orange-500' },
    { id: 'healthcare', name: 'Healthcare', icon: Stethoscope, color: 'from-green-500 to-emerald-500' },
  ];

  const handleQuickAdd = async (category: string, quickAmount: number) => {
    try {
      setIsAdding(true);
      await addExpense({
        amount: quickAmount,
        category,
        description: `Quick ${category} expense`,
        date: new Date().toISOString().split('T')[0]
      });
      
      toast({
        title: "Expense Added",
        description: `₹${quickAmount} added to ${category}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add expense",
        variant: "destructive",
      });
    } finally {
      setIsAdding(false);
    }
  };

  const handleCustomAdd = async () => {
    if (!amount || !selectedCategory) return;
    
    try {
      setIsAdding(true);
      await addExpense({
        amount: parseFloat(amount),
        category: selectedCategory,
        description: `Quick ${selectedCategory} expense`,
        date: new Date().toISOString().split('T')[0]
      });
      
      toast({
        title: "Expense Added",
        description: `₹${amount} added to ${selectedCategory}`,
      });
      
      setAmount('');
      setSelectedCategory('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add expense",
        variant: "destructive",
      });
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <Card className="glass-card border-white/20">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
          ⚡ Quick Add
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Amount Buttons */}
        <div className="grid grid-cols-3 gap-2">
          {[50, 100, 200, 500, 1000, 2000].map((quickAmount) => (
            <Button
              key={quickAmount}
              variant="outline"
              size="sm"
              onClick={() => setAmount(quickAmount.toString())}
              className="glass-card border-white/20 text-white hover:bg-white/10"
            >
              ₹{quickAmount}
            </Button>
          ))}
        </div>

        {/* Quick Category Buttons */}
        <div className="grid grid-cols-2 gap-2">
          {quickCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant="outline"
                size="sm"
                onClick={() => amount && handleQuickAdd(category.id, parseFloat(amount))}
                disabled={!amount || isAdding}
                className={`glass-card border-white/20 text-white hover:bg-gradient-to-r hover:${category.color} hover:text-white flex items-center gap-2 p-3`}
              >
                <Icon className="w-4 h-4" />
                {category.name}
              </Button>
            );
          })}
        </div>

        {/* Custom Add */}
        <div className="space-y-2 pt-2 border-t border-white/20">
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="glass-card border-white/20 text-white placeholder:text-gray-400"
            />
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="glass-card border-white/20 text-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {quickCategories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={handleCustomAdd}
            disabled={!amount || !selectedCategory || isAdding}
            className="w-full bg-gradient-to-r from-primary to-accent text-black hover:opacity-80"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            Add Expense
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
