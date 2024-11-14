const pool = require('../configs/database');

const bookModel = require('./bookModel');
const userModel = require('./userModel');

const getAllBorrow = async (search) => {
  const { user_id, book_id } = search;

  let query = 'SELECT * FROM borrowed_books';
  const params = [];
  const conditions = [];

  if (user_id) {
    conditions.push(`user_id = $${params.length + 1}`);
    params.push(`%${user_id}%`);
  }

  if (book_id) {
    conditions.push(`book_id = $${params.length + 1}`);
    params.push(`%${book_id}%`);
  }

  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(' AND ')}`;
  }

  const result = await pool.query(query, params);

  return result.rows;
};

const getBorrowById = async (id) => {
  const result = await pool.query(
    'SELECT * FROM borrowed_books WHERE id = $1',
    [id]
  );

  return result.rows[0];
};

const getUserBorrowHistory = async (user_id) => {
  const result = await pool.query(
    'SELECT * FROM borrowed_books WHERE user_id = $1',
    [user_id]
  );

  return result.rows;
};

const getBookBorrowHistory = async (book_id) => {
  const result = await pool.query(
    'SELECT * FROM borrowed_books WHERE book_id = $1',
    [book_id]
  );

  return result.rows;
};

const createBorrow = async (user_id, book_id) => {
  const result = await pool.query(
    'INSERT INTO borrowed_books (user_id, book_id) VALUES ($1, $2) RETURNING *',
    [user_id, book_id]
  );

  return result.rows[0];
};

const borrowBook = async (user_id, book_id) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const validUser = await userModel.getUserById(user_id);
    if (!validUser) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }

    const validBook = await bookModel.getBookById(book_id);
    if (!validBook) {
      const error = new Error('Book not found');
      error.statusCode = 404;
      throw error;
    }
    if (validBook.stock <= 0) {
      const error = new Error('Book is out of stock');
      error.statusCode = 400;
      throw error;
    }

    await client.query('UPDATE books SET stock = stock - 1 WHERE id = $1', [
      book_id,
    ]);

    const borrowedBook = createBorrow(user_id, book_id, client);

    await client.query('COMMIT');

    return borrowedBook;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

const getBorrowDetails = async (id, user_id, book_id) => {
  const query = `
    SELECT * 
    FROM borrowed_books 
    WHERE id = $1 AND user_id = $2 AND book_id = $3
  `;
  const result = await pool.query(query, [id, user_id, book_id]);
  return result.rows[0];
};

const returnBorrow = async (id, user_id, book_id, returnedDate) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const borrowedBook = await getBorrowDetails(id, user_id, book_id);
    if (!borrowedBook) {
      const error = new Error('Borrowed book not found or invalid data');
      error.statusCode = 404;
      throw error;
    }

    if (borrowedBook.return_date) {
      throw new Error('Book has already been returned');
    }

    await client.query('UPDATE books SET stock = stock + 1 WHERE id = $1', [
      book_id,
    ]);

    await client.query(
      'UPDATE borrowed_books SET return_date = $2 WHERE id = $1',
      [id, returnedDate]
    );

    await client.query('COMMIT');
    return {
      ...borrowedBook,
      return_date: returnedDate,
    };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

module.exports = {
  getBorrowDetails,
  returnBorrow,
};

const updateBorrow = async (id, user_id, book_id) => {
  const result = await pool.query(
    'UPDATE borrowed_books SET user_id = $2 book_id = $3 WHERE id = $1 RETURNING *',
    [id, user_id, book_id]
  );

  return result.rows[0];
};

const deleteBorrow = async (id) => {
  const result = await pool.query(
    'DELETE FROM borrowed_books WHERE id = $1 RETURNING *',
    [id]
  );

  return result.rows[0];
};

module.exports = {
  getAllBorrow,
  getBorrowById,
  getBookBorrowHistory,
  getUserBorrowHistory,
  borrowBook,
  returnBorrow,
  createBorrow,
  returnBorrow,
  updateBorrow,
  deleteBorrow,
};
