
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const AuroraBackground: React.FC = () => {
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
    
    // Create night sky
    const textureLoader = new THREE.TextureLoader();
    const skyTexture = textureLoader.load('https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=2000&auto=format&fit=crop');
    const skyGeometry = new THREE.PlaneGeometry(20, 10);
    const skyMaterial = new THREE.MeshBasicMaterial({ 
      map: skyTexture,
      transparent: true,
      opacity: 0.8
    });
    const skyMesh = new THREE.Mesh(skyGeometry, skyMaterial);
    skyMesh.position.z = -5;
    scene.add(skyMesh);
    
    // Create floating glowing particles (stars)
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    const posArray = new Float32Array(particlesCount * 3);
    const scaleArray = new Float32Array(particlesCount);
    
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // Position stars throughout the scene
      posArray[i] = (Math.random() - 0.5) * 15;      // x
      posArray[i + 1] = (Math.random() - 0.5) * 10;  // y
      posArray[i + 2] = (Math.random() - 3) * 5;     // z
      
      // Store different sizes for stars
      scaleArray[i / 3] = Math.random();
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));
    
    // Create shimmering material for stars
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    // Create aurora (using multiple curved planes with custom shaders)
    const auroraGroup = new THREE.Group();
    scene.add(auroraGroup);
    
    // Create multiple aurora curtains
    const createAuroraCurtain = (x: number, y: number, z: number, color: THREE.Color) => {
      const auroraGeometry = new THREE.PlaneGeometry(5, 2, 50, 50);
      
      // Apply wave to geometry
      const positionAttribute = auroraGeometry.attributes.position;
      
      for (let i = 0; i < positionAttribute.count; i++) {
        const x = positionAttribute.getX(i);
        const y = positionAttribute.getY(i);
        
        // Create wavy pattern
        const waveX = 0.1 * Math.sin(y * 5 + x * 2);
        const waveY = 0.05 * Math.sin(x * 10);
        
        positionAttribute.setX(i, x + waveX);
        positionAttribute.setY(i, y + waveY);
      }
      
      // Create a glowing material for aurora
      const auroraMaterial = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending
      });
      
      const aurora = new THREE.Mesh(auroraGeometry, auroraMaterial);
      aurora.position.set(x, y, z);
      
      // Store animation properties
      (aurora as any).initialY = y;
      (aurora as any).initialX = x;
      (aurora as any).time = Math.random() * 1000;
      (aurora as any).speed = 0.2 + Math.random() * 0.1;
      
      auroraGroup.add(aurora);
      return aurora;
    };
    
    // Create several aurora curtains with different colors
    const auroras = [];
    
    auroras.push(createAuroraCurtain(0, 1, -3, new THREE.Color(0x26a69a))); // Teal
    auroras.push(createAuroraCurtain(-2, 0.5, -2, new THREE.Color(0x7e57c2))); // Purple
    auroras.push(createAuroraCurtain(2, 0, -2.5, new THREE.Color(0x66bb6a))); // Green
    auroras.push(createAuroraCurtain(-1, -0.5, -2, new THREE.Color(0x42a5f5))); // Blue
    auroras.push(createAuroraCurtain(1.5, 1.5, -3.5, new THREE.Color(0xec407a))); // Pink
    
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
      
      // Animate stars twinkling
      particlesMesh.rotation.y += 0.0005;
      particlesMesh.rotation.x += 0.0002;
      
      const time = Date.now() * 0.001;
      
      // Make the stars twinkle by changing their size
      const scales = particlesGeometry.attributes.scale;
      for (let i = 0; i < particlesCount; i++) {
        const s = 0.5 + 0.5 * Math.sin(time + i * 0.1);
        scales.setX(i, s * scaleArray[i]);
      }
      scales.needsUpdate = true;
      
      // Animate aurora curtains
      auroras.forEach(aurora => {
        (aurora as any).time += 0.01 * (aurora as any).speed;
        const t = (aurora as any).time;
        
        // Undulating movement
        aurora.position.y = (aurora as any).initialY + Math.sin(t * 0.5) * 0.2;
        aurora.position.x = (aurora as any).initialX + Math.sin(t * 0.3) * 0.1;
        
        // Dynamic opacity for shimmer effect
        (aurora.material as THREE.MeshBasicMaterial).opacity = 0.2 + 0.3 * (0.5 + 0.5 * Math.sin(t));
        
        // Subtle rotation
        aurora.rotation.z = Math.sin(t * 0.2) * 0.05;
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
        background: 'linear-gradient(to bottom, #0a0a20, #0c1635, #061329)'
      }}
    />
  );
};

export default AuroraBackground;
