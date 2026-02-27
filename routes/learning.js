const express = require('express');
const { getCategories, ask } = require('../services/learningService');
const { verifySession } = require('../services/authService');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Learning
 *   description: Learning – AI chat by subject (categories + ask)
 */

/**
 * @swagger
 * /api/learning/categories:
 *   get:
 *     summary: Get list of learning categories (subjects) (mock)
 *     tags: [Learning]
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
 *                         example: "История"
 *                       color:
 *                         type: string
 *                         example: "#8B5CF6"
 *                       emoji:
 *                         type: string
 *                         example: "📜"
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/categories', verifySession, getCategories);

/**
 * @swagger
 * /api/learning/ask:
 *   post:
 *     summary: Ask a question by subject (category) – AI returns answer as text (mock)
 *     tags: [Learning]
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
 *               - question
 *             properties:
 *               category_id:
 *                 oneOf:
 *                   - type: integer
 *                   - type: string
 *                 example: 1
 *                 description: Category ID from GET /api/learning/categories
 *               question:
 *                 type: string
 *                 maxLength: 300
 *                 example: "Кой е измислил електричеството?"
 *                 description: User question (max 300 characters)
 *     responses:
 *       200:
 *         description: AI answer as text
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 answer:
 *                   type: string
 *                   example: "Отговорът на AI по избраната тема..."
 *       400:
 *         description: Missing/invalid category_id or question (e.g. question over 300 chars)
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/ask', verifySession, ask);

module.exports = router;
