const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Reservation = require('../models/Reservation');

// @route   GET api/reservations
// @desc    Get all reservations
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate('utilisateur', ['nom', 'email'])
      .populate('terrain', ['nom', 'adresse'])
      .populate('coach', ['nom', 'email']);
    res.json(reservations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/reservations
// @desc    Create a new reservation
// @access  Private
router.post('/', auth, async (req, res) => {
  const { terrain, coach, dateReservation, heureDebut, heureFin } = req.body;

  try {
    const newReservation = new Reservation({
      utilisateur: req.user.id,
      terrain,
      coach,
      dateReservation,
      heureDebut,
      heureFin,
      statut: 'en attente'
    });

    const reservation = await newReservation.save();
    res.json(reservation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/reservations/:id
// @desc    Update reservation status
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { statut } = req.body;

  try {
    let reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({ msg: 'Reservation not found' });
    }

    // Check user
    if (reservation.utilisateur.toString() !== req.user.id && req.user.typeUtilisateur !== 'admin') {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { $set: { statut } },
      { new: true }
    );

    res.json(reservation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;