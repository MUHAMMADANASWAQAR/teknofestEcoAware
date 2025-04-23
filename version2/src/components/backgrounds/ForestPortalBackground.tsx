
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Environment, PerformanceMonitor } from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';
import * as THREE from 'three';

const Portal = ({ progress = 0 }) => {
  const portalRef = useRef<THREE.Mesh>(null);
  
  const { scale } = useSpring({
    scale: progress * 1.1 + 0.2,
    config: { tension: 120, friction: 14 }
  });
  
  useFrame(({ clock }) => {
    if (portalRef.current) {
      portalRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.3) * 0.1;
      portalRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.2) * 0.05;
    }
  });
  
  return (
    <group>
      <animated.mesh ref={portalRef} scale={scale}>
        <torusGeometry args={[1.5, 0.2, 16, 100]} />
        <meshStandardMaterial 
          color="#88cc66"
          emissive="#4CAF50"
          emissiveIntensity={1.5}
          roughness={0.2}
          metalness={0.8}
        />
      </animated.mesh>
      
      {/* Using standard light instead of animated */}
      <pointLight
        color="#4CAF50"
        intensity={2.5}
        distance={6}
        position={[0, 0, 0]}
      />
    </group>
  );
};

const Trees = ({ count = 15 }) => {
  return (
    <group>
      {Array.from({ length: count }).map((_, i) => {
        const position: [number, number, number] = [
          (Math.random() - 0.5) * 15,
          -1 + Math.random() * 0.5,
          -5 - Math.random() * 10
        ];
        const scale = 0.5 + Math.random() * 1.2;
        
        return (
          <Tree key={i} position={position} scale={[scale, scale, scale]} />
        );
      })}
    </group>
  );
};

const Tree = ({ position, scale = [1, 1, 1] }) => {
  const treeRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (treeRef.current) {
      // Gentle swaying motion
      treeRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.5 + position[0]) * 0.05;
    }
  });
  
  return (
    <group ref={treeRef} position={position} scale={scale as [number, number, number]}>
      {/* Trunk */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 2, 8]} />
        <meshStandardMaterial color="#5D4037" roughness={0.8} />
      </mesh>
      
      {/* Leaves */}
      <mesh position={[0, 2.2, 0]}>
        <coneGeometry args={[1, 2.5, 8]} />
        <meshStandardMaterial color="#388E3C" roughness={0.6} />
      </mesh>
      <mesh position={[0, 3, 0]} scale={[0.8, 0.8, 0.8]}>
        <coneGeometry args={[0.8, 1.8, 8]} />
        <meshStandardMaterial color="#43A047" roughness={0.6} />
      </mesh>
    </group>
  );
};

const Fireflies = ({ count = 50 }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const positions = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = Math.random() * 5;
    positions[i * 3 + 2] = -5 - Math.random() * 10;
    scales[i] = Math.random();
  }
  
  useFrame(({ clock }) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      const time = clock.getElapsedTime();
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions[i3 + 0] += Math.sin(time * (0.2 + scales[i] * 0.3) + i) * 0.01;
        positions[i3 + 1] += Math.cos(time * (0.2 + scales[i] * 0.3) + i * 2) * 0.01;
        positions[i3 + 2] += Math.sin(time * (0.2 + scales[i] * 0.3) + i * 3) * 0.01;
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });
  
  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#FFEB3B"
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

interface ForestSceneProps {
  progress: number;
}

const ForestScene: React.FC<ForestSceneProps> = ({ progress }) => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, -5]} intensity={0.8} castShadow />
      <fog attach="fog" args={['#112211', 5, 30]} />
      
      <Trees />
      <Portal progress={progress} />
      <Fireflies />
      <Stars radius={100} depth={50} count={1000} factor={4} fade />
      
      <Environment preset="forest" />
    </>
  );
};

interface ForestPortalBackgroundProps {
  progress?: number;
}

const ForestPortalBackground: React.FC<ForestPortalBackgroundProps> = ({ progress = 1 }) => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 1, 5], fov: 45 }}>
        <PerformanceMonitor>
          <ForestScene progress={progress} />
        </PerformanceMonitor>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
    </div>
  );
};

export default ForestPortalBackground;
