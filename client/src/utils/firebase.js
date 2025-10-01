import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'demo-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'demo.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'demo-project',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'demo.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '123456',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:123456:web:demo'
};

let app = null;
let auth = null;

try {
  // Initialize Firebase
  console.log('🔥 Initializing Firebase with config:', {
    apiKey: firebaseConfig.apiKey ? '***' + firebaseConfig.apiKey.slice(-4) : 'missing',
    authDomain: firebaseConfig.authDomain,
    projectId: firebaseConfig.projectId
  });
  
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  
  console.log('✅ Firebase initialized successfully!');
  console.log('🔐 Auth ready:', auth ? 'Yes' : 'No');
} catch (error) {
  console.error('❌ Firebase initialization failed:', error);
  console.error('Error details:', error.message);
  console.log('App will continue without Firebase (features limited)');
}

export { auth };
export default app;


