
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Environment, PerformanceMonitor } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

const GrowingTree = ({ progress = 0 }) => {
  const treeRef = useRef<THREE.Group>(null);
  
  const { treeScale, leafScale, flowerCount } = useSpring({
    treeScale: progress * 1.2,
    leafScale: Math.min(1, progress * 2),
    flowerCount: Math.floor(progress * 12),
    config: { tension: 80, friction: 20 }
  });
  
  useFrame(({ clock }) => {
    if (treeRef.current) {
      // Gentle swaying motion
      treeRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.5) * 0.05;
    }
  });
  
  return (
    <animated.group ref={treeRef} position={[0, -1.5, 0]} scale={treeScale}>
      {/* Trunk */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.1, 0.2, 2, 8]} />
        <meshStandardMaterial color="#5D4037" roughness={0.8} />
      </mesh>
      
      {/* Branches */}
      <mesh position={[0.4, 1.5, 0]} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.05, 0.08, 0.7, 8]} />
        <meshStandardMaterial color="#795548" roughness={0.8} />
      </mesh>
      
      <mesh position={[-0.3, 1.7, 0]} rotation={[0, 0, -Math.PI / 5]}>
        <cylinderGeometry args={[0.04, 0.07, 0.5, 8]} />
        <meshStandardMaterial color="#795548" roughness={0.8} />
      </mesh>
      
      {/* Leaves clusters */}
      <animated.group scale={leafScale}>
        <mesh position={[0, 2.2, 0]}>
          <sphereGeometry args={[0.5, 8, 8]} />
          <meshStandardMaterial color="#388E3C" roughness={0.6} />
        </mesh>
        
        <mesh position={[0.5, 1.8, 0]}>
          <sphereGeometry args={[0.3, 8, 8]} />
          <meshStandardMaterial color="#43A047" roughness={0.6} />
        </mesh>
        
        <mesh position={[-0.4, 2, 0]}>
          <sphereGeometry args={[0.25, 8, 8]} />
          <meshStandardMaterial color="#4CAF50" roughness={0.6} />
        </mesh>
        
        {/* Generate flowers based on progress */}
        {Array.from({ length: flowerCount.get() }).map((_, i) => {
          const angle = (i / flowerCount.get()) * Math.PI * 2;
          const radius = 0.6;
          const x = Math.cos(angle) * radius * (0.7 + Math.random() * 0.3);
          const y = 1.8 + Math.sin(angle) * radius * 0.5 + Math.random() * 0.5;
          const z = Math.sin(angle) * radius * (0.7 + Math.random() * 0.3);
          
          // Random flower colors
          const colors = ['#E91E63', '#F44336', '#FF9800', '#FFEB3B', '#FFC107'];
          const color = colors[Math.floor(Math.random() * colors.length)];
          
          return (
            <group key={i} position={[x, y, z]} scale={[0.08, 0.08, 0.08]}>
              {/* Flower center */}
              <mesh>
                <sphereGeometry args={[0.5, 8, 8]} />
                <meshStandardMaterial color="#FFC107" />
              </mesh>
              
              {/* Petals */}
              {Array.from({ length: 6 }).map((_, j) => {
                const petalAngle = (j / 6) * Math.PI * 2;
                return (
                  <mesh 
                    key={j} 
                    position={[
                      Math.cos(petalAngle) * 0.7,
                      Math.sin(petalAngle) * 0.7,
                      0
                    ]}
                    rotation={[0, 0, petalAngle]}
                  >
                    <sphereGeometry args={[0.4, 8, 8]} />
                    <meshStandardMaterial color={color} />
                  </mesh>
                );
              })}
            </group>
          );
        })}
      </animated.group>
    </animated.group>
  );
};

const Grass = () => {
  const count = 100;
  const positions: [number, number, number][] = [];
  
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 1 + Math.random() * 4;
    positions.push([
      Math.cos(angle) * radius,
      -1.5,
      Math.sin(angle) * radius
    ]);
  }
  
  return (
    <group>
      {positions.map((position, i) => (
        <GrassBlade key={i} position={position} />
      ))}
    </group>
  );
};

const GrassBlade = ({ position }: { position: [number, number, number] }) => {
  const bladeRef = useRef<THREE.Mesh>(null);
  const height = 0.2 + Math.random() * 0.3;
  const width = 0.02 + Math.random() * 0.02;
  
  // Random green shade
  const greenShades = ['#4CAF50', '#388E3C', '#2E7D32', '#43A047', '#66BB6A'];
  const color = greenShades[Math.floor(Math.random() * greenShades.length)];
  
  useFrame(({ clock }) => {
    if (bladeRef.current) {
      // Sway in the wind
      const time = clock.getElapsedTime();
      const swayFactor = 0.05 + Math.random() * 0.1;
      bladeRef.current.rotation.z = Math.sin(time * (0.5 + Math.random() * 0.5) + position[0]) * swayFactor;
    }
  });
  
  return (
    <mesh 
      ref={bladeRef}
      position={[position[0], position[1] + height / 2, position[2]]}
    >
      <boxGeometry args={[width, height, width]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

const Butterflies = ({ count = 15 }) => {
  const butterflyRefs = useRef<THREE.Group[]>([]);
  
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    
    butterflyRefs.current.forEach((butterfly, i) => {
      if (butterfly) {
        // Butterfly flight pattern: figure-8 + rising/falling
        const t = time * 0.5 + i * 100;
        const radius = 1 + Math.sin(t * 0.2) * 0.5;
        
        butterfly.position.x = Math.sin(t) * radius;
        butterfly.position.y = 0.5 + Math.sin(t * 0.5) * 0.5;
        butterfly.position.z = Math.cos(t * 0.8) * radius;
        
        // Rotation to follow movement direction
        butterfly.rotation.y = Math.atan2(
          Math.cos(t) * radius,
          -Math.sin(t * 0.8) * radius
        );
        
        // Wing flapping
        const wingParts = butterfly.children;
        if (wingParts.length >= 2) {
          const flapAngle = Math.sin(t * 15) * 0.6;
          (wingParts[0] as THREE.Mesh).rotation.z = flapAngle;
          (wingParts[1] as THREE.Mesh).rotation.z = -flapAngle;
        }
      }
    });
  });
  
  return (
    <group>
      {Array.from({ length: count }).map((_, i) => {
        // Random butterfly colors
        const colors = ['#E91E63', '#9C27B0', '#3F51B5', '#2196F3', '#FF9800'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const scale = 0.05 + Math.random() * 0.05;
        
        return (
          <group 
            key={i} 
            position={[
              (Math.random() - 0.5) * 5,
              Math.random() * 2,
              (Math.random() - 0.5) * 5
            ]}
            scale={[scale, scale, scale]}
            ref={el => {
              if (el) butterflyRefs.current[i] = el;
            }}
          >
            {/* Left wing */}
            <mesh position={[0.5, 0, 0]}>
              <planeGeometry args={[1, 1]} />
              <meshStandardMaterial color={color} side={THREE.DoubleSide} />
            </mesh>
            
            {/* Right wing */}
            <mesh position={[-0.5, 0, 0]}>
              <planeGeometry args={[1, 1]} />
              <meshStandardMaterial color={color} side={THREE.DoubleSide} />
            </mesh>
            
            {/* Body */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.05, 0.05, 0.3, 8]} />
              <meshStandardMaterial color="#333" />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

interface GardenSceneProps {
  progress?: number;
}

const GardenScene: React.FC<GardenSceneProps> = ({ progress = 0 }) => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, -5]} intensity={0.8} castShadow />
      <fog attach="fog" args={['#a1e2c4', 6, 20]} />
      
      <GrowingTree progress={progress} />
      <Grass />
      <Butterflies />
      
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
        <circleGeometry args={[6, 36]} />
        <meshStandardMaterial color="#8D6E63" />
      </mesh>
      
      <Stars radius={100} depth={50} count={500} factor={2} fade />
      
      <Environment preset="sunset" />
    </>
  );
};

interface GardenBackgroundProps {
  progress?: number;
}

const GardenBackground: React.FC<GardenBackgroundProps> = ({ progress = 0 }) => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 1, 6], fov: 45 }}>
        <PerformanceMonitor>
          <GardenScene progress={progress} />
        </PerformanceMonitor>
      </Canvas>
      <div 
        className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" 
      />
    </div>
  );
};

export default GardenBackground;
