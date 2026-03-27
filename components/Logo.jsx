import React, { useId } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Logo = ({ size = 'medium' }) => {
  const uid = useId().replace(/:/g, '');
  const strokeId = `logo-stroke-${uid}`;
  const fillId = `logo-fill-${uid}`;
  const sizeClasses = {
    small: 'text-1xl',
    medium: 'text-4xl',
    large: 'text-6xl'
  };

  return (
    <motion.div 
      className={`font-bold ${sizeClasses[size]} relative ml-11`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative flex items-center">
        {/* Crown Icon */}
        <motion.svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          className="absolute -left-12 -top-1"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <defs>
            <linearGradient id={strokeId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
            <linearGradient id={fillId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <motion.path
            d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5Z"
            fill="none"
            stroke={`url(#${strokeId})`}
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.path
            d="M19 16H5V19H19V16Z"
            fill={`url(#${fillId})`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          />
        </motion.svg>

        {/* Main Text Container */}
        <Link href='/'>
        <div className="relative">
         
          {/* Background Text Effect */}
          <motion.div
            className="absolute -left-1 -top-1 text-gray-200 dark:text-gray-800 select-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.2 }}
          >
            Kingdom Code
          </motion.div>
         
          {/* Main Text */}
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="bg-gradient-to-br from-cyan-400 via-violet-400 to-fuchsia-500 bg-clip-text text-transparent">
              Kingdom
            </span>
            <span className="ml-2 text-gray-900 dark:text-white">
              Code
            </span>
          </motion.div>

          {/* Animated Border */}
          <motion.div
            className="absolute -bottom-2 left-0 h-1 rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{
              duration: 0.8,
              delay: 0.6,
              ease: "easeOut"
            }}
          />

          {/* Glowing Dots */}
          <motion.div
            className="absolute -right-4 top-1/2 h-2 w-2 rounded-full bg-cyan-400"
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(34, 211, 238, 0.45)',
                '0 0 0 12px rgba(34, 211, 238, 0)',
              ]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        </Link>
        {/* Binary Code Background Effect */}
        <motion.div
          className="absolute -right-16 top-0 text-xs font-mono text-gray-300 dark:text-gray-700 opacity-50 select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 0.8 }}
        >
          <div>01</div>
          <div>10</div>
          <div>01</div>
        </motion.div>
      </div>
      
    </motion.div>
  );
};

export default Logo;