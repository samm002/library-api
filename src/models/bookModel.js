const pool = require('../configs/database');

const getAllBook = async (search) => {
  const { title, author, genre, published_year } = search;

  let query = 'SELECT * FROM books';
  const params = [];
  const conditions = [];

  if (title) {
    conditions.push(`title ILIKE $${params.length + 1}`);
    params.push(`%${title}%`);
  }

  if (author) {
    conditions.push(`author ILIKE $${params.length + 1}`);
    params.push(`%${author}%`);
  }

  if (genre) {
    conditions.push(`genre ILIKE $${params.length + 1}`);
    params.push(`%${genre}%`);
  }

  if (published_year) {
    conditions.push(`published_year ILIKE $${params.length + 1}`);
    params.push(`%${published_year}%`);
  }

  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(' AND ')}`;
  }

  const result = await pool.query(query, params);

  return result.rows;
};

const getBookById = async (id) => {
  const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);

  return result.rows[0];
};

const createBook = async (title, author, genre, published_year, stock) => {
  const result = await pool.query(
    'INSERT INTO books (title, author, genre, published_year, stock) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [title, author, genre, published_year, stock]
  );
  return result.rows[0];
};

const updateBook = async (id, title, author, genre, published_year, stock) => {
  const result = await pool.query(
    'UPDATE books SET title = $2, author = $3, genre = $4, published_year = $5, stock = $6  WHERE id = $1 RETURNING *',
    [id, title, author, genre, published_year, stock]
  );
  return result.rows[0];
};

const updateBookStock = async (id, stock) => {
  const result = await pool.query(
    'UPDATE books SET stock = $2 WHERE id = $1 RETURNING title, stock',
    [id, stock]
  );
  return result.rows[0];
};

const deleteBook = async (id) => {
  const result = await pool.query(
    'DELETE FROM books WHERE id = $1 RETURNING *',
    [id]
  );
  return result.rows[0];
};

module.exports = {
  getAllBook,
  getBookById,
  createBook,
  updateBook,
  updateBookStock,
  deleteBook,
};
