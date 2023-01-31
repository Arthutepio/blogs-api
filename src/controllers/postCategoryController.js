const { postCategoryService } = require('../services');

const findAllPost = async (req, res) => {
const post = await postCategoryService.findAllPost();
return res.status(200).json(post);
};

const findByIdPost = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await postCategoryService.findByIdPost({ id });
  if (type !== null) return res.status(type).json({ message });
  return res.status(200).json(message);
};

const createPost = async (req, res) => {
  const { title, content, categoryIds } = req.body;
  const { id } = req.user;
const { type, message } = await postCategoryService.createPost({ title, content, categoryIds, id });

if (type !== null) return res.status(type).json({ message });
return res.status(201).json(message);
};

const updateByIdPost = async (req, res) => {
  const { id: idUser } = req.user;
  const { id } = req.params;
  const { title, content } = req.body;

  if (Number(id) !== idUser) return res.status(401).json({ message: 'Unauthorized user' });
  const { type, message } = await postCategoryService.updateByIdPost({ title, content, id });
  if (type !== null) return res.status(type).json({ message });
  return res.status(200).json(message);
};

const deleteByIdPost = async (req, res) => {
  const { id } = req.params;
  const { id: idUser } = req.user;

  const { type, message } = await postCategoryService.deleteByIdPost(id, idUser);
  if (type !== null) return res.status(type).json({ message });
  return res.status(204).json(message);
}; // falta validar o caso de sucesso

module.exports = {
  createPost,
  findAllPost,
  findByIdPost,
  deleteByIdPost,
  updateByIdPost,
};