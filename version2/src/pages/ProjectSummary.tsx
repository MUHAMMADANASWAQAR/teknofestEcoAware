
import React from 'react';
import Layout from '../components/Layout';
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Users, Award, BarChart } from 'lucide-react';

const ProjectSummary: React.FC = () => {
  return (
    <Layout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">EcoAware Project Summary</h1>
          <p className="text-muted-foreground">Empowering sustainable living through technology</p>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-2">
                <h2 className="text-xl font-semibold mb-3">Project Overview</h2>
                <p className="mb-4">
                  EcoAware is an interactive web application designed to promote eco-friendly habits and sustainable living. 
                  The platform enables users to track their ecological footprint, earn rewards for environmentally 
                  conscious behaviors, and connect with a community of like-minded individuals.
                </p>
                
                <h2 className="text-xl font-semibold mb-3">Why This Project?</h2>
                <p className="mb-4">
                  As climate change and environmental degradation accelerate, individual action becomes increasingly 
                  important. EcoAware addresses the challenge of motivating sustainable behaviors by combining habit 
                  tracking with tangible rewards and community engagement, making environmental action accessible and engaging.
                </p>

                <h2 className="text-xl font-semibold mb-3">Project Purpose</h2>
                <p className="mb-4">
                  EcoAware aims to drive measurable environmental impact by:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li>Educating users about sustainable practices</li>
                  <li>Gamifying eco-friendly behaviors to build lasting habits</li>
                  <li>Providing concrete incentives through a rewards system</li>
                  <li>Creating a supportive community for sustainable living</li>
                  <li>Measuring and visualizing collective environmental impact</li>
                </ul>
              </div>
              
              <div className="space-y-6">
                <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                  <h3 className="font-medium text-green-800 mb-2">Key Features</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <div className="bg-green-100 p-2 rounded-full mr-3">
                        <Leaf className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium">Habit Tracking</p>
                        <p className="text-sm text-muted-foreground">Daily sustainable action monitoring</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-blue-100 p-2 rounded-full mr-3">
                        <Award className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Points & Rewards</p>
                        <p className="text-sm text-muted-foreground">Redeem points for eco-friendly benefits</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-amber-100 p-2 rounded-full mr-3">
                        <Users className="h-4 w-4 text-amber-600" />
                      </div>
                      <div>
                        <p className="font-medium">Community</p>
                        <p className="text-sm text-muted-foreground">Connect with sustainability advocates</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="bg-purple-100 p-2 rounded-full mr-3">
                        <BarChart className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium">Impact Analytics</p>
                        <p className="text-sm text-muted-foreground">Visualize your environmental impact</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-muted">
                      <th className="border p-2 text-left">Technology</th>
                      <th className="border p-2 text-left">Purpose</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2">React & TypeScript</td>
                      <td className="border p-2">Frontend framework</td>
                    </tr>
                    <tr>
                      <td className="border p-2">Tailwind CSS</td>
                      <td className="border p-2">Styling</td>
                    </tr>
                    <tr>
                      <td className="border p-2">Framer Motion</td>
                      <td className="border p-2">Animations</td>
                    </tr>
                    <tr>
                      <td className="border p-2">Recharts</td>
                      <td className="border p-2">Data visualization</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <h2 className="text-xl font-semibold mb-3">Competition Compliance</h2>
              <p>
                The EcoAware project aligns with competition requirements by creating an innovative web application 
                that addresses environmental sustainability challenges through technology. The project demonstrates 
                technical proficiency in modern web development, creative problem-solving, and a commitment to 
                positive social impact through encouraging sustainable behaviors.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ProjectSummary;
