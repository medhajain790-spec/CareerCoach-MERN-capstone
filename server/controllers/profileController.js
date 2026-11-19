const Profile = require('../models/Profile');
exports.get = async (req, res, next) => {
  try { res.json(await Profile.findOne({ user: req.user._id })); } catch (e) { next(e); }
};
exports.save = async (req, res, next) => {
  try {
    const { education, skills, experience } = req.body;
    const list = Array.isArray(skills) ? skills : String(skills || '').split(',').map(s => s.trim()).filter(Boolean);
    const p = await Profile.findOneAndUpdate({ user: req.user._id }, { education, skills: list, experience },
      { new: true, upsert: true, runValidators: true, setDefaultsOnInsert: true });
    res.json(p);
  } catch (e) { next(e); }
};
