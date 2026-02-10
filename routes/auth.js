const express = require('express');
const authRouter = express.Router();
const authService = require('../services/authService');

// Example-style controller: router just wires endpoints to service functions

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication related endpoints (mock)
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Mock user registration
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               fullName:
 *                 type: string
 *               termsAccepted:
 *                 type: boolean
 *             required:
 *               - email
 *               - password
 *               - fullName
 *               - termsAccepted
 *     responses:
 *       201:
 *         description: Successful mock registration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Регистрацията е успешна (mock)."
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     email:
 *                       type: string
 *                       example: "test@example.com"
 *                     user_email:
 *                       type: string
 *                       example: "test@example.com"
 *                     fullName:
 *                       type: string
 *                       example: "Test User"
 *                     display_name:
 *                       type: string
 *                       example: "Test User"
 *                     has_pin:
 *                       type: boolean
 *                       example: false
 *                     pin_status:
 *                       type: string
 *                       example: "set"
 *                     is_parent:
 *                       type: boolean
 *                       example: false
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Email и парола са задължителни."
 */
authRouter.post('/register', authService.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Mock user login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Successful mock login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 session:
 *                   type: object
 *                   properties:
 *                     access_token:
 *                       type: string
 *                       example: "mock-access-token"
 *                     refresh_token:
 *                       type: string
 *                       example: "mock-refresh-token"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     email:
 *                       type: string
 *                       example: "test@example.com"
 *                     user_email:
 *                       type: string
 *                       example: "test@example.com"
 *                     fullName:
 *                       type: string
 *                       example: "Test User"
 *                     display_name:
 *                       type: string
 *                       example: "Test User"
 *                     has_pin:
 *                       type: boolean
 *                       example: false
 *                     pin_status:
 *                       type: string
 *                       example: "set"
 *                     is_parent:
 *                       type: boolean
 *                       example: false
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Email и парола са задължителни."
 */
authRouter.post('/login', authService.login);

/**
 * @swagger
 * /api/auth/resend-confirmation:
 *   post:
 *     summary: Resend confirmation email (mock)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Confirmation email resent (mock)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Потвърждаващ имейл е изпратен отново (mock)."
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Email е задължителен."
 */
authRouter.post('/resend-confirmation', authService.resendConfirmation);

/**
 * @swagger
 * /api/auth/push-token:
 *   post:
 *     summary: Save push token (mock)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pushToken:
 *                 type: string
 *             required:
 *               - pushToken
 *     responses:
 *       200:
 *         description: Push token saved (mock)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Push токенът е записан успешно (mock)."
 *                 pushToken:
 *                   type: string
 *                   example: "ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]"
 *                 userId:
 *                   type: string
 *                   example: "mock-user-id"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "pushToken е задължителен."
 */
authRouter.post('/push-token', authService.savePushToken);

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Request password reset (mock)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Password reset link sent (mock)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Линк за ресет на парола е изпратен (mock)."
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Email е задължителен."
 */
authRouter.post('/reset-password', authService.resetPassword);

/**
 * @swagger
 * /api/auth/password/change:
 *   post:
 *     summary: Change password (mock)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *             required:
 *               - password
 *     responses:
 *       200:
 *         description: Password changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password changed successfully"
 *       400:
 *         description: Invalid password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "invalid_password"
 *                 message:
 *                   type: string
 *                   example: "Password does not meet complexity requirements"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "unauthorized"
 *                 message:
 *                   type: string
 *                   example: "Invalid or expired token"
 *       500:
 *         description: Server error while changing password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "server_error"
 *                 message:
 *                   type: string
 *                   example: "Something went wrong while changing password"
 */
authRouter.post(
  '/password/change',
  authService.verifySession,
  authService.changePassword
);

/**
 * @swagger
 * /api/auth/email/change-request:
 *   post:
 *     summary: Request email change (mock)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Email change link sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email change link sent"
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "unauthorized"
 *                 message:
 *                   type: string
 *                   example: "Invalid or expired token"
 */
authRouter.post(
  '/email/change-request',
  authService.verifySession,
  authService.requestEmailChange
);

/**
 * @swagger
 * /api/auth/me:
 *   post:
 *     summary: Get mock current user from refresh token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successfully returned mock user and tokens
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 access_token:
 *                   type: string
 *                   example: "mock-access-token"
 *                 refresh_token:
 *                   type: string
 *                   example: "mock-refresh-token"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "mock-user-id"
 *                     email:
 *                       type: string
 *                       example: "mock@example.com"
 *                     fullName:
 *                       type: string
 *                       example: "Mock User"
 *                     display_name:
 *                       type: string
 *                       example: "Mock User"
 *                     has_pin:
 *                       type: boolean
 *                       example: false
 *                     pin_status:
 *                       type: string
 *                       example: "set"
 *                     is_parent:
 *                       type: boolean
 *                       example: false
 *       400:
 *         description: Missing refresh token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Refresh token is missing."
 *       401:
 *         description: Invalid or failed refresh (mock)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to refresh session (mock)."
 */
authRouter.post('/me', authService.getMe);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Mock logout and cleanup
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successful mock logout
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Изходът е успешен, пуш токените (mock) са изтрити."
 *       401:
 *         description: User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Потребителят не е автентикиран (mock)."
 */
authRouter.post('/logout', authService.verifySession, authService.logout);

module.exports = authRouter;

