import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      login(res.data);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded w-full max-w-md shadow">
        <h2 className="text-2xl font-bold mb-4 text-center">Customer Login</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input name="email" type="email" placeholder="Email" value={form.email}
          onChange={handleChange} required className="mb-3 p-2 border border-gray-300 w-full rounded" />
        <input name="password" type="password" placeholder="Password" value={form.password}
          onChange={handleChange} required className="mb-3 p-2 border border-gray-300 w-full rounded" />
        <button className="bg-green-600 text-white w-full p-2 rounded hover:bg-green-700">Login</button>
        <p className="text-sm mt-3 text-center">
          Don't have an account? <Link to="/register" className="text-green-600">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;