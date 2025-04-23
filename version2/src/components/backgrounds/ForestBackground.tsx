
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ForestBackground: React.FC = () => {
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
    
    // Add forest background
    const textureLoader = new THREE.TextureLoader();
    const forestTexture = textureLoader.load('https://images.unplash.com/photo-1523712999610-f77fbcfc3843?w=2000&auto=format&fit=crop');
    const forestGeometry = new THREE.PlaneGeometry(20, 10);
    const forestMaterial = new THREE.MeshBasicMaterial({ 
      map: forestTexture,
      transparent: true,
      opacity: 0.8
    });
    const forestMesh = new THREE.Mesh(forestGeometry, forestMaterial);
    forestMesh.position.z = -5;
    scene.add(forestMesh);
    
    // Add sun rays
    const sunlightGeometry = new THREE.CircleGeometry(2, 32);
    const sunlightMaterial = new THREE.MeshBasicMaterial({
      color: 0xfffacd,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide
    });
    const sunlight = new THREE.Mesh(sunlightGeometry, sunlightMaterial);
    sunlight.position.set(3, 2, -4);
    scene.add(sunlight);
    
    // Add particles for dust/pollen in sunlight
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 200;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0xffffff,
      transparent: true,
      opacity: 0.6
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
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
      
      // Subtle camera movement based on mouse
      camera.position.x += (mouseX * 0.1 - camera.position.x) * 0.05;
      camera.position.y += (mouseY * 0.1 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
      
      // Animate particles
      particlesMesh.rotation.y += 0.001;
      
      // Subtle sunlight pulsing
      const time = Date.now() * 0.001;
      sunlight.scale.set(
        1 + Math.sin(time) * 0.05,
        1 + Math.sin(time) * 0.05,
        1
      );
      
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
        background: 'linear-gradient(to bottom, #143a2c, #0f4b30, #072615)'
      }}
    />
  );
};

export default ForestBackground;
