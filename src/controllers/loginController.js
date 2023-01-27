const { loginService } = require('../services');

const createUser = async (req, res) => {
const user = await loginService.createUser(req.body);
return res.status(200).json(user);
};

module.exports = {
  createUser,
};