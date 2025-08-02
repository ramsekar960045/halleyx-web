const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.constructor.modelName.toLowerCase() }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = generateToken;