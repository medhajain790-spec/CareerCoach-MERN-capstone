const r = require('express').Router(), c = require('../controllers/adminController'), { protect, authorize } = require('../middleware/auth');
r.get('/usage', protect, authorize('admin'), c.usage);
module.exports = r;
