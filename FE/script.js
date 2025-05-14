function addToCart(id, name, price, image) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItem = cart.find(item => item.id === id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id, name, price, image, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartDisplay() {
  const cartItemsDiv = document.getElementById("cart-items");
  const cartTotalSpan = document.getElementById("cart-total");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  cartItemsDiv.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      ${item.name} - INR ${item.price} x ${item.quantity}
      <button onclick="updateQuantity(${index}, ${item.quantity + 1})">+</button>
      <button onclick="updateQuantity(${index}, ${item.quantity - 1})">-</button>
      <button onclick="removeFromCart(${index})">Remove</button>
    `;
    cartItemsDiv.appendChild(div);
  });

  cartTotalSpan.textContent = `INR ${total.toFixed(2)}`;
}

function updateQuantity(index, newQuantity) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (newQuantity < 1) return;

  cart[index].quantity = newQuantity;
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
}

function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartDisplay();
}

function clearCart() {
  localStorage.setItem("cart", JSON.stringify([]));
  updateCartDisplay();
  alert("Cart cleared");
}
