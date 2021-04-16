const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },

  title: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  details: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Note = mongoose.model('notes', NoteSchema);