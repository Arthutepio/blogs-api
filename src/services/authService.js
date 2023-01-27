const { User } = require('../models');
const jwtUtils = require('../utils/jwt');

const validate = async (email, password) => {
  if (!email || !password) {
    return { type: 400, message: 'Some required fields are missing' };
  }

  const user = await User.findOne({
    attributes: ['id', 'display_name'],
    where: { email, password },
  });

  if (!user) {
    return { type: 400, message: 'Invalid fields' }; 
  }
console.log('xxx', user.dataValues);
  const token = jwtUtils.generateToken(user);

  return { type: null, message: token };
     };

module.exports = {
  validate,
};