import React, { useEffect, useState } from 'react';
import API from '../../services/api';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get('/orders/my-orders').then(res => setOrders(res.data));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {orders.length === 0 ? <p>No orders yet.</p> : (
        <ul className="space-y-4">
          {orders.map(order => (
            <li key={order._id} className="border p-4 rounded">
              <p className="font-semibold mb-2">Order ID: {order._id}</p>
              <ul className="ml-4 list-disc">
                {order.items.map(item => (
                  <li key={item.product._id}>
                    {item.product.name} x {item.quantity} (${item.product.price})
                  </li>
                ))}
              </ul>
              <p className="mt-2 font-bold">Total: ${order.total.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrders;