import Bug from '../models/Bug.js';

// Create a new bug
export const createBug = async (req, res, next) => {
  try {
    const bug = await Bug.create(req.body);
    res.status(201).json(bug);
  } catch(err) { next(err); }
};

// Get all bugs
export const getBugs = async (req, res, next) => {
  try {
    const bugs = await Bug.find().sort('-createdAt');
    res.json(bugs);
  } catch(err) { next(err); }
};

// Update bug status
export const updateBug = async (req, res, next) => {
  try {
    const bug = await Bug.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if(!bug) return res.status(404).json({ message: 'Bug not found' });
    res.json(bug);
  } catch(err) { next(err); }
};

// Delete bug
export const deleteBug = async (req, res, next) => {
  try {
    const bug = await Bug.findByIdAndDelete(req.params.id);
    if(!bug) return res.status(404).json({ message: 'Bug not found' });
    res.json({ message: 'Deleted successfully' });
  } catch(err) { next(err); }
};
