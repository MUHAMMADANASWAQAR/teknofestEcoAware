
import React, { useState, useEffect, useRef } from 'react';
import { Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ecoTips = [
  "Turn off lights when you leave a room to save energy.",
  "Use a reusable water bottle instead of buying plastic ones.",
  "Take shorter showers to conserve water.",
  "Unplug electronics when not in use to reduce phantom energy usage.",
  "Use cloth bags for shopping instead of plastic bags.",
  "Compost food scraps to reduce landfill waste.",
  "Ride a bike or walk for short distances instead of driving.",
  "Use cold water for laundry to save energy.",
  "Plant trees or support tree-planting initiatives.",
  "Reduce meat consumption to lower your carbon footprint."
];

const EcoReminder: React.FC = () => {
  const [currentTip, setCurrentTip] = useState(ecoTips[0]);
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    // Change tip every 15 seconds
    const interval = setInterval(() => {
      const newIndex = (tipIndex + 1) % ecoTips.length;
      setTipIndex(newIndex);
      setCurrentTip(ecoTips[newIndex]);
    }, 15000);
    
    return () => clearInterval(interval);
  }, [tipIndex]);

  const handleNextTip = () => {
    const newIndex = (tipIndex + 1) % ecoTips.length;
    setTipIndex(newIndex);
    setCurrentTip(ecoTips[newIndex]);
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center space-x-2 mb-4">
        <motion.div 
          className="w-8 h-8 rounded-full bg-eco-leaf/10 flex items-center justify-center"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ 
            repeat: Infinity, 
            duration: 3,
            repeatType: "reverse", 
            ease: "easeInOut" 
          }}
        >
          <Bell className="w-4 h-4 text-eco-leaf" />
        </motion.div>
        <span className="text-sm text-muted-foreground">Today's Eco Tip</span>
      </div>
      
      <div className="bg-eco-leaf/5 rounded-xl p-4 mb-3 min-h-[100px] flex items-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={tipIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {currentTip}
          </motion.p>
        </AnimatePresence>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="flex space-x-1">
          {ecoTips.map((_, index) => (
            <motion.div 
              key={index} 
              className={`w-2 h-2 rounded-full ${index === tipIndex ? 'bg-eco-leaf' : 'bg-eco-leaf/30'}`}
              animate={{ 
                scale: index === tipIndex ? 1.3 : 1,
                backgroundColor: index === tipIndex ? 'rgb(76, 175, 80)' : 'rgba(76, 175, 80, 0.3)'
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
        
        <motion.button 
          onClick={handleNextTip}
          className="text-xs text-primary font-medium hover:underline"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Next Tip
        </motion.button>
      </div>
    </div>
  );
};

export default EcoReminder;
