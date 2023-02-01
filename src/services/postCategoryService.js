const { Op } = require('sequelize');
const { BlogPost, PostCategory, Category, User } = require('../models');

const validatePost = async (title, content, categoryIds) => {
  if (!title || !content || !categoryIds) {
    return { type: 400, message: 'Some required fields are missing' };
  }

  const categories = await Promise.all(categoryIds
    .map((category) => Category.findByPk(category)));

    const isCategory = categories.some((category) => !category);
    
    if (isCategory) {
 return { type: 400, message: 'one or more "categoryIds" not found' }; 
  }
}; // refactor to Joi

const createPost = async ({ title, content, categoryIds, id }) => {  
  const validated = await validatePost(title, content, categoryIds);
  if (validated) return { type: validated.type, message: validated.message }; 
  
  const post = await BlogPost.create({ title,
    content,
    userId: id,
    published: Date.now(),
    updated: Date.now() });

   const postId = post.dataValues.id;
   await Promise.all(categoryIds
    .map((categoryId) => PostCategory.create({ postId, categoryId }))); 
    
    return { type: null, message: post.dataValues };
};

const findAllPost = async () => {
  const post = await BlogPost.findAll({
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } }],
  });

  return post;
};

const findByIdPost = async ({ id }) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } }], 
  });
  console.log(post);
  if (!post) return { type: 404, message: 'Post does not exist' };
  return { type: null, message: post };
};

const updateByIdPost = async ({ title, content, id }) => {
  if (!title || !content) return { type: 400, message: 'Some required fields are missing' };
    await BlogPost.update(
    { title, content, update: Date.now() },
    { where: { id } },
    );
    const update = await BlogPost.findOne({
      where: { id },
      include: [{ model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } }], 
    });

  return { type: null, message: update };
};

const deleteByIdPost = async (id, userId) => {
  const post = await BlogPost.findOne({ where: { id } });
  if (!post) return { type: 404, message: 'Post does not exist' };
  console.log(post.dataValues.userId);
  if (Number(post.dataValues.userId) !== userId) return { type: 401, message: 'Unauthorized user' };
  await BlogPost.destroy({
    where: { id },
  });
  
  return { type: null, message: '' };
}; // falta validar o caso de sucesso

const searchPost = async (q) => {
  const search = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.substring]: q } },
        { content: { [Op.substring]: q } },
      ],
    },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } },
    ],
  });
  return search;
};

module.exports = {
  createPost,
  findAllPost,
  findByIdPost,
  deleteByIdPost,
  updateByIdPost,
  searchPost,
};
