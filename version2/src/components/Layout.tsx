
import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useIsMobile } from '@/hooks/use-mobile';
import PointsRewards from './PointsRewards';
import SoundToggle from './SoundToggle';
import * as soundManager from '@/utils/soundManager';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Initialize sound system
    soundManager.initSounds();
    
    return () => {
      // Clean up sounds when unmounting
      soundManager.stopAmbient();
    };
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="fixed inset-0 -z-10">
        <img 
          src="https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=2000&auto=format&fit=crop" 
          alt="Nature background" 
          className="object-cover w-full h-full opacity-10"
        />
      </div>
      <Navbar />
    
      <main className="flex-grow px-4 pb-20 pt-24 sm:px-6 md:px-8 max-w-7xl mx-auto w-full">
        {isMobile && <PointsRewards className="mb-6" />}
        {children}
      </main>
      <Footer />
      <SoundToggle />
    </div>
  );
};

export default Layout;
