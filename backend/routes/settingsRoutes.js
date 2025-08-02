const express = require('express');
const { getSettings, updateSettings } = require('../controllers/settingsController');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/')
  .get(getSettings) // Settings can be public
  .put(protect, adminOnly, updateSettings); // Only admins can update settings

module.exports = router;