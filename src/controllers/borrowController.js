const { borrowService } = require('../services');

const getAllBorrow = async (req, res) => {
  try {
    const borrows = await borrowService.getAllBorrow(req.query);

    res.status(200).json({
      status: 'success',
      message: 'get all borrows',
      data: borrows,
    });
  } catch (error) {
    const statusCode = error.statusCode || 400;

    res.status(statusCode).json({
      status: 'failed',
      message: 'get all borrows',
      error: error.message,
    });
  }
};

const getBorrowById = async (req, res) => {
  const { id } = req.params;

  try {
    const borrow = await borrowService.getBorrowById(id);

    res.status(200).json({
      status: 'success',
      message: 'get borrow by id',
      data: borrow,
    });
  } catch (error) {
    const statusCode = error.statusCode || 400;

    res.status(statusCode).json({
      status: 'failed',
      message: 'get all borrows',
      error: error.message,
    });
  }
};

const getBookBorrowHistory = async (req, res) => {
  const { book_id } = req.params;

  try {
    const borrow = await borrowService.getBookBorrowHistory(book_id);

    res.status(200).json({
      status: 'success',
      message: 'get book borrowed history',
      data: borrow,
    });
  } catch (error) {
    const statusCode = error.statusCode || 400;

    res.status(statusCode).json({
      status: 'failed',
      message: 'get book borrowed history',
      error: error.message,
    });
  }
};

const getUserBorrowHistory = async (req, res) => {
  const { user_id } = req.params;

  try {
    const borrow = await borrowService.getUserBorrowHistory(user_id);

    res.status(200).json({
      status: 'success',
      message: 'get user borrowed history',
      data: borrow,
    });
  } catch (error) {
    const statusCode = error.statusCode || 400;

    res.status(statusCode).json({
      status: 'failed',
      message: 'get user borrowed history',
      error: error.message,
    });
  }
};

const borrowBook = async (req, res) => {
  const { user_id, book_id } = req.params;

  try {
    const borrow = await borrowService.createBorrow(user_id, book_id);
    res.status(201).json({
      status: 'success',
      message: 'Borrow book',
      data: borrow,
    });
  } catch (error) {
    const statusCode = error.statusCode || 400;

    res.status(statusCode).json({
      status: 'failed',
      message: 'Borrow book',
      error: error.message,
    });
  }
};

const returnBook = async (req, res) => {
  const { id, user_id, book_id } = req.params;

  try {
    const borrow = await borrowService.returnBorrow(id, user_id, book_id);
    res.status(201).json({
      status: 'success',
      message: 'Return book',
      data: borrow,
    });
  } catch (error) {
    const statusCode = error.statusCode || 400;

    res.status(statusCode).json({
      status: 'failed',
      message: 'Return book',
      error: error.message,
    });
  }
};

const updateBorrow = async (req, res) => {
  const { id, user_id, book_id } = req.params;

  try {
    const borrow = await borrowService.updateBorrow(id, user_id, book_id);
    res.status(200).json({
      status: 'success',
      message: 'update borrow',
      data: borrow,
    });
  } catch (error) {
    const statusCode = error.statusCode || 400;

    res.status(statusCode).json({
      status: 'failed',
      message: 'update borrow',
      error: error.message,
    });
  }
};

const deleteBorrow = async (req, res) => {
  const { id } = req.params;

  try {
    const borrow = await borrowService.deleteBorrow(id);
    res.status(200).json({
      status: 'success',
      message: 'delete borrow',
      data: borrow,
    });
  } catch (error) {
    const statusCode = error.statusCode || 400;

    res.status(statusCode).json({
      status: 'failed',
      message: 'delete borrow',
      error: error.message,
    });
  }
};

module.exports = {
  getAllBorrow,
  getBorrowById,
  getBookBorrowHistory,
  getUserBorrowHistory,
  borrowBook,
  returnBook,
  updateBorrow,
  deleteBorrow,
};
