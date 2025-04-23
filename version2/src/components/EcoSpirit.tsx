
import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Leaf } from 'lucide-react';

interface EcoSpiritProps {
  message?: string;
  position?: 'top-right' | 'bottom-right' | 'top-left' | 'bottom-left';
  onClose?: () => void;
  autoHide?: boolean;
  hideAfter?: number;
}

const EcoSpirit: React.FC<EcoSpiritProps> = ({
  message = "Hi there! I'm your EcoSpirit guide.",
  position = 'bottom-right',
  onClose,
  autoHide = false,
  hideAfter = 8000,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMessageVisible, setIsMessageVisible] = useState(!!message);
  const controls = useAnimation();
  const hoverRef = useRef<HTMLDivElement>(null);
  
  // Position classes based on position prop
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'bottom-right': 'bottom-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-left': 'bottom-4 left-4',
  };
  
  useEffect(() => {
    // Floating animation
    controls.start({
      y: [0, -15, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    });
    
    // Auto-hide message after delay
    if (autoHide && message) {
      const timer = setTimeout(() => {
        setIsMessageVisible(false);
      }, hideAfter);
      
      return () => clearTimeout(timer);
    }
  }, [autoHide, message, hideAfter]);
  
  // Manage different reaction animations
  const playReaction = (type: 'happy' | 'excited' | 'thinking') => {
    switch (type) {
      case 'happy':
        controls.start({
          rotate: [0, 10, -10, 10, 0],
          scale: [1, 1.2, 1],
          transition: { duration: 1 }
        });
        break;
      case 'excited':
        controls.start({
          y: [0, -30, 0, -20, 0],
          scale: [1, 1.3, 1.1, 1.2, 1],
          transition: { duration: 1.2 }
        });
        break;
      case 'thinking':
        controls.start({
          rotate: [0, 5, 0, 5, 0],
          scale: [1, 1.1, 1, 1.1, 1],
          transition: { duration: 2 }
        });
        break;
    }
  };
  
  const handleSpiritClick = () => {
    setIsMessageVisible(!isMessageVisible);
    playReaction('happy');
  };
  
  if (!isVisible) return null;
  
  return (
    <div 
      className={`fixed ${positionClasses[position]} z-50 flex items-end gap-3`}
      ref={hoverRef}
    >
      {/* Message bubble */}
      {isMessageVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          className="max-w-xs p-4 rounded-2xl bg-eco-leaf/90 text-white shadow-lg backdrop-blur-sm"
        >
          <div className="relative">
            {message}
            {onClose && (
              <button 
                onClick={() => {
                  setIsVisible(false);
                  onClose?.();
                }}
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs hover:bg-white/40 transition-colors"
              >
                ×
              </button>
            )}
          </div>
          
          {/* Pointer */}
          <div className="absolute bottom-3 right-[-8px] w-4 h-4 bg-eco-leaf/90 transform rotate-45" />
        </motion.div>
      )}
      
      {/* The spirit */}
      <motion.div
        animate={controls}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleSpiritClick}
        className="w-16 h-16 rounded-full bg-gradient-to-br from-eco-leaf to-eco-sky flex items-center justify-center shadow-lg cursor-pointer relative"
      >
        <div className="absolute inset-0 rounded-full bg-white opacity-20 animate-pulse" />
        <Leaf className="w-8 h-8 text-white" />
      </motion.div>
    </div>
  );
};

export default EcoSpirit;
