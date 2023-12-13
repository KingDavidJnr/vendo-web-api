// model/user/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
    unique: true,
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

// Middleware to generate a 10-digit integer userId before saving
userSchema.pre('save', function (next) {
  const user = this;

  // Generate a 10-digit integer userId
  user.userId = generate10DigitUserId();

  next();
});

// Function to generate a 10-digit integer userId
function generate10DigitUserId() {
  return Math.floor(1000000000 + Math.random() * 9000000000);
}

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
