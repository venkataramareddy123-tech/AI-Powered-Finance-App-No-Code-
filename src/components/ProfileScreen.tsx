
import React from 'react';
import ProfileSettings from './ProfileSettings';

const ProfileScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-fintech-gradient p-4 space-y-6 pb-20">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
          Profile & Settings
        </h1>
        <p className="text-gray-400">Manage your account and preferences</p>
      </div>

      <ProfileSettings />
    </div>
  );
};

export default ProfileScreen;
