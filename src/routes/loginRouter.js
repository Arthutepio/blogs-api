const express = require('express');
const { authController } = require('../controllers');
// const authorizationMiddleware = require('../middlewares/authorizationMiddleware');

const router = express.Router();

router.post('/login', authController.auth);

module.exports = router;