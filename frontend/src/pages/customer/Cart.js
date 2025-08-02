import React from 'react';
import { useCart } from '../../context/CartContext';
import API from '../../services/api';

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    try {
      const orderData = {
        items: cart.map(item => ({
          product: item._id,
          quantity: item.quantity,
        })),
        total,
      };

      await API.post('/orders', orderData);
      alert('Order placed successfully!');
      clearCart();
    } catch (err) {
      console.error('Checkout failed:', err);
      alert('Failed to place order.');
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map(item => (
              <li key={item._id} className="flex justify-between items-center mb-2">
                <div>
                  <p>{item.name} x {item.quantity}</p>
                  <p className="text-sm text-gray-500">${item.price} each</p>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-600 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            <p className="text-lg font-bold">Total: ${total.toFixed(2)}</p>
            <button
              onClick={handleCheckout}
              className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;