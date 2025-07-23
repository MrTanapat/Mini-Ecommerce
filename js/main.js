document.addEventListener("DOMContentLoaded", () => {
  const loader = document.getElementById("loader");
  const loaderSuccess = document.getElementById("loaderSuccess");
  const loaderFailed = document.getElementById("loaderFailed");
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

  //Show a success or failed message.
  function showMessage(type) {
    let messageElement;
    if (type === "success") {
      messageElement = loaderSuccess;
    } else if (type === "failed") {
      messageElement = loaderFailed;
    }

    if (messageElement) {
      messageElement.style.display = "block";
      setTimeout(() => {
        messageElement.style.display = "none";
      }, 3000);
    }
  }

  // Fetch products from JSON
  showLoader();
  fetch("js/products.json")
    .then((response) => response.json())
    .then((data) => {
      allProducts = data;
      displayProducts(allProducts);
      showMessage("success");
    })

    .catch((error) => {
      console.log("Error fetching products:", error);
      if (productList) {
        showMessage("failed");
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
                <p>ราคา: ${Number(product.price).toLocaleString()} บาท</p>
            `;
      productList.appendChild(card);
    });
  }

feature/search-and-validation
  // Inefficient Search
  searchInput.addEventListener("keyup", () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = allProducts.filter((product) => {
      // Simple search, not very efficient
      return product.name.toLowerCase().includes(searchTerm);
main
    });
    displayProducts(filteredProducts);
  });
});
