
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, X, Droplet, Lightbulb, Recycle } from 'lucide-react';
import { Textarea } from "./ui/textarea";

interface SavingsFormProps {
  onSubmit: (savings: { energy: number; water: number; waste: number }, content: string) => void;
  onCancel: () => void;
}

const SavingsForm: React.FC<SavingsFormProps> = ({ onSubmit, onCancel }) => {
  const [content, setContent] = useState('');
  const [savings, setSavings] = useState({
    energy: 0, // kWh
    water: 0, // Liters
    waste: 0, // kg
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSavings({
      ...savings,
      [name]: parseFloat(value) || 0,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) return;
    
    onSubmit(savings, content);
  };
  
  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="space-y-4"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Textarea
        placeholder="Share details about your eco-friendly actions today..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[100px]"
      />
      
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="eco-card bg-eco-leaf/5">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-eco-leaf/10 flex items-center justify-center">
              <Lightbulb className="w-4 h-4 text-eco-leaf" />
            </div>
            <h4 className="font-medium">Energy Saved</h4>
          </div>
          <div className="flex items-center">
            <input
              type="number"
              name="energy"
              min="0"
              step="0.1"
              value={savings.energy || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-l-md border border-border focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <span className="px-3 py-2 bg-muted border border-l-0 border-border rounded-r-md text-muted-foreground">kWh</span>
          </div>
        </div>
        
        <div className="eco-card bg-eco-sky/5">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-eco-sky/10 flex items-center justify-center">
              <Droplet className="w-4 h-4 text-eco-sky" />
            </div>
            <h4 className="font-medium">Water Saved</h4>
          </div>
          <div className="flex items-center">
            <input
              type="number"
              name="water"
              min="0"
              step="0.1"
              value={savings.water || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-l-md border border-border focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <span className="px-3 py-2 bg-muted border border-l-0 border-border rounded-r-md text-muted-foreground">Liters</span>
          </div>
        </div>
        
        <div className="eco-card bg-eco-earth/5">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-eco-earth/10 flex items-center justify-center">
              <Recycle className="w-4 h-4 text-eco-earth" />
            </div>
            <h4 className="font-medium">Waste Reduced</h4>
          </div>
          <div className="flex items-center">
            <input
              type="number"
              name="waste"
              min="0"
              step="0.1"
              value={savings.waste || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-l-md border border-border focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <span className="px-3 py-2 bg-muted border border-l-0 border-border rounded-r-md text-muted-foreground">kg</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        <motion.button 
          type="button"
          onClick={onCancel}
          className="flex items-center space-x-1 px-4 py-2 rounded-md hover:bg-muted"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <X className="w-4 h-4" />
          <span>Cancel</span>
        </motion.button>
        
        <motion.button 
          type="submit"
          className="flex items-center space-x-1 px-4 py-2 rounded-md bg-primary text-white hover:bg-primary/90"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={!content.trim()}
        >
          <Save className="w-4 h-4" />
          <span>Share Post</span>
        </motion.button>
      </div>
    </motion.form>
  );
};

export default SavingsForm;
