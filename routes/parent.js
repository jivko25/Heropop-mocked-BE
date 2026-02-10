const express = require('express');
const {
  getChildDashboard,
  listChildAiSessions,
  getChildAiSession,
  generateChildAiSessionSummary,
  getNotificationSettings,
  updateNotificationSettings,
} = require('../services/parentService');
const { verifySession } = require('../services/authService');

const router = express.Router();

// Parent dashboard & AI sessions endpoints (mock)

/**
 * @swagger
 * tags:
 *   name: Parent
 *   description: Parent dashboard endpoints (mock)
 */

/**
 * @swagger
 * /api/parent/children/{childId}/dashboard:
 *   get:
 *     summary: Get parent dashboard data for a child (mock)
 *     tags: [Parent]
 *     parameters:
 *       - name: childId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Child ID
 *     responses:
 *       200:
 *         description: Child dashboard data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 child_id:
 *                   type: string
 *                   example: "1"
 *                 child_name:
 *                   type: string
 *                   example: "Алекс"
 *                 last_login_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2026-01-20T19:42:00Z"
 *                 last_ai_diary_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2026-01-22T08:15:00Z"
 *                 recent_menu_activity:
 *                   type: array
 *                   items:
 *                     type: string
 *                 favorite_ai_category:
 *                   type: string
 *                 favorite_ai_category_label:
 *                   type: string
 *                 last_diary_sessions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                 mood_trend:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       date:
 *                         type: string
 *                       index:
 *                         type: integer
 *                 current_interests:
 *                   type: object
 *                   properties:
 *                     period_start:
 *                       type: string
 *                     period_end:
 *                       type: string
 *                     summary:
 *                       type: string
 *                     source_session_ids:
 *                       type: array
 *                       items:
 *                         type: string
 *       500:
 *         description: Failed to load dashboard (mock)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Неуспешно зареждане на дашборда (mock)."
 */
router.get('/children/:childId/dashboard', verifySession, getChildDashboard);

/**
 * @swagger
 * /api/parent/children/{childId}/ai-sessions:
 *   get:
 *     summary: List AI sessions for a child (mock)
 *     tags: [Parent]
 *     parameters:
 *       - name: childId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: page
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: per_page
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           default: 20
 *     responses:
 *       200:
 *         description: List of AI sessions
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 items:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                       message_count:
 *                         type: integer
 *                       has_summary:
 *                         type: boolean
 *                 meta:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     per_page:
 *                       type: integer
 *                     total:
 *                       type: integer
 *                     has_more:
 *                       type: boolean
 */
router.get(
  '/children/:childId/ai-sessions',
  verifySession,
  listChildAiSessions,
);

/**
 * @swagger
 * /api/parent/children/{childId}/ai-sessions/{sessionId}:
 *   get:
 *     summary: Get AI session details for a child (mock)
 *     tags: [Parent]
 *     parameters:
 *       - name: childId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: sessionId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: AI session details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 child_id:
 *                   type: string
 *                 child_name:
 *                   type: string
 *                 title:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                 messages:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       role:
 *                         type: string
 *                         enum: [user, assistant]
 *                       content:
 *                         type: string
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                 summary:
 *                   type: object
 *                   nullable: true
 *                   properties:
 *                     text:
 *                       type: string
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: AI session not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "AI session not found (mock)."
 */
router.get(
  '/children/:childId/ai-sessions/:sessionId',
  verifySession,
  getChildAiSession,
);

/**
 * @swagger
 * /api/parent/children/{childId}/ai-sessions/{sessionId}/summary:
 *   post:
 *     summary: Generate summary for an AI session (mock)
 *     tags: [Parent]
 *     parameters:
 *       - name: childId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: sessionId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Summary generated or returned if already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 summary:
 *                   type: object
 *                   properties:
 *                     text:
 *                       type: string
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: AI session not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "AI session not found (mock)."
 */
router.post(
  '/children/:childId/ai-sessions/:sessionId/summary',
  verifySession,
  generateChildAiSessionSummary,
);

/**
 * @swagger
 * /api/parent/notification-settings:
 *   get:
 *     summary: Get parent notification settings (mock)
 *     tags: [Parent]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current notification settings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email_frequency:
 *                   type: string
 *                   enum: [never, daily, weekly, monthly]
 *                   example: "never"
 *       401:
 *         description: Unauthorized
 */
router.get('/notification-settings', verifySession, getNotificationSettings);

/**
 * @swagger
 * /api/parent/notification-settings:
 *   put:
 *     summary: Update parent notification settings (mock)
 *     tags: [Parent]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email_frequency:
 *                 type: string
 *                 enum: [never, daily, weekly, monthly]
 *                 example: "weekly"
 *             required:
 *               - email_frequency
 *     responses:
 *       200:
 *         description: Settings updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email_frequency:
 *                   type: string
 *                 message:
 *                   type: string
 *                   example: "Настройките бяха успешно обновени"
 *       422:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 errors:
 *                   type: object
 *                   additionalProperties:
 *                     type: array
 *                     items:
 *                       type: string
 */
router.put(
  '/notification-settings',
  verifySession,
  updateNotificationSettings,
);

module.exports = router;

