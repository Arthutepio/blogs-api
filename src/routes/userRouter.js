const express = require('express');
const { userController } = require('../controllers');
const { authorizationUser } = require('../middlewares/authorizationMiddleware');
const validateUser = require('../middlewares/validateUser');

const router = express.Router();

router.post('/user', validateUser, userController.createUser);

router.get('/user', authorizationUser, userController.findAllUser);

router.get('/user/:id', authorizationUser, userController.findByIdUser);

router.delete('/user/me', authorizationUser, userController.deleteUser);

module.exports = router;