
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import * as soundManager from '@/utils/soundManager';

interface SoundToggleProps {
  className?: string;
}

const SoundToggle: React.FC<SoundToggleProps> = ({ className = '' }) => {
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    const newMutedState = soundManager.toggleMute();
    setIsMuted(newMutedState);
    
    // Play sound if unmuting
    if (!newMutedState) {
      soundManager.playSound('CLICK', 0.2);
    }
  };

  return (
    <motion.button
      className={`fixed bottom-4 left-4 z-50 w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white shadow-lg ${className}`}
      onClick={toggleMute}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5" />
      ) : (
        <Volume2 className="w-5 h-5" />
      )}
      <span className="sr-only">{isMuted ? 'Unmute' : 'Mute'} sounds</span>
      
      {/* Ripple effect when clicked */}
      <motion.div
        initial={{ scale: 0, opacity: 0.5 }}
        animate={{ scale: [0, 1.5], opacity: [0.5, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
        className="absolute inset-0 rounded-full bg-eco-leaf/20"
      />
    </motion.button>
  );
};

export default SoundToggle;
