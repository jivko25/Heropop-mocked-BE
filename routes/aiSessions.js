const express = require('express');
const {
  getCurrentSessionForChild,
  sendMessageForChild,
} = require('../services/parentService');
const { verifySession } = require('../services/authService');

const router = express.Router();

function getCurrentChildId(req) {
  const childIdFromHeader = req.headers['x-child-id'];
  if (childIdFromHeader) return String(childIdFromHeader);
  return '1';
}

/**
 * @swagger
 * tags:
 *   name: AI Sessions
 *   description: Diary / Share with best friend – current session and send message
 */

/**
 * @swagger
 * /api/ai-sessions/current:
 *   get:
 *     summary: Get current AI session for active child (mock)
 *     tags: [AI Sessions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: X-Child-Id
 *         in: header
 *         schema:
 *           type: string
 *         description: Active child ID (from token/session)
 *     responses:
 *       200:
 *         description: Current session (id, title, created_at, messages). Empty messages if no session.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   nullable: true
 *                   example: "sess_1"
 *                 title:
 *                   type: string
 *                   nullable: true
 *                   example: "Дневник – 2026-01-21"
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   nullable: true
 *                 messages:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "m1"
 *                       role:
 *                         type: string
 *                         enum: [user, assistant]
 *                       content:
 *                         type: string
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/current', verifySession, (req, res) => {
  try {
    const childId = getCurrentChildId(req);
    const session = getCurrentSessionForChild(childId);
    return res.status(200).json(session);
  } catch (err) {
    console.error('[MOCK] getCurrentAiSession error', err);
    return res
      .status(500)
      .json({ error: 'Неуспешно зареждане на текущата сесия (mock).' });
  }
});

/**
 * @swagger
 * /api/ai-sessions/send-message:
 *   post:
 *     summary: Send message in current AI session; get answer and optionally audio_url (mock)
 *     tags: [AI Sessions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: X-Child-Id
 *         in: header
 *         schema:
 *           type: string
 *         description: Active child ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: User message (from voice or manual input)
 *                 example: "Днес в училище се скарах с приятел."
 *     responses:
 *       200:
 *         description: AI answer; optionally audio_url. If no audio_url, FE uses TTS.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 answer:
 *                   type: string
 *                   example: "Текст на отговора от AI..."
 *                 audio_url:
 *                   type: string
 *                   nullable: true
 *                   example: "https://cdn.example.com/audio/xxx.mp3"
 *                 session_id:
 *                   type: string
 *                   example: "sess_1"
 *       400:
 *         description: Missing or empty content
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/send-message', verifySession, async (req, res) => {
  try {
    const childId = getCurrentChildId(req);
    const { content } = req.body || {};
    const result = await sendMessageForChild(childId, content);
    if (result.error && result.status === 400) {
      return res.status(400).json({ error: result.error });
    }
    return res.status(200).json({
      answer: result.answer,
      audio_url: result.audio_url,
      session_id: result.session_id,
    });
  } catch (err) {
    console.error('[MOCK] sendAiMessage error', err);
    return res
      .status(500)
      .json({ error: 'Грешка при изпращане на съобщение (mock).' });
  }
});

module.exports = router;
