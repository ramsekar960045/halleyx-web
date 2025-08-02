// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Customer Pages
import Register from './pages/customer/Register';
import Login from './pages/customer/Login';
import Dashboard from './pages/customer/Dashboard';
import Cart from './pages/customer/Cart';
import Orders from './pages/customer/Orders';
import ProductList from './pages/customer/ProductList';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductManagement from './pages/admin/ProductManagement';
import CustomerManagement from './pages/admin/CustomerManagement';
import AdminOrders from './pages/admin/AdminOrders';

// Route Protection
import PrivateRouteAdmin from './routes/PrivateRouteAdmin';

// Shared/Other
import NotFound from './pages/NotFound'; // Create a 404 component

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>

            {/* Customer Routes */}
            <Route path="/" element={<ProductList />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <PrivateRouteAdmin>
                  <AdminDashboard />
                </PrivateRouteAdmin>
              }
            />
            <Route
              path="/admin/products"
              element={
                <PrivateRouteAdmin>
                  <ProductManagement />
                </PrivateRouteAdmin>
              }
            />
            <Route
              path="/admin/customers"
              element={
                <PrivateRouteAdmin>
                  <CustomerManagement />
                </PrivateRouteAdmin>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <PrivateRouteAdmin>
                  <AdminOrders />
                </PrivateRouteAdmin>
              }
            />

            {/* Catch-all route for 404 */}
            <Route path="*" element={<NotFound />} />

          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
