
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

interface BirdProps {
  position: [number, number, number];
  rotation: [number, number, number];
}

const Bird: React.FC<BirdProps> = ({ position, rotation }) => {
  const birdRef = useRef<THREE.Group>(null);
  const [wingState, setWingState] = useState(0);
  
  useEffect(() => {
    if (!birdRef.current) return;
    
    const interval = setInterval(() => {
      setWingState(Math.sin(Date.now() * 0.01));
      
      if (birdRef.current) {
        birdRef.current.position.x += 0.01 * Math.sin(birdRef.current.rotation.y);
        birdRef.current.position.z += 0.01 * Math.cos(birdRef.current.rotation.y);
      }
    }, 16);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <group ref={birdRef} position={position} rotation={rotation}>
      <mesh>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#212121" />
      </mesh>
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

const Birds = () => {
  const birdsRef = useRef<THREE.Group>(null);
  
  useEffect(() => {
    if (!birdsRef.current) return;
    
    const interval = setInterval(() => {
      if (birdsRef.current) {
        birdsRef.current.rotation.y += 0.005;
      }
    }, 16);
    
    return () => clearInterval(interval);
  }, []);
  
  // Generate birds array with fewer birds to reduce complexity
  const birds = [];
  for (let i = 0; i < 3; i++) {
    birds.push(
      <Bird 
        key={i} 
        position={[
          (Math.random() - 0.5) * 10,
          4 + Math.random() * 2,
          (Math.random() - 0.5) * 10
        ]}
        rotation={[0, Math.random() * Math.PI * 2, 0]}
      />
    );
  }
  
  return <group ref={birdsRef}>{birds}</group>;
};

export default Birds;
