import React from 'react';
import { motion } from 'framer-motion';

/**
 * PageTransition - Smooth page transitions wrapper
 * Wraps page components to add enter/exit animations
 */
const PageTransition = ({ children, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1] // Custom cubic-bezier for buttery smooth
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
