document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const productList = document.getElementById("product-list");
  const searchInput = document.getElementById("searchInput");
  let allProducts = [];

  // ShowLoader Function
  function showLoader() {
    if (loader) {
      loader.style.display = "flex";
    }
  }
  // HideLoader Function
  function hideLoader() {
    if (loader) {
      loader.style.display = "none";
    }
  }

  // Fetch products from JSON
  showLoader();
  fetch("js/products.json")
    .then((response) => response.json())
    .then((data) => {
      allProducts = data;
      displayProducts(allProducts);
    })

    .catch((error) => {
      console.log("Error fetching products:", error);
      if (productList) {
        productList.innerHTML =
          "<p>Failed to load products. Please try again later.</p>";
      }
    })
    .finally(() => {
      hideLoader();
    });

  function displayProducts(products) {
    productList.innerHTML = ""; // Clear previous list
    products.forEach((product) => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>ราคา: ${product.price} บาท</p>
            `;
      productList.appendChild(card);
    });
  }

  // Inefficient Search
  searchInput.addEventListener("keyup", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = allProducts.filter((product) => {
      // Simple search, not very efficient
      return product.name.toLowerCase().includes(searchTerm);
    });
    displayProducts(filteredProducts);
  });
});
