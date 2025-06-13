
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { 
  Palette, 
  Bell, 
  Moon, 
  Sun, 
  Globe,
  Save,
  X
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface AppPreferencesProps {
  isOpen: boolean;
  onClose: () => void;
}

const AppPreferences: React.FC<AppPreferencesProps> = ({ isOpen, onClose }) => {
  const [preferences, setPreferences] = useState({
    theme: 'dark',
    notifications: true,
    language: 'english',
    currency: 'INR',
    weekStartsOn: 'monday',
    showDecimals: true,
    enableSounds: false,
    autoBackup: true
  });

  // Load preferences from localStorage on component mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem('appPreferences');
    if (savedPreferences) {
      try {
        const parsed = JSON.parse(savedPreferences);
        setPreferences(parsed);
        console.log('Loaded preferences:', parsed);
      } catch (error) {
        console.error('Error loading preferences:', error);
      }
    }
  }, []);

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem('appPreferences', JSON.stringify(preferences));
    console.log('Preferences saved:', preferences);
    
    // Apply theme changes immediately
    if (preferences.theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
    
    toast({
      title: "Preferences saved",
      description: "Your app preferences have been updated and applied"
    });
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="glass-card border-white/20 w-full max-w-md max-h-[80vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
              <Palette className="w-5 h-5" />
              App Preferences
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
          {/* Theme */}
          <div className="space-y-3">
            <Label className="text-white font-medium">Theme</Label>
            <div className="flex gap-2">
              <Button
                variant={preferences.theme === 'dark' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPreferences(prev => ({ ...prev, theme: 'dark' }))}
                className="flex-1"
              >
                <Moon className="w-4 h-4 mr-2" />
                Dark
              </Button>
              <Button
                variant={preferences.theme === 'light' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPreferences(prev => ({ ...prev, theme: 'light' }))}
                className="flex-1"
              >
                <Sun className="w-4 h-4 mr-2" />
                Light
              </Button>
            </div>
          </div>

          <Separator className="bg-white/20" />

          {/* Notifications */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-yellow-400" />
              <div>
                <Label className="text-white">Push Notifications</Label>
                <p className="text-sm text-gray-400">Get alerts for budget limits</p>
              </div>
            </div>
            <Switch
              checked={preferences.notifications}
              onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, notifications: checked }))}
            />
          </div>

          <Separator className="bg-white/20" />

          {/* Language */}
          <div className="space-y-3">
            <Label className="text-white font-medium flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Language
            </Label>
            <select
              value={preferences.language}
              onChange={(e) => setPreferences(prev => ({ ...prev, language: e.target.value }))}
              className="w-full bg-slate-800 border border-white/20 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="english" className="bg-slate-800 text-white">English</option>
              <option value="hindi" className="bg-slate-800 text-white">हिंदी</option>
              <option value="spanish" className="bg-slate-800 text-white">Español</option>
            </select>
          </div>

          <Separator className="bg-white/20" />

          {/* Currency */}
          <div className="space-y-3">
            <Label className="text-white font-medium">Currency</Label>
            <select
              value={preferences.currency}
              onChange={(e) => setPreferences(prev => ({ ...prev, currency: e.target.value }))}
              className="w-full bg-slate-800 border border-white/20 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="INR" className="bg-slate-800 text-white">₹ Indian Rupee</option>
              <option value="USD" className="bg-slate-800 text-white">$ US Dollar</option>
              <option value="EUR" className="bg-slate-800 text-white">€ Euro</option>
            </select>
          </div>

          <Separator className="bg-white/20" />

          {/* Additional Settings */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white">Show Decimals</Label>
                <p className="text-sm text-gray-400">Display amounts with decimal places</p>
              </div>
              <Switch
                checked={preferences.showDecimals}
                onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, showDecimals: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white">Sound Effects</Label>
                <p className="text-sm text-gray-400">Play sounds for actions</p>
              </div>
              <Switch
                checked={preferences.enableSounds}
                onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, enableSounds: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-white">Auto Backup</Label>
                <p className="text-sm text-gray-400">Automatically backup your data</p>
              </div>
              <Switch
                checked={preferences.autoBackup}
                onCheckedChange={(checked) => setPreferences(prev => ({ ...prev, autoBackup: checked }))}
              />
            </div>
          </div>

          <Separator className="bg-white/20" />

          {/* Save Button */}
          <Button
            onClick={handleSave}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Preferences
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppPreferences;
