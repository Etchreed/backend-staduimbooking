const mongoose = require('mongoose');

const TerrainSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  adresse: {
    type: String,
    required: true
  },
  typeSport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sport',
    required: true
  },
  disponibilite: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Terrain', TerrainSchema);