
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, LogIn, Leaf } from 'lucide-react';
import EcoSpirit from '@/components/EcoSpirit';
import * as soundManager from '@/utils/soundManager';
import FormCard from '@/components/ui/form-card';
import EnchantedScene from '@/components/3d/EnchantedScene';

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" })
});

const Login: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formProgress, setFormProgress] = useState(0);
  const [welcomeMessage, setWelcomeMessage] = useState("Welcome back! Log in to continue your eco journey.");
  const formRef = useRef<HTMLFormElement>(null);
  
  const controls = useAnimation();
  
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });
  
  const watchedValues = form.watch();
  
  useEffect(() => {
    const email = watchedValues.email;
    const password = watchedValues.password;
    
    let progress = 0;
    if (email) progress += 0.5;
    if (password) progress += 0.5;
    
    setFormProgress(progress);
    
    if (progress === 0) {
      setWelcomeMessage("Welcome back! Log in to continue your eco journey.");
    } else if (progress === 0.5) {
      setWelcomeMessage("Great start! Now enter your password to continue.");
    } else if (progress === 1) {
      setWelcomeMessage("Looking good! Click Login to continue your eco journey.");
    }
  }, [watchedValues]);
  
  useEffect(() => {
    soundManager.initSounds();
    soundManager.playAmbient('FOREST');
    controls.start({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, type: "spring", bounce: 0.4 }
    });
    setTimeout(() => {
      soundManager.playSound('PORTAL_OPEN', 0.3);
    }, 500);
    return () => {
      soundManager.stopAmbient();
    };
  }, []);
  
  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      setIsLoading(true);
      soundManager.playSound('CLICK');
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      controls.start({
        scale: [1, 1.05, 1],
        transition: { duration: 0.5 }
      });
      
      soundManager.playSound('SUCCESS');
      
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
      
    } catch (error) {
      console.error("Login error:", error);
      
      soundManager.playSound('ERROR');
      
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden">
      {/* 3D Background Scene */}
      <div className="absolute inset-0  z-0">
        <EnchantedScene showLogo={false} />
      </div>
      
      <EcoSpirit message={welcomeMessage} position="bottom-right" />
      
      <div className="relative z-10 flex-grow flex items-center justify-center p-4">
        <FormCard className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-4"
            >
              <Leaf className="w-8 h-8 text-eco-leaf" />
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-3xl font-bold mb-2"
            >
              <span className="bg-gradient-to-r from-eco-leaf to-eco-sky bg-clip-text text-transparent">
                Welcome Back
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-black/80"
            >
              Log in to continue your sustainability journey
            </motion.p>
          </div>
          
          <Form {...form}>
            <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Email"
                          className="h-12 bg-black/10 border-white/10 focus:border-eco-leaf/60 focus:ring-2 focus:ring-eco-leaf/25 transition-all text-white placeholder:text-white/60"
                          onChange={(e) => {
                            field.onChange(e);
                            if (e.target.value && e.target.value.includes('@')) {
                              soundManager.playSound('CLICK', 0.2);
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage className="text-rose-200" />
                    </FormItem>
                  )}
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="relative">
                        <FormControl>
                          <Input
                            {...field}
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="h-12 bg-black/10 border-white/10 focus:border-eco-leaf/60 focus:ring-2 focus:ring-eco-leaf/25 transition-all pr-12 text-white placeholder:text-white/60"
                            onChange={(e) => {
                              field.onChange(e);
                              if (e.target.value) {
                                soundManager.playSound('CLICK', 0.15);
                              }
                            }}
                          />
                        </FormControl>
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white/90"
                          tabIndex={-1}
                        >
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                      <FormMessage className="text-rose-200" />
                    </FormItem>
                  )}
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="text-right"
              >
                <Link to="/forgot-password" className="text-sm text-eco-sky hover:underline">
                  Forgot password?
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  className="w-full h-12 bg-eco-leaf hover:bg-eco-leaf/90 text-white transition-all shadow-lg shadow-eco-leaf/30"
                  disabled={isLoading}
                  onClick={() => soundManager.playSound('CLICK')}
                >
                  <LogIn className="mr-2 h-5 w-5" />
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </motion.div>
            </form>
          </Form>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mt-6 text-center"
          >
            <p className="text-black/80">
              Don't have an account?{' '}
              <Link 
                to="/register" 
                className="text-eco-sky hover:underline font-medium"
                onClick={() => soundManager.playSound('CLICK')}
              >
                Sign up
              </Link>
            </p>
          </motion.div>
        </FormCard>
      </div>
    </div>
  );
};

export default Login;
