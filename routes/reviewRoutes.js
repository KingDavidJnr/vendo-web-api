// routes/reviewRoutes.js
const express = require('express');
const router = express.Router();
const ReviewController = require('../controller/reviewController');
const { authenticateUser } = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Operations related to reviews
 */

/**
 * @swagger
 * /review/add:
 *   post:
 *     summary: Add a review to a product
 *     description: Add a review to a product by an authenticated customer.
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []  # Use the authentication middleware
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddReview'
 *     responses:
 *       201:
 *         description: Review added successfully
 *         content:
 *           application/json:
 *             example:
 *               review: {...}  # Added review details
 */

/**
 * @swagger
 * /review/product/{productId}:
 *   get:
 *     summary: Get all reviews for a specific product
 *     description: Retrieve all reviews for a specific product.
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         description: ID of the product to retrieve reviews for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product reviews retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               reviews: 
 *                 - review: {...}  # Review details
 */

/**
 * @swagger
 * /review/update/{reviewId}:
 *   put:
 *     summary: Update a review
 *     description: Update a review by an authenticated customer.
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []  # Use the authentication middleware
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         description: ID of the review to update
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateReview'
 *     responses:
 *       200:
 *         description: Review updated successfully
 *         content:
 *           application/json:
 *             example:
 *               review: {...}  # Updated review details
 *       404:
 *         description: Review not found
 *       403:
 *         description: Forbidden - User does not have permission to update this review
 */

/**
 * @swagger
 * /review/delete/{reviewId}:
 *   delete:
 *     summary: Delete a review
 *     description: Delete a review by an authenticated customer.
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []  # Use the authentication middleware
 *     parameters:
 *       - in: path
 *         name: reviewId
 *         required: true
 *         description: ID of the review to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       404:
 *         description: Review not found
 *       403:
 *         description: Forbidden - User does not have permission to delete this review
 */

// Add your routes here
router.post('/add', authenticateUser, ReviewController.addReview);
router.get('/product/:productId', ReviewController.getProductReviews);
router.put('/update/:reviewId', authenticateUser, ReviewController.updateReview);
router.delete('/delete/:reviewId', authenticateUser, ReviewController.deleteReview);

module.exports = router;
