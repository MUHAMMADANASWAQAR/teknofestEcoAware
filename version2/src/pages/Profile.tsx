
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Settings, User, Bell, BellOff, CheckCircle } from 'lucide-react';

const Profile: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [name, setName] = useState('Eco Friend');
  const [email, setEmail] = useState('eco.friend@example.com');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const saveProfile = () => {
    // Simulate saving profile
    setSaveSuccess(true);
    
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Your Profile</h1>
          <p className="text-muted-foreground mt-2">Manage your account settings and preferences</p>
        </div>
        
        <div className="eco-card glass-card">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-eco-leaf to-eco-sky flex items-center justify-center text-white">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{name}</h2>
              <p className="text-muted-foreground">{email}</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            
            <div>
              <button
                onClick={saveProfile}
                className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                {saveSuccess ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span>Saved Successfully</span>
                  </>
                ) : (
                  <>
                    <Settings className="w-5 h-5" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
        
        <div className="eco-card glass-card">
          <h2 className="text-xl font-semibold mb-6">Preferences</h2>
          
          <div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Daily Notifications</h3>
                <p className="text-sm text-muted-foreground">Receive daily eco tips and reminders</p>
              </div>
              
              <button
                onClick={() => setNotifications(!notifications)}
                className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                  notifications ? 'bg-primary justify-end' : 'bg-muted justify-start'
                }`}
              >
                <div className="w-5 h-5 rounded-full bg-white shadow-md transform transition-transform mx-0.5">
                  {notifications ? (
                    <Bell className="w-3 h-3 text-primary m-1" />
                  ) : (
                    <BellOff className="w-3 h-3 text-muted-foreground m-1" />
                  )}
                </div>
              </button>
            </div>
            
            <div className="border-t border-border mt-6 pt-6">
              <h3 className="font-medium mb-2">Notification Frequency</h3>
              
              <div className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input type="radio" name="frequency" defaultChecked className="text-primary" />
                  <span>Daily (Recommended)</span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input type="radio" name="frequency" className="text-primary" />
                  <span>Every other day</span>
                </label>
                
                <label className="flex items-center space-x-2">
                  <input type="radio" name="frequency" className="text-primary" />
                  <span>Weekly</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="eco-card glass-card">
          <h2 className="text-xl font-semibold mb-6">Data & Privacy</h2>
          
          <p className="text-sm text-muted-foreground mb-4">
            Your data is collected anonymously for research purposes only. No personal identifiers are stored or shared.
          </p>
          
          <div className="flex flex-col space-y-3">
            <button className="text-sm text-primary hover:underline text-left">
              Export Your Data
            </button>
            
            <button className="text-sm text-primary hover:underline text-left">
              Delete Your Account
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
