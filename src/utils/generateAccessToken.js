const jwt = require('jsonwebtoken');

function generateAccessToken(id, username, role_id) {
  const payload = { id, username, role_id };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30m' });
}

module.exports = generateAccessToken;
