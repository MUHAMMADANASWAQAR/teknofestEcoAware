
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Leaf, Award, User,Users, Settings, Menu, X, Info, BarChart, Recycle } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [ripple, setRipple] = useState<{ x: number; y: number; id: number } | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const createRipple = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setRipple({ x, y, id: Date.now() });
    
    setTimeout(() => {
      setRipple(null);
    }, 1000);
  };

  const navItems = [
    { to: "/dashboard", icon: <Home className="w-6 h-6" />, label: "Home" },
    { to: "/habits", icon: <Leaf className="w-6 h-6" />, label: "Habits" },
    { to: "/achievements", icon: <Award className="w-6 h-6" />, label: "Achievements" },
    { to: "/recycling-tracker", icon: <Recycle className="w-6 h-6" />, label: "Recycling" },
    { to: "/community", icon: <Users className="w-6 h-6 mr-2" />, label: "Community" },
    { to: "/profile", icon: <User className="w-6 h-6" />, label: "Profile" },
    { to: "/admin", icon: <Settings className="w-6 h-6" />, label: "Admin" },
    { to: "/ministry-dashboard", icon: <BarChart className="w-6 h-6" />, label: "Ministry" },
  
  ];

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 w-full ${scrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="mx-auto px-4 sm:px-6 w-full">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <img src="/logo.jpg" alt="Logo" className="w-5 h-5 object-contain" />

              </div>
              <span className="text-xl font-semibold bg-gradient-to-r from-eco-leaf to-eco-sky bg-clip-text text-transparent">EcoAware</span>
            </Link>
          </div>
          
          {isMobile ? (
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 rounded-full bg-primary/10">
                  <Menu className="w-5 h-5 text-primary" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-white/95 backdrop-blur-lg w-full">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`flex items-center p-3 rounded-lg ${
                        location.pathname === item.to 
                          ? 'bg-primary/10 text-primary' 
                          : 'hover:bg-muted/60'
                      }`}
                    >
                      {item.icon}
                      <span className="ml-3">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <nav className="fixed bottom-6 inset-x-0 z-40 sm:static">
              <div className="bg-white/80 backdrop-blur-md shadow-lg sm:shadow-none sm:bg-transparent px-6 py-3 rounded-full max-w-3xl mx-auto flex items-center justify-between sm:px-0">
                {navItems.slice(0, 8).map((item) => (
                  <Link 
                    key={item.to}
                    to={item.to} 
                    className={`nav-item ${location.pathname === item.to ? 'active' : ''}`}
                    onClick={createRipple}
                  >
                    {ripple && location.pathname === item.to && (
                      <span className="ripple" style={{ left: `${ripple.x}px`, top: `${ripple.y}px` }} />
                    )}
                    {item.icon}
                  </Link>
                ))}
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
