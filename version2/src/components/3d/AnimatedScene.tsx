
import React, { Suspense } from 'react';
import { OrbitControls, Stars, Environment } from '@react-three/drei';
import EcoAwareLogo from './EcoAwareLogo';
import Clouds from './Clouds';
import AnimatedBirds from './AnimatedBirds';
import FloatingIsland from './FloatingIsland';

const AnimatedScene = () => {
  return (
    <Suspense fallback={null}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      
      {/* Centered logo */}
      <group position={[0, 0.5, 0]}>
        <EcoAwareLogo />
      </group>
      
      {/* Background elements */}
      <Stars radius={100} depth={50} count={1000} />
      <Clouds />
      <AnimatedBirds />
      <FloatingIsland position={[0, -2, 0]} />
      
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
    </Suspense>
  );
};

export default AnimatedScene;
