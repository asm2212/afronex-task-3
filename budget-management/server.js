const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();

dotenv.config();


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB', err));


app.use(express.json());

// Define your routes
// Example: app.use('/api/auth', require('./routes/auth'));
// Example: app.use('/api/users', require('./routes/users'));
// Example: app.use('/api/expenses', require('./routes/expenses'));
// Example: app.use('/api/admin', require('./routes/admin'));

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});