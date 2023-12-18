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

// ... (other functions)

module.exports = {
  getVendorOrders,
  getCustomerOrders,
  createCustomerOrder,
  getOrderById,
  // ... (other exports)
};
