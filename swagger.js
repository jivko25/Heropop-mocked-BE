const swaggerJsdoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Mock Auth API',
    version: '1.0.0',
    description: 'Mock backend for React Native app (auth endpoints)',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};

const options = {
  swaggerDefinition,
  // Scan route files for JSDoc comments
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;

