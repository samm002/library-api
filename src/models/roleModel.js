const pool = require('../configs/database');

const getAllRole = async () => {
  const result = await pool.query('SELECT * FROM roles');
  return result.rows;
};

const getRoleById = async (id) => {
  const result = await pool.query('SELECT * FROM roles WHERE id = $1', [id]);
  return result.rows[0];
};

const getMemberRoleId = async () => {
  const result = await pool.query('SELECT * FROM roles WHERE name = $1', [
    'member',
  ]);
  return result.rows[0].id;
};

const createRole = async (name) => {
  const result = await pool.query(
    'INSERT INTO roles (name) VALUES ($1) RETURNING *',
    [name]
  );

  return result.rows[0];
};

const updateRole = async (id, name) => {
  const result = await pool.query(
    'UPDATE roles SET name = $2 WHERE id = $1 RETURNING *',
    [id, name]
  );
  return result.rows[0];
};

const deleteRole = async (id) => {
  const result = await pool.query(
    'DELETE FROM roles WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
};

module.exports = {
  getAllRole,
  getRoleById,
  getMemberRoleId,
  createRole,
  updateRole,
  deleteRole,
};
