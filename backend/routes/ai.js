const express = require('express');
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../middleware/auth');
const aiController = require('../controllers/aiController');

const router = express.Router();

const validation = [
  body('title')
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Title must be between 5 and 200 characters'),

  body('content')
    .trim()
    .isLength({ min: 10, max: 20000 })
    .withMessage('Content must be between 10 and 20000 characters'),

  body('action')
    .isIn(['suggest', 'correct'])
    .withMessage('Invalid AI action')
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg
    });
  }

  next();
};

router.post(
  '/review',
  authMiddleware,
  validation,
  handleValidationErrors,
  aiController.reviewBlog
);

module.exports = router;