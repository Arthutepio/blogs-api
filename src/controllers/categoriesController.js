const { categoriesService } = require('../services');

const findAllCategories = async (req, res) => {
const categories = await categoriesService.findAllCategories();
return res.status(200).json(categories);
};

const createCategories = async (req, res) => {
const { type, message } = await categoriesService.createCategories(req.body);

if (type !== null) return res.status(type).json({ message });
return res.status(201).json(message);
};

module.exports = {
  createCategories,
  findAllCategories,
};