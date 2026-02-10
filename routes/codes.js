const express = require('express');
const { listCodes, addCode } = require('../services/codesService');

const router = express.Router();

// Codes management endpoints (mock)

/**
 * @swagger
 * tags:
 *   name: Codes
 *   description: Code management endpoints (mock)
 */

/**
 * @swagger
 * /api/codes:
 *   get:
 *     summary: Get list of codes associated with the current parent account (mock)
 *     tags: [Codes]
 *     responses:
 *       200:
 *         description: List of codes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 codes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "1"
 *                       code:
 *                         type: string
 *                         example: "ABCDEF-123456"
 *                       status:
 *                         type: string
 *                         enum: [active, expired, inactive]
 *                         example: "active"
 *                       activated_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2026-01-25T10:00:00.000Z"
 *                       expires_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2026-02-25T10:00:00.000Z"
 *                       assigned_child:
 *                         type: object
 *                         nullable: true
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "child-1"
 *                           name:
 *                             type: string
 *                             example: "Алекс"
 *       500:
 *         description: Failed to load codes (mock)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Неуспешно зареждане на кодовете (mock)."
 */
router.get('/', listCodes);

/**
 * @swagger
 * /api/codes:
 *   post:
 *     summary: Activate/add a code (mock)
 *     tags: [Codes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: "ABCDEF-123456"
 *             required:
 *               - code
 *     responses:
 *       201:
 *         description: Code added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Кодът е добавен успешно (mock)."
 *                 code:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "3"
 *                     code:
 *                       type: string
 *                       example: "ABCDEF-123456"
 *                     status:
 *                       type: string
 *                       example: "active"
 *                     activated_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2026-01-26T10:00:00.000Z"
 *                     expires_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2026-02-26T10:00:00.000Z"
 *                     assigned_child:
 *                       type: object
 *                       nullable: true
 *                       example: null
 *       400:
 *         description: Validation or logical error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Полето \"code\" е задължително."
 *       500:
 *         description: Failed to add code (mock)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Неуспешно зареждане на кодовете (mock)."
 */
router.post('/', addCode);

module.exports = router;

