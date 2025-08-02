const Admin = require('../models/Admin');
const bcrypt = require('bcrypt'); // Standardize on 'bcrypt' for consistency
const generateToken = require('../utils/generateToken'); // Use the shared utility

// @desc    Admin Login
// @route   POST /api/admin/login
// @access  Public
const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(admin);

    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token,
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get admin dashboard data (example)
// @route   GET /api/admin/dashboard
// @access  Private/Admin
const getAdminDashboardData = (req, res) => {
  res.json({ message: `Welcome to the admin dashboard, ${req.user.name}!` });
};

module.exports = {
  adminLogin,
  getAdminDashboardData,
};