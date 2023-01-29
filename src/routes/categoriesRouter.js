const express = require('express');
const { categoriesController } = require('../controllers');

const { authorizationUser } = require('../middlewares/authorizationMiddleware');

const router = express.Router();

router.post('/categories', authorizationUser, categoriesController.createCategories);

module.exports = router;