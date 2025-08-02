import React, { useEffect, useState } from 'react';
import API from '../../services/api';

const AdminCustomers = () => {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    try {
      const res = await API.get('/admin/customers');
      setCustomers(res.data);
    } catch (err) {
      console.error('Error fetching customers', err);
    }
  };

  const handleDelete = async id => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await API.delete(`/admin/customers/${id}`);
        fetchCustomers();
      } catch (err) {
        console.error('Error deleting customer', err);
      }
    }
  };

  const handleImpersonate = async id => {
    try {
      const res = await API.post(`/admin/impersonate/${id}`);
      localStorage.setItem('token', res.data.token);
      window.location.href = '/dashboard'; // Redirect as the customer
    } catch (err) {
      console.error('Error impersonating customer', err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Manage Customers</h1>
      <ul className="space-y-4">
        {customers.map(user => (
          <li
            key={user._id}
            className="border p-4 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{user.firstName} {user.lastName}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleImpersonate(user._id)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Impersonate
              </button>
              <button
                onClick={() => handleDelete(user._id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCustomers;