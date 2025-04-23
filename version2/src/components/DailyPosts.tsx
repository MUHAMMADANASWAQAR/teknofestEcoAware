
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ThumbsUp, Calendar, MessageSquare, Bike, Utensils } from 'lucide-react';
import { toast } from "sonner";
import { Textarea } from "./ui/textarea";
import SavingsForm from './SavingsForm';
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface Post {
  id: string;
  username: string;
  avatar: string;
  date: string;
  content: string;
  likes: number;
  comments: number;
  savings: {
    energy: number; // kWh
    water: number; // Liters
    waste: number; // kg
  };
  activity?: string;
  image?: string;
}

const DailyPosts: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      username: 'Sarah Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop',
      date: '2 hours ago',
      content: 'Rode a bike instead of going to work by car',
      likes: 24,
      comments: 3,
      savings: {
        energy: 5.2,
        water: 0,
        waste: 0.8,
      },
      activity: 'transport',
      image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=300&h=200&fit=crop'
    },
    {
      id: '2',
      username: 'Sarah Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop',
      date: '5 hours ago',
      content: 'Had vegan lunch instead of meat',
      likes: 18,
      comments: 5,
      savings: {
        energy: 6.2,
        water: 37.13,
        waste: 6.7,
      },
      activity: 'food',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop'
    }
  ]);
  
  const [newComment, setNewComment] = useState('');
  
  const addNewPost = (savings: Post['savings'], content: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      username: 'You',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop',
      date: 'Just now',
      content,
      likes: 0,
      comments: 0,
      savings
    };
    
    setPosts([newPost, ...posts]);
    setShowForm(false);
    toast.success("Post shared with the community!", {
      description: "Thanks for sharing your eco-savings!"
    });
  };
  
  const likePost = (id: string) => {
    setPosts(posts.map(post => 
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ));
  };
  
  return (
    <div className="space-y-6 pb-20">
      <motion.h1 
        className="text-3xl font-bold tracking-tight"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        EcoHero
      </motion.h1>
      
      <motion.div 
        className="eco-card glass-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex items-center space-x-4 mb-4">
          <Avatar>
            <AvatarImage 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop" 
              alt="Your avatar" 
            />
            <AvatarFallback>YA</AvatarFallback>
          </Avatar>
          <button 
            onClick={() => setShowForm(true)} 
            className="flex-grow h-12 px-4 rounded-full border border-border bg-background/50 hover:bg-background flex items-center text-muted-foreground"
          >
            Share your eco-savings for today...
          </button>
        </div>
        
        <AnimatePresence>
          {showForm && (
            <SavingsForm 
              onSubmit={addNewPost}
              onCancel={() => setShowForm(false)}
            />
          )}
        </AnimatePresence>
      </motion.div>
      
      <div className="space-y-5">
        <AnimatePresence>
          {posts.map((post, index) => (
            <motion.div 
              key={post.id} 
              className="eco-card glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ 
                duration: 0.4,
                delay: index * 0.1
              }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <Avatar>
                  <AvatarImage 
                    src={post.avatar} 
                    alt={`${post.username}'s avatar`}
                  />
                  <AvatarFallback>{post.username.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center">
                    <h3 className="font-medium">{post.username}</h3>
                    <div className="ml-2 w-5 h-5 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary text-xs">★</span>
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <span>{post.date}</span>
                  </div>
                </div>
              </div>
              
              <p className="mb-4">{post.content}</p>
              
              {post.image && (
                <div className="mb-4 rounded-lg overflow-hidden">
                  <img 
                    src={post.image} 
                    alt="Post content" 
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}
              
              <div className="flex flex-wrap gap-2 mb-4">
                {post.savings.energy > 0 && (
                  <div className="bg-eco-leaf/10 text-eco-leaf px-3 py-1.5 rounded-full text-sm flex items-center">
                    <span className="font-medium mr-1">{post.savings.energy}</span> kWh
                  </div>
                )}
                {post.savings.water > 0 && (
                  <div className="bg-eco-sky/10 text-eco-sky px-3 py-1.5 rounded-full text-sm flex items-center">
                    <span className="font-medium mr-1">{post.savings.water}</span> L
                  </div>
                )}
                {post.savings.waste > 0 && (
                  <div className="bg-eco-earth/10 text-eco-earth px-3 py-1.5 rounded-full text-sm flex items-center">
                    <span className="font-medium mr-1">{post.savings.waste}</span> kg
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <motion.button 
                  className="flex items-center space-x-1 text-muted-foreground hover:text-primary"
                  onClick={() => likePost(post.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{post.likes}</span>
                </motion.button>
                
                <div className="flex items-center space-x-1 text-muted-foreground">
                  <MessageSquare className="w-4 h-4" />
                  <span>{post.comments}</span>
                </div>
              </div>
              
              {post.id === '1' && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="space-y-4">
                    <div className="flex space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage 
                          src="https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=120&h=120&fit=crop" 
                          alt="Commenter"
                        />
                        <AvatarFallback>EE</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="bg-muted rounded-lg p-2">
                          <h4 className="text-sm font-medium">EcoEnthusiast</h4>
                          <p className="text-sm">That's awesome! How much time did it take you?</p>
                        </div>
                        <div className="flex items-center mt-1 text-xs text-muted-foreground">
                          <span>2h ago</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage 
                          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop" 
                          alt="Your avatar"
                        />
                        <AvatarFallback>YA</AvatarFallback>
                      </Avatar>
                      <div className="flex-grow relative">
                        <Textarea 
                          placeholder="Write a comment..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          className="min-h-[60px] pr-10"
                        />
                        <button className="absolute right-2 bottom-2 text-primary hover:text-primary/80">
                          <Send className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DailyPosts;
