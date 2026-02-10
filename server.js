const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();
const PORT = process.env.PORT || 3000;

// Routes
const apiRouter = require('./routes');

// Middleware
app.use(cors()); // allow all origins
app.use(bodyParser.urlencoded({ extended: false })); // for application/x-www-form-urlencoded
app.use(bodyParser.json()); // in case JSON is ever used

// Health check endpoint (оставяме само този ендпойнт тук)
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    env: process.env.NODE_ENV || 'development',
  });
});

// Swagger UI docs under /api/docs
// Configure Swagger UI for Vercel compatibility
const swaggerUiOptions = {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Mock Backend API Documentation',
  swaggerOptions: {
    persistAuthorization: true,
    displayRequestDuration: true,
    tryItOutEnabled: true,
    filter: true,
    showExtensions: true,
    showCommonExtensions: true,
  },
};

// Dynamic swagger setup that updates server URL based on request
app.use('/api/docs', swaggerUi.serve);
app.get('/api/docs', (req, res, next) => {
  // Update swagger spec with current request URL for Vercel
  const protocol = req.headers['x-forwarded-proto'] || (req.secure ? 'https' : 'http');
  const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost:3000';
  const baseUrl = `${protocol}://${host}`;
  
  // Create a copy of swagger spec with updated server URL
  const specWithUrl = {
    ...swaggerSpec,
    servers: [
      { url: baseUrl, description: 'Current server' },
      { url: 'http://localhost:3000', description: 'Local development server' },
    ],
  };
  
  return swaggerUi.setup(specWithUrl, swaggerUiOptions)(req, res, next);
});

// Main API routes mounted under /api
app.use('/api', apiRouter);

// Export for Vercel serverless
module.exports = app;

// Start server only if not in Vercel environment
if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Mock API listening on http://localhost:${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api/docs`);
  });
}

