
import React, { useState, useRef, useEffect } from 'react';
import { Check, Circle, PlusCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from "sonner";
import { triggerConfetti, numberWithAnimation } from '@/utils/animationUtils';

interface Habit {
  id: number;
  name: string;
  category: 'energy' | 'water' | 'waste';
  completed: boolean;
  streak: number;
  animating?: boolean;
}

const HabitTracker: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>([
    { id: 1, name: 'Turn off lights when not in use', category: 'energy', completed: true, streak: 7 },
    { id: 2, name: 'Take shorter showers', category: 'water', completed: false, streak: 3 },
    { id: 3, name: 'Use reusable bags', category: 'waste', completed: true, streak: 5 },
    { id: 4, name: 'Unplug electronics when not in use', category: 'energy', completed: false, streak: 0 },
    { id: 5, name: 'Use cold water for laundry', category: 'water', completed: false, streak: 2 },
  ]);
  
  const [newHabit, setNewHabit] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'energy' | 'water' | 'waste'>('energy');
  const [showAddForm, setShowAddForm] = useState(false);
  const habitRefs = useRef<{ [key: number]: HTMLDivElement }>({});

  const toggleHabit = (id: number) => {
    setHabits(prevHabits => 
      prevHabits.map(habit => {
        if (habit.id === id) {
          const wasCompleted = habit.completed;
          // Set animating flag for the streak counter
          return { 
            ...habit, 
            completed: !wasCompleted, 
            streak: !wasCompleted ? habit.streak + 1 : habit.streak,
            animating: !wasCompleted 
          };
        }
        return habit;
      })
    );

    // Find the habit that was toggled
    const habit = habits.find(h => h.id === id);
    
    // Only trigger confetti and toast if completing a habit
    if (habit && !habit.completed) {
      const habitElement = habitRefs.current[id];
      triggerConfetti(habitElement);
      
      toast.success("Habit completed! 🌱", {
        description: "Great job on your eco-friendly action!"
      });

      // Reset animating flag after animation completes
      setTimeout(() => {
        setHabits(prevHabits => 
          prevHabits.map(h => h.id === id ? { ...h, animating: false } : h)
        );
      }, 2000);
    }
  };

  const addHabit = () => {
    if (newHabit.trim() === '') return;
    
    const newId = Math.max(0, ...habits.map(h => h.id)) + 1;
    
    setHabits(prevHabits => [
      ...prevHabits,
      {
        id: newId,
        name: newHabit,
        category: selectedCategory,
        completed: false,
        streak: 0
      }
    ]);
    
    setNewHabit('');
    setShowAddForm(false);
    
    toast.success("New habit added!", {
      description: "Track your progress with this new eco-friendly habit."
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'energy': return 'bg-eco-leaf/10 text-eco-leaf border-eco-leaf/20';
      case 'water': return 'bg-eco-sky/10 text-eco-sky border-eco-sky/20';
      case 'waste': return 'bg-eco-earth/10 text-eco-earth border-eco-earth/20';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <motion.h2 
          className="text-2xl font-bold"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your Habits
        </motion.h2>
        
        <motion.button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <PlusCircle className="w-5 h-5" />
          <span>Add New Habit</span>
        </motion.button>
      </div>
      
      <AnimatePresence>
        {showAddForm && (
          <motion.div 
            className="eco-card"
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <h3 className="text-lg font-medium mb-4">Create New Habit</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Habit Name</label>
              <input
                type="text"
                value={newHabit}
                onChange={(e) => setNewHabit(e.target.value)}
                placeholder="e.g., Recycle paper and plastic"
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <div className="flex space-x-2 flex-wrap gap-2">
                <motion.button
                  onClick={() => setSelectedCategory('energy')}
                  className={`px-3 py-1.5 rounded-full text-sm ${
                    selectedCategory === 'energy' 
                      ? 'bg-eco-leaf text-white' 
                      : 'bg-eco-leaf/10 text-eco-leaf'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Energy
                </motion.button>
                <motion.button
                  onClick={() => setSelectedCategory('water')}
                  className={`px-3 py-1.5 rounded-full text-sm ${
                    selectedCategory === 'water' 
                      ? 'bg-eco-sky text-white' 
                      : 'bg-eco-sky/10 text-eco-sky'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Water
                </motion.button>
                <motion.button
                  onClick={() => setSelectedCategory('waste')}
                  className={`px-3 py-1.5 rounded-full text-sm ${
                    selectedCategory === 'waste' 
                      ? 'bg-eco-earth text-white' 
                      : 'bg-eco-earth/10 text-eco-earth'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Waste
                </motion.button>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3">
              <motion.button 
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 rounded-lg border border-border text-gray-600 hover:bg-gray-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
              <motion.button 
                onClick={addHabit}
                className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90"
                disabled={newHabit.trim() === ''}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Create Habit
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="grid gap-4 sm:grid-cols-2">
        <AnimatePresence>
          {habits.map((habit) => (
            <motion.div 
              key={habit.id} 
              ref={el => el && (habitRefs.current[habit.id] = el)}
              className={`eco-card hover:shadow-md border-l-4 ${
                habit.category === 'energy' ? 'border-l-eco-leaf' :
                habit.category === 'water' ? 'border-l-eco-sky' : 'border-l-eco-earth'
              }`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', damping: 15 }}
              layout
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium mb-1">{habit.name}</h3>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getCategoryColor(habit.category)}`}>
                      {habit.category.charAt(0).toUpperCase() + habit.category.slice(1)}
                    </span>
                    {habit.streak > 0 && (
                      <motion.span 
                        className="text-xs bg-accent/50 text-accent-foreground px-2 py-0.5 rounded-full"
                        key={`streak-${habit.id}-${habit.streak}`}
                        initial={habit.animating ? { scale: 0.8 } : { scale: 1 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          type: 'spring', 
                          stiffness: 500, 
                          damping: 15 
                        }}
                      >
                        {habit.streak} day streak
                      </motion.span>
                    )}
                  </div>
                </div>
                
                <motion.button 
                  onClick={() => toggleHabit(habit.id)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                    habit.completed
                      ? 'bg-primary text-white' 
                      : 'border-2 border-muted-foreground/30 text-transparent hover:border-primary/50'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  animate={habit.completed ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {habit.completed ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HabitTracker;
