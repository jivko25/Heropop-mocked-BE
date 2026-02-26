const express = require('express');
const { getCategories, generateFacts } = require('../services/factsService');
const { verifySession } = require('../services/authService');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Facts
 *   description: Interesting facts – categories and generate (mock)
 */

/**
 * @swagger
 * /api/facts/categories:
 *   get:
 *     summary: Get list of categories for interesting facts (mock)
 *     tags: [Facts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of categories (id, text, color, emoji)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       text:
 *                         type: string
 *                         example: "Космос"
 *                       color:
 *                         type: string
 *                         example: "#10B981"
 *                       emoji:
 *                         type: string
 *                         example: "🪐"
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/categories', verifySession, getCategories);

/**
 * @swagger
 * /api/facts/generate:
 *   post:
 *     summary: Generate interesting facts by category (AI mock – text and audio URL)
 *     tags: [Facts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: X-Child-Id
 *         in: header
 *         schema:
 *           type: string
 *         description: Child ID (optional, for context)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - category_id
 *             properties:
 *               category_id:
 *                 oneOf:
 *                   - type: integer
 *                   - type: string
 *                 example: 1
 *                 description: Category ID from GET /api/facts/categories
 *     responses:
 *       200:
 *         description: Generated facts (audio_url and/or text). If only text, app can use TTS.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 audio_url:
 *                   type: string
 *                   example: "https://cdn.example.com/facts/xyz789.mp3"
 *                 text:
 *                   type: string
 *                   example: "Знаеше ли, че..."
 *                 content:
 *                   type: string
 *                   example: "Знаеше ли, че..."
 *       400:
 *         description: Missing or invalid category_id
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/generate', verifySession, generateFacts);

module.exports = router;
