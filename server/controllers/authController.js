const bcrypt = require('bcrypt'), jwt = require('jsonwebtoken');
const User = require('../models/User'), t = require('../utils/tokens');
const issue = async (user, res, code = 200) => {
  const accessToken = t.access(user._id), refreshToken = t.refresh(user._id);
  await User.findByIdAndUpdate(user._id, { refreshToken });
  res.status(code).json({ accessToken, refreshToken, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
};
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    if (!password || password.length < 6) { res.status(400); throw new Error('Password min 6 chars'); }
    const user = await User.create({ name, email, password: await bcrypt.hash(password, 10), role: role === 'admin' ? 'admin' : 'user' });
    await issue(user, res, 201);
  } catch (e) { next(e); }
};
exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email }).select('+password');
    if (!user || !(await bcrypt.compare(req.body.password || '', user.password))) { res.status(401); throw new Error('Invalid credentials'); }
    await issue(user, res);
  } catch (e) { next(e); }
};
exports.refresh = async (req, res, next) => {
  try {
    const { id } = jwt.verify(req.body.refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(id).select('+refreshToken');
    if (!user || user.refreshToken !== req.body.refreshToken) { res.status(401); throw new Error('Invalid refresh token'); }
    await issue(user, res);
  } catch (e) { next(e); }
};
exports.logout = async (req, res, next) => {
  try { await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } }); res.json({ message: 'Logged out' }); } catch (e) { next(e); }
};
