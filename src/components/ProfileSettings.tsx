
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Mail, 
  DollarSign, 
  CreditCard, 
  Shield, 
  Bell, 
  Smartphone,
  Edit2,
  Save,
  X
} from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import PaymentCards from './PaymentCards';
import AppPreferences from './AppPreferences';

const ProfileSettings: React.FC = () => {
  const { user, signOut } = useAuth();
  const { profile, loading, updateProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [showAppPreferences, setShowAppPreferences] = useState(false);
  const [editData, setEditData] = useState({
    full_name: '',
    monthly_income: ''
  });

  React.useEffect(() => {
    if (profile) {
      setEditData({
        full_name: profile.full_name || '',
        monthly_income: profile.monthly_income?.toString() || ''
      });
    }
  }, [profile]);

  const handleSave = async () => {
    const updates: any = {
      full_name: editData.full_name || null,
      updated_at: new Date().toISOString()
    };

    if (editData.monthly_income) {
      updates.monthly_income = parseFloat(editData.monthly_income);
    }

    const { error } = await updateProfile(updates);
    
    if (!error) {
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile information has been saved successfully"
      });
    }
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-32 bg-white/10 rounded-xl"></div>
        <div className="h-48 bg-white/10 rounded-xl"></div>
        <div className="h-32 bg-white/10 rounded-xl"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Information */}
      <Card className="glass-card border-white/20">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
            <User className="w-5 h-5" />
            Profile Information
          </CardTitle>
          {!isEditing ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(true)}
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Edit2 className="w-4 h-4 mr-1" />
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(false)}
                className="border-red-400/20 text-red-400 hover:bg-red-400/10"
              >
                <X className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                onClick={handleSave}
                className="bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                <Save className="w-4 h-4 mr-1" />
                Save
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src={profile?.avatar_url} />
              <AvatarFallback className="bg-emerald-500/20 text-emerald-400 text-lg">
                {profile?.full_name?.charAt(0) || user?.email?.charAt(0)?.toUpperCase() || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-white">Full Name</Label>
                  <Input
                    id="fullName"
                    value={editData.full_name}
                    onChange={(e) => setEditData(prev => ({ ...prev, full_name: e.target.value }))}
                    placeholder="Enter your full name"
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {profile?.full_name || 'Anonymous User'}
                  </h3>
                  <p className="text-gray-400">{user?.email}</p>
                </div>
              )}
            </div>
          </div>

          <Separator className="bg-white/20" />

          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-400" />
              <div>
                <Label className="text-white">Email</Label>
                <p className="text-gray-300">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-emerald-400" />
              <div className="flex-1">
                <Label className="text-white">Monthly Income</Label>
                {isEditing ? (
                  <Input
                    value={editData.monthly_income}
                    onChange={(e) => setEditData(prev => ({ ...prev, monthly_income: e.target.value }))}
                    placeholder="Enter monthly income"
                    type="number"
                    className="bg-white/10 border-white/20 text-white mt-1"
                  />
                ) : (
                  <p className="text-gray-300">
                    {profile?.monthly_income ? `₹${profile.monthly_income.toLocaleString()}` : 'Not set'}
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Cards */}
      <PaymentCards />

      {/* Account Settings */}
      <Card className="glass-card border-white/20">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Account Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-white font-medium">Notifications</p>
                <p className="text-sm text-gray-400">Get alerts for budget limits and expenses</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="border-white/20 text-white">
              Configure
            </Button>
          </div>

          <Separator className="bg-white/20" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-white font-medium">App Preferences</p>
                <p className="text-sm text-gray-400">Theme, language, and display settings</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-white/20 text-white"
              onClick={() => setShowAppPreferences(true)}
            >
              Customize
            </Button>
          </div>

          <Separator className="bg-white/20" />

          <div className="pt-4">
            <Button
              onClick={handleSignOut}
              variant="destructive"
              className="w-full bg-red-500/20 hover:bg-red-500/30 text-red-400 border-red-400/20"
            >
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data & Privacy */}
      <Card className="glass-card border-white/20">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-white">Data & Privacy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300 text-sm">
            Your financial data is encrypted and stored securely. We never share your personal information with third parties.
          </p>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-white/20 text-white">
              Export Data
            </Button>
            <Button variant="outline" size="sm" className="border-red-400/20 text-red-400">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* App Preferences Modal */}
      <AppPreferences 
        isOpen={showAppPreferences}
        onClose={() => setShowAppPreferences(false)}
      />
    </div>
  );
};

export default ProfileSettings;
