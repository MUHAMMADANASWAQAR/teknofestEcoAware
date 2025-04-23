
import React from 'react';
import Layout from '../components/Layout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Building2, Droplet, Lightbulb, Recycle, FileText } from 'lucide-react';

const MinistryDashboard: React.FC = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Building2 className="h-8 w-8 text-eco-leaf" />
            <div>
              <h1 className="text-3xl font-bold">Ministry Dashboard</h1>
              <p className="text-muted-foreground">Environmental policy insights and statistics for TRNC.</p>
            </div>
          </div>
          <div className="bg-green-50 text-green-700 px-4 py-2 rounded-md">
            Ministry Access View
          </div>
        </div>

        <Tabs defaultValue="overview" className="mt-8">
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="water">Water</TabsTrigger>
            <TabsTrigger value="energy">Energy</TabsTrigger>
            <TabsTrigger value="waste">Waste</TabsTrigger>
            <TabsTrigger value="policies">Policies</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center gap-3 mb-4 text-eco-sky">
                <Droplet className="h-5 w-5" />
                <h2 className="text-lg font-medium">Water Consumption</h2>
              </div>
              <div className="mb-2">
                <span className="text-4xl font-bold">288 L/day</span>
                <p className="text-sm text-muted-foreground">Average per household</p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm">Target: 280 L/day</span>
                <span className="text-amber-500 text-sm flex items-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-500"></span>
                  2.8% over target
                </span>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center gap-3 mb-4 text-green-600">
                <Lightbulb className="h-5 w-5" />
                <h2 className="text-lg font-medium">Energy Consumption</h2>
              </div>
              <div className="mb-2">
                <span className="text-4xl font-bold">400 kWh/month</span>
                <p className="text-sm text-muted-foreground">Average per household</p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm">Target: 400 kWh/month</span>
                <span className="text-green-500 text-sm flex items-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                  On target
                </span>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center gap-3 mb-4 text-eco-earth">
                <Recycle className="h-5 w-5" />
                <h2 className="text-lg font-medium">Recycling Rate</h2>
              </div>
              <div className="mb-2">
                <span className="text-4xl font-bold">40%</span>
                <p className="text-sm text-muted-foreground">Of total waste</p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm">Target: 50%</span>
                <span className="text-amber-500 text-sm flex items-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-amber-500"></span>
                  10% below target
                </span>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">Regional Comparison</h2>
                <span className="text-sm text-muted-foreground">Water usage by region compared to target</span>
              </div>
              <div className="h-56">
                {/* Insert chart here */}
                <div className="flex h-full items-end justify-around gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-10 bg-eco-sky h-40"></div>
                      <div className="w-10 bg-amber-200 h-28"></div>
                    </div>
                    <span className="text-sm">Nicosia</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-10 bg-eco-sky h-36"></div>
                      <div className="w-10 bg-amber-200 h-28"></div>
                    </div>
                    <span className="text-sm">Famagusta</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-10 bg-eco-sky h-28"></div>
                      <div className="w-10 bg-amber-200 h-28"></div>
                    </div>
                    <span className="text-sm">Iskele</span>
                  </div>
                </div>
                <div className="flex justify-center gap-6 mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-eco-sky"></div>
                    <span className="text-sm">Current Usage (L/day)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-amber-200"></div>
                    <span className="text-sm">Target (L/day)</span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="water">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-bold mb-4">Water Consumption Details</h2>
              <p>More detailed water statistics and data would be displayed here.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="energy">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-bold mb-4">Energy Consumption Details</h2>
              <p>More detailed energy statistics and data would be displayed here.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="waste">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-bold mb-4">Waste Management Details</h2>
              <p>More detailed waste statistics and data would be displayed here.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="policies">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-bold mb-4">Environmental Policies</h2>
              <p>Environmental policies and regulations would be displayed here.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default MinistryDashboard;
