const { categoriesService } = require('../services');

const createCategories = async (req, res) => {
const { type, message } = await categoriesService.createCategories(req.body);

if (type !== null) return res.status(type).json({ message });
return res.status(201).json(message);
};

module.exports = {
  createCategories,
};