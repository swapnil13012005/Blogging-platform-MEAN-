const express = require('express');
const { body, validationResult, param } = require('express-validator');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middleware/auth');

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};

// Create post validation
const createPostValidation = [
  body('title')
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage('Title must be between 3 and 200 characters'),
  body('content')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Content must be at least 10 characters')
];

// Update post validation
const updatePostValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid post ID'),
  body('title')
    .optional()
    .trim()
    .isLength({ min: 3, max: 200 })
    .withMessage('Title must be between 3 and 200 characters'),
  body('content')
    .optional()
    .trim()
    .isLength({ min: 10 })
    .withMessage('Content must be at least 10 characters')
];

// ID validation
const idValidation = [
  param('id')
    .isMongoId()
    .withMessage('Invalid post ID')
];

router.get('/', postController.getAllPosts);
router.get('/mine', authMiddleware, postController.getMyPosts);
router.get('/:id', idValidation, handleValidationErrors, postController.getPost);
router.post('/', authMiddleware, createPostValidation, handleValidationErrors, postController.createPost);
router.put('/:id', authMiddleware, updatePostValidation, handleValidationErrors, postController.updatePost);
router.delete('/:id', authMiddleware, idValidation, handleValidationErrors, postController.deletePost);
router.post('/setup/seed', postController.seedData);

module.exports = router;

