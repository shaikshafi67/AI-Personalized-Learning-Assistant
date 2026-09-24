const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    rollNumber: { type: String, required: true, trim: true, maxlength: 50 },
    batch: { type: String, trim: true, maxlength: 50 },
    email: { type: String, trim: true, maxlength: 150 },
    learningLevel: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
