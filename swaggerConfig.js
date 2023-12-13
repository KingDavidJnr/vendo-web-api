// swaggerConfig.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Vendo API',
      version: '1.0.0',
      description: 'API documentation for the Vendo application',
    },
  },
  apis: ['./routes/*.js'], // Modify this path based on your project structure
};

const specs = swaggerJsdoc(options);

module.exports = specs;
