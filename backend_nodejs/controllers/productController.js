const products = require('../data/sampleProducts.json');

exports.getAllProducts = (req, res) => {
  res.json(products);
};