import React, { useRef, useEffect } from 'react';
import Layout from '@/components/Layout';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Leaf, Heart, Droplets, Zap, Recycle } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import * as soundManager from '@/utils/soundManager';
import EcoSpirit from '@/components/EcoSpirit';
import AnimatedScene from '@/components/3d/AnimatedScene';
import { useNavigate } from 'react-router-dom';

const About: React.FC = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const springScrollY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  const opacity = useTransform(springScrollY, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(springScrollY, [0, 0.3, 0.8, 1], [100, 0, 0, -100]);
  
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  
  const section1InView = useInView(section1Ref, { once: false, amount: 0.3 });
  const section2InView = useInView(section2Ref, { once: false, amount: 0.3 });
  const section3InView = useInView(section3Ref, { once: false, amount: 0.3 });
  
  const initiatives = [
    {
      title: "Conservation",
      description: "Protecting natural ecosystems and biodiversity through community initiatives.",
      icon: <Leaf className="w-8 h-8 text-eco-leaf" />,
      color: "from-eco-leaf/20 to-eco-leaf/10"
    },
    {
      title: "Sustainability",
      description: "Promoting sustainable practices in everyday life to reduce environmental impact.",
      icon: <Recycle className="w-8 h-8 text-eco-moss" />,
      color: "from-eco-moss/20 to-eco-moss/10"
    },
    {
      title: "Water Protection",
      description: "Conserving water resources and preventing pollution of rivers and oceans.",
      icon: <Droplets className="w-8 h-8 text-eco-sky" />,
      color: "from-eco-sky/20 to-eco-sky/10"
    },
    {
      title: "Clean Energy",
      description: "Supporting renewable energy sources to reduce carbon emissions.",
      icon: <Zap className="w-8 h-8 text-eco-sand" />,
      color: "from-eco-sand/20 to-eco-sand/10"
    },
    {
      title: "Community Engagement",
      description: "Building a network of eco-conscious individuals working together for change.",
      icon: <Heart className="w-8 h-8 text-[#ff6b6b]" />,
      color: "from-[#ff6b6b]/20 to-[#ff6b6b]/10"
    }
  ];
  
  useEffect(() => {
    soundManager.initSounds();
    
    // Play different ambient sounds based on which section is in view
    if (section1InView) {
      soundManager.playAmbient('FOREST');
    } else if (section2InView) {
      soundManager.playAmbient('BIRDS');
    } else if (section3InView) {
      soundManager.playAmbient('WATER');
    }
    
    return () => {
      soundManager.stopAmbient();
    };
  }, [section1InView, section2InView, section3InView]);
  
  const FloatingLeaves = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {Array.from({ length: 20 }).map((_, i) => {
          const size = 10 + Math.random() * 20;
          const duration = 15 + Math.random() * 20;
          const delay = Math.random() * 10;
          const initialX = Math.random() * 100;
          const initialY = -20 - Math.random() * 100;
          
          return (
            <motion.div
              key={i}
              initial={{ 
                x: `${initialX}vw`, 
                y: `${initialY}vh`, 
                rotate: 0,
                opacity: 0.7 + Math.random() * 0.3
              }}
              animate={{ 
                x: `${initialX + (-20 + Math.random() * 40)}vw`, 
                y: '120vh', 
                rotate: 360 * (Math.random() > 0.5 ? 1 : -1)
              }}
              transition={{ 
                duration, 
                delay, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="absolute"
              style={{ width: size, height: size }}
            >
              <Leaf 
                className="text-eco-leaf/30 w-full h-full"
                style={{ filter: 'blur(1px)' }}
              />
            </motion.div>
          );
        })}
      </div>
    );
  };
  
  const SunriseGradient = () => {
    return (
      <div 
        className="absolute inset-0 -z-10"
        style={{
          background: 'linear-gradient(to bottom bg-[#F2FDF6])',
          opacity: 0.3,
        }}
      />
    );
  };
  
  return (
    
      <div className="relative min-h-screen " ref={containerRef} >
        <div className="fixed inset-0 -z-10">
          <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
            <AnimatedScene />
          </Canvas>
        </div>
        
        {/* Overlay gradient for better readability */}
        <div className="fixed inset-0 -z-5 bg-gradient-to-b from-green 500/30 to-transparent pointer-events-none" />
        
        {/* Sunrise Gradient */}
        <SunriseGradient />
        
        {/* Floating Leaves */}
        <FloatingLeaves />
        
        <EcoSpirit message="Welcome to our story! Scroll to learn more about our mission." position="bottom-right" />
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 pt-16 pb-32">
          <div ref={section1Ref}>
            <motion.div 
              className="text-center mb-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1 
                className="text-4xl md:text-6xl font-bold mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                About <span className="bg-gradient-to-r from-eco-leaf to-eco-sky bg-clip-text text-transparent">EcoAware</span>
              </motion.h1>
              
              <motion.p 
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Empowering individuals to make sustainable choices and create a positive environmental impact through technology and community.
              </motion.p>
            </motion.div>
          </div>
          
          <div ref={section2Ref}>
            <motion.div 
              style={{ opacity, y }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {initiatives.map((initiative, index) => (
                <motion.div
                  key={initiative.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: 0.1 * index, duration: 0.6 }}
                  whileHover={{ 
                    y: -10, 
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  className={`rounded-2xl p-6 bg-gradient-to-br ${initiative.color} backdrop-blur-md border border-white/10 shadow-xl`}
                  onClick={() => soundManager.playSound('CLICK')}
                >
                  <div className="w-16 h-16 rounded-xl bg-white/10 backdrop-blur-lg flex items-center justify-center mb-4">
                    {initiative.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{initiative.title}</h3>
                  <p className="text-muted-foreground">{initiative.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          <div ref={section3Ref} className="mt-32">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              
              <div className="relative">
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 1.2 }}
                  className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-1 bg-gradient-to-b from-eco-leaf to-eco-sky origin-top"
                />
                
                {Array.from({ length: 3 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: 0.2 * i, duration: 0.8 }}
                    className={`relative mb-16 text-left flex items-center ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    <div className="w-1/2 p-6">
                      <h3 className="text-2xl font-semibold mb-2">
                        {i === 0 ? "Sustainability for All" : i === 1 ? "Technology with Purpose" : "Community-Driven Change"}
                      </h3>
                      <p className="text-lg text-muted-foreground">
                        {i === 0 ? 
                          "Making eco-friendly choices accessible and rewarding for people from all walks of life." :
                          i === 1 ? 
                            "Leveraging technology to track impact and visualize the difference each action makes." :
                            "Building a global community of environmentally conscious individuals taking action together."
                        }
                      </p>
                    </div>
                    
                    <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-eco-leaf flex items-center justify-center z-10">
                      <Leaf className="w-4 h-4 text-white" />
                    </div>
                    
                    <div className="w-1/2 p-6">
                      <div className={`h-40 rounded-xl overflow-hidden bg-gradient-to-br ${
                        i === 0 ? "from-eco-leaf/30 to-eco-leaf/10" :
                        i === 1 ? "from-eco-sky/30 to-eco-sky/10" :
                        "from-eco-earth/30 to-eco-earth/10"
                      }`}>
                        <motion.div
                          className="w-full h-full flex items-center justify-center"
                          whileHover={{ scale: 1.05 }}
                        >
                          {i === 0 ? 
                            <Leaf className="w-16 h-16 text-eco-leaf" /> :
                            i === 1 ? 
                              <Zap className="w-16 h-16 text-eco-sky" /> :
                              <Heart className="w-16 h-16 text-eco-earth" />
                          }
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <motion.p 
                className="text-xl text-muted-foreground max-w-3xl mx-auto mt-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                To create a world where sustainable living is accessible, engaging, and rewarding for everyone. Through technology and community, we're making eco-friendly choices the natural choice.
              </motion.p>
              
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 px-8 py-3 bg-eco-leaf text-white rounded-full hover:bg-eco-leaf/90 transition-all shadow-lg"
                onClick={() => {
                  navigate('/login');
                }}
              >
                Join Our Mission
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    
  );
};

export default About;
