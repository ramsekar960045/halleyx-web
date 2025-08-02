const express = require('express');
const router = express.Router();
const {
  registerCustomer,
  authCustomer,
  getCustomerProfile,
} = require('../controllers/customerController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').post(registerCustomer);
router.post('/login', authCustomer);
router.route('/profile').get(protect, getCustomerProfile);

module.exports = router;