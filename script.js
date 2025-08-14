/***** PRODUCTS DATA (2 items per subcategory as requested) *****/
const DB = {
  GROCERY: {
    DRINKS: [
      { id: "drink-1", name: "Orange Juice 1L", price: 3.99, img: "https://images.unsplash.com/photo-1541976076758-347942db1970?q=80&w=600&auto=format&fit=crop" },
      { id: "drink-2", name: "Sparkling Water", price: 1.49, img: "https://images.unsplash.com/photo-1523374228107-6e44bd2b524e?q=80&w=600&auto=format&fit=crop" },
    ],
    BAKERY: [
      { id: "bakery-1", name: "Fresh Baguette", price: 2.49, img: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=600&auto=format&fit=crop" },
      { id: "bakery-2", name: "Croissant 2pc", price: 3.29, img: "https://images.unsplash.com/photo-1541599540903-216a46caab26?q=80&w=600&auto=format&fit=crop" },
    ],
    FROZEN: [
      { id: "frozen-1", name: "Frozen Mixed Veggies", price: 4.99, img: "https://images.unsplash.com/photo-1615486364032-fef199d87b26?q=80&w=600&auto=format&fit=crop" },
      { id: "frozen-2", name: "Vanilla Ice Cream", price: 5.49, img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=600&auto=format&fit=crop" },
    ],
    FOOD: [
      { id: "food-1", name: "Basmati Rice 5kg", price: 12.99, img: "https://images.unsplash.com/photo-1551415923-1553da8c8464?q=80&w=600&auto=format&fit=crop" },
      { id: "food-2", name: "Olive Oil 1L", price: 9.99, img: "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?q=80&w=600&auto=format&fit=crop" },
    ],
  },
  MEAT: {
    CHICKEN: [
      { id: "chicken-1", name: "Whole Chicken", price: 11.99, img: "https://images.unsplash.com/photo-1586511925558-c74907a3b5b4?q=80&w=600&auto=format&fit=crop" },
      { id: "chicken-2", name: "Chicken Breast (500g)", price: 7.49, img: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop" },
    ],
    VEAL: [
      { id: "veal-1", name: "Veal Cutlets (500g)", price: 13.99, img: "https://images.unsplash.com/photo-1603048297172-09f6b215f1db?q=80&w=600&auto=format&fit=crop" },
      { id: "veal-2", name: "Ground Veal (500g)", price: 9.99, img: "https://images.unsplash.com/photo-1615937691190-51b69f9645fd?q=80&w=600&auto=format&fit=crop" },
    ],
    BEEF: [
      { id: "beef-1", name: "Beef Ribeye (500g)", price: 14.99, img: "https://images.unsplash.com/photo-1604908554007-087f2f1f3e36?q=80&w=600&auto=format&fit=crop" },
      { id: "beef-2", name: "Ground Beef (500g)", price: 8.49, img: "https://images.unsplash.com/photo-1544025162-93e3b1aa0c03?q=80&w=600&auto=format&fit=crop" },
    ],
    FISH: [
      { id: "fish-1", name: "Salmon Fillet (400g)", price: 10.99, img: "https://images.unsplash.com/photo-1615937691212-8f7d6c9adbb6?q=80&w=600&auto=format&fit=crop" },
      { id: "fish-2", name: "Tilapia (2pc)", price: 7.99, img: "https://images.unsplash.com/photo-1558021212-51b6ecfa0db9?q=80&w=600&auto=format&fit=crop" },
    ],
    LAMB: [
      { id: "lamb-1", name: "Lamb Chops (500g)", price: 15.99, img: "https://images.unsplash.com/photo-1617093727343-374d00d8d20b?q=80&w=600&auto=format&fit=crop" },
      { id: "lamb-2", name: "Ground Lamb (500g)", price: 9.49, img: "https://images.unsplash.com/photo-1610759430031-945e510d94a4?q=80&w=600&auto=format&fit=crop" },
    ],
    GOAT: [
      { id: "goat-1", name: "Goat Cubes (500g)", price: 12.49, img: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=600&auto=format&fit=crop" },
      { id: "goat-2", name: "Goat Mince (500g)", price: 10.49, img: "https://images.unsplash.com/photo-1557701197-5f2926c62043?q=80&w=600&auto=format&fit=crop" },
    ],
    OTHERS: [
      { id: "other-1", name: "Beef Liver (500g)", price: 6.99, img: "https://images.unsplash.com/photo-1625940927419-4b6a2a26c6e8?q=80&w=600&auto=format&fit=crop" },
      { id: "other-2", name: "Chicken Gizzard (500g)", price: 4.49, img: "https://images.unsplash.com/photo-1604503468506-a8241b25e40a?q=80&w=600&auto=format&fit=crop" },
    ],
  },
  VEGETABLE: [
    { id: "veg-1", name: "Tomatoes (1kg)", price: 2.99, img: "https://images.unsplash.com/photo-1546470427-e66b7d6f3f9a?q=80&w=600&auto=format&fit=crop" },
    { id: "veg-2", name: "Cucumbers (1kg)", price: 2.49, img: "https://images.unsplash.com/photo-1506806732259-39c2d0268443?q=80&w=600&auto=format&fit=crop" },
  ],
};

/***** CART *****/
const CART_KEY = "kh_cart";
function getCart(){ return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); }
function saveCart(cart){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); updateBadge(); }
function addToCart(item){
  const cart = getCart();
  const found = cart.find(x=>x.id===item.id);
  if(found){ found.qty += 1; } else { cart.push({...item, qty:1}); }
  saveCart(cart);
  alert("Added to cart");
}
function changeQty(id, delta){
  const cart = getCart();
  const it = cart.find(x=>x.id===id);
  if(!it) return;
  it.qty += delta;
  if(it.qty<=0){ removeItem(id); return; }
  saveCart(cart);
  renderCartPage();
}
function removeItem(id){
  let cart = getCart();
  cart = cart.filter(x=>x.id!==id);
  saveCart(cart);
  renderCartPage();
}
function clearCart(){ localStorage.removeItem(CART_KEY); updateBadge(); }

/***** BADGE *****/
function updateBadge(){
  const badge = document.getElementById("cartBadge");
  if(!badge) return;
  const count = getCart().reduce((s,x)=>s+x.qty,0);
  badge.textContent = count>0? String(count): "";
}

/***** RENDER PRODUCT CARDS *****/
function cardHTML(p){
  return `
    <div class="bg-white rounded shadow p-3 flex flex-col">
      <img src="${p.img}" alt="${p.name}" class="w-full h-40 object-cover rounded mb-2">
      <div class="flex-1">
        <h4 class="font-semibold">${p.name}</h4>
        <p class="text-red-600 font-bold mt-1">$${p.price.toFixed(2)}</p>
      </div>
      <button class="btn-primary rounded mt-3 px-3 py-2" data-add="${p.id}">Add to cart</button>
    </div>
  `;
}

/***** POPULATE HOMEPAGE & VEGETABLE PAGE *****/
function populateHome(){
  const map = [
    ["drinksList", DB.GROCERY.DRINKS],
    ["bakeryList", DB.GROCERY.BAKERY],
    ["frozenList", DB.GROCERY.FROZEN],
    ["foodList",   DB.GROCERY.FOOD],
    ["chickenList",DB.MEAT.CHICKEN],
    ["vealList",   DB.MEAT.VEAL],
    ["beefList",   DB.MEAT.BEEF],
    ["fishList",   DB.MEAT.FISH],
    ["lambList",   DB.MEAT.LAMB],
    ["goatList",   DB.MEAT.GOAT],
    ["othersList", DB.MEAT.OTHERS],
  ];
  map.forEach(([id, list])=>{
    const el = document.getElementById(id);
    if(!el) return;
    el.innerHTML = list.map(cardHTML).join("");
  });
  wireAddButtons();
}
function populateVegetables(){
  const wrap = document.getElementById("vegetablesList");
  if(!wrap) return;
  wrap.innerHTML = DB.VEGETABLE.map(cardHTML).join("");
  wireAddButtons();
}
function wireAddButtons(){
  document.querySelectorAll("[data-add]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const id = btn.getAttribute("data-add");
      const product = findProductById(id);
      if(product) addToCart(product);
    });
  });
}
function findProductById(id){
  // search all DB
  for(const cat of Object.values(DB.GROCERY)){
    const f = cat.find?.(x=>x.id===id);
    if(f) return f;
  }
  for(const cat of Object.values(DB.MEAT)){
    const f = cat.find?.(x=>x.id===id);
    if(f) return f;
  }
  const v = DB.VEGETABLE.find(x=>x.id===id);
  if(v) return v;
  return null;
}

/***** COLLAPSIBLE SECTIONS *****/
function wireToggles(){
  document.querySelectorAll("[data-toggle]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const sel = btn.getAttribute("data-toggle");
      const el = document.querySelector(sel);
      if(!el) return;
      el.classList.toggle("hidden");
    });
  });
}

/***** SEARCH *****/
function wireSearch(){
  const form = document.getElementById("searchForm");
  const input = document.getElementById("searchInput");
  if(!form || !input) return;
  form.addEventListener("submit", (e)=>{
    e.preventDefault();
    const q = input.value.trim().toLowerCase();
    if(!q) return;
    // Filter across GROCERY + MEAT on homepage
    const sections = [
      ["drinksList", DB.GROCERY.DRINKS],
      ["bakeryList", DB.GROCERY.BAKERY],
      ["frozenList", DB.GROCERY.FROZEN],
      ["foodList",   DB.GROCERY.FOOD],
      ["chickenList",DB.MEAT.CHICKEN],
      ["vealList",   DB.MEAT.VEAL],
      ["beefList",   DB.MEAT.BEEF],
      ["fishList",   DB.MEAT.FISH],
      ["lambList",   DB.MEAT.LAMB],
      ["goatList",   DB.MEAT.GOAT],
      ["othersList", DB.MEAT.OTHERS],
    ];
    let any = false;
    sections.forEach(([id,list])=>{
      const el = document.getElementById(id);
      if(!el) return;
      const filtered = list.filter(p=>p.name.toLowerCase().includes(q));
      el.innerHTML = filtered.map(cardHTML).join("");
      if(filtered.length>0){
        // ensure parent section visible
        const parent = el.closest("#grocerySub,#meatSub");
        if(parent) parent.classList.remove("hidden");
        any = true;
      }
    });
    wireAddButtons();
    if(!any) alert("No products found for: "+q);
  });
}

/***** CHECKOUT PAGE RENDER *****/
function renderCartPage(){
  const cont = document.getElementById("cartItems");
  const empty = document.getElementById("emptyCart");
  const sEl = document.getElementById("subtotal");
  const tEl = document.getElementById("tax");
  const totalEl = document.getElementById("total");
  if(!cont || !sEl || !tEl || !totalEl) return;

  const cart = getCart();
  cont.innerHTML = "";
  if(cart.length===0){
    empty.classList.remove("hidden");
  } else {
    empty?.classList.add("hidden");
  }

  let subtotal = 0;
  cart.forEach(item=>{
    subtotal += item.price*item.qty;
    const row = document.createElement("div");
    row.className = "flex items-center gap-3 border p-3 rounded";
    row.innerHTML = `
      <img src="${item.img}" alt="${item.name}" class="w-16 h-16 object-cover rounded">
      <div class="flex-1">
        <div class="font-semibold">${item.name}</div>
        <div class="text-sm text-gray-600">$${item.price.toFixed(2)}</div>
      </div>
      <div class="flex items-center gap-2">
        <button class="px-2 py-1 border rounded" data-qty="${item.id}" data-d="-1">-</button>
        <span class="w-8 text-center">${item.qty}</span>
        <button class="px-2 py-1 border rounded" data-qty="${item.id}" data-d="1">+</button>
      </div>
      <div class="w-20 text-right font-semibold">$${(item.price*item.qty).toFixed(2)}</div>
      <button class="ml-2 px-2 py-1 text-red-600 hover:text-red-800" title="Remove" data-remove="${item.id}">✕</button>
    `;
    cont.appendChild(row);
  });

  const tax = subtotal * 0.13;
  const total = subtotal + tax;
  sEl.textContent = `$${subtotal.toFixed(2)}`;
  tEl.textContent = `$${tax.toFixed(2)}`;
  totalEl.textContent = `$${total.toFixed(2)}`;

  // wire qty buttons & remove
  cont.querySelectorAll("[data-qty]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const id = btn.getAttribute("data-qty");
      const d = Number(btn.getAttribute("data-d"));
      changeQty(id, d);
    });
  });
  cont.querySelectorAll("[data-remove]").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const id = btn.getAttribute("data-remove");
      removeItem(id);
    });
  });
}

/***** PAYMENT TOGGLER *****/
function wirePayment(){
  const cod = document.querySelector('input[name="pay"][value="cod"]');
  const card = document.querySelector('input[name="pay"][value="card"]');
  const codForm = document.getElementById("codForm");
  const cardForm = document.getElementById("cardForm");
  if(!cod || !card || !codForm || !cardForm) return;

  function sync(){
    const v = document.querySelector('input[name="pay"]:checked')?.value;
    if(v==="card"){ cardForm.classList.remove("hidden"); codForm.classList.add("hidden"); }
    else { codForm.classList.remove("hidden"); cardForm.classList.add("hidden"); }
  }
  cod.addEventListener("change", sync);
  card.addEventListener("change", sync);
  sync();

  const confirmBtn = document.getElementById("confirmBtn");
  const thanks = document.getElementById("thanks");
  if(confirmBtn){
    confirmBtn.addEventListener("click", ()=>{
      if(getCart().length===0){ alert("Your cart is empty."); return; }
      thanks?.classList.remove("hidden");
      setTimeout(()=>{
        clearCart();
        window.location.href = "index.html";
      }, 1500);
    });
  }
}

/***** INIT PER PAGE *****/
document.addEventListener("DOMContentLoaded", ()=>{
  updateBadge();
  wireToggles();
  wireSearch();
  populateHome();
  populateVegetables();
  renderCartPage();
  wirePayment();
});
