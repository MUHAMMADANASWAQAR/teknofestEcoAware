
import React, { useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Building, Wind, Recycle, Leaf, Users } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Environment, OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import EcoSpirit from '@/components/EcoSpirit';
import * as soundManager from '@/utils/soundManager';


// 3D Earth Component
const Earth = () => {
  const earthRef = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  
  useEffect(() => {
    return () => {
      // Clean up textures
      if (earthRef.current) {
        earthRef.current.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            if (child.material instanceof THREE.Material) {
              child.material.dispose();
            }
            if (child.geometry) {
              child.geometry.dispose();
            }
          }
        });
      }
    };
  }, []);
  
  useEffect(() => {
    // Start ambient sound when Earth is visible
    soundManager.playAmbient('WIND', true);
    
    return () => {
      soundManager.stopAmbient();
    };
  }, []);
  
  return (
    <group ref={earthRef}>
      {/* Earth sphere */}
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          color="#2E7D32" 
          roughness={0.8}
          metalness={0.1}
          emissive="#1B5E20"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Clouds layer */}
      <mesh ref={cloudsRef} scale={1.02}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial 
          color="white" 
          transparent 
          opacity={0.3} 
          roughness={1}
          depthWrite={false}
        />
      </mesh>
      
      {/* Atmosphere glow */}
      <mesh scale={1.1}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial
          color="#81C784"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Land masses */}
      {Array.from({ length: 7 }).map((_, i) => {
        const lat = Math.random() * Math.PI - Math.PI / 2;
        const lon = Math.random() * Math.PI * 2;
        const size = 0.2 + Math.random() * 0.3;
        
        const x = Math.cos(lat) * Math.cos(lon) * 2;
        const y = Math.sin(lat) * 2;
        const z = Math.cos(lat) * Math.sin(lon) * 2;
        
        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[size, 16, 16]} />
            <meshStandardMaterial color="#388E3C" />
          </mesh>
        );
      })}
    </group>
  );
};

const RotatingEarth = () => {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Stars radius={100} depth={50} count={1000} factor={4} fade />
      
      <group rotation={[0, 0, -0.2]}>
        <Earth />
      </group>
      
      <OrbitControls 
        enableZoom={false} 
        enablePan={false}
        enableRotate={true}
        autoRotate={true}
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 2}
      />
      
      <Environment preset="sunset" />
    </Canvas>
  );
};

const Projects: React.FC = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const springScrollY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  const projects = [
    {
      title: "Track Your Habits",
      description: "Log daily eco-friendly actions like saving water, using public transport, and recycling. Turn your green efforts into daily habits.",
      icon: <Leaf />,
      image: "https://media.licdn.com/dms/image/v2/D4D12AQGshRCqw6mlTw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1721178039135?e=2147483647&v=beta&t=l97bxm9OcJzhg4J09p69rUP79pf12JynDjGoAvqoTmE",
      color: "from-eco-leaf to-eco-moss"
    },
    {
      title: "Earn Eco Rewards",
      description: "Every green action earns you points. Redeem them for discounts, digital badges, or even planting a real tree in your name.",
      icon: <Recycle />,
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop",
      color: "from-eco-gold to-[#ffd54f]"
    },
    {
      title: "Join the Community",
      description: "Connect with other eco-conscious users, share tips, participate in challenges, and grow together as a force for the planet.",
      icon: <Users />,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop",
      color: "from-[#5c6bc0] to-[#9575cd]"
    },
    {
      title: "Visualize Your Impact",
      description: "See the real-world impact of your actions. From CO2 saved to water conserved, your dashboard makes progress visible.",
      icon: <Wind />,
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfSmkxu57twnQ6qDHV8tdXtshVfgb1vhGhzQ&s",
      color: "from-eco-sky to-[#64b5f6]"
    },
    {
      title: "Learn to Live Green",
      description: "Explore eco-guides, challenges, and expert content tailored to help you live sustainably—step by step.",
      icon: <Building />,
      image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=800&auto=format&fit=crop",
      color: "from-eco-sand to-[#ffcc80]"
    }
  ];
  
  
  const opacity = useTransform(springScrollY, [0, 0.2], [0, 1]);
  const y = useTransform(springScrollY, [0, 0.2], [50, 0]);
  
  useEffect(() => {
    // Initialize sound system
    soundManager.initSounds();
    
    return () => {
      soundManager.stopAmbient();
    };
  }, []);
  
  return (
   <>
      <div className="relative min-h-screen " ref={containerRef} >
        <div className="h-screen w-full fixed top-0 left-0 -z-10">
          <RotatingEarth />
        </div>
        
        <EcoSpirit 
          message="Explore the Possibilities." 
          position="bottom-right"
        />
        
        <div className="relative z-10 container max-w-6xl mx-auto px-4 pt-24 pb-32">
          <motion.div
            className="text-center mb-16"
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
             Explore the  <span className="bg-gradient-to-r from-eco-leaf to-eco-sky bg-clip-text text-transparent">Possibilities</span>
            </motion.h1>
            
            <motion.p
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Your gateway to all eco-friendly initiatives and community projects! Discover new ways to contribute to a greener world and track the impact of your actions.
            </motion.p>
          </motion.div>
          
          <motion.div
            style={{ opacity, y }}
            className="space-y-16"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.8 }}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
                onClick={() => soundManager.playSound('CLICK')}
              >
                <div className={`flex flex-col md:flex-row items-center glass-card rounded-3xl overflow-hidden backdrop-blur-sm ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="w-full md:w-1/2 relative overflow-hidden h-64 md:h-80">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-30 group-hover:opacity-40 transition-opacity`}></div>
                    
                    {/* Ripple effect on hover */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 2, opacity: 0.4 }}
                        transition={{ duration: 0.8 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-white/30 backdrop-blur-sm"
                      />
                    </div>
                    
                    <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                      {project.icon}
                    </div>
                  </div>
                  
                  <div className="w-full md:w-1/2 p-8 md:p-10">
                    <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
                    <p className="text-muted-foreground mb-6">{project.description}</p>
                    
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="inline-flex items-center text-primary font-medium group/link"
                    >
                      Learn more
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-center mt-24"
          >
            <h2 className="text-2xl font-bold mb-4">Want to get involved?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our growing community of environmental advocates and make a difference in your area.
            </p>
            
            <motion.div className="flex flex-wrap gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(76, 175, 80, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 text-lg font-medium rounded-full bg-eco-leaf/80 text-white backdrop-blur-sm hover:bg-eco-leaf transition-all duration-300 shadow-lg"
                onClick={() => {
                  soundManager.playSound('CLICK');
                  navigate('/dashboard');
                }}
              >
              Back
              </motion.button>
              
             
            </motion.div>
          </motion.div>
        </div>
      </div>
   </>
  );
};

export default Projects;
