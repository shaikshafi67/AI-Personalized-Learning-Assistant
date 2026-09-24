const express = require('express');
const router = express.Router();
const chat = require('../controllers/chatController');

router.get('/history', chat.getHistory);

module.exports = router;
