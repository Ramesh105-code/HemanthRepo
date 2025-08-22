const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();


const authRoutes = require('./routes/auth');


const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);

const { authenticate } = require('./middleware/auth');
const { allowRoles } = require('./middleware/roles');


app.get('/api/protected/user', authenticate, (req, res) => {
res.json({ message: 'Hello user!', user: req.user });
});


app.get('/api/protected/admin', authenticate, allowRoles('admin'), (req, res) => {
res.json({ message: 'Hello admin!', user: req.user });
});


const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
console.log('Connected to MongoDB');
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => {
console.error('Mongo connection error:', err);
process.exit(1);
});