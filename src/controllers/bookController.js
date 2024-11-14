const { bookService } = require('../services');

const getAllBook = async (req, res) => {
  try {
    const books = await bookService.getAllBook(req.query);
    res.status(200).json({
      status: 'success',
      message: 'get all books',
      data: books,
    });
  } catch (error) {
    const statusCode = error.statusCode || 400;

    res.status(statusCode).json({
      status: 'failed',
      message: 'get all books',
      error: error.message,
    });
  }
};

const getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await bookService.getBookById(id);

    res.status(200).json({
      status: 'success',
      message: 'get book by id',
      data: book,
    });
  } catch (error) {
    const statusCode = error.statusCode || 400;

    res.status(statusCode).json({
      status: 'failed',
      message: 'get all books',
      error: error.message,
    });
  }
};

const createBook = async (req, res) => {
  const { title, author, genre, published_year, stock } = req.body;
  try {
    const book = await bookService.createBook(
      title,
      author,
      genre,
      published_year,
      stock
    );
    res.status(201).json({
      status: 'success',
      message: 'create book',
      data: book,
    });
  } catch (error) {
    const statusCode = error.statusCode || 400;

    res.status(statusCode).json({
      status: 'failed',
      message: 'create book',
      error: error.message,
    });
  }
};

const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, genre, published_year, stock } = req.body;

  try {
    const book = await bookService.updateBook(
      id,
      title,
      author,
      genre,
      published_year,
      stock
    );
    res.status(200).json({
      status: 'success',
      message: 'update book',
      data: book,
    });
  } catch (error) {
    const statusCode = error.statusCode || 400;

    res.status(statusCode).json({
      status: 'failed',
      message: 'update book',
      error: error.message,
    });
  }
};

const updateBookStock = async (req, res) => {
  const { id } = req.params;
  const { stock } = req.body;

  try {
    const book = await bookService.updateBookStock(id, stock);
    res.status(200).json({
      status: 'success',
      message: 'update book stock',
      data: book,
    });
  } catch (error) {
    const statusCode = error.statusCode || 400;

    res.status(statusCode).json({
      status: 'failed',
      message: 'update book stock',
      error: error.message,
    });
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await bookService.deleteBook(id);
    res.status(200).json({
      status: 'success',
      message: 'delete book',
      data: book,
    });
  } catch (error) {
    const statusCode = error.statusCode || 400;

    res.status(statusCode).json({
      status: 'failed',
      message: 'delete book',
      error: error.message,
    });
  }
};

module.exports = {
  getAllBook,
  getBookById,
  createBook,
  updateBook,
  updateBookStock,
  deleteBook,
};
