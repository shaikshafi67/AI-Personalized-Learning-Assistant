const express = require('express');
const router = express.Router();
const quiz = require('../controllers/quizController');

router.post('/submit', quiz.submitQuiz);

module.exports = router;
