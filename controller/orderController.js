// controller/orderController.js
const Order = require('../model/orderModel');
const Vendor = require('../model/vendorModel');
const Customer = require('../model/customerModel');

/**
 * Get all orders for a specific vendor.
 */
const getVendorOrders = async (req, res) => {
  try {
    // Check if the authenticated user is a vendor
    const vendor = await Vendor.findById(req.user.userId);

    if (!vendor) {
      return res.status(403).json({ error: 'Forbidden - Only vendors can view their orders' });
    }

    // Retrieve all orders related to the vendor's products
    const orders = await Order.find({ 'products.vendor': req.user.userId });

    // Create a map to store the count of orders for each product
    const productOrderCountMap = new Map();

    // Iterate through each order and update the product order count
    orders.forEach((order) => {
      order.products.forEach((product) => {
        const productId = product.product.toString();
        const currentCount = productOrderCountMap.get(productId) || 0;
        productOrderCountMap.set(productId, currentCount + 1);
      });
    });

    // Respond with the list of orders and the product order count map
    res.status(200).json({ orders, productOrderCountMap });
  } catch (error) {
    // Handle errors and respond with an internal server error message
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - Get Vendor Orders' });
  }
};

/**
 * Get all orders for a specific customer.
 */
const getCustomerOrders = async (req, res) => {
  try {
    // Check if the authenticated user is a customer
    const customer = await Customer.findById(req.user.userId);

    if (!customer) {
      return res.status(403).json({ error: 'Forbidden - Only customers can view their orders' });
    }

    // Retrieve all orders related to the customer
    const orders = await Order.find({ customer: req.user.userId });

    // Respond with the list of orders
    res.status(200).json({ orders });
  } catch (error) {
    // Handle errors and respond with an internal server error message
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - Get Customer Orders' });
  }
};

/**
 * Create a new order by a customer.
 */
const createCustomerOrder = async (req, res) => {
  try {
    // Check if the authenticated user is a customer
    const customer = await Customer.findById(req.user.userId);

    if (!customer) {
      return res.status(403).json({ error: 'Forbidden - Only customers can create orders' });
    }

    // Destructure order information from the request body
    const { products, totalAmount } = req.body;

    // Create a new Order document based on the Order model
    const newOrder = new Order({
      customer: req.user.userId,
      products,
      totalAmount,
    });

    // Save the new order document to the database
    await newOrder.save();

    // Respond with the newly created order
    res.status(201).json({ order: newOrder });
  } catch (error) {
    // Handle errors and respond with an internal server error message
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - Create Customer Order' });
  }
};

/**
 * Get a single order by ID.
 */
const getOrderById = async (req, res) => {
  try {
    // Retrieve the order by ID from the Order model
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Check if the authenticated user is the customer who placed the order
    if (req.user.userId !== order.customer.toString()) {
      return res.status(403).json({ error: 'Forbidden - You do not have permission to view this order' });
    }

    // Respond with the order details
    res.status(200).json({ order });
  } catch (error) {
    // Handle errors and respond with an internal server error message
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error - Get Order by ID' });
  }
};

module.exports = {
  getVendorOrders,
  getCustomerOrders,
  createCustomerOrder,
  getOrderById,
  // ... (other exports)
};
