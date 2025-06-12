const token = localStorage.getItem('token');
if (!token) location.href = 'login.html';

const API = 'http://localhost:3000/api';
const headers = { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token };

function logout() {
  localStorage.removeItem('token');
  location.href = 'login.html';
}

function showSection(id) {
  document.querySelectorAll('main > section').forEach(sec => sec.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

document.getElementById('product-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('product-id').value;
  const body = {
    name: document.getElementById('product-name').value,
    price: document.getElementById('product-price').value,
    image: document.getElementById('product-image').value,
    category: document.getElementById('product-category').value
  };
  const method = id ? 'PUT' : 'POST';
  const url = id ? \`\${API}/products/\${id}\` : \`\${API}/products\`;
  const res = await fetch(url, { method, headers, body: JSON.stringify(body) });
  await res.json();
  loadProducts();
  e.target.reset();
});

async function loadProducts() {
  const res = await fetch(\`\${API}/products\`, { headers });
  const products = await res.json();
  const list = document.getElementById('product-list');
  list.innerHTML = '';
  products.forEach(p => {
    const li = document.createElement('li');
    li.innerHTML = \`\${p.name} - \${p.price}₫ 
      <button onclick="editProduct('\${p._id}')">Sửa</button> 
      <button onclick="deleteProduct('\${p._id}')">Xóa</button>\`;
    list.appendChild(li);
  });
}
async function editProduct(id) {
  const res = await fetch(\`\${API}/products\`, { headers });
  const product = (await res.json()).find(p => p._id === id);
  document.getElementById('product-id').value = product._id;
  document.getElementById('product-name').value = product.name;
  document.getElementById('product-price').value = product.price;
  document.getElementById('product-image').value = product.image;
  document.getElementById('product-category').value = product.category;
}
async function deleteProduct(id) {
  if (confirm('Xóa sản phẩm này?')) {
    await fetch(\`\${API}/products/\${id}\`, { method: 'DELETE', headers });
    loadProducts();
  }
}

async function loadOrders() {
  const res = await fetch(\`\${API}/orders\`, { headers });
  const orders = await res.json();
  const list = document.getElementById('order-list');
  list.innerHTML = '';
  orders.forEach(order => {
    const items = order.items.map(i => \`\${i.product.name} x \${i.quantity}\`).join(', ');
    const li = document.createElement('li');
    li.textContent = \`[\${new Date(order.createdAt).toLocaleString()}] \${items}\`;
    list.appendChild(li);
  });
}

async function loadRevenueChart() {
  const res = await fetch(\`\${API}/orders\`, { headers });
  const orders = await res.json();
  const data = {};
  orders.forEach(o => {
    const day = new Date(o.createdAt).toLocaleDateString();
    const total = o.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
    data[day] = (data[day] || 0) + total;
  });
  const ctx = document.getElementById('revenueChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(data),
      datasets: [{
        label: 'Doanh thu (₫)',
        data: Object.values(data),
        backgroundColor: '#1976d2'
      }]
    }
  });
}

loadProducts();
loadOrders();
loadRevenueChart();
