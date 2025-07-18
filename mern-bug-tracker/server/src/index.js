const express = require('express');
const mongoose = require('mongoose');
const bugRoutes = require('./routes/bugRoutes');
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());

// Only connect to DB if not in test mode
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://127.0.0.1:27017/bugtracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));
}

app.use((req, res, next) => {
  console.log('Request headers size:', JSON.stringify(req.headers).length);
  next();
});



// Routes
app.use('/api/bugs', bugRoutes);

app.use('/api/auth', authRoutes);

// Error middleware
app.use(notFound);
app.use(errorHandler);

// Start server only if NOT testing
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export app for Supertest
module.exports = app;