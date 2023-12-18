// index.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./database/db');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const specs = require('./swaggerConfig');
const userRoutes = require('./routes/userRoutes');
const vendorRoute = require('./routes/vendorRoutes');
const customerRoute = require('./routes/customerRoutes');
const productRoutes = require('./routes/productRoutes');

dotenv.config();

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/user', userRoutes);
app.use('/vendor', vendorRoute);
app.use('/customer', customerRoute);
app.use('/product', productRoutes);


// Home page display information
app.get('/', (req, res) => {
  res.send('Welcome to Vendo Backend Service')
});

// The endpoint to Swagger UI documentation
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(specs));


// Start Server
app.listen(PORT, () => {
  connectDB(); //Run MongoDB database connection whenever server starts
  console.log(`Server is running on port ${PORT}`);
});
