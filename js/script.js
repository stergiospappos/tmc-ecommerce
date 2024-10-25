import products from "./products.js";

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

function displayProducts(products) {
  productContainer.innerHTML = products
    .map((product) => {
      let { brand, name, price, image, id } = product;
      return `
        <!-- Single Product Card -->
              <div class="product-card">
                <div class="product-info">
                  <div class="product-brand">${brand}</div>
                  <div class="product-name">${name}</div>
                  <div class="product-price">${price}</div>
                  <a
                  href="#" class="add-to-cart btn" data-id="${id}">Add To Cart</a>
                </div>
                <div class="background-image">
                  <img
                    decoding="async"
                    src="${image}"
                    alt="A photo of ${name} from the brand ${brand}"
                  />
                </div>
              </div>
              <!-- End Single Product Card -->
        `;
    })
    .join("");
}

// Initial display of all products
displayFilters(products);
displayProducts(products);

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

// Add event listeners for "Add To Cart" buttons
const addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const productId = event.target.getAttribute("data-id");
    addToCart(productId);
    cartWrapper.classList.remove("hide");

    //Calculate subtotal
    const subtotal = document.querySelector(".subtotal-price");

    // Calculate subtotal using reduce to sum up prices
    let cartTotal = cartItems.reduce((total, item) => {
      // Convert price to a number, removing "€" and "."
      return total + parseFloat(item.price.replace("€", "").replace(".", ""));
    }, 0); // Start the total at 0

    // Calculate VAT (24%)
    let totalWithVAT = cartTotal * 1.24;

    // Display the subtotal with VAT in the desired format with "€" symbol
    subtotal.innerHTML = totalWithVAT.toLocaleString("en-US") + "€";

    //Update Cart Item Number

    const cartItemNum = document.querySelectorAll(".quantity_cart");

    // Update each element with the cart item count
    cartItemNum.forEach((element) => {
      element.innerHTML = cartItems.length;
    });
  });
});

// Function to add a product to the cart with a random ID
// Function to add a product to the cart with a random ID
function addToCart(productId) {
  const product = products.find((item) => item.id === productId);
  if (product) {
    const productCopy = { ...product };
    productCopy.id = generateRandomId(); // Assign a random ID
    cartItems.push(productCopy);
    displayCartItems(cartItems); // Display updated cart
  }
}

// Function to generate a random ID
function generateRandomId() {
  // Create a random number and convert it to a string
  return Math.random().toString(36).substr(2, 9);
}

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

//Cart Open Close
const button = document.querySelector(".test");
const cartWrapper = document.querySelector(".cart-wrapper");
const closeBtn = document.querySelector(".close-button");

if (button && cartWrapper && closeBtn) {
  button.addEventListener("click", () => {
    cartWrapper.classList.remove("hide");
  });

  closeBtn.addEventListener("click", () => {
    cartWrapper.classList.add("hide");
  });
}
