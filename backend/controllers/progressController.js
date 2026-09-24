const mongoose = require('mongoose');
const Progress = require('../models/Progress');

function dbReady() {
  return mongoose.connection && mongoose.connection.readyState === 1;
}

const DEMO_PROGRESS = {
  topicsStudied: [
    'DBMS Normalization',
    'OS Deadlock',
    'Data Structures - Binary Trees',
    'Computer Networks - OSI Model',
    'DBMS - Transactions & ACID',
  ],
  quizScores: [
    { subject: 'DBMS', topic: 'Normalization', score: 8, total: 10, date: '2026-09-10' },
    { subject: 'OS', topic: 'Deadlock', score: 7, total: 10, date: '2026-09-14' },
    { subject: 'CN', topic: 'OSI Model', score: 9, total: 10, date: '2026-09-18' },
    { subject: 'DSA', topic: 'Binary Trees', score: 6, total: 10, date: '2026-09-21' },
  ],
  studyStreak: 5,
  completedTopics: ['DBMS Normalization', 'OS Deadlock', 'OSI Model'],
};

async function getDemoProgress(req, res) {
  res.json({ success: true, demoMode: true, progress: DEMO_PROGRESS });
}

async function getProgress(req, res, next) {
  try {
    if (!dbReady()) {
      return res.json({ success: true, demoMode: true, progress: DEMO_PROGRESS });
    }
    let progress = await Progress.findOne({ userId: 'demo-user' });
    if (!progress) {
      progress = await Progress.create({ userId: 'demo-user', ...DEMO_PROGRESS });
    }
    res.json({ success: true, demoMode: false, progress });
  } catch (err) {
    next(err);
  }
}

module.exports = { getProgress, getDemoProgress };
