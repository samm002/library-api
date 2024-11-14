const { roleService } = require('../services');

const getAllRole = async (req, res) => {
  try {
    const roles = await roleService.getAllRole();
    res.status(200).json({
      status: 'success',
      message: 'get all roles',
      data: roles,
    });
  } catch (error) {
    const statusCode = error.statusCode || 400;

    res.status(statusCode).json({
      status: 'failed',
      message: 'get all roles',
      error: error.message,
    });
  }
};

const getRoleById = async (req, res) => {
  const { id } = req.params;
  try {
    const role = await roleService.getRoleById(id);
    res.status(200).json({
      status: 'success',
      message: 'get role by id',
      data: role,
    });
  } catch (error) {
    const statusCode = error.statusCode || 400;

    res.status(statusCode).json({
      status: 'failed',
      message: 'get role by id',
      error: error.message,
    });
  }
};

const createRole = async (req, res) => {
  const { name } = req.body;

  try {
    const role = await roleService.createRole(name);
    res.status(201).json({
      status: 'success',
      message: 'create role',
      data: role,
    });
  } catch (error) {
    const statusCode = error.statusCode || 400;

    res.status(statusCode).json({
      status: 'failed',
      message: 'create role',
      error: error.message,
    });
  }
};

const updateRole = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const role = await roleService.updateRole(id, name);
    res.status(200).json({
      status: 'success',
      message: 'update role',
      data: role,
    });
  } catch (error) {
    const statusCode = error.statusCode || 400;

    res.status(statusCode).json({
      status: 'failed',
      message: 'update role',
      error: error.message,
    });
  }
};

const deleteRole = async (req, res) => {
  const { id } = req.params;

  try {
    const role = await roleService.deleteRole(id);
    res.status(200).json({
      status: 'success',
      message: 'delete role',
      data: role,
    });
  } catch (error) {
    const statusCode = error.statusCode || 400;

    res.status(statusCode).json({
      status: 'failed',
      message: 'delete role',
      error: error.message,
    });
  }
};

module.exports = {
  getAllRole,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
};
