const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswer: { type: String, required: true },
    explanation: { type: String, default: '' },
  },
  { _id: false }
);

const QuizSchema = new mongoose.Schema(
  {
    subject: { type: String, default: 'General', maxlength: 100 },
    topic: { type: String, default: '', maxlength: 200 },
    difficulty: { type: String, default: 'Medium', maxlength: 50 },
    questions: { type: [QuestionSchema], default: [] },
    answers: { type: [String], default: [] },
    score: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Quiz || mongoose.model('Quiz', QuizSchema);
