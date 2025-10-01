import React from 'react';
import { motion } from 'framer-motion';
import Dashboard from '../components/dashboard/Dashboard';

const DashboardPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Dashboard />
    </motion.div>
  );
};

export default DashboardPage;


