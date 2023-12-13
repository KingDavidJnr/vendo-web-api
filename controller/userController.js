// controller/userController.js
const { hashPassword, comparePassword } = require('../utils/bcryptUtils');
const { createJWT } = require('../utils/jwtUtils');
const User = require('../model/user');
const { userRegistrationValidation, userLoginValidation } = require('../validation/userValidation');

const registerUser = async (req, res) => {
  try {
    const { error, value } = userRegistrationValidation(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { firstName, lastName, email, password, role } = value;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    const token = createJWT({ userId: newUser._id, email: newUser.email, role: newUser.role });

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { error, value } = userLoginValidation(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, password } = value;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = createJWT({ userId: user._id, email: user.email, role: user.role });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getUserProfile = (req, res) => {
  try {
    // The user information is attached to the request object during authentication
    const { _id, firstName, lastName, email, role } = req.user;

    res.status(200).json({ _id, firstName, lastName, email, role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ... (other controller functions)

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  // ... (other exports)
};
