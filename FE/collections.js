async function fetchCollections() {
  try {
    // Replace with your actual API endpoint
    const response = await fetch("http://127.0.0.1:5000/api/collections/all");
    if (!response.ok) {
      throw new Error("Failed to fetch collections");
    }

    const collections = await response.json();
    renderCollections(collections);
  } catch (error) {
    console.error("Error fetching collections:", error);
    document.getElementById("collections-container").innerHTML = "<p>Failed to load collections. Please try again later.</p>";
  }
}

function renderCollections(collections) {
  const container = document.getElementById("collections-container");
  container.innerHTML = ""; // Clear any existing content

  collections.forEach(collection => {
    const div = document.createElement("div");
    div.className = "collection-card";

    div.innerHTML = `
      <div class="image-container">
        <img src="${collection.image}" alt="${collection.name}" />
        <a href="shop.html?collection_id=${collection.id}" class="explore-overlay">Explore Now</a>
      </div>
      <h3>${collection.name}</h3>
      <p>${collection.description}</p>
    `;

    container.appendChild(div);
  });
}

// Call the function to fetch and render collections
fetchCollections();