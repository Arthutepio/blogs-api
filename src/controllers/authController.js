const authService = require('../services/authService');

const auth = async (req, res) => {
  const { email, password } = req.body;
  const { type, message } = await authService.validate(email, password);

if (type !== null) return res.status(type).json({ message });
  return res.status(200).json({ token: message });
};

module.exports = {
  auth,
};