
import React from 'react';
import Layout from '@/components/Layout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UsersManagement } from '@/components/admin/UsersManagement';
import { ContentManagement } from '@/components/admin/ContentManagement';
import { AnalyticsDashboard } from '@/components/admin/AnalyticsDashboard';
import { Settings } from '@/components/admin/Settings';

const Admin = () => {
  return (
    <Layout>
      <div className="flex flex-col w-full">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage EcoAware application data and users</p>
        </div>
        
        <Tabs defaultValue="users" className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="users" className="space-y-4">
            <UsersManagement />
          </TabsContent>
          
          <TabsContent value="content" className="space-y-4">
            <ContentManagement />
          </TabsContent>
          
          <TabsContent value="analytics" className="space-y-4">
            <AnalyticsDashboard />
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4">
            <Settings />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Admin;
