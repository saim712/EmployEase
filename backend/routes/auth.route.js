const express = require('express');
const router = express.Router();
const { register, login, verifyUser } = require('../controllers/auth.controller');
const { verifyToken } = require('../middleware/auth');

router.post('/register', register);
router.post('/login', login);
router.get('/me', verifyToken, verifyUser);
router.get('/employees', verifyToken, require('../controllers/auth.controller').getAllEmployees);

module.exports = router;
