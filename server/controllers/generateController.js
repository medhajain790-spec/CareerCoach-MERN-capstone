const Profile = require('../models/Profile'), Generation = require('../models/Generation'), ai = require('../utils/ai');
const make = type => async (req, res, next) => {
  try {
    const p = await Profile.findOne({ user: req.user._id });
    if (!p) { res.status(400); throw new Error('Complete your profile first'); }
    const role = req.body.role || '';
    if (type === 'interview' && !role.trim()) { res.status(400); throw new Error('Role is required'); }
    const info = `Education: ${p.education}\nSkills: ${p.skills.join(', ')}\nExperience: ${p.experience}`;
    const prompt = type === 'resume'
      ? `Write a professional resume summary and 5 strong bullet points for this candidate.\n${info}`
      : `Generate 8 mock interview questions for the role "${role}" for this candidate.\n${info}`;
    const content = await ai(prompt);
    res.status(201).json(await Generation.create({ user: req.user._id, type, role, content }));
  } catch (e) { next(e); }
};
exports.resume = make('resume');
exports.interview = make('interview');
exports.history = async (req, res, next) => {
  try { res.json(await Generation.find({ user: req.user._id }).sort({ createdAt: -1 })); } catch (e) { next(e); }
};
