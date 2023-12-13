// index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./database/db'); // Update the path accordingly
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
connectDB();

// Routes
const userRoutes = require('./routes/user/userRoutes');
// Add other route imports here

app.use('/user', userRoutes);
// Add other route usages here

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
