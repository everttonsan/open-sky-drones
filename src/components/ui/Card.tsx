'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = true,
  glass = false
}) => {
  const baseClasses = 'rounded-2xl p-6 smooth-transition';
  const glassClasses = glass ? 'glass' : 'bg-white dark:bg-gray-800 shadow-elevation border border-gray-200 dark:border-gray-700';
  const hoverClasses = hover ? 'hover-lift hover:shadow-xl' : '';
  
  const classes = `${baseClasses} ${glassClasses} ${hoverClasses} ${className}`;
  
  return (
    <motion.div
      className={classes}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={hover ? { scale: 1.02 } : {}}
    >
      {children}
    </motion.div>
  );
};