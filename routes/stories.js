const express = require('express');
const multer = require('multer');
const {
  listStories,
  getStory,
  createStory,
  updateStory,
  deleteStory,
  animateStory,
  validateImage,
  animateImage,
  getCategories,
  generateStory,
} = require('../services/storiesService');
const { verifySession } = require('../services/authService');

const router = express.Router();

// Configure multer for file uploads (in-memory storage for mock)
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          'Невалиден формат на изображението. Разрешени са само JPG и PNG.',
        ),
        false,
      );
    }
  },
});

/**
 * @swagger
 * tags:
 *   name: Stories
 *   description: Stories management endpoints (mock)
 */

/**
 * @swagger
 * /api/stories:
 *   get:
 *     summary: Get list of stories with pagination and search (mock)
 *     tags: [Stories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - name: per_page
 *         in: query
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Items per page
 *       - name: search
 *         in: query
 *         schema:
 *           type: string
 *         description: Search by title (minimum 3 characters)
 *       - name: X-Child-Id
 *         in: header
 *         schema:
 *           type: string
 *         description: Child ID (optional, for parent access)
 *     responses:
 *       200:
 *         description: List of stories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 stories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       title:
 *                         type: string
 *                         example: "Приказка за храбрия рицар"
 *                       image_url:
 *                         type: string
 *                         example: "https://picsum.photos/400/300"
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-15T10:30:00Z"
 *                 total_count:
 *                   type: integer
 *                   example: 25
 *                 current_page:
 *                   type: integer
 *                   example: 1
 *                 total_pages:
 *                   type: integer
 *                   example: 3
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/stories/validate-image:
 *   post:
 *     summary: Validate story image for appropriate content (mock)
 *     tags: [Stories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: X-Child-Id
 *         in: header
 *         schema:
 *           type: string
 *         description: Child ID (optional, for parent access)
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file (required, JPG or PNG, max 5MB)
 *     responses:
 *       200:
 *         description: Image validation result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 valid:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Bad request (invalid image or missing image)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 valid:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Изображението е задължително."
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/validate-image', verifySession, upload.single('image'), validateImage);

/**
 * @swagger
 * /api/stories/animate-image:
 *   post:
 *     summary: Animate story image to 2D animation (mock)
 *     tags: [Stories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: X-Child-Id
 *         in: header
 *         schema:
 *           type: string
 *         description: Child ID (optional, for parent access)
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file (required, JPG or PNG, max 5MB)
 *     responses:
 *       200:
 *         description: Image animated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 animatedImageUrl:
 *                   type: string
 *                   example: "https://picsum.photos/400/300?random=1234567890"
 *       400:
 *         description: Bad request (invalid image or missing image)
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/animate-image', verifySession, upload.single('image'), animateImage);

router.get('/', verifySession, listStories);

/**
 * @swagger
 * /api/stories/categories:
 *   get:
 *     summary: Get list of story categories (mock)
 *     tags: [Stories]
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
 *                         example: "Приключения"
 *                       color:
 *                         type: string
 *                         example: "#6366F1"
 *                       emoji:
 *                         type: string
 *                         example: "🗺️"
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get('/categories', verifySession, getCategories);

/**
 * @swagger
 * /api/stories/generate:
 *   post:
 *     summary: Generate story by category (AI mock – returns text and audio URL)
 *     tags: [Stories]
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
 *                 type: integer
 *                 example: 1
 *                 description: Category ID from GET /api/stories/categories
 *     responses:
 *       200:
 *         description: Generated story (audio_url and/or text)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 audio_url:
 *                   type: string
 *                   example: "https://cdn.example.com/stories/abc123.mp3"
 *                 text:
 *                   type: string
 *                   example: "Имало едно време..."
 *                 content:
 *                   type: string
 *                   example: "Имало едно време..."
 *       400:
 *         description: Missing or invalid category_id
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/generate', verifySession, generateStory);

/**
 * @swagger
 * /api/stories/{id}:
 *   get:
 *     summary: Get story details by ID (mock)
 *     tags: [Stories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Story ID
 *       - name: X-Child-Id
 *         in: header
 *         schema:
 *           type: string
 *         description: Child ID (optional, for parent access)
 *     responses:
 *       200:
 *         description: Story details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: "Приказка за храбрия рицар"
 *                 image_url:
 *                   type: string
 *                   example: "https://picsum.photos/400/300"
 *                 video_url:
 *                   type: string
 *                   nullable: true
 *                   description: Optional
 *                 content:
 *                   type: string
 *                   nullable: true
 *                   description: Optional
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (no access to story)
 *       404:
 *         description: Story not found
 */
router.get('/:id', verifySession, getStory);

/**
 * @swagger
 * /api/stories:
 *   post:
 *     summary: Create a new story (mock)
 *     tags: [Stories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: X-Child-Id
 *         in: header
 *         schema:
 *           type: string
 *         description: Child ID (optional, for parent access)
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Приказка за храбрия рицар"
 *                 maxLength: 200
 *                 description: Story title (optional; if missing or empty, BE sets a default title)
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file (required if image_url not provided)
 *               image_url:
 *                 type: string
 *                 example: "https://picsum.photos/400/300"
 *                 description: URL to image (required if image file not provided)
 *     responses:
 *       201:
 *         description: Story created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: "Приказка за храбрия рицар"
 *                 image_url:
 *                   type: string
 *                   example: "https://picsum.photos/400/300"
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Bad request (validation error)
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post('/', verifySession, upload.single('image'), createStory);

/**
 * @swagger
 * /api/stories/{id}:
 *   put:
 *     summary: Update a story (mock)
 *     tags: [Stories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Story ID
 *       - name: X-Child-Id
 *         in: header
 *         schema:
 *           type: string
 *         description: Child ID (optional, for parent access)
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Обновено заглавие"
 *                 minLength: 1
 *                 maxLength: 200
 *                 description: Story title (optional, 1-200 characters)
 *               content:
 *                 type: string
 *                 example: "Обновено съдържание..."
 *                 description: Story content (optional)
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: New image file (optional)
 *     responses:
 *       200:
 *         description: Story updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 title:
 *                   type: string
 *                   example: "Обновено заглавие"
 *                 image_url:
 *                   type: string
 *                   example: "https://picsum.photos/400/300"
 *                 video_url:
 *                   type: string
 *                   nullable: true
 *                   example: null
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-01-15T10:30:00Z"
 *       400:
 *         description: Bad request (validation error)
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (no access to story)
 *       404:
 *         description: Story not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', verifySession, upload.single('image'), updateStory);

/**
 * @swagger
 * /api/stories/{id}/animate:
 *   post:
 *     summary: Animate story image to generate video (mock)
 *     tags: [Stories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Story ID
 *       - name: X-Child-Id
 *         in: header
 *         schema:
 *           type: string
 *         description: Child ID (optional, for parent access)
 *     responses:
 *       200:
 *         description: Video generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 video_url:
 *                   type: string
 *                   example: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
 *                 message:
 *                   type: string
 *                   example: "Видеото се генерира успешно"
 *       400:
 *         description: Bad request (story has no image)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Приказката няма изображение за анимиране."
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (no access to story)
 *       404:
 *         description: Story not found
 *       500:
 *         description: Internal server error
 */
router.post('/:id/animate', verifySession, animateStory);

/**
 * @swagger
 * /api/stories/{id}:
 *   delete:
 *     summary: Delete a story (mock)
 *     tags: [Stories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Story ID
 *       - name: X-Child-Id
 *         in: header
 *         schema:
 *           type: string
 *         description: Child ID (optional, for parent access)
 *     responses:
 *       200:
 *         description: Story deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Приказката е изтрита успешно."
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (no access to story)
 *       404:
 *         description: Story not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', verifySession, deleteStory);

module.exports = router;
