const express = require('express');
const router = express.Router();
const { bookController } = require('../controllers');

router.get('/', bookController.getAllBook);
router.get('/:id', bookController.getBookById);
router.post('/', bookController.createBook);
router.put('/:id', bookController.updateBook);
router.put('/:id/stock', bookController.updateBookStock);
router.delete('/:id', bookController.deleteBook);

module.exports = router;
