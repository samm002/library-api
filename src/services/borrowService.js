const { bookModel, borrowModel, userModel } = require('../models');

const getAllBorrow = async (search) => {
  const borrows = await borrowModel.getAllBorrow(search);

  return borrows;
};

const getBorrowById = async (id) => {
  const borrow = await borrowModel.getBorrowById(id);

  if (!borrow) {
    const error = new Error('Borrowed book not found');
    error.statusCode = 404;
    throw error;
  }

  return borrow;
};

const getBookBorrowHistory = async (book_id) => {
  const bookBorrowHistory = await borrowModel.getBookBorrowHistory(book_id);

  if (!bookBorrowHistory) {
    const error = new Error('Book borrowed history not found');
    error.statusCode = 404;
    throw error;
  }

  return bookBorrowHistory;
};

const getUserBorrowHistory = async (user_id) => {
  const userBorrowHistory = await borrowModel.getUserBorrowHistory(user_id);

  if (!userBorrowHistory) {
    const error = new Error('User borrowed history not found');
    error.statusCode = 404;
    throw error;
  }

  return userBorrowHistory;
};

const createBorrow = async (user_id, book_id) => {
  const borrowedBook = await borrowModel.borrowBook(user_id, book_id);

  return borrowedBook;
};

const returnBorrow = async (id, user_id, book_id) => {
  const returnedDate = new Date();

  // Adjusting timezone (Convert to UTC)
  returnedDate.setHours(returnedDate.getHours() - 7);

  const returnedBook = await borrowModel.returnBorrow(
    id,
    user_id,
    book_id,
    returnedDate
  );

  return returnedBook;
};

const updateBorrow = async (id, user_id, book_id) => {
  const existingBorrow = await getBorrowById(id);

  const updatedBorrow = await borrowModel.updateBorrow(
    id,
    user_id || existingBorrow.user_id,
    book_id || existingBorrow.role_id
  );

  return updatedBorrow;
};

const deleteBorrow = async (id) => {
  await getBorrowById(id);

  const deletedBorrow = await borrowModel.deleteBorrow(id);

  return deletedBorrow;
};

module.exports = {
  getAllBorrow,
  getBookBorrowHistory,
  getUserBorrowHistory,
  getBorrowById,
  createBorrow,
  returnBorrow,
  updateBorrow,
  deleteBorrow,
};
