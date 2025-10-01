const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
// For production (Render with Secret Files), use:
// const serviceAccount = require('/etc/secrets/firebase-service-account.json');
// admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

// For development/alternative method (using environment variables):
try {
  const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  };

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: process.env.FIREBASE_PROJECT_ID,
  });

  console.log('✅ Firebase Admin SDK initialized successfully');
} catch (error) {
  console.error('❌ Firebase Admin SDK initialization error:', error.message);
  process.exit(1);
}

module.exports = admin;


