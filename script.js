<!-- تم إرسال index.html كامل في الرسالة السابقة -->
<!-- الآن نرسل باقي الملفات هنا -->

<!-- ✅ script.js كامل -->
<script>
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const defaultCart = [...cart];

const allProducts = {
  Freezer: [
    { name: "Frozen Pizza", price: 6, image: "https://images.unsplash.com/photo-1604908177080-bc5f1a4b2fbf", desc: "Cheesy frozen pizza" },
    { name: "Frozen Vegetables", price: 4, image: "https://images.unsplash.com/photo-1608032076985-d1b2c8849ed1", desc: "Mixed green veggies" },
  ],
  Juice: [
    { name: "Apple Juice", price: 3, image: "https://images.unsplash.com/photo-1571689936275-7d4347c62a1e", desc: "100% Fresh Apple Juice" },
    { name: "Mango Juice", price: 4, image: "https://images.unsplash.com/photo-1615485926460-c0baf8d45f73", desc: "Sweet Mango Juice" },
  ],
  Food: [
    { name: "Rice 5kg", price: 10, image: "https://images.unsplash.com/photo-1585238342028-95c0de04bdea", desc: "Premium basmati rice" },
    { name: "Olive Oil", price: 8, image: "https://images.unsplash.com/photo-1587740896339-3d5ddbd1b45b", desc: "Extra virgin olive oil" },
  ],
  Chicken: [
    { name: "Chicken Breast", price: 5, image: "https://images.unsplash.com/photo-1605478071350-3d269962f521", desc: "Fresh boneless chicken" },
    { name: "Chicken Wings", price: 6, image: "https://images.unsplash.com/photo-1606851091445-cbf4f1915f9c", desc: "Juicy halal wings" },
  ],
  Lamb: [
    { name: "Lamb Chops", price: 12, image: "https://images.unsplash.com/photo-1608989380845-3b9e8b3307fc", desc: "Tender lamb chops" },
  ],
  Beef: [
    { name: "Ground Beef", price: 9, image: "https://images.unsplash.com/photo-1603052877333-eac8f0175d38", desc: "Lean ground beef" },
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

// Load Juice by default
window.addEventListener("DOMContentLoaded", () => {
  document.querySelector('[data-category="Juice"]')?.click();
  updateCartCount();
});
</script>
