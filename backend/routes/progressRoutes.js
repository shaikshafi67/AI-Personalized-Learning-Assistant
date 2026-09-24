const express = require('express');
const router = express.Router();
const progress = require('../controllers/progressController');

router.get('/', progress.getProgress);
router.get('/demo', progress.getDemoProgress);

module.exports = router;
