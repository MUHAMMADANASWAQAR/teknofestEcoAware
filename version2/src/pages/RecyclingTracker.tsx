
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ChevronDown, Info, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const RecyclingTracker: React.FC = () => {
  const [wasteType, setWasteType] = useState('Plastic');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted:', { wasteType, amount });
    // Here you would typically send this data to your backend
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <span className="p-1 rounded-md bg-green-100">
              <Recycle className="h-7 w-7 text-eco-leaf" />
            </span>
            Recycling Tracker
          </h1>
          <p className="text-muted-foreground">Record your recycling activities and earn rewards.</p>
        </div>

        <Tabs defaultValue="report" className="mt-8">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="report">Report Recycling</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="tips">Recycling Tips</TabsTrigger>
          </TabsList>
          
          <TabsContent value="report" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Report Your Recycling</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Record the waste you've recycled to earn points and track your impact.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Waste Type</label>
                  <div className="relative">
                    <select 
                      value={wasteType}
                      onChange={(e) => setWasteType(e.target.value)}
                      className="w-full bg-white p-3 border rounded-lg appearance-none pr-10"
                    >
                      <option>Plastic</option>
                      <option>Paper</option>
                      <option>Glass</option>
                      <option>Metal</option>
                      <option>Electronics</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Amount (kg)</label>
                  <input
                    type="text"
                    placeholder="Enter amount in kilograms"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-white p-3 border rounded-lg"
                  />
                </div>
                
                <div className="bg-green-50 p-3 rounded-md flex items-start gap-3">
                  <Info className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <p className="text-sm text-green-800">
                    You'll earn 10 points per kg of waste recycled. Different materials have different environmental impacts!
                  </p>
                </div>
                
                <Button type="submit" className="w-full bg-eco-leaf hover:bg-eco-leaf/90">
                  Record Recycling
                </Button>
              </form>
            </div>
            
            <div className="pt-6 border-t">
              <h3 className="text-lg font-semibold mb-4">Recycling Locations</h3>
              <p className="text-sm text-muted-foreground mb-4">Find recycling centers near you in TRNC.</p>
              
              <div className="space-y-6">
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="font-medium">Nicosia Recycling Center</h4>
                  <p className="text-sm text-muted-foreground">Gönyeli, Near City Mall</p>
                  
                  <div className="mt-2 space-y-1">
                    <p className="text-sm"><span className="font-medium">Materials accepted:</span> Plastic, Paper, Glass, Metal</p>
                    <p className="text-sm flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span className="font-medium">Open hours:</span> Mon-Sat, 8AM-5PM
                    </p>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="font-medium">Kyrenia Environmental Center</h4>
                  <p className="text-sm text-muted-foreground">Harbor Road, Kyrenia</p>
                  
                  <div className="mt-2 space-y-1">
                    <p className="text-sm"><span className="font-medium">Materials accepted:</span> Plastic, Paper, Glass, Metal, Electronic</p>
                    <p className="text-sm flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span className="font-medium">Open hours:</span> Mon-Sun, 9AM-6PM
                    </p>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border">
                  <h4 className="font-medium">Famagusta Collection Point</h4>
                  <p className="text-sm text-muted-foreground">Near Eastern Mediterranean University</p>
                  
                  <div className="mt-2 space-y-1">
                    <p className="text-sm"><span className="font-medium">Materials accepted:</span> Plastic, Paper, Glass</p>
                    <p className="text-sm flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span className="font-medium">Open hours:</span> Mon-Fri, 10AM-4PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-bold mb-4">Your Recycling History</h2>
              <p>Your recycling history would be displayed here.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="tips">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-bold mb-4">Recycling Tips</h2>
              <p>Helpful recycling tips and best practices would be displayed here.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

// Add the Recycle icon component since it's not part of lucide-react by default
const Recycle = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5" />
      <path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12" />
      <path d="m14 16-3 3 3 3" />
      <path d="M8.293 13.596 4.425 7.33a1.83 1.83 0 0 1 .017-1.779 1.785 1.785 0 0 1 1.558-.887h4.133" />
      <path d="m10 8 3-3-3-3" />
      <path d="m15.536 8.418 3.564 6.175a1.83 1.83 0 0 1 .01 1.779 1.785 1.785 0 0 1-1.557.892h-4.235" />
      <path d="m14 16-3-5 6-1" />
    </svg>
  );
};

export default RecyclingTracker;
