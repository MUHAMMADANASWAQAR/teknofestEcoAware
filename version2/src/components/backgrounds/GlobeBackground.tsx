
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const GlobeBackground: React.FC = () => {
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
    
    // Add globe
    const globeGeometry = new THREE.SphereGeometry(3, 64, 64);
    const textureLoader = new THREE.TextureLoader();
    
    // Load earth texture
    const earthTexture = textureLoader.load('https://images.unsplash.com/photo-1614730321146-b6457985f222?w=1600&auto=format&fit=crop');
    const earthMaterial = new THREE.MeshBasicMaterial({
      map: earthTexture,
      transparent: true,
      opacity: 0.8
    });
    
    const earth = new THREE.Mesh(globeGeometry, earthMaterial);
    scene.add(earth);
    
    // Add floating leaves
    const leavesGroup = new THREE.Group();
    scene.add(leavesGroup);
    
    // Create several leaves around the globe
    const leafGeometry = new THREE.PlaneGeometry(0.3, 0.3);
    const leafTexture = textureLoader.load('https://images.unsplash.com/photo-1588652544895-ef8ab8c8ae7e?w=800&auto=format&fit=crop');
    
    const createLeaf = (x: number, y: number, z: number, rotation: number) => {
      const leafMaterial = new THREE.MeshBasicMaterial({
        map: leafTexture,
        transparent: true,
        side: THREE.DoubleSide
      });
      
      const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
      leaf.position.set(x, y, z);
      leaf.rotation.z = rotation;
      
      // Add animation data to the leaf object
      (leaf as any).originalY = y;
      (leaf as any).floatSpeed = 0.2 + Math.random() * 0.3;
      (leaf as any).rotateSpeed = 0.01 + Math.random() * 0.02;
      
      leavesGroup.add(leaf);
      return leaf;
    };
    
    // Create 20 leaves in random positions around the globe
    const leaves = [];
    for (let i = 0; i < 20; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 3.5 + Math.random() * 1.5;
      const x = Math.cos(angle) * radius;
      const y = (Math.random() - 0.5) * 6;
      const z = Math.sin(angle) * radius;
      
      const leaf = createLeaf(x, y, z, Math.random() * Math.PI * 2);
      leaves.push(leaf);
    }
    
    // Position camera
    camera.position.z = 7;
    
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
      
      // Rotate earth
      earth.rotation.y += 0.001;
      
      // Animate leaves floating and spinning
      leaves.forEach(leaf => {
        const time = Date.now() * 0.001;
        
        // Float up and down
        leaf.position.y = (leaf as any).originalY + Math.sin(time * (leaf as any).floatSpeed) * 0.2;
        
        // Rotate
        leaf.rotation.z += (leaf as any).rotateSpeed;
        
        // Make leaves follow the globe rotation slightly
        leaf.position.x = Math.cos(earth.rotation.y + (leaf as any).originalX) * (leaf.position.z < 0 ? 3.5 : 4);
        leaf.position.z = Math.sin(earth.rotation.y + (leaf as any).originalZ) * (leaf.position.z < 0 ? 3.5 : 4);
      });
      
      // Subtle camera movement based on mouse
      camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;
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
        background: 'linear-gradient(to bottom, #0c1222, #1a2c52, #0e1f41)'
      }}
    />
  );
};

export default GlobeBackground;
