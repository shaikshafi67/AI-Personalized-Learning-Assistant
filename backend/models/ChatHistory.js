const mongoose = require('mongoose');

const ChatHistorySchema = new mongoose.Schema(
  {
    userQuestion: { type: String, required: true, maxlength: 4000 },
    aiResponse: { type: String, required: true },
    subject: { type: String, default: 'General', maxlength: 100 },
    topic: { type: String, default: '', maxlength: 200 },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.models.ChatHistory || mongoose.model('ChatHistory', ChatHistorySchema);
