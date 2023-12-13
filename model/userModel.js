// model/user/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['customer', 'vendor'],
    default: 'customer',
  },
}, { timestamps: true });

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;