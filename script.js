// ✅ Full Admin Integration With Edit Support
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const defaultCart = [...cart];

// Get products from admin dashboard if available
const adminProducts = JSON.parse(localStorage.getItem("adminProducts")) || null;

const allProducts = adminProducts ? adminProducts.reduce((acc, p) => {
  if (!acc[p.category]) acc[p.category] = [];
  acc[p.category].push(p);
  return acc;
}, {}) : {
  Freezer: [
    { name: "Frozen Pizza", price: 6, image: "https://images.pexels.com/photos/4109133/pexels-photo-4109133.jpeg", desc: "Cheesy frozen pizza" },
    { name: "Frozen Fries", price: 3.5, image: "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg", desc: "Crispy French fries" },
  ],
  Juice: [
    { name: "Apple Juice", price: 3, image: "https://images.pexels.com/photos/9684/food-drink-glass-apple.jpg", desc: "100% Fresh Apple Juice" },
    { name: "Orange Juice", price: 4, image: "https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg", desc: "Freshly squeezed orange juice" },
  ],
  Food: [
    { name: "Rice 5kg", price: 10, image: "https://images.pexels.com/photos/4110256/pexels-photo-4110256.jpeg", desc: "Premium basmati rice" },
    { name: "Pasta", price: 2.5, image: "https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg", desc: "Durum wheat pasta" },
  ],
  Chicken: [
    { name: "Chicken Breast", price: 5, image: "https://images.pexels.com/photos/6605215/pexels-photo-6605215.jpeg", desc: "Fresh boneless chicken" },
    { name: "Chicken Legs", price: 4.5, image: "https://images.pexels.com/photos/4686823/pexels-photo-4686823.jpeg", desc: "Juicy halal chicken legs" },
  ],
  Lamb: [
    { name: "Lamb Chops", price: 12, image: "https://images.pexels.com/photos/6164047/pexels-photo-6164047.jpeg", desc: "Tender lamb chops" },
    { name: "Lamb Mince", price: 10, image: "https://images.pexels.com/photos/4393024/pexels-photo-4393024.jpeg", desc: "Fresh ground lamb" },
  ],
  Beef: [
    { name: "Ground Beef", price: 9, image: "https://images.pexels.com/photos/4347941/pexels-photo-4347941.jpeg", desc: "Lean ground beef" },
    { name: "Beef Steak", price: 11, image: "https://images.pexels.com/photos/1615197/pexels-photo-1615197.jpeg", desc: "Halal beef steak" },
  ]
};

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
    subtotal += item.quantity * item.unitPrice;
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
      if (action === "increase") cart[index].quantity += 1;
      else if (action === "decrease") {
        cart[index].quantity -= 1;
        if (cart[index].quantity <= 0) cart.splice(index, 1);
      }
      saveCart(); updateCartCount(); renderCartItems();
    });
  });

  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      cart.splice(parseInt(btn.dataset.index), 1);
      saveCart(); updateCartCount(); renderCartItems();
    });
  });
}

function showNotification(msg) {
  const notif = document.getElementById("notification");
  notif.textContent = msg;
  notif.classList.remove("opacity-0");
  setTimeout(() => notif.classList.add("opacity-0"), 1000);
}

document.addEventListener("click", e => {
  if (e.target.classList.contains("add-to-cart")) {
    const name = e.target.dataset.name;
    const price = parseFloat(e.target.dataset.price);
    const existing = cart.find(item => item.name === name);
    if (existing) existing.quantity += 1;
    else cart.push({ name, unitPrice: price, quantity: 1 });
    saveCart(); updateCartCount(); showNotification("Added to cart!");
  }
});

document.getElementById("view-cart")?.addEventListener("click", () => {
  renderCartItems();
  document.getElementById("cart-modal").classList.remove("hidden");
});
document.querySelector(".close")?.addEventListener("click", () => {
  document.getElementById("cart-modal").classList.add("hidden");
});
window.onclick = e => {
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

document.getElementById("refill-cart")?.addEventListener("click", () => {
  cart = [...defaultCart];
  saveCart(); updateCartCount(); showNotification("Cart refilled");
});

document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.category;
    const container = document.querySelector(".product-list");
    container.innerHTML = "";
    if (allProducts[category]) {
      allProducts[category].forEach(product => {
        const div = document.createElement("div");
        div.className = "bg-white p-4 rounded shadow flex flex-col";
        div.innerHTML = `
          <img src="${product.image}" alt="${product.name}" class="w-full h-40 object-cover rounded mb-2" />
          <h3 class="text-lg font-bold text-primary">${product.name}</h3>
          <p class="text-gray-600 text-sm">${product.desc}</p>
          <p class="text-gray-700 mt-1 font-semibold">$${product.price}</p>
          <button class="add-to-cart mt-3 bg-primary text-white px-3 py-1 rounded" data-name="${product.name}" data-price="${product.price}">Add to Cart</button>
        `;
        container.appendChild(div);
      });
    }
  });
});

window.addEventListener("DOMContentLoaded", () => {
  document.querySelector('[data-category="Juice"]')?.click();
  updateCartCount();
});
