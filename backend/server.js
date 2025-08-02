require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

// --- Route Imports ---
const adminRoutes = require('./routes/adminRoutes');
const customerRoutes = require('./routes/customerRoutes');
// const productRoutes = require('./routes/productRoutes');
// const orderRoutes = require('./routes/orderRoutes');

// Connect to Database
connectDB();

const app = express();
// Use port from environment variables or default to 5000
const port = process.env.PORT || 5000;

// --- Middleware ---
// Use express's built-in json parser. body-parser is no longer necessary for this.
app.use(express.json());
// Enable Cross-Origin Resource Sharing (CORS)
// This allows your frontend (running on a different origin) to make requests to this backend.
app.use(cors());

// --- Routes ---
app.use('/api/admin', adminRoutes);
app.use('/api/customers', customerRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/orders', orderRoutes);

app.listen(port, () => console.log(`Server listening on port ${port}`));