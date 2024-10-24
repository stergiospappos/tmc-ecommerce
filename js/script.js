import products from "./products.js";
import displayProducts from "./display-products.js";
const productContainer = document.querySelector(".products-container");

//Create all the brand filters based on the products in the array
const filterContainer = document.querySelector(".filters-ul");

function displayFilters(products) {
  filterContainer.innerHTML = products
    .map((product) => {
      let { brand } = product;
      return `
          <!-- Single Filter Button -->
                <li data-brand="${brand}" class="single-filter">${brand}</li>
                <!-- End Filter Button -->
          `;
    })
    .join("");
}

// Initial display of all products
displayProducts(products);
displayFilters(products);

// Add event listeners to filter buttons
const filterButtons = document.querySelectorAll(".single-filter");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove 'hover' class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("hover"));

    // Add 'hover' class to the clicked button
    button.classList.add("hover");

    // Get the brand name and filter products
    const brand = button.getAttribute("data-brand");
    filterProducts(brand); // Call filter function when clicked
  });
});

// Function to filter products by brand and display them
function filterProducts(filter) {
  const filteredProducts = products.filter(
    (product) => product.brand === filter
  );
  displayProducts(filteredProducts);
}

// Function to reset filters
const resetFilters = document.querySelector(".reset-filter");

resetFilters.addEventListener("click", () => {
  displayProducts(products);
  filterButtons.forEach((btn) => btn.classList.remove("hover"));
});

//Search Functionality

//Get whats in the search bar

const searchBox = document.querySelector("#search-input");

searchBox.addEventListener("input", () => {
  const searchTerm = searchBox.value.toLowerCase(); // Convert search term to lowercase

  // Use .filter() to get all products that match the search term
  const filteredProducts = products.filter(
    (product) => product.name.toLowerCase().includes(searchTerm) // Convert product name to lowercase
  );

  // If products are found, display them, otherwise show a message
  if (filteredProducts.length > 0) {
    displayProducts(filteredProducts); // Reuse your display function
  } else {
    productContainer.innerHTML = "<p>No products found</p>"; // Show this if no matches
  }
});
