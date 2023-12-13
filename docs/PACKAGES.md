# Vendo Project Packages Guide

## Express.js and Middleware
- **Packages:** `express`, `cors`, `body-parser`
- **Purpose:**
  - **express:** A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
  - **cors:** Middleware for handling Cross-Origin Resource Sharing (CORS) to allow or restrict access to resources on a web server.
  - **body-parser:** Middleware to parse incoming request bodies in a middleware before your handlers, available under the `req.body` property.

## MongoDB and Mongoose
- **Packages:** `mongoose`
- **Purpose:**
  - **mongoose:** An Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a straight-forward, schema-based solution to model your application data.

## JWT for Authentication
- **Package:** `jsonwebtoken`
- **Purpose:**
  - **jsonwebtoken:** A JSON Web Token (JWT) library for Node.js that allows you to create, sign, and verify JWTs. Useful for implementing stateless authentication.

## Bcrypt for Password Hashing
- **Package:** `bcrypt`
- **Purpose:**
  - **bcrypt:** A library for hashing passwords. It is a secure and efficient way to handle password hashing and verification.

## Validation Packages
- **Packages:** `joi`, `express-validator`
- **Purpose:**
  - **joi:** A powerful schema description language and data validator for JavaScript objects.
  - **express-validator:** A set of Express.js middlewares for input validation. It's built on top of validator.js validator and sanitizer functions.

## dotenv for Environment Variables
- **Package:** `dotenv`
- **Purpose:**
  - **dotenv:** A zero-dependency module that loads environment variables from a `.env` file into `process.env`. Useful for managing configuration in development.

## Nodemon for Development (optional, but recommended)
- **Package:** `nodemon`
- **Purpose:**
  - **nodemon:** A utility that monitors for changes in your source code and automatically restarts your server. Useful for the development phase.

## How to Use
1. **Install Packages:**
   ```bash
   npm install express cors body-parser mongoose jsonwebtoken bcrypt joi express-validator dotenv nodemon --save
   ```

2. **Update Package.json Scripts:**
   ```json
   "scripts": {
     "start": "node index.js",
     "dev": "nodemon index.js"
   }
   ```

3. **Create a .env file:**
   - Add your environment variables like `MONGODB_URI`, `JWT_SECRET`, etc.

4. **Use Packages in Your Project:**
   - Import and configure the packages in your project files, such as `index.js`, routes, controllers, etc.

---