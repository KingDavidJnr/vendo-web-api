# Vendo Technical Config Details

## MongoDB Connection Example

Assuming you have a MongoDB instance and a connection URI, you can set up your MongoDB connection in your `database/db.js` file as follows:

```javascript
// database/db.js
const mongoose = require('mongoose');
require('dotenv').config();

const { MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });
```

This file sets up a connection to your MongoDB database using the `mongoose` package and the connection URI stored in your `.env` file.

## Authentication Middleware Example

Create an authentication middleware (`middleware/authMiddleware.js`) to protect routes that require authentication:

```javascript
// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
```

This middleware checks for a valid JWT token in the `Authorization` header and adds the decoded user information to the request object.

## Route Example

Create a simple route (`routes/user/userRoutes.js`) that requires authentication:

```javascript
// routes/user/userRoutes.js
const express = require('express');
const { authenticateToken } = require('../../middleware/authMiddleware');
const UserController = require('../../controller/user/userController');

const router = express.Router();

// Protected route requiring authentication
router.get('/profile', authenticateToken, UserController.getUserProfile);

module.exports = router;
```

In this example, the `/profile` route is protected and requires a valid JWT token to access. The `authenticateToken` middleware checks for the token.

## Controller Example

Create a controller (`controller/user/userController.js`) to handle user-related logic:

```javascript
// controller/user/userController.js
class UserController {
  static getUserProfile(req, res) {
    const { username } = req.user;
    res.json({ message: `Welcome, ${username}!` });
  }
}

module.exports = UserController;
```

This controller has a simple method `getUserProfile` that sends a welcome message to the authenticated user.

## Services and Models

Similarly, create services and models for other components (vendors, customers, products, orders, reviews) following the same structure.

Certainly! Continuing from where we left off:

```markdown
## Services Example

Create a service (`services/user/userService.js`) that interacts with the user model and performs business logic:

```javascript
// services/user/userService.js
const UserModel = require('../../model/user/userModel');

class UserService {
  static getUserById(userId) {
    return UserModel.findById(userId);
  }
}

module.exports = UserService;
```

This service has a method `getUserById` that retrieves a user by their ID using the user model.

## Model Example

Create a user model (`model/user/userModel.js`) to define the schema for the user:

```javascript
// model/user/userModel.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  // Additional user fields as needed
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
```

This model defines the schema for the user, including fields like `username`, `email`, and `password`. You can expand this schema based on your user requirements.

## .env Example

Create a `.env` file in the root of your project with your environment variables:

```dotenv
MONGODB_URI=mongodb://localhost:27017/your-database
JWT_SECRET=your-secret-key
```

Replace the values with your actual MongoDB URI and a strong JWT secret key.

## Index.js Example

In your main entry file (`index.js`), you can set up your server, routes, and other configurations:

```javascript
// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const { MONGODB_URI } = process.env;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error.message));

// Routes
const userRoutes = require('./routes/user/userRoutes');
app.use('/user', userRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

This doc shows how to set up an Express app, connects to MongoDB, applies middleware, defines routes, and starts the server.

---