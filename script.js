let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  alert("تمت الإضافة للسلة");
}

function renderCart() {
  const cartItemsDiv = document.getElementById('cartItems');
  const totalPriceEl = document.getElementById('totalPrice');
  if (!cartItemsDiv || !totalPriceEl) return;

  cartItemsDiv.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const div = document.createElement('div');
    div.classList.add('flex', 'justify-between', 'mb-2');
    div.innerHTML = `<span>${item.name} × ${item.qty}</span><span>${item.price * item.qty} CAD</span>`;
    cartItemsDiv.appendChild(div);
    total += item.price * item.qty;
  });

  totalPriceEl.textContent = total.toFixed(2);
}

document.addEventListener('DOMContentLoaded', renderCart);
