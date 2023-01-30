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
  console.log(post);
  return post;
};

module.exports = {
  createPost,
  findAllPost,
};
