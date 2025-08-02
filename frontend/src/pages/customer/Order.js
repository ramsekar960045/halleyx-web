import React, { useEffect, useState } from 'react';
import API from '../../services/api';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get('/orders');
        setOrders(res.data);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      {orders.length === 0 ? (
        <p>You haven’t placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order._id} className="border p-4 rounded shadow">
              <div className="mb-2">
                <strong>Order ID:</strong> {order._id}
              </div>
              <div className="mb-2">
                <strong>Status:</strong> {order.status}
              </div>
              <div className="mb-2">
                <strong>Placed on:</strong> {new Date(order.createdAt).toLocaleDateString()}
              </div>
              <div className="mb-2">
                <strong>Total:</strong> ${order.totalAmount.toFixed(2)}
              </div>
              <div>
                <strong>Items:</strong>
                <ul className="list-disc list-inside">
                  {order.items.map(item => (
                    <li key={item._id}>
                      {item.product?.name} x {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;