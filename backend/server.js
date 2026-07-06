require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mean_blog_db')
  .then(() => console.log('✓ MongoDB connected'))
  .catch(err => console.error('✗ MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));

// Serve the Angular build as the main frontend entry point
const frontendDistPath = path.join(__dirname, '..', 'frontend', 'dist', 'frontend');
const frontendIndexPath = path.join(frontendDistPath, 'index.html');

if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));
}

// Fallback to Angular index.html for SPA routes
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API route not found' });
  }

  if (fs.existsSync(frontendIndexPath)) {
    return res.sendFile(frontendIndexPath);
  }

  return res.status(404).send('Angular frontend build not found. Run "npm run build" in the frontend folder.');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`\n🚀 Server running on http://localhost:${PORT}`));
