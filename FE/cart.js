// Function to render cart items
function renderCartItems() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.getElementById("cart-items-container");
  const totalItemsElement = document.getElementById("total-items");
  const subTotalAmountElement = document.getElementById("sub-total-amount");
  const shippingAmountElement = document.getElementById("shipping-amount");
  const totalAmountElement = document.getElementById("total-amount");

  cartItemsContainer.innerHTML = "";
  let totalItems = 0;
  let totalAmount = 0;

  cart.forEach((item, index) => {
    totalItems += item.quantity;
    totalAmount += item.price * item.quantity;

    const div = document.createElement("div");
    div.className = "cart-items";

    div.innerHTML = `
      <div class="cart-item-details">
        <img src="${item.image}" alt="${item.name}" class="cart-item-image" />
        <div>
          <h3>${item.name}</h3>
          <p>Price: INR ${item.price}</p>
          <p>Size: ${item.size}</p>
          <p>Quantity: 
            <button onclick="updateQuantity(${index}, ${item.quantity - 1})">-</button>
            <span>${item.quantity}</span>
            <button onclick="updateQuantity(${index}, ${item.quantity + 1})">+</button>
          </p>
        </div>
        <div class="cart-item-actions">
          <p>Total: INR ${(item.price * item.quantity).toFixed(2)}</p>
          <button class="remove-item" onclick="removeFromCart(${index})">
            <img src="images/delete.png" alt="Remove" class="remove-icon" />
          </button>
        </div>
      </div>
    `;

    cartItemsContainer.appendChild(div);
  });

  totalItemsElement.textContent = totalItems;
  subTotalAmountElement.textContent = `INR ${totalAmount.toFixed(2)}`;
  const shippingAmount = totalAmount > 0 ? totalAmount * 0.05 : 0
  shippingAmountElement.textContent = `INR ${shippingAmount.toFixed(2)}`;
  const finalAmount = totalAmount + shippingAmount;
  totalAmountElement.textContent = `INR ${finalAmount.toFixed(2)}`;
}

function updateQuantity(index, newQuantity) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (newQuantity < 1) return;

  cart[index].quantity = newQuantity;
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCartItems();
}

function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCartItems();
  updateCartCount();
}

function handleCheckout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  window.location.href = "checkout.html";
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = cart.length;
    if (document.getElementById("cart-count")) document.getElementById("cart-count").textContent = cartCount;
}

document
  .getElementById("checkout-button")
  .addEventListener("click", handleCheckout);

renderCartItems();
