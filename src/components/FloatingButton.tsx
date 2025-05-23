import { motion } from 'framer-motion';
import React from 'react';
import { useSound } from '../hooks/useSound';

interface FloatingButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  onClick,
  children,
  className = '',
  disabled = false,
}) => {
  const { playHover, playClick } = useSound();

  return (
    <motion.button
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => {
        playClick();
        onClick?.();
      }}
      onMouseEnter={playHover}
      disabled={disabled}
      className={`
        relative overflow-hidden
        px-4 py-2 rounded-lg
        bg-gradient-to-r from-primary to-primary-light
        text-secondary-dark font-bold
        shadow-lg
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors duration-300
        hover:from-primary-light hover:to-primary
        ${className}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-glow" />
      <div className="relative z-10">{children}</div>
    </motion.button>
  );
};

export default FloatingButton;