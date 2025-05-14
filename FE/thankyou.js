document.addEventListener("DOMContentLoaded", () => {
    // Get the query parameters
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get("orderId");
    const deliveryDate = params.get("deliveryDate");
  
    // Display the order ID
    if (orderId) {
      document.getElementById("order-id").textContent = orderId;
    } else {
      document.getElementById("order-id").textContent = "N/A";
    }
  
    // Display the delivery date
    if (deliveryDate) {
      document.getElementById("delivery-date").textContent = deliveryDate;
    } else {
      document.getElementById("delivery-date").textContent = "N/A";
    }
  });