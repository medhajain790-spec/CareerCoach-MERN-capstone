const jwt = require('jsonwebtoken');
const User = require('../models/User');
exports.protect = async (req, res, next) => {
  try {
    const h = req.headers.authorization;
    if (!h || !h.startsWith('Bearer ')) { res.status(401); throw new Error('Not authorized'); }
    const { id } = jwt.verify(h.split(' ')[1], process.env.JWT_ACCESS_SECRET);
    req.user = await User.findById(id);
    if (!req.user) { res.status(401); throw new Error('User not found'); }
    next();
  } catch (e) { if (res.statusCode === 200) res.status(401); next(e); }
};
// RBAC
exports.authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) { res.status(403); return next(new Error('Forbidden: insufficient role')); }
  next();
};
