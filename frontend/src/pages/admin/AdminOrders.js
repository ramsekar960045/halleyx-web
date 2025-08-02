import React, { useEffect, useState } from 'react';
import API from '../../services/api';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await API.get('/admin/orders');
      setOrders(res.data);
    } catch (err) {
      console.error('Error fetching orders', err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Manage Orders</h1>
      {orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <ul className="space-y-6">
          {orders.map(order => (
            <li key={order._id} className="border p-4 rounded shadow">
              <p className="font-semibold mb-1">Customer: {order.customer?.firstName} {order.customer?.lastName}</p>
              <p className="text-sm text-gray-600 mb-2">Email: {order.customer?.email}</p>
              <div className="mb-2">
                <p className="font-medium">Products:</p>
                <ul className="ml-4 list-disc">
                  {order.items.map(item => (
                    <li key={item.product._id}>
                      {item.product.name} x {item.quantity} (${item.product.price} each)
                    </li>
                  ))}
                </ul>
              </div>
              <p className="font-bold">Total: ${order.total.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminOrders;