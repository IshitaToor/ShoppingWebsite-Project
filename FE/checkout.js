function renderOrderSummary() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItemsElement = document.getElementById("total-items");
  const subTotalAmountElement = document.getElementById("sub-total-amount");
  const shippingAmountElement = document.getElementById("shipping-amount");
  const totalAmountElement = document.getElementById("total-amount");
  const checkoutCartElement = document.getElementById("checkout-cart");

  let totalItems = 0;
  let totalAmount = 0;

  cart.forEach((item, index) => {
    totalItems += item.quantity;
    totalAmount += item.price * item.quantity;
  });

  totalItemsElement.textContent = totalItems;
  subTotalAmountElement.textContent = `INR ${totalAmount.toFixed(2)}`;
  const shippingAmount = totalAmount > 0 ? totalAmount * 0.05 : 0;
  shippingAmountElement.textContent = `INR ${shippingAmount.toFixed(2)}`;
  const finalAmount = totalAmount + shippingAmount;
  totalAmountElement.textContent = `INR ${finalAmount.toFixed(2)}`;
  checkoutCartElement.innerHTML = `Pay INR ${finalAmount.toFixed(
    2
  )} and Place your order`;
}

document
  .getElementById("checkout-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent default form submission

    // Collect form data
    const orderData = {
      firstName: document.getElementById("first-name").value,
      lastName: document.getElementById("last-name").value,
      email: document.getElementById("email").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      state: document.getElementById("state").value,
      zipCode: document.getElementById("zip-code").value,
      country: document.getElementById("country").value,
      cardName: document.getElementById("card-name").value,
      cardNumber: document.getElementById("card-number").value,
      expiryDate: document.getElementById("expiry-date").value,
      cart: JSON.parse(localStorage.getItem("cart")) || [],
      totalAmount: parseFloat(
        document.getElementById("total-amount").textContent.replace("INR ", "")
      ),
    };

    try {
      // Send API call to save order
      const response = await fetch("http://127.0.0.1:5000/api/orders/place", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to place order. Please try again.");
      }

      const result = await response.json();
      const orderId = result.orderId;
      const deliveryDate = result.deliveryDate;

      window.location.href = `thankyou.html?orderId=${orderId}&deliveryDate=${encodeURIComponent(
        deliveryDate
      )}`;
      localStorage.removeItem("cart");
      localStorage.removeItem("selectedProduct");
      updateCartCount();
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing your order. Please try again.");
    }
  });

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = cart.length;
  if (document.getElementById("cart-count")) document.getElementById("cart-count").textContent = cartCount;
}

renderOrderSummary();
