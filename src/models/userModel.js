const pool = require('../configs/database');

const getUserById = async (id) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);

  return result.rows[0];
};

const getUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [
    email,
  ]);

  return result.rows[0];
};

const createUser = async (
  first_name,
  last_name,
  username,
  email,
  password,
  phone_number,
  address,
  role_id
) => {
  const result = await pool.query(
    'INSERT INTO users (first_name, last_name, username, email, password, phone_number, address, role_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [
      first_name,
      last_name,
      username,
      email,
      password,
      phone_number,
      address,
      role_id,
    ]
  );

  return result.rows[0];
};

module.exports = {
  getUserById,
  getUserByEmail,
  createUser,
};
