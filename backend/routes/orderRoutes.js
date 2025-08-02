const express = require('express');
const { createOrder, getOrders, getOrderById, updateOrder, deleteOrder } = require('../controllers/orderController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/')
  .get(protect, getOrders)
  .post(protect, createOrder);

router.route('/:id')
  .get(protect, getOrderById)
  .put(protect, adminOnly, updateOrder)
  .delete(protect, adminOnly, deleteOrder);

module.exports = router;