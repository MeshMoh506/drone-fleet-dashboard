'use client';

import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Battery, MapPin, Clock, Gauge } from 'lucide-react';
import { Drone } from '@/lib/types';
import { formatRelativeTime } from '@/lib/utils';
import { useEffect } from 'react';
import Link from 'next/link';

interface DroneModalProps {
  drone: Drone;
}

export default function DroneModal({ drone }: DroneModalProps) {
  const router = useRouter();

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-500',
    charging: 'bg-yellow-500',
    'in-mission': 'bg-blue-500',
  };

  const statusLabels = {
    online: 'Online',
    offline: 'Offline',
    charging: 'Charging',
    'in-mission': 'In Mission',
  };

  const batteryColor =
    drone.battery > 60
      ? 'text-green-600 dark:text-green-400'
      : drone.battery > 30
        ? 'text-yellow-600 dark:text-yellow-400'
        : 'text-red-600 dark:text-red-400';

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        router.back();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [router]);

  const handleClose = () => {
    router.back();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-2xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </button>

          {/* Content */}
          <div className="p-8">
            {/* Header */}
            <div className="flex items-start gap-6 mb-6">
              {/* Status indicator */}
              <div className="relative">
                <div
                  className={`w-4 h-4 rounded-full ${statusColors[drone.status]}`}
                />
                <motion.div
                  className={`absolute top-0 left-0 w-4 h-4 rounded-full ${statusColors[drone.status]}`}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>

              {/* Title */}
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {drone.name}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  {drone.model}
                </p>
                <span
                  className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-medium ${statusColors[drone.status]} text-white`}
                >
                  {statusLabels[drone.status]}
                </span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {/* Battery */}
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-3 mb-2">
                  <Battery className={`w-5 h-5 ${batteryColor}`} />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Battery
                  </span>
                </div>
                <p className={`text-2xl font-bold ${batteryColor}`}>
                  {Math.round(drone.battery)}%
                </p>
              </div>

              {/* Altitude */}
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Altitude
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {Math.round(drone.altitude)}m
                </p>
              </div>

              {/* Speed */}
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-3 mb-2">
                  <Gauge className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Speed
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {Math.round(drone.speed)} km/h
                </p>
              </div>

              {/* Flight Hours */}
              <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Flight Hours
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {drone.flightHours}h
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 mb-6">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                Current Location
              </h3>
              <p className="text-sm font-mono text-gray-900 dark:text-white">
                {drone.position.lat.toFixed(4)}°N,{' '}
                {drone.position.lng.toFixed(4)}°E
              </p>
            </div>

            {/* Last Mission */}
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
                Last Mission
              </h3>
              <p className="text-gray-900 dark:text-white">
                {formatRelativeTime(drone.lastMission)}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              {/* Use Link with scroll={false} to force full navigation */}
              <Link
                href={`/drones/${drone.id}`}
                scroll={false}
                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-center"
                onClick={() => {
                  // Force a hard navigation by using window.location
                  setTimeout(() => {
                    window.location.href = `/drones/${drone.id}`;
                  }, 100);
                }}
              >
                View Full Details
              </Link>
              <button
                onClick={handleClose}
                className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
