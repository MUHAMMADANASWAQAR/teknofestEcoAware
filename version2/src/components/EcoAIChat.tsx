
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ecoAIService from '@/services/ecoAIService';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  typing?: boolean;
}

const TypewriterEffect: React.FC<{ text: string; onComplete?: () => void }> = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 15 + Math.random() * 30); // Random delay for more natural typing
      
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, onComplete]);
  
  return <>{displayedText}</>;
};

const EcoAIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your EcoAware AI assistant. Ask me anything about reducing your ecological footprint!",
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI thinking time
    setTimeout(() => {
      // Get response from AI service
      const response = ecoAIService.ecoAIChat(input);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'ai',
        timestamp: new Date(),
        typing: true
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      
      // After typing animation completes, remove typing flag
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === aiMessage.id ? { ...msg, typing: false } : msg
          )
        );
      }, response.length * 20 + 500);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  return (
    <motion.div 
      className="eco-card glass-card h-[400px] flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-xl font-semibold mb-4">Eco AI Assistant</h2>
      
      <div className="flex-1 overflow-y-auto mb-4 pr-2 chat-scroll">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={messageVariants}
              transition={{ 
                type: 'spring', 
                stiffness: 500, 
                damping: 30,
                mass: 1
              }}
              className={`flex mb-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <motion.div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'user' ? 'bg-primary/10 ml-2' : 'bg-accent mr-2'
                  }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, delay: 0.1 }}
                >
                  {message.sender === 'user' ? (
                    <User className="w-4 h-4 text-primary" />
                  ) : (
                    <Bot className="w-4 h-4 text-accent-foreground" />
                  )}
                </motion.div>
                
                <div className={`py-2 px-3 rounded-lg ${
                  message.sender === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted'
                }`}>
                  <p className="text-sm">
                    {message.typing ? (
                      <TypewriterEffect 
                        text={message.text} 
                        onComplete={() => scrollToBottom()}
                      />
                    ) : (
                      message.text
                    )}
                  </p>
                  <p className="text-[10px] opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={messageVariants}
              className="flex mb-3 justify-start"
            >
              <div className="flex flex-row">
                <motion.div 
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-accent mr-2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                >
                  <Bot className="w-4 h-4 text-accent-foreground" />
                </motion.div>
                
                <div className="py-2 px-4 rounded-lg bg-muted flex items-center">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
      
      <div className="flex gap-2">
        <Input
          placeholder="Ask about eco-friendly tips..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1"
        />
        <motion.div whileTap={{ scale: 0.95 }}>
          <Button 
            onClick={handleSend} 
            className="bg-primary relative overflow-hidden"
            disabled={!input.trim()}
          >
            <motion.span
              className="absolute w-full h-full bg-white/20 rounded-lg"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.5, opacity: 0.4 }}
              transition={{ duration: 0.5 }}
              style={{ originX: 0.5, originY: 0.5 }}
            />
            <Send className="w-4 h-4 relative z-10" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EcoAIChat;
