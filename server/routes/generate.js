const r = require('express').Router(), c = require('../controllers/generateController'), { protect } = require('../middleware/auth'), limit = require('../middleware/rateLimit');
r.post('/resume', protect, limit, c.resume); r.post('/interview', protect, limit, c.interview); r.get('/history', protect, c.history);
module.exports = r;
