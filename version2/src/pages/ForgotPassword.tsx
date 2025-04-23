
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Send, ArrowLeft, Leaf } from 'lucide-react';
import EcoSpirit from '@/components/EcoSpirit';
import * as soundManager from '@/utils/soundManager';
import FormCard from '@/components/ui/form-card';
import EnchantedScene from '@/components/3d/EnchantedScene';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" })
});

const ForgotPassword: React.FC = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const controls = useAnimation();
  
  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: ""
    }
  });
  
  useEffect(() => {
    soundManager.initSounds();
    soundManager.playAmbient('FOREST');
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    });
    return () => {
      soundManager.stopAmbient();
    };
  }, []);
  
  const onSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
    try {
      setIsLoading(true);
      soundManager.playSound('CLICK');
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsSubmitted(true);
      
      controls.start({
        scale: [1, 1.05, 1],
        transition: { duration: 0.5 }
      });
      
      soundManager.playSound('SUCCESS');
      
      toast({
        title: "Reset instructions sent",
        description: `We've sent password reset instructions to ${values.email}`,
      });
      
    } catch (error) {
      console.error("Password reset error:", error);
      
      soundManager.playSound('ERROR');
      
      toast({
        title: "Request failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden">
      {/* 3D Background Scene */}
      <div className="absolute inset-0 z-0">
        <EnchantedScene showLogo={false} />
      </div>
      
      <EcoSpirit 
        message={
          isSubmitted 
            ? "Check your email for reset instructions!" 
            : "Enter your email and we'll send you reset instructions."
        }
        position="bottom-right" 
      />
      
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
                {isSubmitted ? "Check Your Email" : "Forgot Password"}
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-white/80"
            >
              {isSubmitted 
                ? "We've sent you instructions to reset your password" 
                : "Enter your email to receive password reset instructions"}
            </motion.p>
          </div>
          
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-center"
            >
              <div className="mb-8 p-4 rounded-lg bg-white/5 text-white/80">
                <p>We've sent an email to <span className="font-medium text-white">{form.getValues().email}</span> with instructions to reset your password.</p>
                <p className="mt-2">If you don't see it in your inbox, please check your spam folder.</p>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  asChild
                  className="w-full h-12 bg-eco-sky hover:bg-eco-sky/90 text-white transition-all shadow-lg shadow-eco-sky/30"
                  onClick={() => soundManager.playSound('CLICK')}
                >
                  <Link to="/login">
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Back to Login
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
                            className="h-12 bg-white/5 border-white/10 focus:border-eco-leaf/60 focus:ring-2 focus:ring-eco-leaf/25 transition-all text-white placeholder:text-white/60"
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
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4"
                >
                  <Button
                    type="submit"
                    className="w-full h-12 bg-eco-leaf hover:bg-eco-leaf/90 text-white transition-all shadow-lg shadow-eco-leaf/30"
                    disabled={isLoading}
                    onClick={() => soundManager.playSound('CLICK')}
                  >
                    <Send className="mr-2 h-5 w-5" />
                    {isLoading ? "Sending..." : "Send Reset Instructions"}
                  </Button>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="text-center mt-6"
                >
                  <Button
                    variant="ghost"
                    asChild
                    className="text-white/80 hover:text-white hover:bg-white/10"
                    onClick={() => soundManager.playSound('CLICK')}
                  >
                    <Link to="/login">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to login
                    </Link>
                  </Button>
                </motion.div>
              </form>
            </Form>
          )}
        </FormCard>
      </div>
    </div>
  );
};

export default ForgotPassword;
