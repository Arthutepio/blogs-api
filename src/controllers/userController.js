const { userService } = require('../services');

const findAllUser = async (_req, res) => {
  const result = await userService.findAllUser();
  return res.status(200).json(result);
};

const findByIdUser = async (req, res) => {
const { id } = req.params;
const { type, message } = await userService.findByIdUser({ id });

if (type !== null) return res.status(type).json({ message });
return res.status(200).json(message);
};

const createUser = async (req, res) => {
const { displayName, email, password, image } = req.body;
const { type, message } = await userService.createUser({ displayName, email, password, image });

if (type !== null) return res.status(type).json({ message });
return res.status(201).json({ token: message });
};

const deleteUser = async (req, res) => {
  const { id } = req.user;
  const removeUser = await userService.deleteUser({ id });
  if (removeUser) return res.status(204).end();
  };

module.exports = {
  createUser,
  findAllUser,
  findByIdUser,
  deleteUser,
};