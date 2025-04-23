
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Check, Gift, Award, Leaf, Cloud } from 'lucide-react';

interface Badge {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  date?: string;
  category: 'beginner' | 'intermediate' | 'advanced';
}

const Achievements: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  
  const badges: Badge[] = [
    {
      id: 1,
      title: "First Step",
      description: "Complete your first eco-friendly action",
      icon: <Check className="w-5 h-5" />,
      unlocked: true,
      date: "Jun 12, 2023",
      category: 'beginner'
    },
    {
      id: 2,
      title: "Week Streak",
      description: "Complete eco-friendly actions for 7 consecutive days",
      icon: <Award className="w-5 h-5" />,
      unlocked: true,
      date: "Jun 19, 2023",
      category: 'beginner'
    },
    {
      id: 3,
      title: "Water Saver",
      description: "Save 500 liters of water",
      icon: <Cloud className="w-5 h-5" />,
      unlocked: false,
      category: 'intermediate'
    },
    {
      id: 4,
      title: "Energy Guardian",
      description: "Reduce energy consumption by 20%",
      icon: <Leaf className="w-5 h-5" />,
      unlocked: false,
      category: 'intermediate'
    },
    {
      id: 5,
      title: "Zero Waste Hero",
      description: "Achieve zero waste for a full week",
      icon: <Gift className="w-5 h-5" />,
      unlocked: false,
      category: 'advanced'
    }
  ];
  
  const filteredBadges = activeFilter === 'all' 
    ? badges 
    : badges.filter(badge => badge.category === activeFilter);

  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Your Achievements</h1>
          <p className="text-muted-foreground mt-2">Track your progress and earn badges for sustainable actions</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              activeFilter === 'all' 
                ? 'bg-primary text-white' 
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            All
          </button>
          <button 
            onClick={() => setActiveFilter('beginner')}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              activeFilter === 'beginner' 
                ? 'bg-eco-leaf text-white' 
                : 'bg-eco-leaf/10 text-eco-leaf hover:bg-eco-leaf/20'
            }`}
          >
            Beginner
          </button>
          <button 
            onClick={() => setActiveFilter('intermediate')}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              activeFilter === 'intermediate' 
                ? 'bg-eco-sky text-white' 
                : 'bg-eco-sky/10 text-eco-sky hover:bg-eco-sky/20'
            }`}
          >
            Intermediate
          </button>
          <button 
            onClick={() => setActiveFilter('advanced')}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              activeFilter === 'advanced' 
                ? 'bg-eco-earth text-white' 
                : 'bg-eco-earth/10 text-eco-earth hover:bg-eco-earth/20'
            }`}
          >
            Advanced
          </button>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {filteredBadges.map((badge) => (
            <div 
              key={badge.id} 
              className={`eco-card animate-fade-in hover:shadow-md transition-all ${
                badge.unlocked ? 'glass-card' : 'bg-muted/50'
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                  badge.unlocked 
                    ? badge.category === 'beginner'
                      ? 'bg-gradient-to-br from-eco-leaf to-eco-moss'
                      : badge.category === 'intermediate'
                        ? 'bg-gradient-to-br from-eco-sky to-eco-leaf'
                        : 'bg-gradient-to-br from-eco-earth to-eco-sand'
                    : 'bg-muted'
                }`}>
                  <div className={badge.unlocked ? 'text-white' : 'text-muted-foreground'}>
                    {badge.icon}
                  </div>
                </div>
                
                <h3 className="font-medium text-lg mb-1">{badge.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">{badge.description}</p>
                
                {badge.unlocked ? (
                  <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                    Unlocked on {badge.date}
                  </span>
                ) : (
                  <span className="text-xs font-medium bg-muted text-muted-foreground px-2 py-1 rounded-full">
                    Locked
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Achievements;
