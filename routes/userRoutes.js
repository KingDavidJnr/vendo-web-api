// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');
const { authenticateUser } = require('../middleware/authMiddleware');
const { userRegistrationValidation, userLoginValidation } = require('../validation/userValidation');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operations related to users
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account.
 *     tags: [Users]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegistration'
 *     responses:
 *       201:
 *         description: User registered successfully
 */

router.post('/register', async (req, res) => {
  try {
    const { error, value } = userRegistrationValidation(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Call the controller function with the validated data
    await UserController.registerUser(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: User login
 *     description: Log in an existing user.
 *     tags: [Users]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             example:
 *               token: <JWT token>
 */

router.post('/login', async (req, res) => {
  try {
    const { error, value } = userLoginValidation(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Call the controller function with the validated data
    await UserController.loginUser(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get user profile
 *     description: Retrieve the profile of the authenticated user.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []  # Use the authentication middleware
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               _id: 1
 *               firstName: John
 *               lastName: Doe
 *               email: john@example.com
 */

router.get('/profile', authenticateUser, UserController.getUserProfile);

module.exports = router;
