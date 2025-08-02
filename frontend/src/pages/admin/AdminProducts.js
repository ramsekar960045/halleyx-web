import React, { useEffect, useState } from 'react';
import API from '../../services/api';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', description: '' });
  const [editId, setEditId] = useState(null);

  const fetchProducts = async () => {
    const res = await API.get('/products');
    setProducts(res.data);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (editId) {
        await API.put(`/admin/products/${editId}`, form);
      } else {
        await API.post('/admin/products', form);
      }
      setForm({ name: '', price: '', description: '' });
      setEditId(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = product => {
    setEditId(product._id);
    setForm({ name: product.name, price: product.price, description: product.description });
  };

  const handleDelete = async id => {
    if (window.confirm('Delete this product?')) {
      await API.delete(`/admin/products/${id}`);
      fetchProducts();
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>

      <form onSubmit={handleSubmit} className="space-y-3 mb-6">
        {['name', 'price', 'description'].map(field => (
          <input
            key={field}
            type={field === 'price' ? 'number' : 'text'}
            name={field}
            value={form[field]}
            placeholder={field[0].toUpperCase() + field.slice(1)}
            onChange={e => setForm({ ...form, [e.target.name]: e.target.value })}
            required
            className="block w-full p-2 border rounded"
          />
        ))}
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {editId ? 'Update' : 'Add'} Product
        </button>
      </form>

      <ul className="space-y-2">
        {products.map(p => (
          <li key={p._id} className="border p-3 rounded flex justify-between items-center">
            <div>
              <p className="font-semibold">{p.name}</p>
              <p className="text-sm text-gray-600">${p.price}</p>
              <p className="text-sm">{p.description}</p>
            </div>
            <div className="space-x-2">
              <button onClick={() => handleEdit(p)} className="text-blue-600 hover:underline">Edit</button>
              <button onClick={() => handleDelete(p._id)} className="text-red-600 hover:underline">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminProducts;