const express = require('express');
const router = express.Router();
const {
  createBug,
  getBugs,
  updateBug,
  deleteBug
} = require('../controllers/bugController');

// Create a bug
router.post('/', createBug);

// Get all bugs
router.get('/', getBugs);

// Update a bug by ID
router.put('/:id', updateBug);

// Delete a bug by ID
router.delete('/:id', deleteBug);

module.exports = router;