// controller/reviewController.js
const Review = require('../model/reviewModel');
const Product = require('../model/productModel');
const { authenticateUser } = require('../middleware/authMiddleware');

/**
 * Add a review to a product by a customer.
 */
const addReview = async (req, res) => {
  try {
    // Check if the authenticated user is a customer
    const userId = req.user.userId;

    // Destructure review information from the request body
    const { productId, rating, comment } = req.body;

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Create a new Review document based on the Review model
    const newReview = new Review({
      user: userId,
      product: productId,
      rating,
      comment,
    });

    // Save the new review document to the database
    await newReview.save();

    // Respond with the newly created review
    res.status(201).json({ review: newReview });
  } catch (error) {
    // Handle errors and respond with an internal server error message
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - Add Review' });
  }
};

/**
 * Get all reviews for a specific product.
 */
const getProductReviews = async (req, res) => {
  try {
    // Destructure product ID from the request parameters
    const { productId } = req.params;

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Retrieve all reviews related to the product
    const reviews = await Review.find({ product: productId }).populate('user', 'firstName lastName');

    // Respond with the list of reviews
    res.status(200).json({ reviews });
  } catch (error) {
    // Handle errors and respond with an internal server error message
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - Get Product Reviews' });
  }
};

/**
 * Update a review by a customer.
 */
const updateReview = async (req, res) => {
  try {
    // Check if the authenticated user is a customer
    const userId = req.user.userId;

    // Destructure review ID and updated information from the request body
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    // Check if the review exists
    const existingReview = await Review.findById(reviewId);
    if (!existingReview) {
      return res.status(404).json({ error: 'Review not found' });
    }

    // Check if the review was created by the authenticated user
    if (existingReview.user.toString() !== userId) {
      return res.status(403).json({ error: 'Forbidden - You do not have permission to update this review' });
    }

    // Update the review information
    existingReview.rating = rating;
    existingReview.comment = comment;

    // Save the updated review document to the database
    await existingReview.save();

    // Respond with the updated review
    res.status(200).json({ review: existingReview });
  } catch (error) {
    // Handle errors and respond with an internal server error message
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - Update Review' });
  }
};

/**
 * Delete a review by a customer.
 */
const deleteReview = async (req, res) => {
  try {
    // Check if the authenticated user is a customer
    const userId = req.user.userId;

    // Destructure review ID from the request parameters
    const { reviewId } = req.params;

    // Check if the review exists
    const existingReview = await Review.findById(reviewId);
    if (!existingReview) {
      return res.status(404).json({ error: 'Review not found' });
    }

    // Check if the review was created by the authenticated user
    if (existingReview.user.toString() !== userId) {
      return res.status(403).json({ error: 'Forbidden - You do not have permission to delete this review' });
    }

    // Remove the review from the database
    await existingReview.remove();

    // Respond with a success message
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    // Handle errors and respond with an internal server error message
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - Delete Review' });
  }
};

module.exports = {
  addReview,
  getProductReviews,
  updateReview,
  deleteReview,
};
