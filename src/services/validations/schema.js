const Joi = require('joi');

const userSchema = Joi.object({
  displayName: Joi.string().min(8).max(255).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password: Joi.string().min(6).max(255).required(),
});

module.exports = {
  userSchema,
};