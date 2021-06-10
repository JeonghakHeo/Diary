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
        details,
        favorite: false
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
    const notes = await Note.find({ user: req.user.id });

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

// @route   DELETE api/notes/:id
// @desc    Delete a note
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (note.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    if (!note) {
      return res.status(404).json({ msg: 'Note not found' });
    }

    await note.remove();

    res.json({ msg: 'Note removed' });
  }
  catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Note not found' });
    }
    res.status(500).send('Server Error')
  }
});


// @route   GET api/notes/:id
// @desc    Get note by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ msg: 'Note not found' });
    }

    res.json(note);
  }
  catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Note not found' })
    }
    res.status(500).send('Server Error')
  }
});

// @route   PUT api/notes/:id
// @desc    Edit note by ID
// @access  Private
router.put('/:id', auth,
  [
    body('title', 'Title is required').not().isEmpty(),
    body('details', 'Details are required').not().isEmpty(),
    body('category', 'Category is required').not().isEmpty(),
  ]
  ,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, details, category } = req.body;

    const newNote = { title, details, category };

    try {
      let note = await Note.findById(req.params.id);

      if (note) {
        note = await Note.findOneAndUpdate({ _id: req.params.id }, { $set: newNote }, { new: true });

        return res.json(note);
      }

      await note.save();

      res.json(note);
    }
    catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error')
    }
  });


// @route   PUT api/notes/favorite/:id
// @desc    Make note favorite by ID
// @access  Private
router.put('/favorite/:id', auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    // Check if the note is already favorite
    if (note.favorite === true) {
      return res.status(400).json({ msg: 'Note already favorite' });
    }

    note.favorite = true;

    await note.save();

    res.json(note.favorite);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
});

// @route   PUT api/notes/unfavorite/:id
// @desc    Make note unfavorite by ID
// @access  Private
router.put('/unfavorite/:id', auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    // Check if the note is already unfavorite
    if (note.favorite === false) {
      return res.status(400).json({ msg: 'Note already unfavorite' });
    }

    note.favorite = false;

    await note.save();

    res.json(note.favorite);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error')
  }
});
module.exports = router;