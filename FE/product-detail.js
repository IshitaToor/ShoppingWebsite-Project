// Retrieve the selected product from localStorage
const product = JSON.parse(localStorage.getItem("selectedProduct"));

// Populate the page
if (product) {
  document.getElementById("product-image").src = product.image;
  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-price").textContent = `INR ${product.price}`;
  document.getElementById("product-description").textContent = product.description;
} else {
  console.error("Product not found");
  document.body.innerHTML = "<p>Product not found. Please go back to the shop.</p>";
}

// Quantity logic
let quantity = 1;
const quantitySpan = document.getElementById("quantity");
document.getElementById("increase").addEventListener("click", () => {
  quantity++;
  quantitySpan.textContent = quantity;
});
document.getElementById("decrease").addEventListener("click", () => {
  if (quantity > 1) {
    quantity--;
    quantitySpan.textContent = quantity;
  }
});

// Size selection logic
let selectedSize = null;
const sizeButtons = document.querySelectorAll(".size-btn");
sizeButtons.forEach(button => {
  button.addEventListener("click", () => {
    // Remove 'active' class from all buttons
    sizeButtons.forEach(btn => btn.classList.remove("active"));
    // Add 'active' to the clicked one
    button.classList.add("active");
    selectedSize = button.textContent;
  });
});

// Add to Cart functionality
document.querySelector(".add-to-cart-btn").addEventListener("click", () => {
  if (product) {
    if (!selectedSize) {
      alert("Please select a size before adding to the cart.");
      return;
    }

    addToCart(product.id, product.name, product.price, product.image, quantity, selectedSize);
    updateCartCount();
  }
});

function addToCart(id, name, price, image, quantity, size) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItem = cart.find(item => item.id === id && item.size === size);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ id, name, price, image, quantity, size });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = cart.length;
  if (document.getElementById("cart-count")) document.getElementById("cart-count").textContent = cartCount;
}

document.addEventListener("DOMContentLoaded", () => {
  // Initialize cart count on page load
  updateCartCount();
});
