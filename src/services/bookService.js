const { bookModel } = require('../models');

const getAllBook = async (search) => {
  const books = await bookModel.getAllBook(search);

  return books;
};

const getBookById = async (id) => {
  const book = await bookModel.getBookById(id);

  if (!book) {
    const error = new Error('Book not found');
    error.statusCode = 404;
    throw error;
  }

  return book;
};

const createBook = async (title, author, genre, published_year, stock) => {
  const newBook = await bookModel.createBook(
    title,
    author,
    genre,
    published_year,
    stock
  );

  return newBook;
};

const updateBook = async (id, title, author, genre, published_year, stock) => {
  const existingBook = await getBookById(id);

  const updatedBook = await bookModel.updateBook(
    id,
    title || existingBook.title,
    author || existingBook.author,
    genre || existingBook.genre,
    published_year || existingBook.published_year,
    stock || existingBook.stock
  );

  return updatedBook;
};

const updateBookStock = async (id, stock) => {
  const existingBook = await getBookById(id);

  const updatedBook = await bookModel.updateBookStock(
    id,
    stock || existingBook.stock
  );

  return updatedBook;
};

const deleteBook = async (id) => {
  await getBookById(id);

  const deletedBook = await bookModel.deleteBook(id);

  return deletedBook;
};

module.exports = {
  getAllBook,
  getBookById,
  createBook,
  updateBook,
  updateBookStock,
  deleteBook,
};
