'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Plane,
  Map,
  ListChecks,
  BarChart3,
  Grid3x3,
  Rocket,
  ArrowRight,
} from 'lucide-react';

const navigationCards = [
  {
    title: 'Fleet Overview',
    description: 'Monitor and manage all 25 drones in real-time',
    href: '/fleet',
    icon: Grid3x3,
    color: 'from-blue-500 to-blue-600',
    hoverColor: 'hover:from-blue-600 hover:to-blue-700',
  },
  {
    title: 'Live Map',
    description: 'Track drone positions on interactive map',
    href: '/map',
    icon: Map,
    color: 'from-green-500 to-green-600',
    hoverColor: 'hover:from-green-600 hover:to-green-700',
  },
  {
    title: 'Mission Planning',
    description: 'Create and manage flight missions',
    href: '/missions/new',
    icon: ListChecks,
    color: 'from-purple-500 to-purple-600',
    hoverColor: 'hover:from-purple-600 hover:to-purple-700',
  },
  {
    title: 'Analytics',
    description: 'View fleet statistics and performance',
    href: '/analytics',
    icon: BarChart3,
    color: 'from-orange-500 to-orange-600',
    hoverColor: 'hover:from-orange-600 hover:to-orange-700',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              type: 'spring',
              stiffness: 200,
            }}
            className="inline-flex items-center justify-center w-24 h-24 mb-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl shadow-2xl"
          >
            <Plane className="w-12 h-12 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-6xl md:text-7xl font-bold text-white mb-4"
          >
            Drone Fleet
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Management
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Professional-grade drone fleet monitoring and mission planning
            interface
          </motion.p>
        </motion.div>

        {/* Navigation Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl w-full"
        >
          {navigationCards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div key={card.href} variants={item}>
                <Link href={card.href}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      relative group h-full p-8 rounded-2xl bg-white/5 backdrop-blur-sm
                      border border-white/10 shadow-2xl cursor-pointer overflow-hidden
                      transition-all duration-300
                    `}
                  >
                    {/* Gradient Overlay on Hover */}
                    <div
                      className={`
                        absolute inset-0 bg-gradient-to-br ${card.color} opacity-0
                        group-hover:opacity-10 transition-opacity duration-300
                      `}
                    />

                    {/* Content */}
                    <div className="relative z-10">
                      <div
                        className={`
                          inline-flex items-center justify-center w-16 h-16 mb-6 rounded-xl
                          bg-gradient-to-br ${card.color} shadow-lg
                          group-hover:scale-110 transition-transform duration-300
                        `}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>

                      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                        {card.title}
                      </h3>

                      <p className="text-gray-400 mb-6 line-clamp-2">
                        {card.description}
                      </p>

                      <div className="flex items-center text-blue-400 font-semibold group-hover:text-blue-300 transition-colors">
                        <span className="mr-2">Explore</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>

                    {/* Border Glow Effect */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div
                        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.color} blur-xl`}
                      />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-gray-400"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>25 Drones Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            <span>Live Monitoring</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
            <span>Real-time Updates</span>
          </div>
        </motion.div>

        {/* Quick Access Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, type: 'spring' }}
          className="mt-12"
        >
          <Link href="/fleet">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white font-bold text-lg shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 flex items-center gap-3"
            >
              <Rocket className="w-6 h-6 group-hover:rotate-45 transition-transform duration-300" />
              Launch Dashboard
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
