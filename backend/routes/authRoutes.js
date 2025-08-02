const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register); // customer register
router.post('/login', login);       // admin + customer login

module.exports = router;