import { DB } from './modules/database.js';
import { cartService } from './modules/cart-service.js';

// Initialize Cart Badge
cartService._updateCartBadge();

// Render Products Function
function renderProducts(products, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = products.map(product => `
    <div class="product-card bg-white rounded shadow p-3">
      <img src="${product.img}" alt="${product.name}" class="w-full h-40 object-cover mb-2">
      <h3 class="font-semibold">${product.name}</h3>
      <p class="text-red-600 font-bold">$${product.price.toFixed(2)}</p>
      <button class="add-to-cart-btn mt-2 px-3 py-1 bg-red-600 text-white rounded" 
              data-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `).join('');

  // Add event listeners to all add-to-cart buttons
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const productId = e.target.dataset.id;
      const product = DB.findProductById(productId);
      if (product) {
        cartService.addItem(product);
        alert(`${product.name} added to cart!`);
      }
    });
  });
}

// Initialize Product Sections
if (document.getElementById('featured-products')) {
  const allProducts = Object.values(DB.getAllProducts()).flatMap(category => 
    Array.isArray(category) ? category : Object.values(category).flat()
  );
  renderProducts(allProducts.slice(0, 4), 'featured-products');
}

// Initialize Category Pages
if (document.getElementById('grocery-products')) {
  renderProducts(DB.getAllProducts().GROCERY.DRINKS, 'grocery-products');
}

// Search Functionality
document.getElementById('search-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = document.getElementById('search-input').value.toLowerCase();
  const results = Object.values(DB.getAllProducts())
    .flatMap(category => 
      Array.isArray(category) 
        ? category.filter(p => p.name.toLowerCase().includes(query))
        : Object.values(category).flat().filter(p => p.name.toLowerCase().includes(query))
    );
  renderProducts(results, 'search-results');
});

// Mobile Menu Toggle
document.getElementById('mobile-menu-toggle')?.addEventListener('click', () => {
  document.getElementById('mobile-menu').classList.toggle('hidden');
});
