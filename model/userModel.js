// model/user/userModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

// Middleware to generate a 10-digit integer ID before saving
userSchema.pre('save', function (next) {
  const user = this;

  // Generate a 10-digit integer ID
  user.userId = generate10DigitId();

  // Hash the password only if it has been modified or is new
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hashedPassword) => {
      if (err) return next(err);

      // Replace the plain text password with the hashed password
      user.password = hashedPassword;
      next();
    });
  });
});

const UserModel = mongoose.model('User', userSchema);

// Function to generate a 10-digit integer ID
function generate10DigitId() {
  return Math.floor(1000000000 + Math.random() * 9000000000);
}

module.exports = UserModel;
