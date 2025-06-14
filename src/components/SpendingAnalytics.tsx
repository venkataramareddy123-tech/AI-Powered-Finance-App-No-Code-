
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useExpenses } from '@/hooks/useExpenses';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const SpendingAnalytics: React.FC = () => {
  const { expenses } = useExpenses();

  // Get last 6 months data
  const getMonthlyData = () => {
    const monthlyData = [];
    const now = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthKey = date.toISOString().slice(0, 7);
      const monthName = date.toLocaleDateString('en-US', { month: 'short' });
      
      const monthExpenses = expenses.filter(expense => expense.date.startsWith(monthKey));
      const totalSpent = monthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
      
      monthlyData.push({
        month: monthName,
        spent: totalSpent
      });
    }
    
    return monthlyData;
  };

  // Get category distribution for current month
  const getCategoryData = () => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    const monthExpenses = expenses.filter(expense => expense.date.startsWith(currentMonth));
    
    const categoryTotals = monthExpenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);

    const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#a4de6c', '#8dd1e1'];
    
    return Object.entries(categoryTotals).map(([category, amount], index) => ({
      name: category.charAt(0).toUpperCase() + category.slice(1),
      value: amount,
      fill: colors[index % colors.length]
    }));
  };

  const monthlyData = getMonthlyData();
  const categoryData = getCategoryData();

  return (
    <div className="space-y-6">
      {/* Monthly Spending Trend */}
      <Card className="glass-card border-white/20">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
            📈 Monthly Spending Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis 
                  dataKey="month" 
                  stroke="rgba(255,255,255,0.7)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="rgba(255,255,255,0.7)"
                  fontSize={12}
                  tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '8px',
                    color: 'white'
                  }}
                  formatter={(value) => [`₹${Number(value).toLocaleString()}`, 'Spent']}
                />
                <Bar 
                  dataKey="spent" 
                  fill="url(#colorGradient)"
                  radius={[4, 4, 0, 0]}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Category Distribution */}
      {categoryData.length > 0 && (
        <Card className="glass-card border-white/20">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
              🥧 Category Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                      color: 'white'
                    }}
                    formatter={(value) => [`₹${Number(value).toLocaleString()}`, 'Spent']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SpendingAnalytics;
