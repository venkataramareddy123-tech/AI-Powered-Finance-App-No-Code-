
import React from 'react';
import Dashboard from './Dashboard';
import QuickActions from './QuickActions';
import ExpenseCategories from './ExpenseCategories';
import SmartNotifications from './SmartNotifications';

const EnhancedDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <Dashboard />
      
      {/* Smart Notifications */}
      <div className="px-4">
        <SmartNotifications />
      </div>
      
      {/* Additional Quick Actions */}
      <div className="px-4">
        <QuickActions />
      </div>
      
      {/* Enhanced Category View */}
      <div className="px-4">
        <ExpenseCategories />
      </div>
    </div>
  );
};

export default EnhancedDashboard;
