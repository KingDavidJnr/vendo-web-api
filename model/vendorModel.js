// model/vendor/vendorModel.js
const mongoose = require('mongoose');
const User = require('../model/userModel');

const vendorSchema = new mongoose.Schema({
  // Additional vendor-related fields
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }],
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
  }],
}, { timestamps: true });

// Extend the User model using Mongoose discriminators
const VendorModel = User.discriminator('Vendor', vendorSchema);

module.exports = VendorModel;
