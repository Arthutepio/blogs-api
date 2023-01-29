const { Category } = require('../models');

const createCategories = async ({ name }) => {
console.log('xxx', name);
  if (!name) {
    return { type: 400, message: '"name" is required' };
  }
  
  const newCategory = await Category.create({ name });
  return { type: null, message: newCategory };
};

module.exports = {
  createCategories,
};