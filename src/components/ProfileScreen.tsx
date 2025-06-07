
import React, { useState } from 'react';
import { User, Settings, Moon, Bell, Download, CreditCard, Brain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ProfileScreen = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [aiSuggestions, setAiSuggestions] = useState(true);
  const [notifications, setNotifications] = useState(true);

  const accountCards = [
    { name: 'HDFC Bank', number: '****1234', type: 'UPI', color: 'bg-blue-500' },
    { name: 'Paytm', number: '9876543210', type: 'Wallet', color: 'bg-purple-500' },
    { name: 'Google Pay', number: '9876543210', type: 'UPI', color: 'bg-green-500' },
  ];

  return (
    <div className="min-h-screen bg-fintech-gradient p-4 space-y-6 pb-20">
      {/* Profile Header */}
      <Card className="glass-card border-primary/20 animate-slide-up">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20 border-2 border-primary">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback className="bg-primary text-white text-xl font-bold">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-white">John Doe</h2>
              <p className="text-gray-400">john.doe@email.com</p>
              <div className="mt-2 flex gap-4 text-sm">
                <div>
                  <span className="text-primary font-bold">47</span>
                  <span className="text-gray-400 ml-1">Days Active</span>
                </div>
                <div>
                  <span className="text-primary font-bold">₹1.2L</span>
                  <span className="text-gray-400 ml-1">Tracked</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card className="glass-card border-white/20 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <CardHeader>
          <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" />
            Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 glass-card rounded-lg">
              <div className="flex items-center gap-3">
                <Moon className="w-5 h-5 text-white" />
                <span className="text-white font-medium">Dark Mode</span>
              </div>
              <Switch 
                checked={darkMode} 
                onCheckedChange={setDarkMode}
                className="data-[state=checked]:bg-primary"
              />
            </div>

            <div className="flex items-center justify-between p-3 glass-card rounded-lg">
              <div className="flex items-center gap-3">
                <Brain className="w-5 h-5 text-white" />
                <span className="text-white font-medium">AI Suggestions</span>
              </div>
              <Switch 
                checked={aiSuggestions} 
                onCheckedChange={setAiSuggestions}
                className="data-[state=checked]:bg-primary"
              />
            </div>

            <div className="flex items-center justify-between p-3 glass-card rounded-lg">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-white" />
                <span className="text-white font-medium">Notifications</span>
              </div>
              <Switch 
                checked={notifications} 
                onCheckedChange={setNotifications}
                className="data-[state=checked]:bg-primary"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Connected Accounts */}
      <Card className="glass-card border-white/20 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <CardHeader>
          <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            Connected Accounts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {accountCards.map((account, index) => (
              <div key={index} className="glass-card p-3 rounded-lg flex items-center gap-3">
                <div className={`w-10 h-10 ${account.color} rounded-lg flex items-center justify-center`}>
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{account.name}</p>
                  <p className="text-gray-400 text-sm">{account.number} • {account.type}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Export Data */}
      <Card className="glass-card border-white/20 animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <Download className="w-12 h-12 text-primary mx-auto" />
            <div>
              <h3 className="text-white font-bold">Export Spending Report</h3>
              <p className="text-gray-400 text-sm">Download your complete financial data as PDF</p>
            </div>
            <Button className="bg-primary hover:bg-primary/80 text-white font-bold px-6 py-2 rounded-xl">
              Download Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileScreen;
