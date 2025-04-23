
import React, { useEffect, useRef } from 'react';
import Layout from '../components/Layout';
import Dashboard from '../components/Dashboard';
import { useNavigate } from 'react-router-dom';
import { Leaf, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { triggerConfetti } from '@/utils/animationUtils';
import ForestBackground from '@/components/backgrounds/ForestBackground';

const Index: React.FC = () => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const scrollToContent = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Show welcome animation only on first visit
    const hasVisited = localStorage.getItem('hasVisitedEcoAware');
    if (!hasVisited) {
      setTimeout(() => triggerConfetti(), 1500);
      localStorage.setItem('hasVisitedEcoAware', 'true');
    }
  }, []);

  return (
    <>
      <div className="relative h-screen overflow-hidden">
        <ForestBackground />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-lg flex items-center justify-center mx-auto mb-6 shadow-lg"
            >
              <Leaf className="w-12 h-12 text-white" />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg"
            >
             Your Eco  <span className="bg-gradient-to-r from-eco-leaf to-eco-sky bg-clip-text text-transparent">Dashboard</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto"
            >
              Track your green journey and see the impact of your choices.
            </motion.p>
            
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(76, 175, 80, 0.6)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/about')}
              className="px-8 py-3 text-lg font-medium rounded-full bg-eco-leaf/80 text-white backdrop-blur-sm hover:bg-eco-leaf transition-all duration-300 shadow-lg"
            >
              Discover More
            </motion.button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-12 cursor-pointer"
            onClick={scrollToContent}
          >
            <ChevronDown className="w-10 h-10 text-white/80 animate-bounce" />
          </motion.div>
        </div>
      </div>
      
      <div ref={scrollRef}>
        <Layout>
          <Dashboard userName="Eco Friend" />
        </Layout>
      </div>
    </>
  );
};

export default Index;
