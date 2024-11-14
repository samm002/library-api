const { roleModel } = require('../models');

const getAllRole = async () => {
  const roles = await roleModel.getAllRole();

  return roles;
};

const getRoleById = async (id) => {
  const role = await roleModel.getRoleById(id);

  if (!role) {
    const error = new Error('Role not found');
    error.statusCode = 404;
    throw error;
  }

  return role;
};

const createRole = async (name) => {
  const newRole = await roleModel.createRole(name?.toLowerCase());

  return newRole;
};

const updateRole = async (id, name) => {
  const existingRole = await getRoleById(id);

  const updatedRole = await roleModel.updateRole(
    id,
    name?.toLowerCase() || existingRole.name
  );

  return updatedRole;
};

const deleteRole = async (id) => {
  await getRoleById(id);

  const deletedRole = await roleModel.deleteRole(id);

  return deletedRole;
};

module.exports = {
  getAllRole,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
};
