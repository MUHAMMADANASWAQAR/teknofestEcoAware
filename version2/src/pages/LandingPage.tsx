
import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, ChevronDown, Layout } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Environment, OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Define proper interfaces for 3D component props
interface FloatingIslandProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

interface TreesProps {
  position?: [number, number, number];
  scale?: [number, number, number];
}

interface BirdProps {
  position: [number, number, number];
  rotation: [number, number, number];
}

interface CloudProps {
  position: [number, number, number];
  scale?: [number, number, number];
}

// 3D Models Components
const FloatingIsland: React.FC<FloatingIslandProps> = ({ position = [0, 0, 0], rotation = [0, 0, 0] }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useEffect(() => {
    // Floating animation
    const interval = setInterval(() => {
      if (groupRef.current) {
        groupRef.current.position.y = position[1] + Math.sin(Date.now() * 0.001) * 0.2;
      }
    }, 16);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <group ref={groupRef} position={position} rotation={rotation}>
      {/* Base Island */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[3, 4, 1, 32]} />
        <meshStandardMaterial color="#5D4037" roughness={0.8} />
      </mesh>
      
      {/* Top grass */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[3, 3, 0.2, 32]} />
        <meshStandardMaterial color="#7CB342" roughness={0.6} />
      </mesh>
      
      {/* Trees */}
      <Trees position={[1, 0.5, 1]} />
      <Trees position={[-1.5, 0.5, -0.5]} scale={[0.8, 0.8, 0.8]} />
      <Trees position={[0.5, 0.5, -1.5]} scale={[0.7, 0.7, 0.7]} />
      
      {/* Water pool */}
      <mesh position={[0, 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1, 32]} />
        <meshStandardMaterial color="#64B5F6" transparent opacity={0.8} metalness={0.1} roughness={0.1} />
      </mesh>
    </group>
  );
};

const Trees: React.FC<TreesProps> = ({ position = [0, 0, 0], scale = [1, 1, 1] }) => {
  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.1, 0.15, 1.4, 8]} />
        <meshStandardMaterial color="#5D4037" />
      </mesh>
      
      {/* Leaves */}
      <mesh position={[0, 1.5, 0]}>
        <coneGeometry args={[0.5, 1.2, 8]} />
        <meshStandardMaterial color="#388E3C" />
      </mesh>
      <mesh position={[0, 1.9, 0]} scale={[0.8, 0.8, 0.8]}>
        <coneGeometry args={[0.4, 1, 8]} />
        <meshStandardMaterial color="#43A047" />
      </mesh>
      <mesh position={[0, 2.3, 0]} scale={[0.6, 0.6, 0.6]}>
        <coneGeometry args={[0.3, 0.8, 8]} />
        <meshStandardMaterial color="#4CAF50" />
      </mesh>
    </group>
  );
};

const Birds = () => {
  const birdsRef = useRef<THREE.Group>(null);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (birdsRef.current) {
        // Flying movement
        birdsRef.current.rotation.y += 0.01;
      }
    }, 16);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <group ref={birdsRef}>
      {Array.from({ length: 20}).map((_, i) => (
        <Bird 
          key={i} 
          position={[
            (Math.random() - 0.5) * 15,
            5 + Math.random() * 2,
            (Math.random() - 0.5) * 15
          ]}
          rotation={[0, Math.random() * Math.PI * 2, 0]}
        />
      ))}
    </group>
  );
};

const Bird: React.FC<BirdProps> = ({ position, rotation }) => {
  const birdRef = useRef<THREE.Group>(null);
  const [wingState, setWingState] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setWingState(Math.sin(Date.now() * 0.01));

      if (birdRef.current) {
        // Flying forward
        birdRef.current.position.x += 0.01 * Math.sin(birdRef.current.rotation.y);
        birdRef.current.position.z += 0.01 * Math.cos(birdRef.current.rotation.y);
      }
    }, 20);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <group ref={birdRef} position={position} rotation={rotation}>
      {/* Bird body */}
      <mesh>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#212121" />
      </mesh>
      
      {/* Wings */}
      <mesh rotation={[0, 0, wingState * 0.5]} position={[0.1, 0, 0]}>
        <boxGeometry args={[0.2, 0.01, 0.1]} />
        <meshStandardMaterial color="#424242" />
      </mesh>
      <mesh rotation={[0, 0, -wingState * 0.5]} position={[-0.1, 0, 0]}>
        <boxGeometry args={[0.2, 0.01, 0.1]} />
        <meshStandardMaterial color="#424242" />
      </mesh>
    </group>
  );
};

const Cloud: React.FC<CloudProps> = ({ position, scale = [1, 1, 1] }) => {
  const cloudRef = useRef<THREE.Group>(null);
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (cloudRef.current) {
        cloudRef.current.position.x += 0.002;
        // Reset position if out of view
        if (cloudRef.current.position.x > 10) {
          cloudRef.current.position.x = -10;
        }
      }
    }, 16);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <group ref={cloudRef} position={position} scale={scale}>
      <mesh>
        <sphereGeometry args={[0.5, 8, 8]} />
        <meshStandardMaterial color="white" transparent opacity={0.9} />
      </mesh>
      <mesh position={[0.4, 0.1, 0]}>
        <sphereGeometry args={[0.4, 8, 8]} />
        <meshStandardMaterial color="white" transparent opacity={0.9} />
      </mesh>
      <mesh position={[-0.4, 0.1, 0]}>
        <sphereGeometry args={[0.4, 8, 8]} />
        <meshStandardMaterial color="white" transparent opacity={0.9} />
      </mesh>
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.4, 8, 8]} />
        <meshStandardMaterial color="white" transparent opacity={0.9} />
      </mesh>
    </group>
  );
};

const Scene = () => {
  return (
    <>
  
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <Stars radius={100} depth={50} count={1000} factor={4} fade />
      
      <FloatingIsland position={[0, -2, 0]} />
      <Birds />
      
      {/* Clouds */}
      <Cloud position={[-5, 3, -5]} scale={[1.5, 1, 1]} />
      <Cloud position={[3, 4, -7]} />
      <Cloud position={[-2, 2, -3]} scale={[0.8, 0.8, 0.8]} />
      
      {/* Ambient control */}
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
    </>
  );
};

const LandingPage = () => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const scrollToContent = () => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <>
   
      <div className="relative h-screen overflow-hidden  ">
        <div className="absolute inset-0">
          <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
            <Scene />
          </Canvas>
        </div>
        
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
              <Leaf className="w-12 h-12 text-green-200" />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold text-black mb-4 drop-shadow-lg"
            >
              Welcome to <span className="bg-gradient-to-r from-eco-leaf to-eco-sky bg-clip-text text-transparent">EcoAware</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-xl md:text-2xl text-black/90 mb-8 max-w-2xl mx-auto"
            >
              Join our mission to create a more sustainable future through everyday choices.
            </motion.p>
            
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(76, 175, 80, 0.6)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/abouts')}
              className="px-8 py-3 text-lg font-medium rounded-full bg-eco-leaf/80 text-white backdrop-blur-sm hover:bg-eco-leaf transition-all duration-300 shadow-lg"
            >
              Lear More
            </motion.button>
          </motion.div>
          
        </div>
      </div>
      
     
   
    </>
  
  );
};

export default LandingPage;
