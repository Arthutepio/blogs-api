const express = require('express');
const { postCategoryController } = require('../controllers');
const { authorizationUser } = require('../middlewares/authorizationMiddleware');

const router = express.Router();

router.post('/post', authorizationUser, postCategoryController.createPost);

router.get('/post', authorizationUser, postCategoryController.findAllPost);

router.get('/post/:id', authorizationUser, postCategoryController.findByIdPost);

router.put('/post/:id', authorizationUser, postCategoryController.updateByIdPost);

router.delete('/post/:id', authorizationUser, postCategoryController.deleteByIdPost);
module.exports = router;