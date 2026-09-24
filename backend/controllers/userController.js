const mongoose = require('mongoose');
const User = require('../models/User');

function dbReady() {
  return mongoose.connection && mongoose.connection.readyState === 1;
}

const DEMO_USER = {
  name: 'Shaik Shafi',
  rollNumber: '92410133016',
  batch: '7EK2',
  email: 'shaikshafi6288@gmail.com',
  learningLevel: 'Intermediate',
};

async function getProfile(req, res, next) {
  try {
    if (!dbReady()) {
      return res.json({ success: true, demoMode: true, user: DEMO_USER });
    }
    let user = await User.findOne();
    if (!user) {
      user = await User.create(DEMO_USER);
    }
    res.json({ success: true, demoMode: false, user });
  } catch (err) {
    next(err);
  }
}

async function updateProfile(req, res, next) {
  try {
    const { name, rollNumber, batch, email, learningLevel } = req.body;
    if (!dbReady()) {
      return res.json({
        success: true,
        demoMode: true,
        user: { name, rollNumber, batch, email, learningLevel },
        note: 'Database not connected — changes are not persisted (session only).',
      });
    }
    let user = await User.findOne();
    if (!user) {
      user = new User(DEMO_USER);
    }
    Object.assign(user, { name, rollNumber, batch, email, learningLevel });
    await user.save();
    res.json({ success: true, demoMode: false, user });
  } catch (err) {
    next(err);
  }
}

module.exports = { getProfile, updateProfile };
