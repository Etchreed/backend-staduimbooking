const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  utilisateur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  terrain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Terrain',
    required: true
  },
  coach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coach'
  },
  dateReservation: {
    type: Date,
    required: true
  },
  heureDebut: {
    type: Date,
    required: true
  },
  heureFin: {
    type: Date,
    required: true
  },
  statut: {
    type: String,
    enum: ['confirmée', 'annulée', 'en attente'],
    required: true
  }
});

module.exports = mongoose.model('Reservation', ReservationSchema);