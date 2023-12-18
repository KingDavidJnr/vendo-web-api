// controller/customerController.js
const Customer = require('../model/customerModel');
const Order = require('../model/orderModel');
const Review = require('../model/reviewModel');
const Vendor = require('../model/vendorModel'); // Import Vendor model

/**
 * Create a customer profile for a logged-in user with a customer role.
 */
const createCustomerProfile = async (req, res) => {
  try {
    // Destructure customer profile information from the request body
    const { profile } = req.body;

    // Check if the logged-in user already has a customer profile
    const customer = await Customer.findById(req.user.userId);

    if (customer) {
      return res.status(400).json({ error: 'Customer profile already exists' });
    }

    // Create a new Customer document based on the Customer model
    const newCustomer = new Customer({
      _id: req.user.userId,  // Set customer's ID to user's ID
      user: req.user.userId,
      profile,
    });

    // Save the new customer document to the database
    await newCustomer.save();

    // Respond with a success message
    res.status(201).json({ message: 'Customer profile created successfully' });
  } catch (error) {
    // Handle errors and respond with an internal server error message
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - Create Customer Profile' });
  }
};

/**
 * Get the order history of the customer.
 */
const getCustomerOrders = async (req, res) => {
  try {
    // Check if the logged-in user has a customer profile
    const customer = await Customer.findById(req.user.userId).populate('orders');

    if (!customer) {
      return res.status(400).json({ error: 'Customer profile does not exist' });
    }

    // Respond with the customer's order history
    res.status(200).json({ orders: customer.orders });
  } catch (error) {
    // Handle errors and respond with an internal server error message
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - Get Customer Orders' });
  }
};

/**
 * Get the reviews submitted by the customer.
 */
const getCustomerReviews = async (req, res) => {
  try {
    // Check if the logged-in user has a customer profile
    const customer = await Customer.findById(req.user.userId).populate('reviews');

    if (!customer) {
      return res.status(400).json({ error: 'Customer profile does not exist' });
    }

    // Respond with the customer's submitted reviews
    res.status(200).json({ reviews: customer.reviews });
  } catch (error) {
    // Handle errors and respond with an internal server error message
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - Get Customer Reviews' });
  }
};

/**
 * View all vendors on the site (accessible to customers).
 */
const viewAllVendors = async (req, res) => {
  try {
    // Retrieve all vendors from the Vendor model
    const vendors = await Vendor.find();

    // Respond with the list of vendors
    res.status(200).json({ vendors });
  } catch (error) {
    // Handle errors and respond with an internal server error message
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - View All Vendors' });
  }
};

/**
 * Update the profile of the logged-in customer.
 */
const updateCustomerProfile = async (req, res) => {
  try {
    // Destructure updated profile information from the request body
    const { updatedProfile } = req.body;

    // Check if the logged-in user has a customer profile
    const customer = await Customer.findById(req.user.userId);

    if (!customer) {
      return res.status(400).json({ error: 'Customer profile does not exist' });
    }

    // Update the customer's profile
    customer.profile = updatedProfile;
    await customer.save();

    // Respond with a success message
    res.status(200).json({ message: 'Customer profile updated successfully' });
  } catch (error) {
    // Handle errors and respond with an internal server error message
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - Update Customer Profile' });
  }
};

// ... (other customer-related controllers)

module.exports = {
  createCustomerProfile,
  getCustomerOrders,
  getCustomerReviews,
  viewAllVendors,
  updateCustomerProfile,
  // ... (other exports)
};
