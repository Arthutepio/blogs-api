const { postCategoryService } = require('../services');

const findAllPost = async (req, res) => {
const post = await postCategoryService.findAllPost();
return res.status(200).json(post);
};

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  // console.log(req.user);
  const { id } = req.user;
const { type, message } = await postCategoryService.createPost({ title, content, categoryIds, id });

if (type !== null) return res.status(type).json({ message });
return res.status(201).json(message);
};

module.exports = {
  createPost,
  findAllPost,
};