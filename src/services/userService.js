const bcrypt = require('bcrypt');

const { userModel, roleModel } = require('../models');
const { generateAccessToken } = require('../utils');

const register = async (
  first_name,
  last_name,
  username,
  email,
  password,
  phone_number,
  address
) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const memberId = await roleModel.getMemberRoleId();

  const newUser = await userModel.createUser(
    first_name,
    last_name,
    username,
    email,
    hashedPassword,
    phone_number,
    address,
    Number(memberId)
  );

  return newUser;
};

const login = async (email, password) => {
  const user = await userModel.getUserByEmail(email);

  if (!user) {
    console.log('invalid email');

    const error = new Error('Invalid credentials');
    error.statusCode = 401;
    throw error;
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    console.log('invalid password');

    const error = new Error('Invalid credentials');
    error.statusCode = 401;
    throw error;
  }

  const token = generateAccessToken(user.id, user.username, user.role_id);

  return token;
};

const profile = async (id) => {
  const user = await userModel.getUserById(id);

  if (!user) {
    console.log('invalid id');

    const error = new Error('Invalid credentials');
    error.statusCode = 401;
    throw error;
  }

  return user;
};

module.exports = {
  login,
  profile,
  register,
};
