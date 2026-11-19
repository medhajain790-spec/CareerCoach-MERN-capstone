const r = require('express').Router(), c = require('../controllers/profileController'), { protect } = require('../middleware/auth');
r.route('/').get(protect, c.get).put(protect, c.save);
module.exports = r;
