
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

const DynamicBackground: React.FC = () => {
  // Simple fallback to make sure the component renders
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <fog attach="fog" args={['#202030', 5, 20]} />
        <Stars radius={100} depth={50} count={1000} factor={4} fade />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
    </div>
  );
};

export default DynamicBackground;
