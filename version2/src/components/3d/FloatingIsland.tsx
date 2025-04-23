
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingIslandProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
}

const Tree = ({ position, scale = [1, 1, 1] }: { position: [number, number, number], scale?: [number, number, number] }) => {
  const treeRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (treeRef.current) {
      // Gentle swaying motion
      treeRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() + position[0] * 10) * 0.05;
    }
  });
  
  return (
    <group ref={treeRef} position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.05, 0.08, 1, 8]} />
        <meshStandardMaterial color="#5D4037" roughness={0.8} />
      </mesh>
      
      {/* Leaves */}
      <mesh position={[0, 1.2, 0]}>
        <coneGeometry args={[0.3, 0.8, 8]} />
        <meshStandardMaterial color="#558b2f" roughness={0.6} />
      </mesh>
      <mesh position={[0, 1.5, 0]} scale={[0.8, 0.8, 0.8]}>
        <coneGeometry args={[0.25, 0.6, 8]} />
        <meshStandardMaterial color="#7cb342" roughness={0.6} />
      </mesh>
    </group>
  );
};

const FloatingIsland: React.FC<FloatingIslandProps> = ({ 
  position = [0, 0, 0], 
  rotation = [0, 0, 0],
  scale = [1, 1, 1]
}) => {
  const islandRef = useRef<THREE.Group>(null);
  
  // Island shape with a smoother top
  const islandShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.absarc(0, 0, 2, 0, Math.PI * 2, false);
    return shape;
  }, []);
  
  const extrudeSettings = useMemo(() => ({
    steps: 2,
    depth: 0.6,
    bevelEnabled: true,
    bevelThickness: 0.2,
    bevelSize: 0.2,
    bevelOffset: 0,
    bevelSegments: 5
  }), []);
  
  useFrame((state) => {
    if (islandRef.current) {
      // Gentle floating motion
      islandRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
      // Very slow rotation
      islandRef.current.rotation.y += 0.001;
    }
  });
  
  return (
    <group ref={islandRef} position={position} rotation={rotation} scale={scale}>
      {/* Island base */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.3, 0]}>
        <extrudeGeometry args={[islandShape, extrudeSettings]} />
        <meshStandardMaterial color="#795548" roughness={0.8} />
      </mesh>
      
      {/* Top grass layer */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2, 32]} />
        <meshStandardMaterial color="#8bc34a" roughness={0.7} />
      </mesh>
      
      {/* Add trees */}
      <Tree position={[0.8, 0, 0.5]} />
      <Tree position={[-0.7, 0, -0.6]} scale={[0.9, 0.9, 0.9]} />
      <Tree position={[-0.3, 0, 0.8]} scale={[0.7, 0.7, 0.7]} />
      <Tree position={[0.5, 0, -0.9]} scale={[0.8, 0.8, 0.8]} />
      
      {/* Small pond */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.5, 32]} />
        <meshStandardMaterial 
          color="#81d4fa" 
          metalness={0.1}
          roughness={0.2}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
};

export default FloatingIsland;
