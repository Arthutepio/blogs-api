const { BlogPost, PostCategory, Category } = require('../models');

const validatePost = async (title, content, categoryIds) => {
  if (!title || !content || !categoryIds) {
    return { type: 400, message: 'Some required fields are missing' };
  }

  const categories = await Promise.all(categoryIds
    .map((category) => Category.findByPk(category)));

    const IsNotcategory = categories.some((category) => !category);
    
    if (IsNotcategory) {
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

module.exports = {
  createPost,
};
