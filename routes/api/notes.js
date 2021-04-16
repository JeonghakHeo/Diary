const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Note = require('../../models/Note');

// @route   POST api/notes
// @desc    Create a note
// @access  Private
router.post('/', auth,
  [
    body('title', 'Title is required').not().isEmpty(),
    body('category', 'Category is required').not().isEmpty(),
    body('details', 'Details are required').not().isEmpty()
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, category, details } = req.body;

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newNote = new Note({
        user: req.user.id,
        name: user.name,
        title,
        category,
        details
      });

      const note = await newNote.save();

      res.json(note);
    }

    catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error')
    }
  })

// @route   GET api/posts
// @desc    Get all post
// @access  Private
router.get('/',
  async (req, res) => {
    try {
      const notes = await Note.find().sort({ date: -1 });
      res.json(notes);
    }
    catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error')
    }
  });

module.exports = router;