const express = require('express');
const loginController = require('../controllers');

const router = express.Router();

router.post('/login', loginController.createUser);

module.exports = router;