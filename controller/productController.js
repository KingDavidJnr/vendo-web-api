// controller/productController.js
const Product = require('../model/productModel');
const Vendor = require('../model/vendorModel');

/**
 * Create a new product.
 */
const createProduct = async (req, res) => {
  try {
    // Destructure product information from the request body
    const { title, description, price, quantityAvailable } = req.body;

    // Check if the logged-in user is a vendor
    const vendor = await Vendor.findById(req.user.userId);

    if (!vendor) {
      return res.status(403).json({ error: 'Forbidden - Only vendors can create products' });
    }

    // Create a new Product document based on the Product model
    const newProduct = new Product({
      vendor: req.user.userId,
      title,
      description,
      price,
      quantityAvailable,
    });

    // Save the new product document to the database
    await newProduct.save();

    // Add the product reference to the vendor's products array
    vendor.products.push(newProduct._id);
    await vendor.save();

    // Respond with the newly created product
    res.status(201).json({ product: newProduct });
  } catch (error) {
    // Handle errors and respond with an internal server error message
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - Create Product' });
  }
};

/**
 * Get a list of all products.
 */
const getAllProducts = async (req, res) => {
  try {
    // Retrieve all products from the Product model
    const products = await Product.find();

    // Respond with the list of products
    res.status(200).json({ products });
  } catch (error) {
    // Handle errors and respond with an internal server error message
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - Get All Products' });
  }
};

/**
 * Get details of a specific product by ID.
 */
const getProductById = async (req, res) => {
  try {
    // Retrieve the product by ID from the Product model
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Respond with the product details
    res.status(200).json({ product });
  } catch (error) {
    // Handle errors and respond with an internal server error message
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - Get Product by ID' });
  }
};

/**
 * Update details of a specific product.
 */

const updateProduct = async (req, res) => {
    try {
      // Retrieve the product by ID from the Product model
      const product = await Product.findById(req.params.productId);
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      // Check if the authenticated user is the vendor who owns the product
      if (req.user.userId !== product.vendor.toString()) {
        return res.status(403).json({ error: 'Forbidden - You do not have permission to update this product' });
      }
  
      // Destructure updated product information from the request body
      const { title, description, price, quantityAvailable } = req.body;
  
      // Update the product details
      product.title = title || product.title;
      product.description = description || product.description;
      product.price = price || product.price;
      product.quantityAvailable = quantityAvailable || product.quantityAvailable;
  
      // Save the updated product document to the database
      await product.save();
  
      // Respond with the updated product
      res.status(200).json({ product });
    } catch (error) {
      // Handle errors and respond with an internal server error message
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error - Update Product' });
    }
  };

/**
 * Delete a specific product.
 */

const deleteProduct = async (req, res) => {
    try {
      // Retrieve the product by ID from the Product model
      const product = await Product.findById(req.params.productId);
  
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      // Check if the authenticated user is the vendor who owns the product
      if (req.user.userId !== product.vendor.toString()) {
        return res.status(403).json({ error: 'Forbidden - You do not have permission to delete this product' });
      }
  
      // Delete the product document from the database
      await Product.deleteOne({ _id: req.params.productId });
  
      // Respond with a success message
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      // Handle errors and respond with an internal server error message
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error - Delete Product' });
    }
  };

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  // ... (other exports)
};
