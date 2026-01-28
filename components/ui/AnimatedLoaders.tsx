'use client';

import { motion } from 'framer-motion';
import { Loader2, Plane } from 'lucide-react';

/**
 * Simple Spinner - Default loading indicator
 */
export function Spinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    >
      <Loader2 className={`${sizeClasses[size]} text-blue-600`} />
    </motion.div>
  );
}

/**
 * Pulsing Dots - Three dot animation
 */
export function PulsingDots() {
  return (
    <div className="flex items-center justify-center gap-2">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="w-3 h-3 bg-blue-600 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: index * 0.2,
          }}
        />
      ))}
    </div>
  );
}

/**
 * Skeleton Loader - For cards and content
 */
export function SkeletonLoader({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`bg-gray-200 rounded ${className}`}
      animate={{
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}

/**
 * Drone Loading Animation - Custom themed loader
 */
export function DroneLoader() {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Plane className="w-16 h-16 text-blue-600" />
      </motion.div>
      <motion.p
        className="mt-4 text-gray-600 font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Loading...
      </motion.p>
    </div>
  );
}

/**
 * Progress Bar Loader
 */
export function ProgressLoader({ progress = 0 }: { progress?: number }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-600">Loading...</span>
        <span className="text-sm font-medium text-blue-600">{progress}%</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-blue-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}

/**
 * Card Skeleton - For drone cards
 */
export function DroneCardSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <SkeletonLoader className="h-6 w-32" />
          <SkeletonLoader className="h-4 w-24" />
        </div>
        <SkeletonLoader className="h-3 w-3 rounded-full" />
      </div>

      <SkeletonLoader className="h-6 w-20" />

      <div className="space-y-3">
        <SkeletonLoader className="h-4 w-full" />
        <SkeletonLoader className="h-4 w-full" />
        <SkeletonLoader className="h-4 w-3/4" />
      </div>

      <div className="pt-4 border-t border-gray-200">
        <SkeletonLoader className="h-4 w-full" />
      </div>
    </div>
  );
}

/**
 * Grid Skeleton - Multiple card skeletons
 */
export function DroneGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <DroneCardSkeleton />
        </motion.div>
      ))}
    </div>
  );
}

/**
 * Table Skeleton
 */
export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonLoader key={i} className="h-10 flex-1" />
        ))}
      </div>

      {/* Rows */}
      {Array.from({ length: rows }).map((_, i) => (
        <motion.div
          key={i}
          className="flex gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
        >
          {Array.from({ length: 5 }).map((_, j) => (
            <SkeletonLoader key={j} className="h-12 flex-1" />
          ))}
        </motion.div>
      ))}
    </div>
  );
}

/**
 * Full Page Loader - Centered on screen
 */
export function FullPageLoader({
  message = 'Loading...',
}: {
  message?: string;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <DroneLoader />
        <motion.p
          className="text-gray-600 mt-4"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {message}
        </motion.p>
      </div>
    </div>
  );
}

/**
 * Inline Loader - Small loader for buttons/inline use
 */
export function InlineLoader() {
  return (
    <div className="inline-flex items-center gap-2">
      <Spinner size="sm" />
      <span className="text-sm text-gray-600">Loading...</span>
    </div>
  );
}
