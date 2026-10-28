const express = require('express');
const router = express.Router();
const { signup, login, getMe } = require('../controllers/authController');
const { validateSignup, validateLogin } = require('../middleware/validate');
const rateLimiter = require('../middleware/rateLimiter');
const { protect } = require('../middleware/authMiddleware');

router.post('/signup', rateLimiter, validateSignup, signup);
router.post('/login', rateLimiter, validateLogin, login);
router.get('/me', protect, getMe);

module.exports = router;
