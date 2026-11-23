require('dotenv').config();
const path = require('path');
const express = require('express'), cors = require('cors');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/generate', require('./routes/generate'));
app.use('/api/admin', require('./routes/admin'));

// Serve the built React app (production)
const dist = path.join(__dirname, '../client/dist');
app.use(express.static(dist));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(dist, 'index.html'), err => err && next());
});

app.use((req, res, next) => { res.status(404); next(new Error('Route not found')); });
app.use(errorHandler);
connectDB().then(() => app.listen(process.env.PORT || 5000, () => console.log('Server running')));