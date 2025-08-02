const Product = require('../models/Product');
const Order = require('../models/Order');

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getProducts = async (req, res) => {
  const { search = '', sort = 'name', page = 1 } = req.query;
  const limit = 20;
  const query = {
    name: { $regex: search, $options: 'i' }
  };
  const products = await Product.find(query)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit);
  const count = await Product.countDocuments(query);
  res.json({ products, count });
};

exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Not found' });
  res.json(product);
};

exports.updateProduct = async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteProduct = async (req, res) => {
  const ordersWithProduct = await Order.find({ 'items.product': req.params.id });
  if (ordersWithProduct.length > 0) {
    return res.status(400).json({ message: 'Cannot delete, product exists in orders' });
  }
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product deleted' });
};