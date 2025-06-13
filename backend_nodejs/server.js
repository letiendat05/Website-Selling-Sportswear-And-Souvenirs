const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});