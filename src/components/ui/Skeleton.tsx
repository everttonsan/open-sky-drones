'use client';

import React from 'react';

interface SkeletonProps {
  className?: string;
  count?: number;
  height?: string;
  width?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  count = 1,
  height = 'h-4',
  width = 'w-full'
}) => {
  const skeletons = Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      className={`animate-pulse bg-gray-200 rounded ${height} ${width} ${className}`}
    />
  ));

  return count === 1 ? skeletons[0] : <div className="space-y-3">{skeletons}</div>;
};

interface CardSkeletonProps {
  className?: string;
}

export const CardSkeleton: React.FC<CardSkeletonProps> = ({ className = '' }) => {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 animate-pulse ${className}`}>
      <div className="flex items-start space-x-4">
        <Skeleton height="h-12" width="w-12" className="rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton height="h-4" width="w-3/4" />
          <Skeleton height="h-3" width="w-1/2" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <Skeleton height="h-3" width="w-full" />
        <Skeleton height="h-3" width="w-5/6" />
      </div>
    </div>
  );
};

interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  className?: string;
}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({
  rows = 5,
  columns = 4,
  className = ''
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
          {Array.from({ length: columns }, (_, j) => (
            <Skeleton
              key={j}
              height="h-4"
              width={j === 0 ? 'w-24' : j === columns - 1 ? 'w-20' : 'w-32'}
            />
          ))}
        </div>
      ))}
    </div>
  );
};