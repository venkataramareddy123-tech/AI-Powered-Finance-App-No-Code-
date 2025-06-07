
import React from 'react';
import { Calendar, Filter, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const TransactionHistory = () => {
  const transactions = [
    {
      id: 1,
      date: 'Today',
      category: 'Food',
      description: 'Starbucks Coffee',
      amount: -180,
      icon: '☕',
      isUnnecessary: false,
    },
    {
      id: 2,
      date: 'Today',
      category: 'Transport',
      description: 'Uber Ride',
      amount: -120,
      icon: '🚗',
      isUnnecessary: false,
    },
    {
      id: 3,
      date: 'Yesterday',
      category: 'Shopping',
      description: 'Online Purchase',
      amount: -2500,
      icon: '🛍️',
      isUnnecessary: true,
    },
    {
      id: 4,
      date: 'Yesterday',
      category: 'Income',
      description: 'Salary Credit',
      amount: 45000,
      icon: '💰',
      isUnnecessary: false,
    },
  ];

  const filterButtons = ['All', 'Food', 'Transport', 'Shopping', 'Bills'];

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
                className="whitespace-nowrap bg-white/5 border-white/20 text-white hover:bg-primary/20 hover:border-primary rounded-full"
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
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="glass-card p-4 rounded-xl hover:scale-[1.02] transition-transform animate-slide-up"
                style={{ animationDelay: `${transaction.id * 0.1}s` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-xl">{transaction.icon}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-white font-medium">{transaction.description}</p>
                        {transaction.isUnnecessary && (
                          <div className="flex items-center gap-1 bg-red-500/20 px-2 py-1 rounded-full">
                            <AlertCircle className="w-3 h-3 text-red-400" />
                            <span className="text-xs text-red-400 font-medium">AI</span>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm">{transaction.category} • {transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${
                      transaction.amount > 0 ? 'text-emerald-400' : 'text-white'
                    }`}>
                      {transaction.amount > 0 ? '+' : ''}₹{Math.abs(transaction.amount)}
                    </p>
                  </div>
                </div>

                {transaction.isUnnecessary && (
                  <div className="mt-3 bg-red-500/10 p-2 rounded-lg border border-red-500/20">
                    <p className="text-red-300 text-xs">
                      🤖 AI detected this as potentially unnecessary spending
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionHistory;
