const mongoose = require('mongoose');
const genSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['resume', 'interview'], required: true },
  role: { type: String, default: '' },
  content: { type: String, required: true }
}, { timestamps: true });
genSchema.index({ user: 1, createdAt: -1 }); // index
module.exports = mongoose.model('Generation', genSchema);
