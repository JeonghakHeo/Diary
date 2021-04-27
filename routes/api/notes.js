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
  });

// @route   GET api/notes
// @desc    Get current users notes
// @access  Private 
router.get('/', auth, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ date: -1 });

    if (!notes) {
      return res.status(400).json({ msg: 'There are no notes created by this user' });
    }

    res.json(notes)
  }
  catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route   GET api/notes
// @desc    Get all notes
// @access  Private
// router.get('/', auth,
//   async (req, res) => {
//     try {
//       const notes = await Note.find().sort({ date: -1 });
//       res.json(notes);
//     }
//     catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error')
//     }
// });

// @route   DELETE api/notes/:id
// @desc    Delete a note
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' }); // 401 not authorized
    }

    if (!note) {
      return res.status(404).json({ msg: 'Note not found' }) // 404 not found
    }

    await note.remove();

    res.json({ msg: 'Note removed' });
  }
  catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Note not found' }) // 404 not found
    }
    res.status(500).send('Server Error')
  }
});

module.exports = router;