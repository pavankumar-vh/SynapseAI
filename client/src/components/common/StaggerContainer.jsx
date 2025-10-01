import React from 'react';
import { motion } from 'framer-motion';

/**
 * StaggerContainer - Container for staggered children animations
 * Children will animate in sequence with a stagger effect
 */
const StaggerContainer = ({ children, className = '', staggerDelay = 0.1 }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * StaggerItem - Individual item in stagger container
 */
export const StaggerItem = ({ children, className = '' }) => {
  const item = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    show: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  );
};

export default StaggerContainer;
