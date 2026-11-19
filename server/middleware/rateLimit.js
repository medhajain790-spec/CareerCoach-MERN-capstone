const Generation = require('../models/Generation');
// custom per-user request limit
module.exports = async (req, res, next) => {
  try {
    const limit = +process.env.HOURLY_LIMIT || 10;
    const since = new Date(Date.now() - 3600 * 1000);
    const used = await Generation.countDocuments({ user: req.user._id, createdAt: { $gte: since } });
    if (used >= limit) { res.status(429); throw new Error(`Limit of ${limit} generations per hour reached`); }
    next();
  } catch (e) { next(e); }
};
