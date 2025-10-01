import React from 'react';
import { motion } from 'framer-motion';

const Card = ({
  children,
  title,
  subtitle,
  footer,
  className = '',
  hover = false,
  ...props
}) => {
  const cardClass = hover ? 'card-hover' : 'card';
  
  return (
    <motion.div 
      className={`${cardClass} ${className}`} 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={hover ? { 
        y: -4, 
        transition: { type: "spring", stiffness: 300, damping: 20 } 
      } : {}}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-xl font-semibold text-dark-text">{title}</h3>}
          {subtitle && <p className="text-sm text-dark-muted mt-1">{subtitle}</p>}
        </div>
      )}
      <div className="card-content">
        {children}
      </div>
      {footer && (
        <div className="mt-4 pt-4 border-t border-dark-border">
          {footer}
        </div>
      )}
    </motion.div>
  );
};

export default Card;


