const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const authRoute = require('./backend/routes/authRoute.js');
const budgetRoute = require('./backend/routes/budgetRoute.js');

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoute);
app.use('/api/budget', budgetRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
