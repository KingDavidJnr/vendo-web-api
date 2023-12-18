// routes/vendorRoute.js
const express = require('express');
const router = express.Router();
const VendorController = require('../controller/vendorController');
const { authenticateUser } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Vendors
 *   description: Operations related to vendors
 */

/**
 * @swagger
 * /vendor/create-store:
 *   post:
 *     summary: Create a vendor store
 *     description: Create a store for the logged-in user with a vendor role.
 *     tags: [Vendors]
 *     security:
 *       - bearerAuth: []  # Use the authentication middleware
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VendorStore'
 *     responses:
 *       201:
 *         description: Vendor store created successfully
 *       400:
 *         description: Vendor store already exists
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal Server Error
 */
router.post('/create-store', VendorController.createVendorStore);

/**
 * @swagger
 * /vendor/add-product:
 *   post:
 *     summary: Add a product to the vendor's store
 *     description: Add a product to the store of the logged-in user with a vendor role.
 *     tags: [Vendors]
 *     security:
 *       - bearerAuth: []  # Use the authentication middleware
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Product added successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Product added successfully
 *               productId: <product ID>
 *       400:
 *         description: Vendor store does not exist
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal Server Error
 */
router.post('/add-product', VendorController.addProduct);

/**
 * @swagger
 * /vendor/product-reviews:
 *   get:
 *     summary: Get product reviews for all products in the vendor's store
 *     description: Retrieve product reviews for all products in the store of the logged-in user with a vendor role.
 *     tags: [Vendors]
 *     security:
 *       - bearerAuth: []  # Use the authentication middleware
 *     responses:
 *       200:
 *         description: Product reviews fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               productReviews: [
 *                 {
 *                   productId: <product ID>,
 *                   reviews: [<review 1>, <review 2>, ...]
 *                 },
 *                 ...
 *               ]
 *       400:
 *         description: Vendor store does not exist
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal Server Error
 */
router.get('/product-reviews', VendorController.getProductReviews);

/**
 * @swagger
 * /vendor/followers:
 *   get:
 *     summary: Get the followers of the vendor
 *     description: Retrieve the followers of the logged-in user with a vendor role.
 *     tags: [Vendors]
 *     security:
 *       - bearerAuth: []  # Use the authentication middleware
 *     responses:
 *       200:
 *         description: Followers fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               followers: [<follower 1>, <follower 2>, ...]
 *       400:
 *         description: Vendor store does not exist
 *       401:
 *         description: Unauthorized - Missing or invalid token
 *       500:
 *         description: Internal Server Error
 */
router.get('/followers', VendorController.getVendorFollowers);

// ... (other vendor-related routes)

module.exports = router;
