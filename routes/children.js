const express = require('express');
const {
  listChildren,
  getChild,
  deleteChild,
  toggleChildActive,
  updateChild,
  createChild,
} = require('../services/childrenService');

const router = express.Router();

// Children management endpoints (mock)

/**
 * @swagger
 * tags:
 *   name: Children
 *   description: Child profile management endpoints (mock)
 */

/**
 * @swagger
 * /api/children:
 *   get:
 *     summary: Get list of child profiles (mock)
 *     tags: [Children]
 *     responses:
 *       200:
 *         description: List of child profiles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 children:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "1"
 *                       name:
 *                         type: string
 *                         example: "Алекс"
 *                       avatar_url:
 *                         type: string
 *                         nullable: true
 *                         example: "https://example.com/avatar1.png"
 *                       is_active:
 *                         type: boolean
 *                         example: true
 *                       age:
 *                         type: number
 *                         example: 8
 *                       interests:
 *                         type: string
 *                         example: "игри, рисуване"
 *                       ai_restrictions:
 *                         type: string
 *                         example: "без войни, без хорър"
 *                       avatar_key:
 *                         type: string
 *                         example: "bear"
 *       400:
 *         description: Bad request (mock)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "описание на грешката"
 *       500:
 *         description: Server error (mock)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Something went wrong while fetching children (mock)."
 */
router.get('/', listChildren);

/**
 * @swagger
 * /api/children:
 *   post:
 *     summary: Create child profile (mock)
 *     tags: [Children]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Мария"
 *               avatar_url:
 *                 type: string
 *                 nullable: true
 *                 example: null
 *               is_active:
 *                 type: boolean
 *                 example: true
 *               age:
 *                 type: number
 *                 example: 7
 *               interests:
 *                 type: string
 *                 example: "рисуване, балет"
 *               ai_restrictions:
 *                 type: string
 *                 example: "без страшни истории"
 *               avatar_key:
 *                 type: string
 *                 example: "unicorn"
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Child profile created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Детският профил е създаден (mock)."
 *                 child:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "3"
 *                     name:
 *                       type: string
 *                       example: "Мария"
 *                     avatar_url:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                     is_active:
 *                       type: boolean
 *                       example: true
 *                     age:
 *                       type: number
 *                       example: 7
 *                     interests:
 *                       type: string
 *                       example: "рисуване, балет"
 *                     ai_restrictions:
 *                       type: string
 *                       example: "без страшни истории"
 *                     avatar_key:
 *                       type: string
 *                       example: "unicorn"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Полето \"name\" е задължително."
 */
router.post('/', createChild);

/**
 * @swagger
 * /api/children/{id}:
 *   get:
 *     summary: Get child profile by ID (mock)
 *     tags: [Children]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Child profile ID
 *     responses:
 *       200:
 *         description: Child profile found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 child:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "1"
 *                     name:
 *                       type: string
 *                       example: "Алекс"
 *                     avatar_url:
 *                       type: string
 *                       nullable: true
 *                       example: "https://example.com/avatar1.png"
 *                     is_active:
 *                       type: boolean
 *                       example: true
 *                     age:
 *                       type: number
 *                       example: 8
 *                     interests:
 *                       type: string
 *                       example: "игри, рисуване"
 *                     ai_restrictions:
 *                       type: string
 *                       example: "без войни, без хорър"
 *                     avatar_key:
 *                       type: string
 *                       example: "bear"
 *       404:
 *         description: Child profile not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Child profile not found (mock)."
 */
router.get('/:id', getChild);

/**
 * @swagger
 * /api/children/{id}:
 *   delete:
 *     summary: Delete child profile by ID (mock)
 *     tags: [Children]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Child profile ID
 *     responses:
 *       200:
 *         description: Child profile deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Детският профил е изтрит (mock)."
 *       404:
 *         description: Child profile not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Child profile not found (mock)."
 */
router.delete('/:id', deleteChild);

/**
 * @swagger
 * /api/children/{id}/deactivate:
 *   post:
 *     summary: Toggle child profile active status (mock)
 *     tags: [Children]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Child profile ID
 *     responses:
 *       200:
 *         description: Child profile status changed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Статусът на профила е променен (mock)."
 *                 child:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "1"
 *                     name:
 *                       type: string
 *                       example: "Алекс"
 *                     avatar_url:
 *                       type: string
 *                       nullable: true
 *                       example: "https://example.com/avatar1.png"
 *                     is_active:
 *                       type: boolean
 *                       example: false
 *                     age:
 *                       type: number
 *                       example: 8
 *                     interests:
 *                       type: string
 *                       example: "игри, рисуване"
 *                     ai_restrictions:
 *                       type: string
 *                       example: "без войни, без хорър"
 *                     avatar_key:
 *                       type: string
 *                       example: "bear"
 *       404:
 *         description: Child profile not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Child profile not found (mock)."
 */
router.post('/:id/deactivate', toggleChildActive);

/**
 * @swagger
 * /api/children/{id}:
 *   put:
 *     summary: Update child profile (mock)
 *     tags: [Children]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Child profile ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Алекс"
 *               avatar_url:
 *                 type: string
 *                 nullable: true
 *                 example: "https://example.com/avatar1.png"
 *               is_active:
 *                 type: boolean
 *                 example: true
 *               age:
 *                 type: number
 *                 example: 9
 *               interests:
 *                 type: string
 *                 example: "роботи, математика"
 *               ai_restrictions:
 *                 type: string
 *                 example: "без стрелялки, без ужас"
 *               avatar_key:
 *                 type: string
 *                 example: "robot"
 *     responses:
 *       200:
 *         description: Child profile updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Детският профил е обновен (mock)."
 *                 child:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "1"
 *                     name:
 *                       type: string
 *                       example: "Алекс"
 *                     avatar_url:
 *                       type: string
 *                       nullable: true
 *                       example: "https://example.com/avatar1.png"
 *                     is_active:
 *                       type: boolean
 *                       example: true
 *                     age:
 *                       type: number
 *                       example: 9
 *                     interests:
 *                       type: string
 *                       example: "роботи, математика"
 *                     ai_restrictions:
 *                       type: string
 *                       example: "без стрелялки, без ужас"
 *                     avatar_key:
 *                       type: string
 *                       example: "robot"
 *       400:
 *         description: No fields provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "At least one field (name, avatar_url, is_active, age, interests, ai_restrictions, avatar_key) is required (mock)."
 *       404:
 *         description: Child profile not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Child profile not found (mock)."
 */
router.put('/:id', updateChild);

module.exports = router;

