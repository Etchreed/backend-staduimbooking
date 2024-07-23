const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  motDePasse: {
    type: String,
    required: true
  },
  typeUtilisateur: {
    type: String,
    enum: ['client', 'coach', 'admin'],
    required: true
  },
  age: {
    type: Number
  },
  niveau: {
    type: String,
    enum: ['débutant', 'intermédiaire', 'avancé']
  }
});

module.exports = mongoose.model('User', UserSchema);