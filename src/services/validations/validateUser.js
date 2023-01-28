const { userSchema } = require('./schema');

const validateUser = ({ displayName, email, password }) => {
  const { error } = userSchema.validate({ displayName, email, password });
  return error;
};

module.exports = {
  validateUser,
};