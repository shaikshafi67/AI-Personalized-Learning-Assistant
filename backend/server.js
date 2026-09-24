require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');
const { generalRateLimiter } = require('./middleware/rateLimiter');
const { DEMO_MODE } = require('./services/claudeService');

const aiRoutes = require('./routes/aiRoutes');
const chatRoutes = require('./routes/chatRoutes');
const quizRoutes = require('./routes/quizRoutes');
const userRoutes = require('./routes/userRoutes');
const progressRoutes = require('./routes/progressRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

app.use(cors({ origin: CLIENT_ORIGIN.split(',').map((o) => o.trim()) }));
app.use(express.json({ limit: '1mb' }));
app.use(generalRateLimiter);

// Health check — frontend polls this to know whether backend is in demo mode
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'ok',
    demoMode: DEMO_MODE,
    dbConnected: mongoose.connection.readyState === 1,
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/ai', aiRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/user', userRoutes);
app.use('/api/progress', progressRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.warn('[DB] MONGO_URI not set — running WITHOUT a database. Demo/session data will be used.');
    return;
  }
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
    console.log('[DB] MongoDB connected successfully.');
  } catch (err) {
    console.warn('[DB] MongoDB connection failed — running WITHOUT a database. Error:', err.message);
  }
}

connectDB().finally(() => {
  app.listen(PORT, () => {
    console.log(`\n=== AI Personalized Learning Assistant Backend ===`);
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Demo Mode (no Gemini API key): ${DEMO_MODE ? 'ACTIVE' : 'inactive'}`);
    console.log(`===================================================\n`);
  });
});

module.exports = app;
