const r = require('express').Router(), c = require('../controllers/authController'), { protect } = require('../middleware/auth');
r.post('/register', c.register); r.post('/login', c.login); r.post('/refresh', c.refresh); r.post('/logout', protect, c.logout);
module.exports = r;
