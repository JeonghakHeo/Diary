const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
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
  favorite: {
    type: Boolean
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Note = mongoose.model('notes', NoteSchema);