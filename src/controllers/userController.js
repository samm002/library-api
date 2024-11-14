const { userService } = require('../services');

const register = async (req, res) => {
  const {
    first_name,
    last_name,
    username,
    email,
    password,
    phone_number,
    address,
    role_id,
  } = req.body;

  try {
    const newUser = await userService.register(
      first_name,
      last_name,
      username,
      email,
      password,
      phone_number,
      address,
      role_id
    );
    res.status(201).json({
      status: 'success',
      message: 'register',
      data: newUser,
    });
  } catch (error) {
    const statusCode = error.statusCode || 400;

    res.status(statusCode).json({
      status: 'failed',
      message: 'register',
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await userService.login(email, password);

    res.status(200).json({
      status: 'success',
      message: 'login',
      data: token,
    });
  } catch (error) {
    const statusCode = error.statusCode || 400;

    res.status(statusCode).json({
      status: 'failed',
      message: 'login',
      error: error.message,
    });
  }
};

const profile = async (req, res) => {
  const id = req.user?.id;

  try {
    const token = await userService.profile(id);

    res.status(200).json({
      status: 'success',
      message: 'profile',
      data: token,
    });
  } catch (error) {
    const statusCode = error.statusCode || 400;

    res.status(statusCode).json({
      status: 'failed',
      message: 'profile',
      error: error.message,
    });
  }
};

module.exports = {
  login,
  profile,
  register,
};
