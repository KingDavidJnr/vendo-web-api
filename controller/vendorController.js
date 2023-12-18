// controller/vendorController.js
const Vendor = require('../model/vendorModel');
const Product = require('../model/productModel');
const Review = require('../model/reviewModel');

// Create a vendor store for a logged-in user with vendor role
const createVendorStore = async (req, res) => {
  try {
    // Destructure store information from the request body
    const { storeName, storeLogo, storeDescription } = req.body;

    // Check if the logged-in user already has a vendor store
    const vendor = await Vendor.findById(req.user.userId);

    if (vendor) {
      return res.status(400).json({ error: 'Vendor store already exists' });
    }

    // Create a new Vendor document based on the Vendor model
    const newVendor = new Vendor({
      _id: req.user.userId,  // Set vendor's ID to user's ID
      user: req.user.userId,
      storeName,
      storeLogo,
      storeDescription,
    });

    // Save the new vendor document to the database
    await newVendor.save();

    // Respond with a success message
    res.status(201).json({ message: 'Vendor store created successfully' });
  } catch (error) {
    // Handle errors and respond with an internal server error message
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - Create Vendor Store' });
  }
};

// Add a product to a vendor's store
const addProduct = async (req, res) => {
  try {
    // Destructure product information from the request body
    const { title, description, price, quantityAvailable, category } = req.body;

    // Check if the logged-in user has a vendor store
    const vendor = await Vendor.findById(req.user.userId);

    if (!vendor) {
      return res.status(400).json({ error: 'Vendor store does not exist' });
    }

    // Create a new Product document based on the Product model
    const newProduct = new Product({
      vendor: req.user.userId,  // Set product's vendor ID to user's ID
      title,
      description,
      price,
      quantityAvailable,
      category,
    });

    // Save the new product document to the database
    await newProduct.save();

    // Add the product reference to the vendor's products array
    vendor.products.push(newProduct._id);
    await vendor.save();

    // Respond with a success message and the ID of the added product
    res.status(201).json({ message: 'Product added successfully', productId: newProduct._id });
  } catch (error) {
    // Handle errors and respond with an internal server error message
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - Add Product' });
  }
};

// Get product reviews for all products in a vendor's store
const getProductReviews = async (req, res) => {
  try {
    // Check if the logged-in user has a vendor store
    const vendor = await Vendor.findById(req.user.userId).populate('products', 'reviews');

    if (!vendor) {
      return res.status(400).json({ error: 'Vendor store does not exist' });
    }

    const productReviews = [];

    // Iterate through vendor's products and fetch reviews
    vendor.products.forEach((product) => {
      productReviews.push({
        productId: product._id,
        reviews: product.reviews,
      });
    });

    // Respond with the fetched product reviews
    res.status(200).json({ productReviews });
  } catch (error) {
    // Handle errors and respond with an internal server error message
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - Get Product Reviews' });
  }
};

// Get the followers of a vendor
const getVendorFollowers = async (req, res) => {
  try {
    // Check if the logged-in user has a vendor store
    const vendor = await Vendor.findById(req.user.userId).populate('followers', 'profile');

    if (!vendor) {
      return res.status(400).json({ error: 'Vendor store does not exist' });
    }

    // Extract followers' profile information
    const followers = vendor.followers.map((follower) => follower.profile);

    // Respond with the fetched followers' profiles
    res.status(200).json({ followers });
  } catch (error) {
    // Handle errors and respond with an internal server error message
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - Get Vendor Followers' });
  }
};

// ... (other vendor-related controllers)

// Export the vendor controllers for use in routes
module.exports = {
  createVendorStore,
  addProduct,
  getProductReviews,
  getVendorFollowers,
  // ... (other exports)
};
