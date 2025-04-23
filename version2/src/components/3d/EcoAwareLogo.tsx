
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const EcoAwareLogo = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Create leaf shape
  const leafShape = useMemo(() => {
    const shape = new THREE.Shape();
    // Draw a leaf-like shape
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.2, 0.3, 0.1, 0.6, 0, 0.8);
    shape.bezierCurveTo(-0.1, 0.6, -0.2, 0.3, 0, 0);
    return shape;
  }, []);
  
  const leafGeometry = useMemo(() => {
    return new THREE.ShapeGeometry(leafShape, 32);
  }, [leafShape]);
  
  // Animation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
      // Add gentle floating motion
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.05;
    }
  });
  
  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Base circle */}
      <mesh>
        <circleGeometry args={[1, 32]} />
        <meshStandardMaterial 
          color="#68c49f" 
          metalness={0.1}
          roughness={0.6}
        />
      </mesh>
      
      {/* Leaf symbol */}
      <group position={[0, 0.1, 0.1]} rotation={[0, 0, Math.PI / 2]}>
        <mesh>
          <primitive object={leafGeometry} />
          <meshStandardMaterial 
            color="#4eba89" 
            side={THREE.DoubleSide}
            metalness={0.1}
            roughness={0.5}
          />
        </mesh>
      </group>
      
      {/* Second leaf for a fuller appearance */}
      <group position={[0, 0.1, 0.12]} rotation={[0, 0, -Math.PI / 2]}>
        <mesh>
          <primitive object={leafGeometry} />
          <meshStandardMaterial 
            color="#3da678" 
            side={THREE.DoubleSide}
            metalness={0.1}
            roughness={0.5}
          />
        </mesh>
      </group>
      
      {/* Outer ring */}
      <mesh position={[0, 0, 0.05]}>
        <ringGeometry args={[1.1, 1.2, 32]} />
        <meshStandardMaterial 
          color="#a2e9ce" 
          emissive="#a2e9ce" 
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Inner ring with glow effect */}
      <mesh position={[0, 0, 0.02]}>
        <ringGeometry args={[0.8, 0.85, 32]} />
        <meshStandardMaterial 
          color="#86d4b1" 
          emissive="#86d4b1" 
          emissiveIntensity={0.7}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  );
};

export default EcoAwareLogo;
