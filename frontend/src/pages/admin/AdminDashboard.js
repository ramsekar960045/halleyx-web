import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <button onClick={logout} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
        Logout
      </button>
      <div className="mt-6 space-y-2">
        <button onClick={() => navigate('/admin/products')} className="block w-full bg-gray-200 p-2 rounded hover:bg-gray-300">Manage Products</button>
        <button onClick={() => navigate('/admin/customers')} className="block w-full bg-gray-200 p-2 rounded hover:bg-gray-300">Manage Customers</button>
        <button onClick={() => navigate('/admin/orders')} className="block w-full bg-gray-200 p-2 rounded hover:bg-gray-300">Manage Orders</button>
      </div>
    </div>
  );
};

export default AdminDashboard;