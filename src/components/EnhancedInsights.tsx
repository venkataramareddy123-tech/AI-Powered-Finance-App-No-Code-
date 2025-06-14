
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RealInsights from './RealInsights';
import ExpenseCategories from './ExpenseCategories';
import SpendingAnalytics from './SpendingAnalytics';
import SocialFeatures from './SocialFeatures';

const EnhancedInsights: React.FC = () => {
  return (
    <div className="min-h-screen bg-neubrutalist-bg p-4 space-y-6 pb-20">
      {/* Header */}
      <Card className="glass-card-intense border-primary/30">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
            🔍 Enhanced Insights
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Real Insights */}
      <RealInsights />

      {/* Enhanced Category Analysis */}
      <ExpenseCategories />

      {/* Spending Analytics */}
      <SpendingAnalytics />

      {/* Social Features */}
      <SocialFeatures />
    </div>
  );
};

export default EnhancedInsights;
