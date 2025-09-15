'use client';

import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  color?: 'primary' | 'white' | 'gray';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  className = '',
  color = 'primary'
}) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  };

  const colors = {
    primary: 'border-primary',
    white: 'border-white',
    gray: 'border-gray-400'
  };

  return (
    <div
      className={`animate-spin rounded-full border-2 border-transparent ${sizes[size]} ${colors[color]} border-t-current ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
};

interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
  message?: string;
  className?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isLoading,
  children,
  message = 'Carregando...',
  className = ''
}) => {
  return (
    <div className={`relative ${className}`}>
      {children}
      
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
          <div className="text-center">
            <LoadingSpinner size="lg" />
            <p className="mt-2 text-drone-gray font-medium">{message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

interface PageLoadingProps {
  message?: string;
}

export const PageLoading: React.FC<PageLoadingProps> = ({
  message = 'Carregando página...'
}) => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <LoadingSpinner size="xl" />
        <p className="mt-4 text-lg font-medium text-drone-gray">{message}</p>
      </div>
    </div>
  );
};