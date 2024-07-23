const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Coach = require('../models/Coach');

// @route   GET api/coaches
// @desc    Get all coaches
// @access  Public
router.get('/', async (req, res) => {
  try {
    const coaches = await Coach.find();
    res.json(coaches);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/coaches/:id
// @desc    Get coach by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const coach = await Coach.findById(req.params.id);
    if (!coach) {
      return res.status(404).json({ msg: 'Coach not found' });
    }
    res.json(coach);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'Coach not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/coaches
// @desc    Create a new coach
// @access  Private/Admin
router.post('/', auth, async (req, res) => {
  if (req.user.typeUtilisateur !== 'admin') {
    return res.status(401).json({ msg: 'Not authorized' });
  }

  const { nom, email, telephone, specialites } = req.body;

  try {
    let coach = await Coach.findOne({ email });

    if (coach) {
      return res.status(400).json({ msg: 'Coach already exists' });
    }

    coach = new Coach({
      nom,
      email,
      telephone,
      specialites
    });

    await coach.save();
    res.json(coach);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/coaches/:id
// @desc    Update coach
// @access  Private/Admin
router.put('/:id', auth, async (req, res) => {
  if (req.user.typeUtilisateur !== 'admin') {
    return res.status(401).json({ msg: 'Not authorized' });
  }

  const { nom, email, telephone, specialites, disponibilite } = req.body;

  // Build coach object
  const coachFields = {};
  if (nom) coachFields.nom = nom;
  if (email) coachFields.email = email;
  if (telephone) coachFields.telephone = telephone;
  if (specialites) coachFields.specialites = specialites;
  if (disponibilite !== undefined) coachFields.disponibilite = disponibilite;

  try {
    let coach = await Coach.findById(req.params.id);

    if (!coach) return res.status(404).json({ msg: 'Coach not found' });

    coach = await Coach.findByIdAndUpdate(
      req.params.id,
      { $set: coachFields },
      { new: true }
    );

    res.json(coach);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;