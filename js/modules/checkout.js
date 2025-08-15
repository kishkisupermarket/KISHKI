import { cartService } from './cart-service.js';

class CheckoutManager {
  constructor() {
    this.initPaymentTabs();
    this.renderCart();
    this.setupEventListeners();
  }

  renderCart() {
    const cartItemsEl = document.getElementById('cartItems');
    const emptyCartEl = document.getElementById('emptyCart');
    const subtotalEl = document.getElementById('subtotal');
    const taxEl = document.getElementById('tax');
    const totalEl = document.getElementById('total');

    const cart = cartService.getCart();
    
    if (cart.length === 0) {
      emptyCartEl.classList.remove('hidden');
      cartItemsEl.innerHTML = '';
      return;
    }

    emptyCartEl.classList.add('hidden');
    cartItemsEl.innerHTML = cart.map(item => this._createCartItemHTML(item)).join('');

    const subtotal = cartService.getTotal();
    const tax = subtotal * 0.15;
    const total = subtotal + tax;

    subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    taxEl.textContent = `$${tax.toFixed(2)}`;
    totalEl.textContent = `$${total.toFixed(2)}`;
  }

  _createCartItemHTML(item) {
    return `
      <div class="cart-item flex items-center gap-4 p-4 border-b">
        <img src="${item.img}" alt="${item.name}" class="w-16 h-16 object-cover rounded">
        <div class="flex-1">
          <h4 class="font-semibold">${item.name}</h4>
          <p class="text-gray-600">$${item.price.toFixed(2)}</p>
        </div>
        <div class="flex items-center gap-2">
          <button class="decrease-btn px-2 py-1 border" data-id="${item.id}">-</button>
          <span>${item.quantity}</span>
          <button class="increase-btn px-2 py-1 border" data-id="${item.id}">+</button>
        </div>
        <button class="remove-btn text-red-600" data-id="${item.id}">×</button>
      </div>
    `;
  }

  initPaymentTabs() {
    document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
      radio.addEventListener('change', (e) => {
        document.querySelectorAll('.payment-tab').forEach(tab => {
          tab.classList.add('hidden');
        });
        document.getElementById(`${e.target.value}-tab`).classList.remove('hidden');
      });
    });
  }

  setupEventListeners() {
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('decrease-btn')) {
        this._updateQuantity(e.target.dataset.id, -1);
      }
      if (e.target.classList.contains('increase-btn')) {
        this._updateQuantity(e.target.dataset.id, 1);
      }
      if (e.target.classList.contains('remove-btn')) {
        cartService.removeItem(e.target.dataset.id);
        this.renderCart();
      }
    });

    document.getElementById('confirmOrder').addEventListener('click', () => {
      this._processOrder();
    });
  }

  _updateQuantity(productId, change) {
    const cart = cartService.getCart();
    const item = cart.find(item => item.id === productId);
    
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity < 1) {
        cartService.removeItem(productId);
      } else {
        cartService.updateQuantity(productId, newQuantity);
      }
      this.renderCart();
    }
  }

  _processOrder() {
    if (cartService.getCart().length === 0) {
      alert('Your cart is empty');
      return;
    }
    
    // Here you would normally process payment
    document.getElementById('orderSuccess').classList.remove('hidden');
    setTimeout(() => {
      cartService.clearCart();
      window.location.href = 'index.html';
    }, 2000);
  }
}

// Initialize on checkout page only
if (document.getElementById('cartItems')) {
  new CheckoutManager();
}
