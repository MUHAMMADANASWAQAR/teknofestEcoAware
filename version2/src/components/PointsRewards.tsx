
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Gift, ShoppingBag, Plane, Percent } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface PointsRewardsProps {
  className?: string;
}

const PointsRewards: React.FC<PointsRewardsProps> = ({ className = '' }) => {
  const [points] = useState(450);
  const isMobile = useIsMobile();
  
  const rewards = [
    { 
      id: 1, 
      title: "10% Shopping Discount", 
      points: 200, 
      description: "Get 10% off your next eco-friendly purchase",
      icon: <ShoppingBag className="w-5 h-5" />,
      redeemed: true 
    },
    { 
      id: 2, 
      title: "Travel Carbon Offset", 
      points: 350, 
      description: "Redeem a coupon for carbon offsetting your next flight",
      icon: <Plane className="w-5 h-5" />,
      redeemed: false 
    },
    { 
      id: 3, 
      title: "15% Eco-store Discount", 
      points: 500, 
      description: "Get 15% off at participating eco-friendly stores",
      icon: <Percent className="w-5 h-5" />,
      redeemed: false 
    }
  ];

  const handleRedeem = (id: number) => {
    // In a real app, this would call an API to redeem the reward
    console.log(`Redeeming reward ${id}`);
  };
  
  return (
    <div className={`${className}`}>
      <Sheet>
        <SheetTrigger asChild>
          <button className={`flex items-center ${isMobile ? 'w-full' : 'absolute top-4 right-4 z-10'} space-x-2 bg-primary/90 backdrop-blur-sm text-white px-4 py-2 rounded-full shadow-lg transition-all hover:bg-primary`}>
            <Gift className="w-5 h-5" />
            <span className="font-medium">{points} Points</span>
            <Badge variant="outline" className="ml-2 bg-white/20 text-white border-none">
              Rewards Available
            </Badge>
          </button>
        </SheetTrigger>
        <SheetContent side={isMobile ? "bottom" : "right"} className="bg-white/95 backdrop-blur-lg">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <h3 className="text-lg font-medium">Your Eco Points</h3>
              <div className="bg-primary/10 text-primary font-bold px-3 py-1 rounded-full">
                {points} pts
              </div>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-sm font-medium text-muted-foreground">Available Rewards</h4>
              
              <div className="space-y-4">
                {rewards.map((reward) => (
                  <div 
                    key={reward.id} 
                    className={`p-4 rounded-lg border ${reward.points <= points ? 'bg-white' : 'bg-muted/30'}`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex space-x-3">
                        <div className={`p-2 rounded-full ${reward.points <= points ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                          {reward.icon}
                        </div>
                        <div>
                          <h5 className="font-medium">{reward.title}</h5>
                          <p className="text-sm text-muted-foreground">{reward.description}</p>
                        </div>
                      </div>
                      <div className="text-sm font-medium text-muted-foreground">
                        {reward.points} pts
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-end">
                      {reward.redeemed ? (
                        <Badge variant="secondary">Redeemed</Badge>
                      ) : (
                        <button
                          onClick={() => handleRedeem(reward.id)}
                          disabled={reward.points > points}
                          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                            reward.points <= points 
                              ? 'bg-primary text-white hover:bg-primary/90' 
                              : 'bg-muted text-muted-foreground cursor-not-allowed'
                          }`}
                        >
                          Redeem
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default PointsRewards;
