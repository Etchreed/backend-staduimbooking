const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route   GET api/users
// @desc    Get all users
// @access  Private/Admin
router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find().select('-motDePasse');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/users/:id
// @desc    Get user by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-motDePasse');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/users/:id
// @desc    Update user
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { nom, email, age, niveau } = req.body;

  // Build user object
  const userFields = {};
  if (nom) userFields.nom = nom;
  if (email) userFields.email = email;
  if (age) userFields.age = age;
  if (niveau) userFields.niveau = niveau;

  try {
    let user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ msg: 'User not found' });

    // Make sure user owns profile
    if (user._id.toString() !== req.user.id && req.user.typeUtilisateur !== 'admin') {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: userFields },
      { new: true }
    ).select('-motDePasse');

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;