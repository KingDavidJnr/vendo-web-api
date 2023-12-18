// swaggerConfig.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Vendo Web API',
      version: '1.0.0',
      description: 'API documentation for the Vendo Web Application',
    },
    components: {
      schemas: {
        UserRegistration: {
          type: 'object',
          properties: {
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            email: { type: 'string', format: 'email' },
            password: { type: 'string' },
            role: { type: 'string', enum: ['vendor', 'customer'] },
          },
        },
        UserLogin: {
          type: 'object',
          properties: {
            email: { type: 'string', format: 'email' },
            password: { type: 'string' },
          },
        },
        ProductOrder: {
          type: 'object',
          properties: {
            productId: { type: 'string' },
            quantity: { type: 'number' },
          },
          required: ['productId', 'quantity'],
        },
        CustomerProfile: {
          type: 'object',
          properties: {
            // Define the properties for the customer profile
          },
        },
        UpdatedCustomerProfile: {
          type: 'object',
          properties: {
            // Define the properties for the updated customer profile
          },
        },
        Product: {
          type: 'object',
          properties: {
            // Define the properties for the product
          },
        },
        AddReview: {
          type: 'object',
          properties: {
            // Define the properties for adding a review
          },
        },
        UpdateReview: {
          type: 'object',
          properties: {
            // Define the properties for updating a review
          },
        },
        VendorStore: {
          type: 'object',
          properties: {
            // Define the properties for the vendor store
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
