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
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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

