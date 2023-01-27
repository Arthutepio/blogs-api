const { User } = require('../models');

const createUser = async ({ email, password }) => {
  await User.create({ email, password });
};

module.exports = {
  createUser,
};