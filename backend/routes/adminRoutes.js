const express = require('express');
const router = express.Router();
const { adminLogin, getAdminDashboardData } = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');

// @route   POST /api/admin/login
router.post('/login', adminLogin);

// @route   GET /api/admin/dashboard
router.get('/dashboard', protect, getAdminDashboardData);

module.exports = router;