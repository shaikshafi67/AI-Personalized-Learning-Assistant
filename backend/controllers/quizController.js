const mongoose = require('mongoose');
const Quiz = require('../models/Quiz');
const Progress = require('../models/Progress');

function dbReady() {
  return mongoose.connection && mongoose.connection.readyState === 1;
}

async function submitQuiz(req, res, next) {
  try {
    const { subject, topic, difficulty, questions, answers } = req.body;
    if (!Array.isArray(questions) || !Array.isArray(answers)) {
      return res.status(400).json({ success: false, error: 'questions and answers must be arrays' });
    }
    let correct = 0;
    questions.forEach((q, i) => {
      if (q.correctAnswer === answers[i]) correct += 1;
    });
    const score = questions.length > 0 ? Math.round((correct / questions.length) * 100) : 0;

    if (dbReady()) {
      await Quiz.create({ subject, topic, difficulty, questions, answers, score });
      await Progress.findOneAndUpdate(
        { userId: 'demo-user' },
        {
          $push: { quizScores: { subject, topic, score: correct, total: questions.length, date: new Date() } },
        },
        { upsert: true, new: true }
      );
    }

    res.json({
      success: true,
      demoMode: !dbReady(),
      correct,
      total: questions.length,
      score,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { submitQuiz };
