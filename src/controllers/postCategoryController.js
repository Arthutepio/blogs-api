const { postCategoryService } = require('../services');

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id } = req.user;
const { type, message } = await postCategoryService.createPost({ title, content, categoryIds, id });

if (type !== null) return res.status(type).json({ message });
return res.status(201).json(message);
};

module.exports = {
  createPost,
};