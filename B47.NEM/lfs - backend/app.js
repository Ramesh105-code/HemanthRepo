const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const reportRoutes = require('./routes/reportRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const logger = require('./middleware/logger');
const app = express();

app.use(express.json());
app.use(logger);
app.use('/auth',authRoutes);
app.use('/reviews',reviewRoutes);
app.use('/report',reportRoutes);

module.exports = app;