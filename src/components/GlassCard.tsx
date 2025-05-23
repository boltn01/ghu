import { motion } from 'framer-motion';
import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`
        relative overflow-hidden
        backdrop-blur-lg bg-glass-light
        border border-primary/20
        rounded-2xl shadow-xl
        ${className}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-glass-light to-glass-dark opacity-50" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default GlassCard;