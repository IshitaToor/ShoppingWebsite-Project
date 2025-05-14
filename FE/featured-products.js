async function fetchFeaturedProducts() {
  try {
    // Replace with your actual API endpoint
    const response = await fetch("http://127.0.0.1:5000/api/products/featured");
    if (!response.ok) {
      throw new Error("Failed to fetch featured products");
    }

    const products = await response.json();
    renderFeaturedProducts(products);
  } catch (error) {
    console.error("Error fetching featured products:", error);
    document.getElementById("featured-products").innerHTML = "<p>Failed to load featured products. Please try again later.</p>";
  }
}

function renderFeaturedProducts(products) {
  const container = document.getElementById("featured-products");
  container.innerHTML = ""; // Clear any existing content

  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.setAttribute("data-id", product.id);

    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h4>${product.name}</h4>
      <p>INR ${product.price}</p>
      <p style="font-size: 0.8rem;">${product.description}</p>
    `;

    // Add click event to the entire product card
    div.addEventListener("click", (e) => {
        const id = div.getAttribute("data-id");
        const selectedProduct = products.find(product => product.id === parseInt(id));
        localStorage.setItem("selectedProduct", JSON.stringify(selectedProduct));
        window.location.href = `pdtdetailpg.html?id=${id}`;
    });

    container.appendChild(div);
  });
}

// Call the function to fetch and render featured products
fetchFeaturedProducts();