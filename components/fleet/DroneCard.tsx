'use client';

import { memo } from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { Drone } from '@/lib/types';
import { Battery, MapPin, Clock, ChevronRight } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils';

interface DroneCardProps {
  drone: Drone;
  viewMode: 'grid' | 'list';
  index?: number;
}

const DroneCard = memo(function DroneCard({
  drone,
  viewMode,
  index = 0,
}: DroneCardProps) {
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
      ? 'text-green-600'
      : drone.battery > 30
        ? 'text-yellow-600'
        : 'text-red-600';

  // Animation variants with proper TypeScript types
  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        delay: index * 0.05,
        ease: 'easeOut', // Use string preset instead of array
      },
    },
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.01, y: -2 }}
        transition={{ duration: 0.2 }}
      >
        <Link href={`/drones/${drone.id}`}>
          <div className="bg-white rounded-lg shadow hover:shadow-xl transition-shadow p-4 flex items-center gap-4">
            {/* Fixed: Single pulsing status indicator */}
            <div className="flex-shrink-0 relative">
              <motion.div
                className={`w-3 h-3 rounded-full ${statusColors[drone.status]}`}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className={`absolute top-0 left-0 w-3 h-3 rounded-full ${statusColors[drone.status]}`}
                animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>

            <div className="flex-1 grid grid-cols-5 gap-4 items-center">
              <div>
                <p className="font-semibold text-gray-900">{drone.name}</p>
                <p className="text-sm text-gray-600">{drone.model}</p>
              </div>

              <div className="flex items-center gap-2">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[drone.status]} text-white`}
                >
                  {statusLabels[drone.status]}
                </motion.span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Battery className={`w-4 h-4 ${batteryColor}`} />
                <span className={batteryColor}>
                  {Math.round(drone.battery)}%
                </span>
              </div>

              <div className="text-sm text-gray-600">
                <Clock className="w-4 h-4 inline mr-1" />
                {formatRelativeTime(drone.lastMission)}
              </div>

              <div className="flex justify-end">
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </motion.div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{
        scale: 1.03,
        y: -8,
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <Link href={`/drones/${drone.id}`}>
        <div className="bg-white rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 p-6 h-full relative overflow-hidden group">
          {/* Gradient overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100"
            transition={{ duration: 0.3 }}
          />

          {/* Content */}
          <div className="relative z-10">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                  {drone.name}
                </h3>
                <p className="text-sm text-gray-600">{drone.model}</p>
              </div>
              <div className="relative">
                <motion.div
                  className={`w-3 h-3 rounded-full ${statusColors[drone.status]}`}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className={`absolute top-0 left-0 w-3 h-3 rounded-full ${statusColors[drone.status]}`}
                  animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </div>

            {/* Status Badge */}
            <motion.div
              className="mb-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[drone.status]} text-white inline-block`}
              >
                {statusLabels[drone.status]}
              </span>
            </motion.div>

            {/* Stats */}
            <div className="space-y-3">
              <motion.div
                className="flex items-center justify-between"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-sm text-gray-600 flex items-center gap-2">
                  <Battery className="w-4 h-4" />
                  Battery
                </span>
                <span className={`font-semibold ${batteryColor}`}>
                  {Math.round(drone.battery)}%
                </span>
              </motion.div>

              <motion.div
                className="flex items-center justify-between"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-sm text-gray-600 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Altitude
                </span>
                <span className="font-semibold text-gray-900">
                  {Math.round(drone.altitude)}m
                </span>
              </motion.div>

              <motion.div
                className="flex items-center justify-between"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-sm text-gray-600 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Last Mission
                </span>
                <span className="font-semibold text-gray-900">
                  {formatRelativeTime(drone.lastMission)}
                </span>
              </motion.div>
            </div>

            {/* Footer */}
            <motion.div
              className="mt-4 pt-4 border-t border-gray-200"
              initial={{ opacity: 0.7 }}
              whileHover={{ opacity: 1 }}
            >
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Flight Hours</span>
                <span className="font-semibold text-gray-900">
                  {drone.flightHours}h
                </span>
              </div>
            </motion.div>
          </div>

          {/* Hover arrow indicator */}
          <motion.div
            className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100"
            initial={{ x: -10 }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronRight className="w-5 h-5 text-blue-500" />
          </motion.div>
        </div>
      </Link>
    </motion.div>
  );
});

export default DroneCard;
