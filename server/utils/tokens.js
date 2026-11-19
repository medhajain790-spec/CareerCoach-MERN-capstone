const jwt = require('jsonwebtoken');
exports.access = id => jwt.sign({ id }, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
exports.refresh = id => jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
