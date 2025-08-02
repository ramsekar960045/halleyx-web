const express = require('express');
const { createProduct, getProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/productController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/')
  .get(protect, getProducts)
  .post(protect, adminOnly, createProduct);

router.route('/:id')
  .get(protect, getProductById)
  .put(protect, adminOnly, updateProduct)
  .delete(protect, adminOnly, deleteProduct);

module.exports = router;