const Order = require('../models/Order');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
  const { items, shippingAddress } = req.body;
  let total = 0;

  for (const item of items) {
    const product = await Product.findById(item.product);
    if (!product || product.stockQuantity < item.quantity) {
      return res.status(400).json({ message: 'Invalid product or insufficient stock' });
    }
    total += product.price * item.quantity;
  }

  const order = await Order.create({
    customer: req.user._id,
    items,
    shippingAddress,
    total
  });

  for (const item of items) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: { stockQuantity: -item.quantity }
    });
  }

  res.status(201).json(order);
};

exports.getOrders = async (req, res) => {
  const query = {};
  if (req.user.role === 'customer') {
    query.customer = req.user._id;
  }
  const orders = await Order.find(query).populate('customer items.product');
  res.json(orders);
};

exports.getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('customer items.product');
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  res.json(order);
};

exports.updateOrder = async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(order);
};

exports.deleteOrder = async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ message: 'Order deleted' });
};