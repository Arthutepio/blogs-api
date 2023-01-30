const express = require('express');
const { postCategoryController } = require('../controllers');
const { authorizationUser } = require('../middlewares/authorizationMiddleware');

const router = express.Router();

router.post('/post', authorizationUser, postCategoryController.createPost);

router.get('/post', authorizationUser, postCategoryController.findAllPost);

module.exports = router;