let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  let count = 0;
  cart.forEach(item => count += item.quantity);
  document.getElementById("cart-count").textContent = count;
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCartItems() {
  const list = document.getElementById("cart-items");
  list.innerHTML = "";

  let subtotal = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="flex justify-between items-center">
        <div>${item.name} - $${item.unitPrice.toFixed(2)}</div>
        <div class="flex items-center gap-2">
          <button class="qty-btn px-2" data-index="${index}" data-action="decrease">-</button>
          <span>${item.quantity}</span>
          <button class="qty-btn px-2" data-index="${index}" data-action="increase">+</button>
          <button class="delete-btn text-red-500" data-index="${index}">🗑️</button>
        </div>
      </div>
    `;
    list.appendChild(li);
    subtotal += item.quantity * item.unitPrice;
  });

  const tax = subtotal * 0.13;
  const total = subtotal + tax;

  document.getElementById("cart-subtotal").textContent = "Subtotal: $" + subtotal.toFixed(2);
  document.getElementById("cart-tax").textContent = "Tax (13%): $" + tax.toFixed(2);
  document.getElementById("cart-total").textContent = "Total: $" + total.toFixed(2);

  document.querySelectorAll(".qty-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = parseInt(btn.dataset.index);
      const action = btn.dataset.action;
      if (action === "increase") {
        cart[index].quantity += 1;
      } else if (action === "decrease") {
        cart[index].quantity -= 1;
        if (cart[index].quantity <= 0) {
          cart.splice(index, 1);
        }
      }
      saveCart();
      updateCartCount();
      renderCartItems();
    });
  });

  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const index = parseInt(btn.dataset.index);
      cart.splice(index, 1);
      saveCart();
      updateCartCount();
      renderCartItems();
    });
  });
}

function showNotification(msg) {
  const notif = document.getElementById("notification");
  notif.textContent = msg;
  notif.classList.remove("opacity-0");
  setTimeout(() => notif.classList.add("opacity-0"), 1000);
}

document.addEventListener("click", function(e) {
  if (e.target.classList.contains("add-to-cart")) {
    const btn = e.target;
    const name = btn.dataset.name;
    const price = parseFloat(btn.dataset.price);
    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ name, unitPrice: price, quantity: 1 });
    }
    saveCart();
    updateCartCount();
    showNotification("Added to cart!");
  }
});

document.getElementById("view-cart")?.addEventListener("click", () => {
  renderCartItems();
  document.getElementById("cart-modal").classList.remove("hidden");
});
document.querySelector(".close")?.addEventListener("click", () => {
  document.getElementById("cart-modal").classList.add("hidden");
});
window.onclick = function (e) {
  if (e.target.id === "cart-modal") {
    e.target.classList.add("hidden");
  }
};

document.getElementById("pay-delivery")?.addEventListener("click", () => {
  window.location.href = "checkout.html";
});
document.getElementById("pay-online")?.addEventListener("click", () => {
  window.location.href = "payment.html";
});

const allProducts = {
  Freezer: [
    { name: "Frozen Pizza", price: 6 },
    { name: "Frozen Vegetables", price: 4 }
  ],
  Juice: [
    { name: "Apple Juice", price: 3 },
    { name: "Mango Juice", price: 4 }
  ],
  Food: [
    { name: "Rice 5kg", price: 10 },
    { name: "Olive Oil", price: 8 }
  ],
  Chicken: [
    { name: "Chicken Breast", price: 5 },
    { name: "Chicken Wings", price: 6 }
  ],
  Lamb: [
    { name: "Lamb Chops", price: 12 }
  ],
  Beef: [
    { name: "Ground Beef", price: 9 }
  ]
};

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.category;
    const container = document.querySelector(".product-list");
    container.innerHTML = "";
    if (allProducts[category]) {
      allProducts[category].forEach(product => {
        const div = document.createElement("div");
        div.className = "bg-white p-4 rounded shadow";
        div.innerHTML = `
          <h3 class="text-lg font-bold text-primary">${product.name}</h3>
          <p class="text-gray-700 mt-1">$${product.price}</p>
          <button class="add-to-cart mt-3 bg-primary text-white px-3 py-1 rounded" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
        `;
        container.appendChild(div);
      });
    }
  });
});

updateCartCount();
// عرض منتجات "Juice" تلقائيًا عند فتح الصفحة
document.querySelector('[data-category="Juice"]')?.click();

