require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDb = require('./config/db');
const authRoutes = require('./routes/auth');
const mealsRoutes = require('./routes/meals');
const favoritesRoutes = require('./routes/favorites');

const app = express();
connectDb();
app.use(cors(), express.json());
app.use('/api/auth', authRoutes);
app.use('/api/meals', mealsRoutes);
app.use('/api/favorites', favoritesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));