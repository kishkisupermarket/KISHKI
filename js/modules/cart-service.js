const CART_KEY = "supermarket_cart_v2";

class CartService {
  constructor() {
    this._initCart();
  }

  _initCart() {
    if (!localStorage.getItem(CART_KEY)) {
      localStorage.setItem(CART_KEY, JSON.stringify([]));
    }
  }

  getCart() {
    return JSON.parse(localStorage.getItem(CART_KEY));
  }

  addItem(product, quantity = 1) {
    const cart = this.getCart();
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        img: product.img,
        quantity: quantity
      });
    }

    this._saveCart(cart);
  }

  removeItem(productId) {
    const cart = this.getCart().filter(item => item.id !== productId);
    this._saveCart(cart);
  }

  updateQuantity(productId, newQuantity) {
    const cart = this.getCart();
    const item = cart.find(item => item.id === productId);
    if (item) {
      item.quantity = newQuantity;
      this._saveCart(cart);
    }
  }

  clearCart() {
    this._saveCart([]);
  }

  _saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    this._updateCartBadge();
  }

  _updateCartBadge() {
    const count = this.getCart().reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('.cart-badge').forEach(badge => {
      badge.textContent = count > 0 ? count : '';
    });
  }

  getTotal() {
    return this.getCart().reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
}

export const cartService = new CartService();
