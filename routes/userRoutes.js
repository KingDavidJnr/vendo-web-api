// routes/userRoute.js
const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');
const { authenticateUser } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operations related to users
 */

/**
 * @swagger
 * /register:
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
 *         content:
 *           application/json:
 *             example:
 *               token: <JWT token>
 */

router.post('/register', UserController.registerUser);

/**
 * @swagger
 * /login:
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

router.post('/login', UserController.loginUser);

/**
 * @swagger
 * /profile:
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

router.get('/profile', UserController.getUserProfile);

module.exports = router;