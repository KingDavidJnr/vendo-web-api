// index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./database/db');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const specs = require('./swaggerConfig');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
connectDB();

// Routes
//const userRoutes = require('./routes/user/userRoutes');
// Add other route imports here

//app.use('/user', userRoutes);
// Add other route usages here

// Home page display information
app.get('/', (req, res) => {
  res.send('Welcome to Vendo Backend Service')
});

// The endpoint to Swagger UI documentation
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(specs));


// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
