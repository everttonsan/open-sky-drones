'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  loading = false,
  disabled,
  ...props
}) => {
  const baseClasses = 'touch-target interactive-element smooth-transition inline-flex items-center justify-center font-medium focus-ring disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden';
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg hover:from-blue-600 hover:to-cyan-600 hover:shadow-xl hover:shadow-blue-500/25',
    secondary: 'bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white hover:shadow-lg',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white hover:shadow-lg backdrop-blur-sm',
    ghost: 'text-primary hover:bg-primary/10 hover:backdrop-blur-sm'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg min-h-[44px]',
    md: 'px-6 py-3 text-base rounded-xl min-h-[48px]',
    lg: 'px-8 py-4 text-lg rounded-xl min-h-[52px]'
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  return (
    <motion.button
      className={classes}
      disabled={disabled || loading}
      whileHover={{ 
        scale: 1.02,
        y: -1
      }}
      whileTap={{ 
        scale: 0.98,
        y: 0
      }}
      initial={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 17
      }}
      {...(props as any)}
    >
      {/* Ripple effect on hover */}
      <motion.div
        className="absolute inset-0 bg-white/20 rounded-xl"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
      
      <span className="relative z-10 flex items-center gap-2">
        {loading ? (
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
        ) : (
          children
        )}
      </span>
    </motion.button>
  );
};