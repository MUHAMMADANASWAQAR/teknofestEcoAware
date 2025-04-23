
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Environment } from '@react-three/drei';
import EcoAwareLogo from './EcoAwareLogo';
import FloatingIsland from './FloatingIsland';
import Clouds from './Clouds';
import AnimatedBirds from './AnimatedBirds';

interface EnchantedSceneProps {
  showLogo?: boolean;
  controlsEnabled?: boolean;
}

const EnchantedScene: React.FC<EnchantedSceneProps> = ({ 
  showLogo = true,
  controlsEnabled = true
}) => {
  return (
    <Canvas 
      camera={{ position: [0, 0, 10], fov: 50 }} 
      className="absolute inset-0 w-full h-full"
      style={{ background: 'linear-gradient(to bottom, #143a2c, #0f4b30, #072615)' }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        
        {/* Stars in the sky */}
        <Stars radius={100} depth={50} count={1000} factor={4} fade speed={1} />
        
        {/* Main floating island */}
        <FloatingIsland position={[0, -2, 0]} />
        
        {/* Logo if requested */}
        {showLogo && (
          <group position={[0, 1, 0]}>
            <EcoAwareLogo />
          </group>
        )}
        
        {/* Add some clouds */}
        <Clouds />
        
        {/* Add flying birds */}
        <AnimatedBirds />
        
        {/* Scene controls */}
        {controlsEnabled && (
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.5}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
          />
        )}
        
        <Environment preset="sunset" />
      </Suspense>
    </Canvas>
  );
};

export default EnchantedScene;
