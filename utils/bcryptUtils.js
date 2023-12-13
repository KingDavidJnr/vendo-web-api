// utils/bcryptUtils.js
const bcrypt = require('bcrypt');
const saltRounds = 10; // You can adjust the number of salt rounds based on your security requirements

// Function to hash a password
const hashPassword = async (plainTextPassword) => {
  try {
    const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw error;
  }
};

// Function to compare a plain-text password with a hashed password
const comparePasswords = async (plainTextPassword, hashedPassword) => {
  try {
    const match = await bcrypt.compare(plainTextPassword, hashedPassword);
    return match;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  hashPassword,
  comparePasswords,
};
