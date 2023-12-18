// model/customer/customerModel.js
const mongoose = require('mongoose');
const User = require('../model/userModel');

const customerSchema = new mongoose.Schema({
  // Additional customer-related fields
  purchases: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }],
}, { timestamps: true });

// Extend the User model using Mongoose discriminators
const CustomerModel = User.discriminator('Customer', customerSchema);

module.exports = CustomerModel;
