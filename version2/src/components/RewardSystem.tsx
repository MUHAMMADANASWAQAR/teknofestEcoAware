
import React from 'react';
import { Award, Gift, Lock } from 'lucide-react';

interface Achievement {
  id: number;
  title: string;
  description: string;
  points: number;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

const RewardSystem: React.FC = () => {
  const achievements: Achievement[] = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete 5 eco-friendly actions",
      points: 50,
      unlocked: true,
      progress: 5,
      maxProgress: 5
    },
    {
      id: 2,
      title: "Water Saver",
      description: "Save 100 liters of water",
      points: 100,
      unlocked: true,
      progress: 87,
      maxProgress: 100
    },
    {
      id: 3,
      title: "Energy Champion",
      description: "Reduce energy usage for 7 consecutive days",
      points: 150,
      unlocked: false,
      progress: 4,
      maxProgress: 7
    },
    {
      id: 4,
      title: "Zero Waste Warrior",
      description: "Generate no waste for 3 days",
      points: 200,
      unlocked: false,
      progress: 1,
      maxProgress: 3
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-eco-leaf to-eco-moss flex items-center justify-center">
          <Award className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-medium text-lg">Complete achievements to earn points</h3>
          <p className="text-muted-foreground text-sm">Points can be used to unlock rewards and track your impact</p>
        </div>
      </div>
      
      <div className="grid gap-4 sm:grid-cols-2">
        {achievements.map((achievement) => (
          <div 
            key={achievement.id} 
            className={`eco-card relative overflow-hidden transition-all ${
              achievement.unlocked ? 'bg-white' : 'bg-muted/50'
            }`}
          >
            {achievement.unlocked && achievement.progress === achievement.maxProgress && (
              <div className="absolute top-2 right-2">
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Award className="w-3 h-3 text-primary" />
                </div>
              </div>
            )}
            
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                achievement.unlocked 
                  ? 'bg-gradient-to-br from-eco-leaf to-eco-moss text-white' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                {achievement.unlocked ? (
                  <Gift className="w-5 h-5" />
                ) : (
                  <Lock className="w-5 h-5" />
                )}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">{achievement.title}</h4>
                  <span className={`text-xs font-semibold ${
                    achievement.unlocked ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    +{achievement.points} pts
                  </span>
                </div>
                
                <p className="text-muted-foreground text-sm mt-0.5 mb-2">{achievement.description}</p>
                
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span>Progress</span>
                    <span className="font-medium">
                      {achievement.progress}/{achievement.maxProgress}
                    </span>
                  </div>
                  
                  <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${
                        achievement.unlocked && achievement.progress === achievement.maxProgress
                          ? 'bg-primary'
                          : 'bg-muted-foreground/50'
                      }`}
                      style={{ 
                        width: `${(achievement.progress / achievement.maxProgress) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RewardSystem;
