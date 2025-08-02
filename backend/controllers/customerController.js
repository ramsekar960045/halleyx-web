const Customer = require('../models/Customer');
const generateToken = require('../utils/generateToken');

// @desc    Register a new customer
// @route   POST /api/customers
// @access  Public
const registerCustomer = async (req, res) => {
  const { name, email, password } = req.body;

  const customerExists = await Customer.findOne({ email });

  if (customerExists) {
    res.status(400).json({ message: 'Customer already exists' });
    return;
  }

  const customer = await Customer.create({
    name,
    email,
    password,
  });

  if (customer) {
    res.status(201).json({
      _id: customer._id,
      name: customer.name,
      email: customer.email,
      token: generateToken(customer),
    });
  } else {
    res.status(400).json({ message: 'Invalid customer data' });
  }
};

// @desc    Auth customer & get token
// @route   POST /api/customers/login
// @access  Public
const authCustomer = async (req, res) => {
  const { email, password } = req.body;

  const customer = await Customer.findOne({ email });

  if (customer && (await customer.matchPassword(password))) {
    res.json({
      _id: customer._id,
      name: customer.name,
      email: customer.email,
      token: generateToken(customer),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

// @desc    Get customer profile
// @route   GET /api/customers/profile
// @access  Private
const getCustomerProfile = async (req, res) => {
  // req.user is set by the 'protect' middleware
  const customer = await Customer.findById(req.user._id);

  if (customer) {
    res.json({
      _id: customer._id,
      name: customer.name,
      email: customer.email,
    });
  } else {
    res.status(404).json({ message: 'Customer not found' });
  }
};

module.exports = {
  registerCustomer,
  authCustomer,
  getCustomerProfile,
};