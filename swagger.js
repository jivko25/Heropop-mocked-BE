const swaggerJsdoc = require('swagger-jsdoc');

// Get base URL from environment or use localhost
// Note: This is a fallback - the actual URL is determined dynamically from request headers in server.js
const getBaseUrl = () => {
  // Vercel automatically provides VERCEL_URL in production
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  // Fallback for local development
  return 'http://localhost:3000';
};

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Mock Backend API',
    version: '1.0.0',
    description: 'Mock backend for React Native app - Full API documentation',
  },
  servers: [
    {
      url: getBaseUrl(),
      description: 'Current server',
    },
    {
      url: 'http://localhost:3000',
      description: 'Local development server',
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

