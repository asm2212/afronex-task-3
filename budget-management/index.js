const express = require('express');
const dotenv = require('dotenv');
const app = express();
const authRoutes = require('./backend/routes/Auth.js');
const { db } = require('./backend/config/db.js');

dotenv.config();

app.use(express.json());
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Hello asm!');
});

const port = process.env.PORT || 5000;
db() 
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });