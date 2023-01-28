const { User } = require('../models');
const jwtUtils = require('../utils/jwt');
const { validateUser } = require('./validations/validateUser');

const createUser = async ({ displayName, email, password, image }) => {
  const error = validateUser({ displayName, email, password });
  
  const user = await User.findOne({
    where: { email },
  });
  // console.log('xxx', user);
 
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

module.exports = {
  createUser,
};