
import React, { useState } from 'react';
import Layout from '../components/Layout';
import DailyPosts from '../components/DailyPosts';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Calendar, Droplet, Cloud } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const Community: React.FC = () => {
  const [activeTab, setActiveTab] = useState('feed');

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <DailyPosts />
        </div>

        <div className="space-y-6">
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-r from-primary/20 to-primary/10 p-6">
              <div className="flex flex-col items-center">
                <Avatar className="w-24 h-24 border-4 border-white">
                  <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop" />
                  <AvatarFallback>SW</AvatarFallback>
                </Avatar>

                <h2 className="mt-4 text-2xl font-semibold flex items-center gap-2">
                  Sarah Wilson 
                  <Badge variant="outline" className="bg-primary/20 text-primary">★</Badge>
                </h2>
                <p className="text-muted-foreground">GuardianHero</p>

                <div className="mt-4 flex gap-2">
                  <button className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition">
                    Follow
                  </button>
                  
                  <div className="flex gap-2">
                    <button className="bg-background/80 p-2 rounded-full hover:bg-background transition">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                    </button>
                    <button className="bg-background/80 p-2 rounded-full hover:bg-background transition">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                    </button>
                    <button className="bg-background/80 p-2 rounded-full hover:bg-background transition">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <CardContent className="p-6">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="activities">Activities</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-4">
                  <div className="flex space-x-3 justify-center">
                    <button className="text-center px-2 py-1 border-b-2 border-primary">
                      <span className="text-sm font-medium">Last week</span>
                    </button>
                    <button className="text-center px-2 py-1 border-b-2 border-transparent hover:border-primary/50">
                      <span className="text-sm font-medium">Last month</span>
                    </button>
                    <button className="text-center px-2 py-1 border-b-2 border-transparent hover:border-primary/50">
                      <span className="text-sm font-medium">Last year</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <Card className="p-4 text-center">
                      <div className="text-center">
                        <h4 className="mb-1 font-medium">Land saved</h4>
                        <div className="flex justify-center mb-2">
                          <div className="w-10 h-10 rounded-full bg-eco-leaf/20 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-eco-leaf" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 22c1.25-1.25 2.5-2.5 3.5-2.5 1.5 0 2 1.5 3 1.5s1.5-1.5 3-1.5 2 1.5 3 1.5 1.5-1.5 3-1.5 2 1.5 3 1.5 1.5-1.5 3-1.5 2 1.5 3 1.5 1.5-1.5 3-1.5"/><path d="M19.38 12.87a40.5 40.5 0 0 0-9.77-9.18"/><path d="M4.06 10.37a40.5 40.5 0 0 0 3.79 2.87"/><path d="M12.19 5.5a40.5 40.5 0 0 1 3.79 2.87"/></svg>
                          </div>
                        </div>
                        <p className="text-2xl font-bold text-eco-leaf">127</p>
                        <p className="text-xs text-muted-foreground">Square meters</p>
                      </div>
                    </Card>

                    <Card className="p-4 text-center">
                      <div className="text-center">
                        <h4 className="mb-1 font-medium">Water saved</h4>
                        <div className="flex justify-center mb-2">
                          <div className="w-10 h-10 rounded-full bg-eco-sky/20 flex items-center justify-center">
                            <Droplet className="w-6 h-6 text-eco-sky" />
                          </div>
                        </div>
                        <p className="text-2xl font-bold text-eco-sky">6,622</p>
                        <p className="text-xs text-muted-foreground">Liters</p>
                      </div>
                    </Card>

                    <Card className="p-4 text-center">
                      <div className="text-center">
                        <h4 className="mb-1 font-medium">CO2 reduced</h4>
                        <div className="flex justify-center mb-2">
                          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                            <Cloud className="w-6 h-6 text-amber-500" />
                          </div>
                        </div>
                        <p className="text-2xl font-bold text-amber-500">77</p>
                        <p className="text-xs text-muted-foreground">Kilograms</p>
                      </div>
                    </Card>
                  </div>

                  <Card className="p-4 space-y-2">
                    <div>
                      <h3 className="font-medium">Top activities</h3>
                      <p className="text-xs text-muted-foreground">Last month</p>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mt-2">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-eco-leaf/10 flex items-center justify-center mb-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-eco-leaf"><path d="M21 9V4a1 1 0 0 0-1-1h-5"/><path d="M21 9H8a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9Z"/><path d="M16 4V3"/><path d="M16 22v-1"/><path d="M12 4v3"/><path d="M12 19v3"/><path d="m4 8 3-3"/><path d="M4 16v-4"/></svg>
                        </div>
                        <p className="font-bold">14</p>
                        <p className="text-xs text-center">Vegan meal</p>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-eco-sky/10 flex items-center justify-center mb-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-eco-sky"><path d="M10 9h.01"/><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m14 12-4 4"/><path d="M10 8v4"/></svg>
                        </div>
                        <p className="font-bold">12</p>
                        <p className="text-xs text-center">Public transport</p>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-1">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                        </div>
                        <p className="font-bold">6</p>
                        <p className="text-xs text-center">Organic product</p>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="activities">
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">Activities will be displayed here</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Community;
