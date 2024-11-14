const express = require('express');
const router = express.Router();
const { borrowController } = require('../controllers');

router.get('', borrowController.getAllBorrow);
router.get('/:id', borrowController.getBorrowById);
router.get('/book/:book_id', borrowController.getBookBorrowHistory);
router.get('/user/:user_id', borrowController.getUserBorrowHistory);
router.post('/book/:book_id/user/:user_id/borrow', borrowController.borrowBook);
router.put(
  '/:id/book/:book_id/user/:user_id/return',
  borrowController.returnBook
);
router.put('/:id/book/:book_id/user/:user_id', borrowController.updateBorrow);
router.delete('/:id', borrowController.deleteBorrow);

module.exports = router;
