import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from '../utils/firebase';
import { syncUser } from '../services/authService';
import toast from 'react-hot-toast';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Check if Firebase is configured
const isFirebaseConfigured = () => {
  return auth !== null && 
         import.meta.env.VITE_FIREBASE_API_KEY !== 'demo-api-key';
};

export const AuthProvider = ({ children }) => {
  console.log('🔐 AuthProvider initializing...');
  
  const [currentUser, setCurrentUser] = useState(null);
  const [idToken, setIdToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sign up new user
  const signup = async (email, password, displayName) => {
    if (!isFirebaseConfigured()) {
      const error = new Error('Firebase is not configured. Please add your Firebase credentials to .env file.');
      setError(error.message);
      toast.error('⚠️ Demo Mode: Firebase not configured. Check console for setup instructions.');
      console.error('🔥 Firebase Setup Required:');
      console.log('1. Create a Firebase project at https://console.firebase.google.com/');
      console.log('2. Enable Email/Password authentication');
      console.log('3. Copy your config to client/.env');
      console.log('4. See SETUP_GUIDE.md for detailed instructions');
      throw error;
    }
    
    try {
      setError(null);
      console.log('📝 Creating Firebase user...');
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update profile with display name
      if (displayName) {
        await updateProfile(userCredential.user, { displayName });
      }
      
      console.log('🔄 Syncing new user with backend...');
      // Sync with backend and wait for completion
      await syncUserWithBackend(userCredential.user);
      console.log('✅ User signup complete!');
      
      return userCredential.user;
    } catch (err) {
      console.error('❌ Signup error:', err);
      setError(err.message);
      throw err;
    }
  };

  // Sign in existing user
  const login = async (email, password) => {
    if (!isFirebaseConfigured()) {
      const error = new Error('Firebase is not configured. Please add your Firebase credentials to .env file.');
      setError(error.message);
      toast.error('⚠️ Demo Mode: Firebase not configured. Check console for setup instructions.');
      console.error('🔥 Firebase Setup Required:');
      console.log('1. Create a Firebase project at https://console.firebase.google.com/');
      console.log('2. Enable Email/Password authentication');
      console.log('3. Copy your config to client/.env');
      console.log('4. See SETUP_GUIDE.md for detailed instructions');
      throw error;
    }
    
    try {
      setError(null);
      console.log('🔐 Logging in user...');
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      console.log('🔄 Syncing user with backend...');
      // Sync with backend (in case it's first time or data needs update)
      await syncUserWithBackend(userCredential.user);
      console.log('✅ Login complete!');
      
      return userCredential.user;
    } catch (err) {
      console.error('❌ Login error:', err);
      setError(err.message);
      throw err;
    }
  };

  // Sign out user
  const logout = async () => {
    try {
      setError(null);
      await signOut(auth);
      setCurrentUser(null);
      setIdToken(null);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Reset password (send reset email)
  const resetPassword = async (email) => {
    if (!isFirebaseConfigured()) {
      const error = new Error('Firebase is not configured. Please add your Firebase credentials to .env file.');
      setError(error.message);
      toast.error('⚠️ Demo Mode: Firebase not configured.');
      throw error;
    }

    try {
      setError(null);
      console.log('📧 Sending password reset email to:', email);
      await sendPasswordResetEmail(auth, email);
      console.log('✅ Password reset email sent successfully');
      return true;
    } catch (err) {
      console.error('❌ Password reset error:', err);
      setError(err.message);
      throw err;
    }
  };

  // Sync user with backend
  const syncUserWithBackend = async (user) => {
    if (!user) {
      console.log('⚠️ No user provided to sync');
      return null;
    }
    
    const userData = {
      email: user.email,
      displayName: user.displayName || user.email.split('@')[0]
    };
    
    console.log('🔄 Syncing user with backend:', userData.email);
    
    // Try sync with retries
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const response = await syncUser(userData);
        console.log('✅ User synced successfully:', response);
        console.log('User credits after sync:', response.user?.credits);
        
        // Show success message for new users
        if (response.isNewUser) {
          toast.success(`🎉 Welcome! You've received ${response.user.credits} free credits!`);
        }
        
        return response;
      } catch (err) {
        console.error(`❌ Sync attempt ${attempt}/3 failed:`, err);
        console.error('Error details:', err.response?.data || err.message);
        
        if (attempt < 3) {
          console.log(`⏳ Waiting before retry ${attempt + 1}...`);
          await new Promise(resolve => setTimeout(resolve, 1500));
        } else {
          // Final attempt failed
          console.error('❌ All sync attempts failed');
          toast.error('Could not sync user data. Please refresh the page.');
        }
      }
    }
    
    // All retries failed, but don't block login
    return null;
  };

  // Get fresh ID token
  const refreshToken = async () => {
    if (currentUser) {
      try {
        const token = await currentUser.getIdToken(true);
        setIdToken(token);
        return token;
      } catch (err) {
        console.error('Error refreshing token:', err);
        throw err;
      }
    }
    return null;
  };

  // Listen to auth state changes
  useEffect(() => {
    console.log('🔐 AuthProvider useEffect running...');
    console.log('🔐 Auth object:', auth ? 'Present' : 'NULL');
    
    if (!auth) {
      console.warn('⚠️ Auth not initialized - running in demo mode');
      setLoading(false);
      return;
    }

    console.log('🔐 Setting up auth state listener...');
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('🔐 Auth state changed. User:', user ? user.email : 'No user');
      setCurrentUser(user);
      
      if (user) {
        try {
          // Get ID token
          const token = await user.getIdToken();
          setIdToken(token);
          
          // Sync with backend
          await syncUserWithBackend(user);
        } catch (err) {
          console.error('Error in auth state change:', err);
        }
      } else {
        setIdToken(null);
      }
      
      setLoading(false);
    });

    // Cleanup subscription
    return unsubscribe;
  }, []);

  // Refresh token every 55 minutes (Firebase tokens expire after 1 hour)
  useEffect(() => {
    if (currentUser) {
      const interval = setInterval(() => {
        refreshToken();
      }, 55 * 60 * 1000); // 55 minutes

      return () => clearInterval(interval);
    }
  }, [currentUser]);

  const value = {
    currentUser,
    idToken,
    signup,
    login,
    logout,
    resetPassword,
    refreshToken,
    loading,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};


