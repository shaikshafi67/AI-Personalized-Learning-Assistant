const express = require('express');
const router = express.Router();
const ai = require('../controllers/aiController');
const { aiRateLimiter } = require('../middleware/rateLimiter');
const { requireFields } = require('../middleware/validateInput');

router.use(aiRateLimiter);

router.post('/ask', requireFields(['question']), ai.ask);
router.post('/explain', requireFields(['topic']), ai.explain);
router.post('/summarize', requireFields(['text']), ai.summarize);
router.post('/quiz', requireFields(['subject']), ai.quiz);
router.post('/study-plan', requireFields(['subject']), ai.studyPlan);
router.post('/flashcards', requireFields(['subject']), ai.flashcards);
router.post('/exam-answer', requireFields(['question']), ai.examAnswer);

module.exports = router;
