const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const User = require('../models/User');

dotenv.config();
connectDB();

const seedAdmin = async () => {
  await User.deleteMany({ role: 'admin' });

  const admin = new User({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@halleyx.com',
    password: 'Admin@123',
    role: 'admin'
  });

  await admin.save();
  console.log('Admin seeded successfully');
  process.exit();
};

seedAdmin();