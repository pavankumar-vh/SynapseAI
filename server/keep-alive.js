const https = require('https');

const RENDER_URL = 'https://synapseai-7dxo.onrender.com';
const PING_INTERVAL = 14 * 60 * 1000; // 14 minutes in milliseconds

function pingServer() {
  const url = `${RENDER_URL}/health`;
  
  https.get(url, (res) => {
    console.log(`[${new Date().toISOString()}] Ping successful - Status: ${res.statusCode}`);
  }).on('error', (err) => {
    console.error(`[${new Date().toISOString()}] Ping failed:`, err.message);
  });
}

console.log(`Keep-alive service started. Pinging ${RENDER_URL} every 14 minutes...`);
pingServer(); // Ping immediately on start
setInterval(pingServer, PING_INTERVAL);
