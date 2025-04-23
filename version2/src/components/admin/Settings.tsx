
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { 
  Save,
  RefreshCw,
  Trash2,
  AlertTriangle,
  ShieldAlert,
  Database,
  Server,
  Mail,
  Clock
} from "lucide-react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export const Settings = () => {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "EcoAware",
    siteDescription: "Track your eco-friendly habits and reduce your carbon footprint",
    enableRegistration: true,
    enableChat: true,
    maintenanceMode: false,
    debugMode: false,
  });
  
  const [emailSettings, setEmailSettings] = useState({
    smtpServer: "smtp.example.com",
    smtpPort: "587",
    smtpUsername: "notifications@ecoaware.com",
    smtpPassword: "••••••••••••",
    senderEmail: "no-reply@ecoaware.com",
    senderName: "EcoAware Team",
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    enableEmailNotifications: true,
    enablePushNotifications: false,
    dailyReminderTime: "08:00",
    weeklyReportDay: "Monday",
  });
  
  const { toast } = useToast();
  
  const handleSaveGeneral = () => {
    toast({
      title: "Settings Saved",
      description: "General settings have been updated successfully."
    });
  };
  
  const handleSaveEmail = () => {
    toast({
      title: "Email Settings Saved",
      description: "Email configuration has been updated successfully."
    });
  };
  
  const handleSaveNotifications = () => {
    toast({
      title: "Notification Settings Saved",
      description: "Notification preferences have been updated successfully."
    });
  };
  
  const handleClearCache = () => {
    toast({
      title: "Cache Cleared",
      description: "Application cache has been cleared successfully."
    });
  };
  
  const handleDatabaseBackup = () => {
    toast({
      title: "Backup Started",
      description: "Database backup has been initiated. You will be notified when complete."
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-semibold">Settings</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Configure basic application settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="siteName">Site Name</Label>
              <Input 
                id="siteName" 
                value={generalSettings.siteName}
                onChange={(e) => setGeneralSettings({...generalSettings, siteName: e.target.value})}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="siteDescription">Site Description</Label>
              <Textarea 
                id="siteDescription" 
                value={generalSettings.siteDescription}
                onChange={(e) => setGeneralSettings({...generalSettings, siteDescription: e.target.value})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="registration">User Registration</Label>
                <p className="text-sm text-muted-foreground">Allow new users to register</p>
              </div>
              <Switch 
                id="registration"
                checked={generalSettings.enableRegistration}
                onCheckedChange={(checked) => setGeneralSettings({...generalSettings, enableRegistration: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="chat">EcoAI Chat</Label>
                <p className="text-sm text-muted-foreground">Enable AI chatbot functionality</p>
              </div>
              <Switch 
                id="chat"
                checked={generalSettings.enableChat}
                onCheckedChange={(checked) => setGeneralSettings({...generalSettings, enableChat: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="maintenance" className="flex items-center">
                  <AlertTriangle className="mr-2 h-4 w-4 text-destructive" />
                  Maintenance Mode
                </Label>
                <p className="text-sm text-muted-foreground">Takes the site offline for maintenance</p>
              </div>
              <Switch 
                id="maintenance"
                checked={generalSettings.maintenanceMode}
                onCheckedChange={(checked) => setGeneralSettings({...generalSettings, maintenanceMode: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="debug" className="flex items-center">
                  <ShieldAlert className="mr-2 h-4 w-4 text-destructive" />
                  Debug Mode
                </Label>
                <p className="text-sm text-muted-foreground">Enable detailed error messages</p>
              </div>
              <Switch 
                id="debug"
                checked={generalSettings.debugMode}
                onCheckedChange={(checked) => setGeneralSettings({...generalSettings, debugMode: checked})}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSaveGeneral} className="ml-auto">
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </Button>
        </CardFooter>
      </Card>
      
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="flex w-full justify-between">
            <div className="flex items-center">
              <Mail className="mr-2 h-4 w-4" />
              Email Configuration
            </div>
            <span>Click to expand</span>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
              <CardDescription>Configure email server for notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="smtpServer">SMTP Server</Label>
                  <Input 
                    id="smtpServer" 
                    value={emailSettings.smtpServer}
                    onChange={(e) => setEmailSettings({...emailSettings, smtpServer: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input 
                    id="smtpPort" 
                    value={emailSettings.smtpPort}
                    onChange={(e) => setEmailSettings({...emailSettings, smtpPort: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="smtpUsername">SMTP Username</Label>
                  <Input 
                    id="smtpUsername" 
                    value={emailSettings.smtpUsername}
                    onChange={(e) => setEmailSettings({...emailSettings, smtpUsername: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="smtpPassword">SMTP Password</Label>
                  <Input 
                    id="smtpPassword" 
                    type="password"
                    value={emailSettings.smtpPassword}
                    onChange={(e) => setEmailSettings({...emailSettings, smtpPassword: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="senderEmail">Sender Email</Label>
                  <Input 
                    id="senderEmail" 
                    value={emailSettings.senderEmail}
                    onChange={(e) => setEmailSettings({...emailSettings, senderEmail: e.target.value})}
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="senderName">Sender Name</Label>
                  <Input 
                    id="senderName" 
                    value={emailSettings.senderName}
                    onChange={(e) => setEmailSettings({...emailSettings, senderName: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="mr-2">
                Test Connection
              </Button>
              <Button onClick={handleSaveEmail}>
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </CollapsibleContent>
      </Collapsible>
      
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button variant="outline" className="flex w-full justify-between">
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              Notification Settings
            </div>
            <span>Click to expand</span>
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how and when users receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send notifications via email</p>
                </div>
                <Switch 
                  checked={notificationSettings.enableEmailNotifications}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, enableEmailNotifications: checked})}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send browser push notifications</p>
                </div>
                <Switch 
                  checked={notificationSettings.enablePushNotifications}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, enablePushNotifications: checked})}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="reminderTime">Daily Reminder Time</Label>
                <Input 
                  id="reminderTime" 
                  type="time"
                  value={notificationSettings.dailyReminderTime}
                  onChange={(e) => setNotificationSettings({...notificationSettings, dailyReminderTime: e.target.value})}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveNotifications}>
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </CollapsibleContent>
      </Collapsible>
      
      <Card>
        <CardHeader>
          <CardTitle>System Maintenance</CardTitle>
          <CardDescription>Tools for system maintenance and performance</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Button onClick={handleClearCache} variant="outline" className="flex flex-col items-center justify-center h-24">
              <RefreshCw className="h-8 w-8 mb-2" />
              <span>Clear Cache</span>
            </Button>
            
            <Button onClick={handleDatabaseBackup} variant="outline" className="flex flex-col items-center justify-center h-24">
              <Database className="h-8 w-8 mb-2" />
              <span>Backup Database</span>
            </Button>
            
            <Button variant="outline" className="flex flex-col items-center justify-center h-24">
              <Server className="h-8 w-8 mb-2" />
              <span>System Status</span>
            </Button>
            
            <Button variant="destructive" className="flex flex-col items-center justify-center h-24">
              <Trash2 className="h-8 w-8 mb-2" />
              <span>Reset Application</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
