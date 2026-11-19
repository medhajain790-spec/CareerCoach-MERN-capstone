const mongoose = require('mongoose');
const profileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  education: { type: String, required: [true, 'Education required'], minlength: 3 },
  skills: { type: [String], validate: [a => a.length > 0, 'At least one skill required'] },
  experience: { type: String, default: '' }
}, { timestamps: true });
module.exports = mongoose.model('Profile', profileSchema);
