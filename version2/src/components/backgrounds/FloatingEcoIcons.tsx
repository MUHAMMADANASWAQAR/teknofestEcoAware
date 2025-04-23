
import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Droplets, Sun } from 'lucide-react';

const FloatingEcoIcons = () => {
  const icons = [
    { Icon: Leaf, delay: 0, className: "text-eco-leaf" },
    { Icon: Droplets, delay: 0.2, className: "text-eco-sky" },
    { Icon: Sun, delay: 0.4, className: "text-eco-earth" },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {icons.map(({ Icon, delay, className }, index) => (
        <motion.div
          key={index}
          className={`absolute ${className}`}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: [0.2, 0.5, 0.2],
            scale: [0.8, 1, 0.8],
            y: [0, -20, 0],
            x: Math.random() * 20 - 10
          }}
          transition={{
            duration: 4,
            delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
          }}
        >
          <Icon className="w-8 h-8" />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingEcoIcons;
