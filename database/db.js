// database/db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Define a function to connect to MongoDB
const connectDB = async () => {
  try {
    // Use mongoose to connect to MongoDB with provided connection URI
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Log a successful connection message
    console.log('Successfully connected to MongoDB!');
  } catch (error) {
    // Log an error message if the connection fails
    console.error('Error connecting to MongoDB:', error.message);
    
    // Exit the application with an error code
    process.exit(1);
  }
};

// Export the connectDB function to be used in other files
module.exports = connectDB;
