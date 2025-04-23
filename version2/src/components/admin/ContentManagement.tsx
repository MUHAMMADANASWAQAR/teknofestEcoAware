
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Leaf, 
  MessageSquare, 
  Award,
  SortAsc,
  SortDesc,
  Filter
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

// Dummy data
const dummyEcoTips = [
  { id: 1, tip: "Turn off lights when you leave a room to save energy.", active: true },
  { id: 2, tip: "Use a reusable water bottle instead of buying plastic ones.", active: true },
  { id: 3, tip: "Take shorter showers to conserve water.", active: true },
  { id: 4, tip: "Unplug electronics when not in use to reduce phantom energy usage.", active: false },
  { id: 5, tip: "Use cloth bags for shopping instead of plastic bags.", active: true },
];

const dummyHabits = [
  { id: 1, name: "Take reusable bag shopping", category: "waste", difficulty: "easy", points: 10, active: true },
  { id: 2, name: "Turn off tap while brushing teeth", category: "water", difficulty: "easy", points: 5, active: true },
  { id: 3, name: "Walk or cycle instead of driving", category: "energy", difficulty: "medium", points: 20, active: true },
  { id: 4, name: "Use energy-efficient light bulbs", category: "energy", difficulty: "easy", points: 15, active: true },
  { id: 5, name: "Compost food waste", category: "waste", difficulty: "medium", points: 25, active: false },
];

const dummyAchievements = [
  { id: 1, name: "Water Saver", description: "Complete water-saving habits 10 times", points: 100, icon: "droplet", active: true },
  { id: 2, name: "Energy Champion", description: "Save 100kWh of energy", points: 200, icon: "zap", active: true },
  { id: 3, name: "Waste Warrior", description: "Reduce your waste by 50%", points: 150, icon: "trash", active: true },
  { id: 4, name: "Carbon Crusher", description: "Reduce carbon footprint by 200kg", points: 300, icon: "cloud", active: false },
];

export const ContentManagement = () => {
  const [ecoTips, setEcoTips] = useState(dummyEcoTips);
  const [habits, setHabits] = useState(dummyHabits);
  const [achievements, setAchievements] = useState(dummyAchievements);
  const [newTip, setNewTip] = useState("");
  const { toast } = useToast();
  
  const toggleItemStatus = (type: string, id: number) => {
    if (type === 'tips') {
      setEcoTips(ecoTips.map(tip => 
        tip.id === id ? { ...tip, active: !tip.active } : tip
      ));
    } else if (type === 'habits') {
      setHabits(habits.map(habit => 
        habit.id === id ? { ...habit, active: !habit.active } : habit
      ));
    } else if (type === 'achievements') {
      setAchievements(achievements.map(achievement => 
        achievement.id === id ? { ...achievement, active: !achievement.active } : achievement
      ));
    }
    
    toast({
      title: "Status Updated",
      description: "The item status has been updated successfully."
    });
  };
  
  const handleAddTip = () => {
    if (newTip.trim()) {
      const newTipObj = {
        id: ecoTips.length + 1,
        tip: newTip,
        active: true
      };
      setEcoTips([...ecoTips, newTipObj]);
      setNewTip("");
      toast({
        title: "Tip Added",
        description: "The eco tip has been added successfully."
      });
    }
  };
  
  const handleDeleteItem = (type: string, id: number) => {
    if (type === 'tips') {
      setEcoTips(ecoTips.filter(tip => tip.id !== id));
    } else if (type === 'habits') {
      setHabits(habits.filter(habit => habit.id !== id));
    } else if (type === 'achievements') {
      setAchievements(achievements.filter(achievement => achievement.id !== id));
    }
    
    toast({
      title: "Item Deleted",
      description: "The item has been deleted successfully."
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Content Management</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <SortAsc className="mr-2 h-4 w-4" />
              Sort A-Z
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SortDesc className="mr-2 h-4 w-4" />
              Sort Z-A
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <Tabs defaultValue="eco-tips">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="eco-tips">
            <MessageSquare className="mr-2 h-4 w-4" />
            Eco Tips
          </TabsTrigger>
          <TabsTrigger value="habits">
            <Leaf className="mr-2 h-4 w-4" />
            Habits
          </TabsTrigger>
          <TabsTrigger value="achievements">
            <Award className="mr-2 h-4 w-4" />
            Achievements
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="eco-tips" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add New Eco Tip</CardTitle>
              <CardDescription>Create new tips to inspire users towards sustainable living.</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="Enter a new eco tip..." 
                value={newTip}
                onChange={(e) => setNewTip(e.target.value)}
              />
            </CardContent>
            <CardFooter>
              <Button onClick={handleAddTip}>
                <Plus className="mr-2 h-4 w-4" />
                Add Tip
              </Button>
            </CardFooter>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ecoTips.map((tip) => (
              <Card key={tip.id} className={tip.active ? '' : 'opacity-60'}>
                <CardHeader className="p-4">
                  <CardTitle className="text-base">{tip.tip}</CardTitle>
                </CardHeader>
                <CardFooter className="flex justify-between p-4 pt-0">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id={`tip-${tip.id}`}
                      checked={tip.active}
                      onCheckedChange={() => toggleItemStatus('tips', tip.id)}
                    />
                    <label htmlFor={`tip-${tip.id}`} className="text-sm">Active</label>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDeleteItem('tips', tip.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="habits" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Habits Management</CardTitle>
              <CardDescription>Manage the habits that users can track in the application.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {habits.map((habit) => (
                  <Card key={habit.id} className={habit.active ? '' : 'opacity-60'}>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">{habit.name}</CardTitle>
                      <CardDescription>
                        Category: {habit.category} | Difficulty: {habit.difficulty} | Points: {habit.points}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between p-4 pt-0">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id={`habit-${habit.id}`}
                          checked={habit.active}
                          onCheckedChange={() => toggleItemStatus('habits', habit.id)}
                        />
                        <label htmlFor={`habit-${habit.id}`} className="text-sm">Active</label>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteItem('habits', habit.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New Habit
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Achievements Management</CardTitle>
              <CardDescription>Manage the achievements that users can earn in the application.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <Card key={achievement.id} className={achievement.active ? '' : 'opacity-60'}>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">{achievement.name}</CardTitle>
                      <CardDescription>
                        {achievement.description} | Points: {achievement.points}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex justify-between p-4 pt-0">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id={`achievement-${achievement.id}`}
                          checked={achievement.active}
                          onCheckedChange={() => toggleItemStatus('achievements', achievement.id)}
                        />
                        <label htmlFor={`achievement-${achievement.id}`} className="text-sm">Active</label>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDeleteItem('achievements', achievement.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New Achievement
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};
