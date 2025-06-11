const Order = require('../models/order.model');

exports.create = async (req, res) => {
  const order = new Order({ user: req.user.id, items: req.body.items });
  await order.save();
  res.json(order);
};

exports.getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).populate('items.product');
  res.json(orders);
};

exports.getAllOrders = async (req, res) => {
  const orders = await Order.find().populate('user').populate('items.product');
  res.json(orders);
};
