document.addEventListener("DOMContentLoaded", function () {
  const navbarHTML = `
    <nav class="navbar">
      <div class="logo">
        <a href="index.html">COMETICA</a>
      </div>
      <ul class="nav-links">
        <li><a href="index.html">Home</a></li>
        <li><a href="shop.html">Shop</a></li>
        <li><a href="index.html#collections-container-section">Collection</a></li>
        <li><a href="about.html">About Us</a></li>
        <li><a href="contact.html">Contact Us</a></li>
      </ul>
      <div class="cart-icon">
        <a id="cart-link" href="cart.html">🛒 <span class="cart-count" id="cart-count">0</span></a>
      </div>
    </nav>
  `;

  const navbarContainer = document.createElement("div");
  navbarContainer.innerHTML = navbarHTML;
  document.body.insertBefore(navbarContainer, document.body.firstChild);

  // Update cart count and disable link if cart is empty
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = cart.length;
  const cartCountElement = document.getElementById("cart-count");
  const cartLink = document.getElementById("cart-link");

  cartCountElement.textContent = cartCount;

  if (cartCount === 0) {
    cartLink.classList.add("disabled");
    cartLink.removeAttribute("href");
  }
});