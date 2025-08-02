const express = require('express');
const { getSettings, updateSettings } = require('../controllers/settingsController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', protect, getSettings);
router.put('/', protect, adminOnly, updateSettings);

module.exports = router;