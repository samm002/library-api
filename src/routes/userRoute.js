const express = require('express');
const router = express.Router();
const { userController } = require('../controllers');
const { authenticateJwtToken, isPublic } = require('../middlewares');

router.post('/register', isPublic(), userController.register);
router.post('/login', isPublic(), userController.login);
router.get('/profile', authenticateJwtToken, userController.profile);

module.exports = router;
