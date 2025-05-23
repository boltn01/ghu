import React from 'react';
import { motion } from 'framer-motion';

interface MashrabiyaPatternProps {
  className?: string;
}

const MashrabiyaPattern: React.FC<MashrabiyaPatternProps> = ({ className = '' }) => {
  return (
    <motion.div 
      className={`absolute inset-0 opacity-10 pointer-events-none ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.1 }}
      transition={{ duration: 2 }}
      aria-hidden="true"
    >
      <motion.div 
        className="absolute inset-0 bg-repeat pattern-mashrabiya"
        animate={{ 
          backgroundPosition: ['0% 0%', '100% 100%']
        }}
        transition={{ 
          duration: 100,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </motion.div>
  );
};

export default MashrabiyaPattern;