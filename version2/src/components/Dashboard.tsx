
import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProgressChart from './ProgressChart';
import EcoReminder from './EcoReminder';
import RewardSystem from './RewardSystem';
import FootprintCalculator from './FootprintCalculator';
import EcoAIChat from './EcoAIChat';

interface DashboardProps {
  userName?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ userName = 'Eco Friend' }) => {
  const [loaded, setLoaded] = useState(false);
  const [scrollVisible, setScrollVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'calculator' | 'ai-chat'>('dashboard');

  // Sample data for the dashboard
  const stats = {
    points: 436,
    daysActive: 14,
    habitsCompleted: 23,
    carbonSaved: 45.2, // kg
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    setLoaded(true);
    
    const handleScroll = () => {
      setScrollVisible(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <div className="space-y-8">
      <motion.section 
        className={`transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <motion.h1 
          className="text-3xl font-bold tracking-tight"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Welcome, <span className="text-primary relative">
            {userName}
            <motion.span 
              className="absolute bottom-0 left-0 w-full h-1 bg-primary/30"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            />
          </span>
        </motion.h1>
        <motion.p 
          className="text-muted-foreground mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Your journey to sustainability starts here. Every small action counts!
        </motion.p>
      </motion.section>
      
      <motion.div 
        className="flex space-x-2 mb-6 overflow-x-auto hide-scrollbar"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <motion.button
          onClick={() => setActiveTab('dashboard')}
          className={`px-4 py-2 rounded-full whitespace-nowrap ${
            activeTab === 'dashboard' 
              ? 'bg-primary text-white shadow-lg shadow-primary/20' 
              : 'bg-muted hover:bg-muted/80'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Dashboard
        </motion.button>
        <motion.button
          onClick={() => setActiveTab('calculator')}
          className={`px-4 py-2 rounded-full whitespace-nowrap ${
            activeTab === 'calculator' 
              ? 'bg-primary text-white shadow-lg shadow-primary/20' 
              : 'bg-muted hover:bg-muted/80'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Footprint Calculator
        </motion.button>
        <motion.button
          onClick={() => setActiveTab('ai-chat')}
          className={`px-4 py-2 rounded-full whitespace-nowrap ${
            activeTab === 'ai-chat' 
              ? 'bg-primary text-white shadow-lg shadow-primary/20' 
              : 'bg-muted hover:bg-muted/80'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          AI Assistant
        </motion.button>
      </motion.div>
      
      <AnimatePresence mode="wait">
        {activeTab === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.5 }}
          >
            <motion.section 
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                className="eco-card glass-card bg-eco-leaf/5"
                variants={itemVariants}
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 10px 25px -5px rgba(76, 175, 80, 0.1), 0 10px 10px -5px rgba(76, 175, 80, 0.04)" 
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Eco Points</h3>
                  <motion.div 
                    className="w-10 h-10 rounded-full bg-eco-leaf/10 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.2 
                    }}
                  >
                    <motion.span 
                      className="text-eco-leaf font-semibold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {stats.points}
                    </motion.span>
                  </motion.div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Your sustainability score</p>
              </motion.div>
              
              <motion.div 
                className="eco-card glass-card bg-eco-sky/5"
                variants={itemVariants}
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 10px 25px -5px rgba(3, 169, 244, 0.1), 0 10px 10px -5px rgba(3, 169, 244, 0.04)" 
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Days Active</h3>
                  <motion.div 
                    className="w-10 h-10 rounded-full bg-eco-sky/10 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.3 
                    }}
                  >
                    <motion.span 
                      className="text-eco-sky font-semibold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {stats.daysActive}
                    </motion.span>
                  </motion.div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Your commitment streak</p>
              </motion.div>
              
              <motion.div 
                className="eco-card glass-card bg-eco-moss/5"
                variants={itemVariants}
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 10px 25px -5px rgba(104, 159, 56, 0.1), 0 10px 10px -5px rgba(104, 159, 56, 0.04)" 
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Habits Completed</h3>
                  <motion.div 
                    className="w-10 h-10 rounded-full bg-eco-moss/10 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.4 
                    }}
                  >
                    <motion.span 
                      className="text-eco-moss font-semibold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      {stats.habitsCompleted}
                    </motion.span>
                  </motion.div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Actions for the planet</p>
              </motion.div>
              
              <motion.div 
                className="eco-card glass-card bg-eco-earth/5"
                variants={itemVariants}
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 10px 25px -5px rgba(121, 85, 72, 0.1), 0 10px 10px -5px rgba(121, 85, 72, 0.04)" 
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Carbon Saved</h3>
                  <motion.div 
                    className="w-10 h-10 rounded-full bg-eco-earth/10 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.5 
                    }}
                  >
                    <motion.span 
                      className="text-eco-earth font-semibold"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      {stats.carbonSaved}
                    </motion.span>
                  </motion.div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">kg CO2 equivalent</p>
              </motion.div>
            </motion.section>
            
            <motion.section 
              className="grid gap-6 md:grid-cols-7 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <motion.div 
                className="md:col-span-4 eco-card glass-card"
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <motion.h2 
                  className="text-xl font-semibold mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Your Progress
                </motion.h2>
                <ProgressChart />
              </motion.div>
              
              <motion.div 
                className="md:col-span-3 eco-card glass-card"
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <motion.h2 
                  className="text-xl font-semibold mb-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Daily Reminder
                </motion.h2>
                <EcoReminder />
              </motion.div>
            </motion.section>
            
            <motion.section 
              className="eco-card glass-card mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ 
                y: -5, 
                boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
              }}
            >
              <motion.h2 
                className="text-xl font-semibold mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Rewards & Achievements
              </motion.h2>
              <RewardSystem />
            </motion.section>
          </motion.div>
        )}
        
        {activeTab === 'calculator' && (
          <motion.div
            key="calculator"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.5 }}
          >
            <FootprintCalculator />
          </motion.div>
        )}
        
        {activeTab === 'ai-chat' && (
          <motion.div
            key="ai-chat"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.5 }}
          >
            <EcoAIChat />
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button 
        onClick={scrollToTop} 
        className={`fixed bottom-24 right-6 p-3 rounded-full bg-primary text-white shadow-lg transition-all duration-300 sm:bottom-6 ${
          scrollVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </div>
  );
};

export default Dashboard;
