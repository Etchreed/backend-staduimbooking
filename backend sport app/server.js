const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config.json');
const authRoutes = require('./routes/auth');
const terrainRoutes = require('./routes/terrains');
const coachRoutes = require('./routes/coaches');
const reservationRoutes = require('./routes/reservations');
const userRoutes = require('./routes/users');

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/terrains', terrainRoutes);
app.use('/api/coaches', coachRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));