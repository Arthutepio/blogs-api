const { User } = require('../models');
const jwtUtils = require('../utils/jwt');
const { validateUser } = require('./validations/validateUser');

const findAllUser = async () => {
  const users = await User.findAll({
    attributes: ['id', 'displayName', 'email', 'image'],
  });
  return users;
};

const findByIdUser = async ({ id }) => {
  const user = await User.findOne({
    attributes: ['id', 'displayName', 'email', 'image'],
    where: { id },
  });

  if (!user) {
    return { type: 404, message: 'User does not exist' };
  }
  return { type: null, message: user.dataValues };
};

const createUser = async ({ displayName, email, password, image }) => {
  const error = validateUser({ displayName, email, password });
  
  const user = await User.findOne({
    where: { email },
  });
 
  if (user) {
    return { type: 409, message: 'User already registered' }; 
  }

  if (error) {
    return { type: 400, message: error.message };
  }
  
  const newUser = await User.create({ displayName, email, password, image });
  delete newUser.dataValues.password;
  
  const token = jwtUtils.generateToken(newUser);

  return { type: null, message: token };
};

const deleteUser = async ({ id }) => {
  const removeUser = await User.destroy({
    where: { id },
  });
  return removeUser;
};

module.exports = {
  createUser,
  findAllUser,
  findByIdUser,
  deleteUser,
};