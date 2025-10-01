import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getUserCredits } from '../services/userService';

const CreditContext = createContext({});

export const useCredits = () => {
  const context = useContext(CreditContext);
  if (!context) {
    throw new Error('useCredits must be used within a CreditProvider');
  }
  return context;
};

export const CreditProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch credits from backend with retry logic
  const fetchCredits = async (retryCount = 0) => {
    if (!currentUser) {
      setCredits(0);
      setLoading(false);
      return;
    }

    try {
      setError(null);
      setLoading(true);
      console.log('💰 Fetching credits from backend for:', currentUser.email);
      const userCredits = await getUserCredits();
      console.log('✅ Credits fetched successfully:', userCredits);
      setCredits(userCredits || 0);
      setLoading(false);
    } catch (err) {
      console.error('❌ Error fetching credits:', err);
      console.error('Error details:', err.message);
      
      // Retry logic: if user was just created, backend might need a moment
      if (retryCount < 5) {
        console.log(`🔄 Retrying credit fetch (attempt ${retryCount + 1}/5)...`);
        setTimeout(() => {
          fetchCredits(retryCount + 1);
        }, 2000); // Fixed 2 second delay
        return;
      }
      
      console.error('❌ Failed to fetch credits after 5 attempts');
      setError('Failed to load credits. Please refresh the page.');
      // Set to 0 instead of leaving undefined
      setCredits(0);
      setLoading(false);
    }
  };

  // Update credits (usually after a generation)
  const updateCredits = (newCredits) => {
    setCredits(newCredits);
  };

  // Deduct credits locally (optimistic update)
  const deductCredits = (amount) => {
    setCredits((prev) => Math.max(0, prev - amount));
  };

  // Refresh credits from server
  const refreshCredits = async () => {
    console.log('🔄 Refreshing credits...');
    await fetchCredits();
  };

  // Fetch credits when user changes
  useEffect(() => {
    if (currentUser) {
      console.log('👤 User changed, fetching credits for:', currentUser.email);
      // Longer delay to ensure backend sync is complete
      const timer = setTimeout(() => {
        fetchCredits(0);
      }, 1500);
      
      return () => clearTimeout(timer);
    } else {
      setCredits(0);
      setLoading(false);
    }
  }, [currentUser]);

  const value = {
    credits,
    loading,
    error,
    updateCredits,
    deductCredits,
    refreshCredits
  };

  return (
    <CreditContext.Provider value={value}>
      {children}
    </CreditContext.Provider>
  );
};


