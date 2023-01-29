const { Category } = require('../models');

const findAllCategories = async () => {
  const categories = await Category.findAll({
    attributes: ['id', 'name'],
  });
  return categories;
};

const createCategories = async ({ name }) => {
  if (!name) {
    return { type: 400, message: '"name" is required' };
  }

  const newCategory = await Category.create({ name });
  return { type: null, message: newCategory };
};

module.exports = {
  createCategories,
  findAllCategories,
};