const Bug = require('../models/bugModel');

// CREATE a new bug
const createBug = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const newBug = await Bug.create({
      title,
      description,
      status: 'open'
    });

    res.status(201).json(newBug);
  } catch (error) {
    console.error('❌ Error in createBug:', error); // <-- Add this line
    res.status(500).json({ message: error.message });
  }
};

// GET all bugs
const getBugs = async (req, res) => {
  try {
    const bugs = await Bug.find();
    res.status(200).json(bugs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bugs' });
  }
};

// UPDATE a bug
const updateBug = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Bug.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'Bug not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update bug' });
  }
};

// DELETE a bug
const deleteBug = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Bug.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Bug not found' });
    res.status(200).json({ message: 'Bug deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete bug' });
  }
};

module.exports = {
  createBug,
  getBugs,
  updateBug,
  deleteBug
};