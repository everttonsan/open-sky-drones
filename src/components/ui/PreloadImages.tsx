'use client';

import { useEffect } from 'react';

const criticalImages = [
  '/images/logo.jpeg',
  'https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=2070&auto=format&fit=crop',
];

export const PreloadImages: React.FC = () => {
  useEffect(() => {
    criticalImages.forEach((src) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }, []);

  return null;
};