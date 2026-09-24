const mongoose = require('mongoose');
const ChatHistory = require('../models/ChatHistory');

function dbReady() {
  return mongoose.connection && mongoose.connection.readyState === 1;
}

async function getHistory(req, res, next) {
  try {
    if (!dbReady()) {
      return res.json({ success: true, demoMode: true, history: [] });
    }
    const history = await ChatHistory.find().sort({ createdAt: -1 }).limit(50);
    res.json({ success: true, demoMode: false, history });
  } catch (err) {
    next(err);
  }
}

module.exports = { getHistory };
