// model/order/orderModel.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderId: {
    type: Number,
    required: true,
    unique: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  }],
  totalAmount: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

// Middleware to generate a 15-digit integer ID before saving
orderSchema.pre('save', function (next) {
  const order = this;

  // Generate a 15-digit integer ID
  order.orderId = generate15DigitId();

  next();
});

const OrderModel = mongoose.model('Order', orderSchema);

// Function to generate a 15-digit integer ID
function generate15DigitId() {
  return Math.floor(100000000000000 + Math.random() * 900000000000000);
}

module.exports = OrderModel;
