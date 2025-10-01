import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Loader from '../common/Loader';
import { getAdminStats } from '../../services/adminService';

/**
 * AdminRoute - Protects routes that require admin privileges
 * Checks if user is authenticated AND has admin access
 */
const AdminRoute = ({ children }) => {
  const { currentUser, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAdminAccess = async () => {
      if (!currentUser) {
        setChecking(false);
        return;
      }

      try {
        // Try to fetch admin stats - only admins can access this
        await getAdminStats();
        setIsAdmin(true);
      } catch (error) {
        console.log('❌ Not an admin user');
        setIsAdmin(false);
      } finally {
        setChecking(false);
      }
    };

    if (!authLoading) {
      checkAdminAccess();
    }
  }, [currentUser, authLoading]);

  // Show loader while checking auth or admin status
  if (authLoading || checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-bg">
        <Loader />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Redirect to dashboard if authenticated but not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-bg">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500 mb-4">Access Denied</h1>
          <p className="text-dark-muted mb-6">You don't have admin privileges to access this page.</p>
          <a 
            href="/dashboard" 
            className="inline-block px-6 py-3 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    );
  }

  // User is authenticated and is an admin
  return children;
};

export default AdminRoute;
