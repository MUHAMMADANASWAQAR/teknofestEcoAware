
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface CloudProps {
  position: [number, number, number];
  scale?: [number, number, number];
  speed?: number;
}

const Cloud: React.FC<CloudProps> = ({ position, scale = [1, 1, 1], speed = 0.05 }) => {
  const cloudRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (cloudRef.current) {
      // Gentle floating motion
      cloudRef.current.position.y += Math.sin(state.clock.getElapsedTime() * 0.5) * 0.001;
      // Slow horizontal movement
      cloudRef.current.position.x += speed * 0.005;
      
      // Reset position when out of view
      if (cloudRef.current.position.x > 15) {
        cloudRef.current.position.x = -15;
      }
    }
  });
  
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
      <mesh position={[0.2, -0.2, 0]}>
        <sphereGeometry args={[0.3, 8, 8]} />
        <meshStandardMaterial color="white" transparent opacity={0.8} />
      </mesh>
    </group>
  );
};

const Clouds = () => {
  return (
    <>
      <Cloud position={[-5, 3, -5]} scale={[1.5, 1, 1]} speed={0.04} />
      <Cloud position={[3, 4, -7]} speed={0.03} />
      <Cloud position={[-2, 2, -3]} scale={[0.8, 0.8, 0.8]} speed={0.06} />
      <Cloud position={[5, 5, -6]} scale={[1.2, 0.9, 1]} speed={0.02} />
      <Cloud position={[-8, 4, -8]} scale={[1.4, 1.1, 1]} speed={0.05} />
    </>
  );
};

export default Clouds;
