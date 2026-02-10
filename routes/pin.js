const express = require('express');
const { verifySession } = require('../services/authService');
const pinService = require('../services/pinService');

const router = express.Router();

// All PIN-related routes

/**
 * @swagger
 * tags:
 *   name: PIN
 *   description: PIN code management endpoints (mock)
 */

/**
 * @swagger
 * /api/auth/pin/setup:
 *   post:
 *     summary: Create/setup PIN after login (mock)
 *     tags: [PIN]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pin:
 *                 type: string
 *             required:
 *               - pin
 *     responses:
 *       200:
 *         description: PIN created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ПИН е създаден успешно."
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *                     has_pin:
 *                       type: boolean
 *                       example: true
 *                     pin_status:
 *                       type: string
 *                       example: "set"
 *                     is_parent:
 *                       type: boolean
 *                       example: false
 *       400:
 *         description: Validation or logical error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "ПИН вече е създаден."
 */
router.post('/pin/setup', verifySession, pinService.setupPin);

/**
 * @swagger
 * /api/auth/pin/verify:
 *   post:
 *     summary: Verify PIN (generic unlock, mock)
 *     tags: [PIN]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pin:
 *                 type: string
 *             required:
 *               - pin
 *     responses:
 *       200:
 *         description: PIN is valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "ПИНът е валиден."
 *       400:
 *         description: Invalid or missing PIN
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Невалиден ПИН."
 */
router.post('/pin/verify', verifySession, pinService.verifyPin);

/**
 * @swagger
 * /api/auth/pin/forgot:
 *   post:
 *     summary: Forgot PIN (request reset email, mock)
 *     tags: [PIN]
 *     responses:
 *       200:
 *         description: PIN reset email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Имейл за ресет на ПИН е изпратен успешно."
 *       400:
 *         description: Error sending email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Възникна грешка при изпращането на имейл за ресет на ПИН."
 */
router.post('/pin/forgot', verifySession, pinService.forgotPin);

module.exports = router;

