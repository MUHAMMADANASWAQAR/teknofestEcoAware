
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const WindTurbineBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    
    // Add landscape background
    const textureLoader = new THREE.TextureLoader();
    const landscapeTexture = textureLoader.load('https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=2000&auto=format&fit=crop');
    const landscapeGeometry = new THREE.PlaneGeometry(20, 10);
    const landscapeMaterial = new THREE.MeshBasicMaterial({ 
      map: landscapeTexture,
      transparent: true,
      opacity: 0.8
    });
    const landscapeMesh = new THREE.Mesh(landscapeGeometry, landscapeMaterial);
    landscapeMesh.position.z = -5;
    scene.add(landscapeMesh);
    
    // Create wind turbine group
    const createWindTurbine = (x: number, y: number, z: number, scale: number) => {
      const turbineGroup = new THREE.Group();
      
      // Tower
      const towerGeometry = new THREE.CylinderGeometry(0.05, 0.08, 1.5, 16);
      const towerMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const tower = new THREE.Mesh(towerGeometry, towerMaterial);
      tower.position.y = -0.25;
      turbineGroup.add(tower);
      
      // Nacelle (hub)
      const nacelleGeometry = new THREE.BoxGeometry(0.15, 0.1, 0.1);
      const nacelleMaterial = new THREE.MeshBasicMaterial({ color: 0xeeeeee });
      const nacelle = new THREE.Mesh(nacelleGeometry, nacelleMaterial);
      nacelle.position.y = 0.5;
      turbineGroup.add(nacelle);
      
      // Rotor blades
      const bladesGroup = new THREE.Group();
      bladesGroup.position.y = 0.5;
      bladesGroup.position.z = 0.05;
      turbineGroup.add(bladesGroup);
      
      const createBlade = (rotation: number) => {
        const bladeGeometry = new THREE.PlaneGeometry(0.05, 0.7);
        const bladeMaterial = new THREE.MeshBasicMaterial({ 
          color: 0xffffff,
          side: THREE.DoubleSide
        });
        const blade = new THREE.Mesh(bladeGeometry, bladeMaterial);
        blade.position.y = 0.35;
        blade.rotation.z = rotation;
        return blade;
      };
      
      // Create 3 blades
      for (let i = 0; i < 3; i++) {
        const blade = createBlade((Math.PI * 2 / 3) * i);
        bladesGroup.add(blade);
      }
      
      // Add rotation speed property
      (turbineGroup as any).rotationSpeed = 0.01 + Math.random() * 0.02;
      (turbineGroup as any).bladesGroup = bladesGroup;
      
      // Position and scale
      turbineGroup.position.set(x, y, z);
      turbineGroup.scale.set(scale, scale, scale);
      
      return turbineGroup;
    };
    
    // Create multiple wind turbines
    const turbines: THREE.Group[] = [];
    const turbinePositions = [
      { x: -3, y: 0, z: -3, scale: 2 },
      { x: -1.5, y: -0.2, z: -2.5, scale: 1.5 },
      { x: 0, y: 0.1, z: -3.2, scale: 2.2 },
      { x: 1.8, y: -0.3, z: -2.7, scale: 1.8 },
      { x: 3.2, y: 0, z: -3, scale: 2 }
    ];
    
    turbinePositions.forEach(pos => {
      const turbine = createWindTurbine(pos.x, pos.y, pos.z, pos.scale);
      scene.add(turbine);
      turbines.push(turbine);
    });
    
    // Add clouds
    const cloudsGroup = new THREE.Group();
    scene.add(cloudsGroup);
    
    const createCloud = (x: number, y: number, z: number, scale: number) => {
      const cloudGroup = new THREE.Group();
      
      // Create multiple spheres for a cloud
      const segments = 5 + Math.floor(Math.random() * 5);
      
      for (let i = 0; i < segments; i++) {
        const size = 0.2 + Math.random() * 0.3;
        const cloudGeometry = new THREE.SphereGeometry(size, 8, 8);
        const cloudMaterial = new THREE.MeshBasicMaterial({ 
          color: 0xffffff,
          transparent: true,
          opacity: 0.8
        });
        
        const cloudPiece = new THREE.Mesh(cloudGeometry, cloudMaterial);
        cloudPiece.position.set(
          (Math.random() - 0.5) * 0.5,
          (Math.random() - 0.5) * 0.2,
          (Math.random() - 0.5) * 0.3
        );
        
        cloudGroup.add(cloudPiece);
      }
      
      // Position and scale
      cloudGroup.position.set(x, y, z);
      cloudGroup.scale.set(scale, scale, scale);
      
      // Add movement properties
      (cloudGroup as any).speed = 0.002 + Math.random() * 0.001;
      (cloudGroup as any).originalX = x;
      
      return cloudGroup;
    };
    
    // Create several clouds
    const clouds = [];
    for (let i = 0; i < 8; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = 1 + Math.random() * 2;
      const z = -4 - Math.random() * 2;
      const scale = 1 + Math.random() * 1.5;
      
      const cloud = createCloud(x, y, z, scale);
      cloudsGroup.add(cloud);
      clouds.push(cloud);
    }
    
    // Position camera
    camera.position.z = 5;
    
    // Mouse movement effect
    let mouseX = 0;
    let mouseY = 0;
    
    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate turbine blades
      turbines.forEach(turbine => {
        (turbine as any).bladesGroup.rotation.z += (turbine as any).rotationSpeed;
      });
      
      // Move clouds
      clouds.forEach(cloud => {
        cloud.position.x -= (cloud as any).speed;
        
        // Reset cloud position when it moves off-screen
        if (cloud.position.x < -10) {
          cloud.position.x = 10;
        }
      });
      
      // Subtle camera movement based on mouse
      camera.position.x += (mouseX * 0.2 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 0.2 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 -z-0"
      style={{ 
        background: 'linear-gradient(to bottom, #89cff0, #c0e8f9, #e0f2fa)'
      }}
    />
  );
};

export default WindTurbineBackground;
