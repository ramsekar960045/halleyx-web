import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Welcome, {user?.firstName}!</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Link to="/products" className="bg-blue-600 text-white p-4 rounded text-center hover:bg-blue-700">🛍️ Browse Products</Link>
          <Link to="/orders" className="bg-green-600 text-white p-4 rounded text-center hover:bg-green-700">📦 My Orders</Link>
          <Link to="/profile" className="bg-purple-600 text-white p-4 rounded text-center hover:bg-purple-700">🙍 My Profile</Link>
        </div>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;