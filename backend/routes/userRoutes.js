const express = require('express');
const router = express.Router();
const user = require('../controllers/userController');

router.get('/profile', user.getProfile);
router.put('/profile', user.updateProfile);

module.exports = router;
