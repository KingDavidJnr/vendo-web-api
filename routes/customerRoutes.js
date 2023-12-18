// routes/customerRoutes.js
const express = require('express');
const router = express.Router();
const CustomerController = require('../controller/customerController');
const { authenticateUser } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Customers
 *   description: Operations related to customers
 */

/**
 * @swagger
 * /customer/create-profile:
 *   post:
 *     summary: Create a customer profile
 *     description: Create a profile for the logged-in user with a customer role.
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []  # Use the authentication middleware
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CustomerProfile'
 *     responses:
 *       201:
 *         description: Customer profile created successfully
 *       400:
 *         description: Customer profile already exists
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal Server Error
 */
router.post('/create-profile', CustomerController.createCustomerProfile);

/**
 * @swagger
 * /customer/orders:
 *   get:
 *     summary: Get customer's order history
 *     description: Retrieve the order history of the authenticated customer.
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []  # Use the authentication middleware
 *     responses:
 *       200:
 *         description: Customer's order history retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               orders: [<order 1>, <order 2>, ...]
 *       400:
 *         description: Customer profile does not exist
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal Server Error
 */
router.get('/orders', CustomerController.getCustomerOrders);

/**
 * @swagger
 * /customer/reviews:
 *   get:
 *     summary: Get customer's reviews
 *     description: Retrieve the reviews submitted by the authenticated customer.
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []  # Use the authentication middleware
 *     responses:
 *       200:
 *         description: Customer's reviews retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               reviews: [<review 1>, <review 2>, ...]
 *       400:
 *         description: Customer profile does not exist
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal Server Error
 */
router.get('/reviews', CustomerController.getCustomerReviews);

/**
 * @swagger
 * /customer/vendors:
 *   get:
 *     summary: View all vendors
 *     description: Retrieve a list of all vendors on the site (accessible to customers).
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []  # Use the authentication middleware
 *     responses:
 *       200:
 *         description: List of vendors retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               vendors: [<vendor 1>, <vendor 2>, ...]
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       403:
 *         description: Forbidden - Insufficient permissions
 *       500:
 *         description: Internal Server Error
 */
router.get('/vendors', CustomerController.viewAllVendors);

/**
 * @swagger
 * /customer/update-profile:
 *   put:
 *     summary: Update customer profile
 *     description: Update the profile of the authenticated customer.
 *     tags: [Customers]
 *     security:
 *       - bearerAuth: []  # Use the authentication middleware
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdatedCustomerProfile'
 *     responses:
 *       200:
 *         description: Customer profile updated successfully
 *       400:
 *         description: Customer profile does not exist
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal Server Error
 */
router.put('/update-profile', CustomerController.updateCustomerProfile);

// ... (other customer-related routes)

module.exports = router;
