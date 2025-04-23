
import React from 'react';
import { motion } from 'framer-motion';

interface FormCardProps {
  children: React.ReactNode;
  className?: string;
}

const FormCard: React.FC<FormCardProps> = ({ children, className }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      className={`p-8 rounded-xl shadow-xl ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default FormCard;
