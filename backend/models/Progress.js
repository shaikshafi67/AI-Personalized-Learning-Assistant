const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema(
  {
    userId: { type: String, default: 'demo-user' },
    topicsStudied: { type: [String], default: [] },
    quizScores: {
      type: [
        {
          subject: String,
          topic: String,
          score: Number,
          total: Number,
          date: { type: Date, default: Date.now },
        },
      ],
      default: [],
    },
    studyStreak: { type: Number, default: 0 },
    completedTopics: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Progress || mongoose.model('Progress', ProgressSchema);
