
import React, { useState } from 'react';
import { Calendar, Filter, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useExpenses } from '@/hooks/useExpenses';

const TransactionHistory = () => {
  const { expenses, loading } = useExpenses();
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filterButtons = ['All', 'Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 'Health'];

  // Filter expenses based on selected category
  const filteredExpenses = selectedFilter === 'All' 
    ? expenses 
    : expenses.filter(expense => expense.category.toLowerCase() === selectedFilter.toLowerCase());

  // Sort by date (newest first)
  const sortedExpenses = [...filteredExpenses].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  function getCategoryIcon(category: string) {
    const icons: Record<string, string> = {
      food: '🍕',
      transport: '🚗',
      shopping: '🛍️',
      bills: '💡',
      entertainment: '🎬',
      health: '💊'
    };
    return icons[category.toLowerCase()] || '💰';
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-fintech-gradient flex items-center justify-center">
        <div className="animate-spin">
          <Calendar className="w-8 h-8 text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-fintech-gradient p-4 space-y-6 pb-20">
      <Card className="glass-card border-primary/20 animate-slide-up">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-primary" />
            Transaction History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filter Buttons */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
            {filterButtons.map((filter) => (
              <Button
                key={filter}
                variant="outline"
                size="sm"
                onClick={() => setSelectedFilter(filter)}
                className={`whitespace-nowrap rounded-full transition-all ${
                  selectedFilter === filter
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white/5 border-white/20 text-white hover:bg-primary/20 hover:border-primary'
                }`}
              >
                {filter}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="bg-white/5 border-white/20 text-white hover:bg-primary/20 hover:border-primary rounded-full"
            >
              <Filter className="w-4 h-4" />
            </Button>
          </div>

          {/* Transaction Timeline */}
          <div className="space-y-4">
            {sortedExpenses.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                <p className="text-white text-lg mb-2">No transactions found</p>
                <p className="text-gray-400">
                  {selectedFilter === 'All' 
                    ? 'Start adding expenses to see your transaction history!' 
                    : `No transactions in the ${selectedFilter} category yet.`
                  }
                </p>
              </div>
            ) : (
              sortedExpenses.map((expense, index) => (
                <div
                  key={expense.id}
                  className="glass-card p-4 rounded-xl hover:scale-[1.02] transition-transform animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                        <span className="text-xl">{getCategoryIcon(expense.category)}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-white font-medium">
                            {expense.description || `${expense.category.charAt(0).toUpperCase() + expense.category.slice(1)} expense`}
                          </p>
                          {expense.is_necessary === false && (
                            <div className="flex items-center gap-1 bg-red-500/20 px-2 py-1 rounded-full">
                              <AlertCircle className="w-3 h-3 text-red-400" />
                              <span className="text-xs text-red-400 font-medium">AI</span>
                            </div>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm">
                          {expense.category.charAt(0).toUpperCase() + expense.category.slice(1)} • {formatDate(expense.date)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-white">
                        -₹{expense.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {expense.is_necessary === false && (
                    <div className="mt-3 bg-red-500/10 p-2 rounded-lg border border-red-500/20">
                      <p className="text-red-300 text-xs">
                        🤖 AI detected this as potentially unnecessary spending
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionHistory;
