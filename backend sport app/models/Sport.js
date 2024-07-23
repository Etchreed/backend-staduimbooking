const mongoose = require('mongoose');

const SportSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Sport', SportSchema);