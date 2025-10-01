require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/config/database');
const https = require('https');

const PORT = process.env.PORT || 5000;

// Initialize database connection
connectDB();

// Start server
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 API URL: http://localhost:${PORT}/api`);
  
  // Keep-alive for Render free tier (prevents sleep after 15 min inactivity)
  if (process.env.NODE_ENV === 'production') {
    const RENDER_URL = process.env.RENDER_EXTERNAL_URL || 'https://synapseai-7dxo.onrender.com';
    const PING_INTERVAL = 14 * 60 * 1000; // 14 minutes
    
    setInterval(() => {
      https.get(`${RENDER_URL}/api/health`, (res) => {
        console.log(`⏰ Keep-alive ping - Status: ${res.statusCode}`);
      }).on('error', (err) => {
        console.error(`❌ Keep-alive ping failed:`, err.message);
      });
    }, PING_INTERVAL);
    
    console.log(`⏰ Keep-alive enabled - pinging every 14 minutes`);
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('📴 SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('✅ HTTP server closed');
  });
});

process.on('SIGINT', () => {
  console.log('📴 SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('✅ HTTP server closed');
    process.exit(0);
  });
});

