let orders = [];

exports.createOrder = (req, res) => {
  const { name, email, address, items } = req.body;

  if (!name || !email || !address || !items || !items.length) {
    return res.status(400).json({ message: 'Thông tin đơn hàng không đầy đủ' });
  }

  const newOrder = {
    id: Date.now(),
    customer: { name, email, address },
    items,
    total: items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    createdAt: new Date()
  };

  orders.push(newOrder);
  res.status(201).json({ message: 'Đơn hàng đã được tạo', order: newOrder });
};

exports.getOrders = (req, res) => {
  res.json(orders);
};