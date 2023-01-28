const express = require('express');
const { userController } = require('../controllers');
const { authorizationUser } = require('../middlewares/authorizationMiddleware');

const router = express.Router();

router.post('/user', userController.createUser);

router.get('/user', authorizationUser, userController.findAllUser);

module.exports = router;