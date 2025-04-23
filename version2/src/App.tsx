
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import LandingPage from "./pages/LandingPage";
import Habits from "./pages/Habits";
import Achievements from "./pages/Achievements";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Community from "./pages/Community";
import ProjectSummary from "./pages/ProjectSummary";
import MinistryDashboard from "./pages/MinistryDashboard";
import RecyclingTracker from "./pages/RecyclingTracker";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Projects from "./pages/Projects";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import * as soundManager from './utils/soundManager';

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Initialize sound system
    soundManager.initSounds();
    
    // Clean up on unmount
    return () => {
      soundManager.cleanup();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/dashboard" element={<Index />} />
            <Route path="/habits" element={<Habits />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/community" element={<Community />} />

            <Route path="/ministry-dashboard" element={<MinistryDashboard />} />
            <Route path="/recycling-tracker" element={<RecyclingTracker />} />
            <Route path="/abouts" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<Projects />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
