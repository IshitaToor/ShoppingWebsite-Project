document.addEventListener("DOMContentLoaded", function () {
  const footerHTML = `
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-grid">
          <div class="footer-brand">
            <a href="/" class="footer-logo">COMETICA</a>
            <p class="footer-desc">
              Premium clothing for the modern individual.
            </p>
          </div>

          <div class="footer-section">
            <h3 class="footer-heading">Shop</h3>
            <ul class="footer-links">
              <li><a href="shop.html">All Products</a></li>
            </ul>
          </div>

          <div class="footer-section">
            <h3 class="footer-heading">Help</h3>
            <ul class="footer-links">
              <li><a href="contact.html">Contact Us</a></li>
            </ul>
          </div>

          <div class="footer-section">
            <h3 class="footer-heading">Stay Connected</h3>
            <p class="footer-text">Subscribe to our newsletter for updates and promotions.</p>
            <div class="newsletter">
              <input type="email" placeholder="Your email" id="newsletter-email" />
              <button onclick="subscribeNewsletter()">Subscribe</button>
            </div>
          </div>
        </div>

        <div class="footer-bottom">
          <p>© 2025 COMETICA. All rights reserved.</p>
          <div class="footer-policy">
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  `;

  const footerContainer = document.createElement("div");
  footerContainer.innerHTML = footerHTML;
  document.body.appendChild(footerContainer);
});

async function subscribeNewsletter(id = "newsletter-email") {
  const emailInput = document.getElementById(id);
  const email = emailInput.value.trim();

  if (email === "") {
    alert("Please enter your email.");
    return;
  }

  try {
    const response = await fetch("http://127.0.0.1:5000/api/newsletter/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error("Failed to subscribe. Please try again.");
    }

    const result = await response.json();
    alert(result.message || `Thank you for subscribing with ${email}!`);
    emailInput.value = "";
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    alert("An error occurred while subscribing. Please try again later.");
  }
}
