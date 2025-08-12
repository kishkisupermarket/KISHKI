// مثال بيانات منتجات ثابتة - يمكنك تعديلها أو جلبها من localStorage
const products = [
  { id: 1, name: "Frozen Chicken", price: 10.99, category: "Freezer", barcode: "12345" },
  { id: 2, name: "Fresh Juice", price: 4.99, category: "Juice", barcode: "23456" },
  { id: 3, name: "Lamb Meat", price: 15.99, category: "Lamb", barcode: "34567" },
];

const productsContainer = document.getElementById("products");

function renderProducts() {
  if (!productsContainer) return;
  productsContainer.innerHTML = "";
  products.forEach(p => {
    const card = document.createElement("div");
    card.className = "bg-white p-4 rounded shadow";
    card.innerHTML = `
      <h3 class="font-bold text-lg">${p.name}</h3>
      <p>Category: ${p.category}</p>
      <p>Price: $${p.price.toFixed(2)}</p>
      <p>Barcode: ${p.barcode}</p>
      <button onclick="addToCart(${p.id})" class="mt-2 bg-green-700 text-white py-1 px-3 rounded hover:bg-green-800">Add to Cart</button>
    `;
    productsContainer.appendChild(card);
  });
}

function addToCart(productId) {
  alert("Added to cart product ID: " + productId);
  // هنا يمكنك إضافة الكود الخاص بإدارة سلة التسوق
}

renderProducts();

