const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name required'], trim: true, minlength: 2 },
  email: { type: String, required: true, unique: true, lowercase: true, match: [/^\S+@\S+\.\S+$/, 'Invalid email'] },
  password: { type: String, required: true, minlength: 6, select: false },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  refreshToken: { type: String, select: false }
}, { timestamps: true });
module.exports = mongoose.model('User', userSchema);
