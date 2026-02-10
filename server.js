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

// Swagger JSON spec endpoint (for Swagger UI to load)
app.get('/api/docs/swagger.json', (req, res) => {
  const protocol = req.headers['x-forwarded-proto'] || (req.secure ? 'https' : 'http');
  const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost:3000';
  const baseUrl = `${protocol}://${host}`;
  
  const specWithUrl = JSON.parse(JSON.stringify(swaggerSpec));
  specWithUrl.servers = [
    { url: baseUrl, description: 'Current server' },
    { url: 'http://localhost:3000', description: 'Local development server' },
  ];
  
  res.setHeader('Content-Type', 'application/json');
  res.send(specWithUrl);
});

// Swagger UI docs under /api/docs
// Configure Swagger UI for Vercel compatibility
const swaggerUiOptions = {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Mock Backend API Documentation',
  swaggerOptions: {
    url: '/api/docs/swagger.json', // Use the JSON endpoint
    persistAuthorization: true,
    displayRequestDuration: true,
    tryItOutEnabled: true,
    filter: true,
    showExtensions: true,
    showCommonExtensions: true,
  },
};

// Serve Swagger UI static files
app.use('/api/docs', swaggerUi.serve);

// Setup Swagger UI
app.get('/api/docs', swaggerUi.setup(null, swaggerUiOptions));

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

