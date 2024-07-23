const mongoose = require('mongoose');

const CoachSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  telephone: {
    type: String
  },
  specialites: {
    type: String
  },
  disponibilite: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Coach', CoachSchema);