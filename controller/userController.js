// controller/userController.js
const { hashPassword, comparePasswords } = require('../utils/bcryptUtils');
const { createJWT } = require('../utils/jwtUtils');
const User = require('../model/user');

// Controller function for user registration
const registerUser = async (req, res) => {
  try {
    // Extract user registration data from request body
    const { firstName, lastName, email, password } = req.body;

    // Hash the password before storing it in the database
    const hashedPassword = await hashPassword(password);

    // Create a new user in the database
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Respond with a success message or JWT token
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function for user login
const loginUser = async (req, res) => {
  try {
    // Extract login data from request body
    const { email, password } = req.body;

    // Find the user by email in the database
    const user = await User.findOne({ email });

    // Check if the user exists and the password is correct
    if (user && await comparePasswords(password, user.password)) {
      // Generate a JWT token for the user
      const token = createJWT({ userId: user._id, email: user.email });

      // Respond with the JWT token
      res.status(200).json({ token });
    } else {
      // Respond with an authentication error
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function for getting user profile (protected route)
const getUserProfile = async (req, res) => {
  try {
    // User information is available in req.user after authentication middleware
    const { _id, firstName, lastName, email } = req.user;

    // Respond with the user's profile information
    res.status(200).json({ _id, firstName, lastName, email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
};
