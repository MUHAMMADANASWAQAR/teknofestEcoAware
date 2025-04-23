
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CityBackground: React.FC = () => {
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
    
    // Create cityscape backdrop
    const textureLoader = new THREE.TextureLoader();
    const cityTexture = textureLoader.load('https://images.unsplash.com/photo-1496307653780-42ee777d4833?w=2000&auto=format&fit=crop');
    const cityGeometry = new THREE.PlaneGeometry(16, 9);
    const cityMaterial = new THREE.MeshBasicMaterial({ 
      map: cityTexture,
      transparent: true,
      opacity: 0.8
    });
    const cityMesh = new THREE.Mesh(cityGeometry, cityMaterial);
    cityMesh.position.z = -5;
    scene.add(cityMesh);
    
    // Add flying birds
    const birdsGroup = new THREE.Group();
    scene.add(birdsGroup);
    
    // Bird shape (simple wing flapping model)
    const createBird = () => {
      const birdGroup = new THREE.Group();
      
      // Bird body
      const bodyGeometry = new THREE.CapsuleGeometry(0.05, 0.1, 4, 8);
      const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.rotation.x = Math.PI / 2;
      birdGroup.add(body);
      
      // Bird wings
      const wingGeometry = new THREE.PlaneGeometry(0.3, 0.1);
      const wingMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x666666,
        side: THREE.DoubleSide
      });
      
      const leftWing = new THREE.Mesh(wingGeometry, wingMaterial);
      leftWing.position.set(-0.15, 0, 0);
      birdGroup.add(leftWing);
      
      const rightWing = new THREE.Mesh(wingGeometry, wingMaterial);
      rightWing.position.set(0.15, 0, 0);
      birdGroup.add(rightWing);
      
      // Add animation properties
      (birdGroup as any).wingDirection = 1;
      (birdGroup as any).flapSpeed = 0.1 + Math.random() * 0.1;
      (birdGroup as any).rotationSpeed = (Math.random() - 0.5) * 0.01;
      (birdGroup as any).speed = 0.01 + Math.random() * 0.02;
      
      return birdGroup;
    };
    
    // Create a flock of birds
    const birds: THREE.Group[] = [];
    const birdCount = 20;
    
    for (let i = 0; i < birdCount; i++) {
      const bird = createBird();
      
      // Position birds randomly in the scene
      bird.position.set(
        (Math.random() - 0.5) * 10,  // x
        (Math.random() - 0.5) * 5,   // y
        (Math.random() - 0.5) * 3 - 2  // z
      );
      
      // Random rotation
      bird.rotation.y = Math.random() * Math.PI * 2;
      
      birds.push(bird);
      birdsGroup.add(bird);
    }
    
    // Add green buildings
    const buildingsGroup = new THREE.Group();
    scene.add(buildingsGroup);
    
    // Create stylized buildings
    const createBuilding = (x: number, height: number, width: number, depth: number) => {
      const buildingGeometry = new THREE.BoxGeometry(width, height, depth);
      
      // Create a greener look for the buildings
      const color = new THREE.Color();
      color.setHSL(0.3 + Math.random() * 0.1, 0.5, 0.4 + Math.random() * 0.2);
      
      const buildingMaterial = new THREE.MeshBasicMaterial({ 
        color: color,
        transparent: true,
        opacity: 0.7
      });
      
      const building = new THREE.Mesh(buildingGeometry, buildingMaterial);
      building.position.set(x, -height/2 + 1, -3);
      buildingsGroup.add(building);
      
      // Add windows (small cubes)
      const windowCount = Math.floor(height * 3);
      const windowsPerRow = Math.floor(width * 5);
      
      for (let i = 0; i < windowCount; i++) {
        for (let j = 0; j < windowsPerRow; j++) {
          if (Math.random() > 0.7) { // Only add some windows
            const windowGeometry = new THREE.BoxGeometry(0.05, 0.05, 0.05);
            const windowMaterial = new THREE.MeshBasicMaterial({ 
              color: 0xffffcc,
              transparent: true,
              opacity: 0.9
            });
            
            const windowMesh = new THREE.Mesh(windowGeometry, windowMaterial);
            windowMesh.position.set(
              x - width/2 + j * (width/windowsPerRow) + 0.1,
              -height + i * (height/windowCount) + 2.1,
              -3 + depth/2 + 0.01
            );
            
            buildingsGroup.add(windowMesh);
          }
        }
      }
      
      return building;
    };
    
    // Create several buildings
    createBuilding(-3, 4, 0.8, 0.5);
    createBuilding(-1.8, 2.5, 0.7, 0.4);
    createBuilding(-0.5, 3.5, 1, 0.6);
    createBuilding(1, 5, 0.9, 0.5);
    createBuilding(2.5, 3, 0.8, 0.4);
    createBuilding(4, 4.5, 1.1, 0.7);
    
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
      
      // Animate birds
      birds.forEach(bird => {
        // Move forward in current direction
        bird.position.x += Math.sin(bird.rotation.y) * (bird as any).speed;
        bird.position.z += Math.cos(bird.rotation.y) * (bird as any).speed;
        
        // Slow vertical movement
        bird.position.y += Math.sin(Date.now() * 0.001) * 0.002;
        
        // Gradually turn
        bird.rotation.y += (bird as any).rotationSpeed;
        
        // Wing flapping
        const leftWing = bird.children[1];
        const rightWing = bird.children[2];
        
        leftWing.rotation.x += (bird as any).flapSpeed * (bird as any).wingDirection;
        rightWing.rotation.x -= (bird as any).flapSpeed * (bird as any).wingDirection;
        
        // Change wing direction when wings reach a threshold
        if (Math.abs(leftWing.rotation.x) > 0.3) {
          (bird as any).wingDirection *= -1;
        }
        
        // If bird flies off-screen, reset position
        if (bird.position.x > 10) bird.position.x = -10;
        if (bird.position.x < -10) bird.position.x = 10;
        if (bird.position.z > 10) bird.position.z = -5;
        if (bird.position.z < -10) bird.position.z = 5;
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
        background: 'linear-gradient(to bottom, #2c3e50, #4ca1af)'
      }}
    />
  );
};

export default CityBackground;
