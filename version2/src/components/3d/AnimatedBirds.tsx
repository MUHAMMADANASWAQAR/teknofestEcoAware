
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BirdProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  speed?: number;
  color?: string;
}

const Bird: React.FC<BirdProps> = ({ 
  position, 
  rotation = [0, 0, 0], 
  speed = 0.5,
  color = "#558b2f"
}) => {
  const birdRef = useRef<THREE.Group>(null);
  const wingRef = useRef<THREE.Mesh>(null);
  const wingRef2 = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (birdRef.current) {
      // Flying movement
      birdRef.current.position.x += Math.sin(birdRef.current.rotation.y) * 0.01 * speed;
      birdRef.current.position.z += Math.cos(birdRef.current.rotation.y) * 0.01 * speed;
      birdRef.current.position.y += Math.sin(state.clock.getElapsedTime() * 2) * 0.001;
      
      // Reset position when out of view
      if (birdRef.current.position.x > 15) birdRef.current.position.x = -15;
      if (birdRef.current.position.x < -15) birdRef.current.position.x = 15;
      if (birdRef.current.position.z > 15) birdRef.current.position.z = -15;
      if (birdRef.current.position.z < -15) birdRef.current.position.z = 15;
    }
    
    // Wing flapping animation
    if (wingRef.current && wingRef2.current) {
      const wingFlap = Math.sin(state.clock.getElapsedTime() * 10) * 0.5;
      wingRef.current.rotation.z = wingFlap;
      wingRef2.current.rotation.z = -wingFlap;
    }
  });
  
  return (
    <group ref={birdRef} position={position} rotation={rotation}>
      {/* Bird body */}
      <mesh>
        <capsuleGeometry args={[0.05, 0.2, 8, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Bird head */}
      <mesh position={[0, 0.12, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Wings */}
      <mesh ref={wingRef} position={[0.07, 0, 0]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[0.15, 0.01, 0.08]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh ref={wingRef2} position={[-0.07, 0, 0]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[0.15, 0.01, 0.08]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Tail */}
      <mesh position={[0, -0.12, 0]} rotation={[0.3, 0, 0]}>
        <coneGeometry args={[0.04, 0.1, 4]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
};

const AnimatedBirds = () => {
  const birdsGroup = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (birdsGroup.current) {
      // Slowly rotate the entire flock
      birdsGroup.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    }
  });
  
  return (
    <group ref={birdsGroup}>
      <Bird position={[-3, 2, -3]} rotation={[0, Math.PI * 0.5, 0]} speed={0.7} color="#689f38" />
      <Bird position={[2, 3, -4]} rotation={[0, Math.PI * 1.5, 0]} speed={0.5} color="#558b2f" />
      <Bird position={[-2, 4, 2]} rotation={[0, Math.PI * 0.25, 0]} speed={0.6} color="#7cb342" />
      <Bird position={[4, 3.5, -2]} rotation={[0, Math.PI, 0]} speed={0.8} color="#8bc34a" />
      <Bird position={[0, 2.5, 3]} rotation={[0, Math.PI * 1.75, 0]} speed={0.45} color="#9ccc65" />
    </group>
  );
};

export default AnimatedBirds;
