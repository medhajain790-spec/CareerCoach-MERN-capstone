const Generation = require('../models/Generation');
// aggregation pipeline: usage per user
exports.usage = async (req, res, next) => {
  try {
    res.json(await Generation.aggregate([
      { $group: { _id: '$user', total: { $sum: 1 }, resumes: { $sum: { $cond: [{ $eq: ['$type', 'resume'] }, 1, 0] } },
        interviews: { $sum: { $cond: [{ $eq: ['$type', 'interview'] }, 1, 0] } }, last: { $max: '$createdAt' } } },
      { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'u' } },
      { $unwind: '$u' },
      { $project: { _id: 0, name: '$u.name', email: '$u.email', total: 1, resumes: 1, interviews: 1, last: 1 } },
      { $sort: { total: -1 } }
    ]));
  } catch (e) { next(e); }
};
