# Vendo App

Vendo is a centralized marketplace application that connects online vendors to customers within a platform. This project is built with the MERN stack (MongoDB, Express.js, React, Node.js).

## Features

### 1. MongoDB Database
- Utilizes MongoDB as the database for storing user information, product details, orders, and reviews.

### 2. Express.js Backend
- Implements the backend server using Express.js, providing a robust and scalable API for handling user authentication, product management, and order processing.

### 3. User Authentication
- Allows users to sign up as either vendors or customers with JWT-based authentication for secure and stateless communication.

### 4. Vendor Features
- Vendors can create accounts, set up online stores, and post products with descriptions, prices, and manage their inventory.
- Vendor profiles accumulate a follower base, and products are shown first to their followers.

### 5. Customer Features
- Customers can sign up, set up profiles, and buy products from different vendors.
- Customers can leave reviews on products they have purchased.

### 6. MongoDB Schema
- Implements a robust MongoDB schema for User, Vendor, Customer, Product, Order, and Review entities.

### 7. Folder Structure
- Organized project structure with separate folders for configuration, controllers, database, middleware, models, routes, services, and utilities.

### 8. Middleware
- Uses middleware such as CORS for handling Cross-Origin Resource Sharing.

### 9. Environmental Variables
- Environmental variables managed with dotenv for sensitive information like MongoDB connection string and JWT secret key.

## Getting Started

1. Clone the repository: `git clone <repository-url>`
2. Install dependencies: `npm install`
3. Set up your MongoDB connection URI and JWT secret key in the `.env` file.
4. Run the server: `npm start`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---