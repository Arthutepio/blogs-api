require('dotenv').config();
const jwt = require('jsonwebtoken');

const TOKEN_SECRET = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const generateToken = (payload) => {
  try {
    return jwt.sign(payload.dataValues, TOKEN_SECRET, jwtConfig);
  } catch (error) {
    console.log(error.message);
    throw new Error('Falha ao gerar token');
  }
};

const decodeToken = (token) => {
  if (!token) {
    throw new Error('Undefined Token');
  }

  try {
    const result = jwt.verify(token, TOKEN_SECRET);
    return result;
  } catch (err) {
    console.log(err.message);
    throw new Error('Invalid assignature');
  }
};

module.exports = {
  generateToken,
  decodeToken,
};