// Check if admin is logged in
const loggedInAdmin = JSON.parse(localStorage.getItem("loggedInAdmin"));
if (!loggedInAdmin) {
  window.location.href = "admin-login.html";
}

// Show sections based on permissions
if (loggedInAdmin.canAdd || loggedInAdmin.canEdit) {
  document.getElementById("productFormSection").classList.remove("hidden");
}
if (loggedInAdmin.canAddUser || loggedInAdmin.canDeleteUser) {
  document.getElementById("userManagementSection").classList.remove("hidden");
}

// Logout button
document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("loggedInAdmin");
  window.location.href = "admin-login.html";
});

// Search product by barcode
document.getElementById("searchBtn").addEventListener("click", () => {
  const barcode = document.getElementById("barcodeSearch").value.trim();
  const products = JSON.parse(localStorage.getItem("adminProducts")) || [];
  const found = products.find(p => p.barcode === barcode);
  const resultDiv = document.getElementById("searchResult");
  if (found) {
    resultDiv.innerHTML = `<p>Found: ${found.name} - $${found.price}</p>`;
    if (loggedInAdmin.canEdit || loggedInAdmin.canAdd) {
      // Show form prefilled for editing
      document.getElementById("productFormSection").classList.remove("hidden");
      document.getElementById("productName").value = found.name;
      document.getElementById("productPrice").value = found.price;
      document.getElementById("productBarcode").value = found.barcode;
    }
  } else {
    resultDiv.innerHTML = `<p class="text-red-600">No product found</p>`;
  }
});

// Save product (add or update)
document.getElementById("saveProduct").addEventListener("click", () => {
  if (!loggedInAdmin.canAdd && !loggedInAdmin.canEdit) {
    alert("You do not have permission to add or edit products.");
    return;
  }

  const name = document.getElementById("productName").value.trim();
  const price = parseFloat(document.getElementById("productPrice").value.trim());
  const barcode = document.getElementById("productBarcode").value.trim();

  if (!name || !price || !barcode) {
    alert("Please fill all fields.");
    return;
  }

  let products = JSON.parse(localStorage.getItem("adminProducts")) || [];
  const existingIndex = products.findIndex(p => p.barcode === barcode);

  if (existingIndex >= 0) {
    products[existingIndex] = { name, price, barcode };
  } else {
    products.push({ name, price, barcode });
  }

  localStorage.setItem("adminProducts", JSON.stringify(products));
  alert("Product saved!");
});

// Select all permissions button
document.getElementById("selectAllPerms").addEventListener("click", () => {
  ["permAdd","permEdit","permDelete","permAddUser","permDeleteUser"].forEach(id => {
    document.getElementById(id).checked = true;
  });
});

// Add new user
document.getElementById("addUser").addEventListener("click", () => {
  if (!loggedInAdmin.canAddUser) {
    alert("You do not have permission to add users.");
    return;
  }

  const username = document.getElementById("newUsername").value.trim();
  const password = document.getElementById("newPassword").value.trim();

  if (!username || !password) {
    alert("Please enter username and password.");
    return;
  }

  let admins = JSON.parse(localStorage.getItem("admins")) || [];
  if (admins.find(a => a.username === username)) {
    alert("Username already exists.");
    return;
  }

  admins.push({
    username,
    password,
    canAdd: document.getElementById("permAdd").checked,
    canEdit: document.getElementById("permEdit").checked,
    canDelete: document.getElementById("permDelete").checked,
    canAddUser: document.getElementById("permAddUser").checked,
    canDeleteUser: document.getElementById("permDeleteUser").checked
  });

  localStorage.setItem("admins", JSON.stringify(admins));
  alert("User added!");

  // Reset form
  document.getElementById("newUsername").value = "";
  document.getElementById("newPassword").value = "";
  ["permAdd","permEdit","permDelete","permAddUser","permDeleteUser"].forEach(id => {
    document.getElementById(id).checked = false;
  });
});
