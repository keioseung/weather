/* Simple static server for Railway with healthcheck */
const path = require('path');
const express = require('express');

const app = express();
const PORT = parseInt(process.env.PORT || '8080', 10);

const distDir = path.join(__dirname, 'dist');

// Healthcheck
app.get('/health', (_req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Static assets
app.use(express.static(distDir, { maxAge: '1h', index: false }));

// SPA fallback
app.get('*', (_req, res) => {
  res.sendFile(path.join(distDir, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Frontend server listening on ${PORT}`);
});


