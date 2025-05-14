let products = [];
let selectedCategories = [];

const grid = document.getElementById("product-grid");
const productCount = document.getElementById("product-count");
const sortSelect = document.getElementById("sort-select");
const titleElement = document.querySelector(".title");

const params = new URLSearchParams(window.location.search);
const collectionId = params.get("collection_id");

async function fetchProducts() {
  try {
    const response = await fetch("http://127.0.0.1:5000/api/products/all");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    products = await response.json();

    // Filter products by collection_id if present
    if (collectionId) {
      products = products.filter(product => product.collection_id === parseInt(collectionId));
      await fetchCollectionName(collectionId);
    }

    renderProducts(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    grid.innerHTML = "<p>Failed to load products. Please try again later.</p>";
  }
}

async function fetchCollectionName(collectionId) {
  try {
    const response = await fetch(`http://127.0.0.1:5000/api/collections/${collectionId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch collection name");
    }
    const collection = await response.json();
    titleElement.textContent = `Shop for ${collection.name}`;
  } catch (error) {
    console.error("Error fetching collection name:", error);
    titleElement.textContent = "Shop All Products";
  }
}

function renderProducts(items) {
  grid.innerHTML = "";
  productCount.textContent = `${items.length} products`;

  items.forEach(product => {
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

    grid.appendChild(div);
  });
}

function getFilteredProducts() {
  let result = [...products];

  if (selectedCategories.length > 0) {
    result = result.filter(p => selectedCategories.includes(p.category));
  }

  const sort = sortSelect.value;
  if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
  else if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
  else if (sort === "name-asc") result.sort((a, b) => a.name.localeCompare(b.name));

  return result;
}

document.querySelectorAll(".category-filter").forEach(cb => {
  cb.addEventListener("change", () => {
    const val = cb.value;
    if (cb.checked) selectedCategories.push(val);
    else selectedCategories = selectedCategories.filter(c => c !== val);
    renderProducts(getFilteredProducts());
  });
});

sortSelect.addEventListener("change", () => {
  renderProducts(getFilteredProducts());
});

// Initial rendering
fetchProducts();