const express = require('express');
const { userController } = require('../controllers');
const { authorizationUser } = require('../middlewares/authorizationMiddleware');

const router = express.Router();

router.post('/user', userController.createUser);

router.get('/user', authorizationUser, userController.findAllUser);

router.get('/user/:id', authorizationUser, userController.findByIdUser);

router.delete('/user/me', authorizationUser, userController.deleteUser);

module.exports = router;