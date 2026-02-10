const express = require('express');
const multer = require('multer');
const {
  listHeroes,
  getHero,
  getBestFriend,
  createHero,
  updateHero,
  deleteHero,
  validateImage,
  animateImage,
  animateHero,
  setBestFriend,
  unsetBestFriend,
} = require('../services/heroesService');
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
      cb(new Error('Невалиден формат на изображението. Разрешени са само JPG и PNG.'), false);
    }
  },
});

/**
 * @swagger
 * tags:
 *   name: Heroes
 *   description: Hero gallery and management endpoints (mock)
 */

/**
 * @swagger
 * /api/heroes/validate-image:
 *   post:
 *     summary: Validate image for child-appropriate content using AI (mock)
 *     tags: [Heroes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: X-Child-Id
 *         in: header
 *         required: true
 *         schema:
 *           type: string
 *         description: Child ID (required)
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
 *                 description: Image file (JPG or PNG, max 5MB)
 *     responses:
 *       200:
 *         description: Validation result
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 valid:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Изображението съдържа неподходящо съдържание за деца."
 *       400:
 *         description: Bad request (invalid file format or size)
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (no access to child profile)
 *       500:
 *         description: Internal server error
 */
router.post('/validate-image', verifySession, upload.single('image'), validateImage);

/**
 * @swagger
 * /api/heroes/animate-image:
 *   post:
 *     summary: Animate image in 2D using AI (mock)
 *     tags: [Heroes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: X-Child-Id
 *         in: header
 *         required: true
 *         schema:
 *           type: string
 *         description: Child ID (required)
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
 *                 description: Image file (JPG or PNG, max 5MB)
 *     responses:
 *       200:
 *         description: Animated image URL
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 animatedImageUrl:
 *                   type: string
 *                   example: "https://picsum.photos/333/333"
 *       400:
 *         description: Bad request (invalid file format or size)
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (no access to child profile)
 *       500:
 *         description: Internal server error
 */
router.post('/animate-image', verifySession, upload.single('image'), animateImage);

/**
 * @swagger
 * /api/heroes:
 *   get:
 *     summary: Get list of heroes with pagination and search (mock)
 *     tags: [Heroes]
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
 *         description: Search by hero name (minimum 3 characters)
 *       - name: X-Child-Id
 *         in: header
 *         schema:
 *           type: string
 *         description: Child ID (optional, for parent access)
 *     responses:
 *       200:
 *         description: List of heroes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 heroes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: "Огнен дракон"
 *                       image_url:
 *                         type: string
 *                         example: "https://picsum.photos/333/333"
 *                       mission:
 *                         type: string
 *                         example: "Да пази кралството от злото и да защитава невинните."
 *                       backstory:
 *                         type: string
 *                         example: "Роден в планините на изтока, този дракон е станал легенда сред хората. Той е спасил много градове от нашествия на врагове."
 *                       video_url:
 *                         type: string
 *                         nullable: true
 *                         example: null
 *                       is_best_friend:
 *                         type: boolean
 *                         example: false
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         example: "2026-01-15T10:30:00Z"
 *                 total_count:
 *                   type: integer
 *                   example: 25
 *                 current_page:
 *                   type: integer
 *                   example: 1
 *                 total_pages:
 *                   type: integer
 *                   example: 3
 *                 per_page:
 *                   type: integer
 *                   example: 10
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
 */
router.get('/', verifySession, listHeroes);

/**
 * @swagger
 * /api/heroes/best-friend:
 *   get:
 *     summary: Get best friend hero for current child (mock)
 *     tags: [Heroes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: X-Child-Id
 *         in: header
 *         schema:
 *           type: string
 *         description: Child ID (optional, for parent access)
 *     responses:
 *       200:
 *         description: Best friend hero found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Супергерой"
 *                 image_url:
 *                   type: string
 *                   example: "https://picsum.photos/333/333"
 *                 video_url:
 *                   type: string
 *                   nullable: true
 *                   example: "https://example.com/video.mp4"
 *                 mission:
 *                   type: string
 *                   nullable: true
 *                   example: "Спасяване на света"
 *                 backstory:
 *                   type: string
 *                   nullable: true
 *                   example: "История на героя..."
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-01-15T10:30:00Z"
 *                 is_best_friend:
 *                   type: boolean
 *                   example: true
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: No best friend found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Няма зададен най-добър приятел."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Възникна грешка при обработката на заявката."
 */
router.get('/best-friend', verifySession, getBestFriend);

/**
 * @swagger
 * /api/heroes/{id}:
 *   get:
 *     summary: Get hero details by ID (mock)
 *     tags: [Heroes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Hero ID
 *       - name: X-Child-Id
 *         in: header
 *         schema:
 *           type: string
 *         description: Child ID (optional, for parent access)
 *     responses:
 *       200:
 *         description: Hero details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 child_id:
 *                   type: string
 *                   example: "1"
 *                 name:
 *                   type: string
 *                   example: "Огнен дракон"
 *                 image_url:
 *                   type: string
 *                   example: "https://picsum.photos/333/333"
 *                 mission:
 *                   type: string
 *                   nullable: true
 *                   example: "Да пази кралството от злото и да защитава невинните."
 *                 backstory:
 *                   type: string
 *                   nullable: true
 *                   example: "Роден в планините на изтока, този дракон е станал легенда сред хората. Той е спасил много градове от нашествия на врагове."
 *                 video_url:
 *                   type: string
 *                   nullable: true
 *                   example: "https://example.com/storage/heroes/videos/hero-1-animated.mp4"
 *                 is_best_friend:
 *                   type: boolean
 *                   example: false
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2026-01-15T10:30:00Z"
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   nullable: true
 *                   example: null
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Hero not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Героят не е намерен (mock)."
 */
router.get('/:id', verifySession, getHero);

/**
 * @swagger
 * /api/heroes/{id}/animate:
 *   post:
 *     summary: Animate hero image to generate video with custom prompt (mock)
 *     tags: [Heroes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Hero ID
 *       - name: X-Child-Id
 *         in: header
 *         schema:
 *           type: string
 *         description: Child ID (optional, for parent access)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - prompt
 *             properties:
 *               prompt:
 *                 type: string
 *                 minLength: 4
 *                 maxLength: 500
 *                 example: "Да ходи и да маха с ръка, като се усмихва"
 *                 description: Custom prompt describing how the hero should be animated (4-500 characters)
 *     responses:
 *       200:
 *         description: Hero animated successfully
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
 *                   example: "Анимацията се генерира успешно"
 *       400:
 *         description: Bad request (invalid prompt or hero has no image)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   examples:
 *                     missingPrompt:
 *                       value: "Полето 'prompt' е задължително."
 *                     invalidLength:
 *                       value: "Описът трябва да е между 4 и 500 символа."
 *                     noImage:
 *                       value: "Героят няма изображение за анимиране."
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (no access to hero)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Нямате достъп до този герой."
 *       404:
 *         description: Hero not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Героят не е намерен."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Възникна грешка при генерирането на анимацията."
 */
router.post('/:id/animate', verifySession, animateHero);

/**
 * @swagger
 * /api/heroes/{id}/set-best-friend:
 *   post:
 *     summary: Set hero as best friend (mock)
 *     tags: [Heroes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Hero ID
 *       - name: X-Child-Id
 *         in: header
 *         schema:
 *           type: string
 *         description: Child ID (optional, for parent access)
 *     responses:
 *       200:
 *         description: Hero successfully set as best friend
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Hero успешно направен най-добър приятел"
 *                 hero:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Супергерой"
 *                     image_url:
 *                       type: string
 *                       example: "https://picsum.photos/333/333"
 *                     video_url:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                     mission:
 *                       type: string
 *                       nullable: true
 *                       example: "Спасяване на света"
 *                     backstory:
 *                       type: string
 *                       nullable: true
 *                       example: "История на героя..."
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-15T10:30:00Z"
 *                     is_best_friend:
 *                       type: boolean
 *                       example: true
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (no access to hero)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Нямате право да променяте този герой."
 *       404:
 *         description: Hero not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Героят не е намерен."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Възникна грешка при обработката на заявката."
 */
router.post('/:id/set-best-friend', verifySession, setBestFriend);

/**
 * @swagger
 * /api/heroes/{id}/unset-best-friend:
 *   post:
 *     summary: Unset hero as best friend (mock)
 *     tags: [Heroes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Hero ID
 *       - name: X-Child-Id
 *         in: header
 *         schema:
 *           type: string
 *         description: Child ID (optional, for parent access)
 *     responses:
 *       200:
 *         description: Hero successfully unset as best friend
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Статусът 'най-добър приятел' е премахнат успешно"
 *                 hero:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Супергерой"
 *                     image_url:
 *                       type: string
 *                       example: "https://picsum.photos/333/333"
 *                     video_url:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                     mission:
 *                       type: string
 *                       nullable: true
 *                       example: "Спасяване на света"
 *                     backstory:
 *                       type: string
 *                       nullable: true
 *                       example: "История на героя..."
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-15T10:30:00Z"
 *                     is_best_friend:
 *                       type: boolean
 *                       example: false
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (no access to hero)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Нямате право да променяте този герой."
 *       404:
 *         description: Hero not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Героят не е намерен."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Възникна грешка при обработката на заявката."
 */
router.post('/:id/unset-best-friend', verifySession, unsetBestFriend);

/**
 * @swagger
 * /api/heroes:
 *   post:
 *     summary: Create a new hero (mock)
 *     tags: [Heroes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: X-Child-Id
 *         in: header
 *         required: true
 *         schema:
 *           type: string
 *         description: Child ID (required)
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Супергерой"
 *                 minLength: 3
 *                 maxLength: 12
 *                 description: Hero name (required, 3-12 characters)
 *               mission:
 *                 type: string
 *                 example: "Спасяване на света"
 *                 maxLength: 30
 *                 description: Hero mission (optional, max 30 characters)
 *               backstory:
 *                 type: string
 *                 example: "Родил се е на планетата Криптон..."
 *                 maxLength: 250
 *                 description: Hero backstory (optional, max 250 characters)
 *               image_url:
 *                 type: string
 *                 example: "https://picsum.photos/333/333"
 *                 description: URL to animated image (optional, if provided, image file is not needed)
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file (optional, if provided, image_url is not needed)
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Hero created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 123
 *                 name:
 *                   type: string
 *                   example: "Супергерой"
 *                 mission:
 *                   type: string
 *                   example: "Спасяване на света"
 *                 backstory:
 *                   type: string
 *                   example: "Родил се е на планетата Криптон..."
 *                 image_url:
 *                   type: string
 *                   example: "https://picsum.photos/333/333"
 *                 is_best_friend:
 *                   type: boolean
 *                   example: false
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-01-15T10:30:00Z"
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-01-15T10:30:00Z"
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       422:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Полето \"name\" е задължително."
 *                 errors:
 *                   type: object
 *                   additionalProperties:
 *                     type: array
 *                     items:
 *                       type: string
 */
router.post('/', verifySession, upload.single('image'), createHero);

/**
 * @swagger
 * /api/heroes/{id}:
 *   put:
 *     summary: Update a hero (mock)
 *     tags: [Heroes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Hero ID
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
 *               name:
 *                 type: string
 *                 example: "Актуализирано име"
 *                 minLength: 3
 *                 maxLength: 12
 *                 description: Hero name (optional, 3-12 characters)
 *               mission:
 *                 type: string
 *                 example: "Актуализирана мисия"
 *                 maxLength: 30
 *                 description: Hero mission (optional, max 30 characters, empty string to clear)
 *               backstory:
 *                 type: string
 *                 example: "Актуализирана история"
 *                 maxLength: 250
 *                 description: Hero backstory (optional, max 250 characters, empty string to clear)
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Image file (optional, not used in current implementation)
 *     responses:
 *       200:
 *         description: Hero updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Актуализирано име"
 *                 image_url:
 *                   type: string
 *                   example: "https://picsum.photos/333/333"
 *                 description:
 *                   type: string
 *                   nullable: true
 *                   example: "Актуализирано описание"
 *                 mission:
 *                   type: string
 *                   nullable: true
 *                   example: "Актуализирана мисия"
 *                 backstory:
 *                   type: string
 *                   nullable: true
 *                   example: "Актуализирана история"
 *                 video_url:
 *                   type: string
 *                   nullable: true
 *                   example: "https://example.com/storage/heroes/videos/hero-1-animated.mp4"
 *                 is_best_friend:
 *                   type: boolean
 *                   example: false
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2026-01-15T10:30:00Z"
 *                 updated_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2026-01-29T16:00:00Z"
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Hero not found
 *       422:
 *         description: Validation error
 */
router.put('/:id', verifySession, upload.single('image'), updateHero);

/**
 * @swagger
 * /api/heroes/{id}:
 *   delete:
 *     summary: Delete a hero (mock)
 *     tags: [Heroes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Hero ID
 *       - name: X-Child-Id
 *         in: header
 *         schema:
 *           type: string
 *         description: Child ID (optional, for parent access)
 *     responses:
 *       204:
 *         description: Hero deleted successfully (no content)
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Hero not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Героят не е намерен (mock)."
 */
router.delete('/:id', verifySession, deleteHero);

module.exports = router;
