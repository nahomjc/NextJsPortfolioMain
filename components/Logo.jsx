import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Logo = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'text-1xl',
    medium: 'text-4xl',
    large: 'text-6xl'
  };

  return (
    <motion.div 
      className={`font-bold ${sizeClasses[size]} relative`}
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
          <motion.path
            d="M5 16L3 5L8.5 10L12 4L15.5 10L21 5L19 16H5Z"
            fill="none"
            stroke="#5651e5"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.path
            d="M19 16H5V19H19V16Z"
            fill="#5651e5"
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
            <span className="bg-gradient-to-br from-[#5651e5] via-[#709dff] to-[#5651e5] text-transparent bg-clip-text">
              Kingdom
            </span>
            <span className="ml-2 text-gray-900 dark:text-white">
              Code
            </span>
          </motion.div>

          {/* Animated Border */}
          <motion.div
            className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-[#5651e5] via-[#709dff] to-[#5651e5] rounded-full"
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
            className="absolute -right-4 top-1/2 w-2 h-2 rounded-full bg-[#5651e5]"
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(86, 81, 229, 0.4)',
                '0 0 0 10px rgba(86, 81, 229, 0)',
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