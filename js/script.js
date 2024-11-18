import products from "./products.js";

const productContainer = document.querySelector(".products-container");
const filterContainer = document.querySelector(".filters-ul");
const cartWrapper = document.querySelector(".cart-wrapper");
let cartItems = []; // Ensure cartItems is defined globally

// Display filters
function displayFilters(products) {
  const uniqueBrands = [...new Set(products.map((product) => product.brand))];
  filterContainer.innerHTML = `
    <li data-brand="all" class="reset-filter">Reset</li>
    ${uniqueBrands
      .map(
        (brand) => `
        <li data-brand="${brand}" class="single-filter">${brand}</li>
      `
      )
      .join("")}`;

  attachFilterListeners(); // Attach listeners after rendering filters
}

// Display products
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
            <a href="#" class="add-to-cart btn" data-id="${id}">Add To Cart</a>
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

  attachAddToCartListeners(); // Attach listeners after rendering products
}

// Attach filter event listeners
function attachFilterListeners() {
  const filterButtons = document.querySelectorAll(".single-filter");
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("hover"));
      button.classList.add("hover");
      const brand = button.getAttribute("data-brand");
      if (brand === "all") {
        displayProducts(products);
      } else {
        const filteredProducts = products.filter(
          (product) => product.brand === brand
        );
        displayProducts(filteredProducts);
      }
    });
  });

  const resetButton = document.querySelector(".reset-filter");
  resetButton.addEventListener("click", () => {
    displayProducts(products);
    filterButtons.forEach((btn) => btn.classList.remove("hover"));
  });
}

// Attach "Add to Cart" button listeners
function attachAddToCartListeners() {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const productId = button.getAttribute("data-id");
      addToCart(productId);
      cartWrapper.classList.remove("hide"); // Open cart
    });
  });
}

// Add a product to the cart
function addToCart(productId) {
  const product = products.find((item) => item.id === productId);
  if (product) {
    const existingItem = cartItems.find((item) => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1; // Increment quantity if product already in cart
    } else {
      cartItems.push({ ...product, quantity: 1 }); // Add new product with quantity
    }
    displayCartItems(); // Refresh the cart
  }
}

// Display cart items
function displayCartItems() {
  const cartContainer = document.querySelector(".cart-list");
  const subtotal = document.querySelector(".subtotal-price");

  cartContainer.innerHTML = cartItems
    .map((item) => {
      const { brand, name, price, image, id, quantity } = item;
      return `
        <div class="cart-item" data-id="${id}">
          <div class="cart_image_box">
            <img src="${image}" alt="${name}" class="image" />
          </div>
          <div class="product_cart_info">
            <div class="cart_name">${name}</div>
            <ul class="brand_options">
              <li class="options-cart">
                <span class="brand-cart">Brand</span>
                <span class="brand-dot">:</span>
                <span class="brand-cart-name">${brand}</span>
              </li>
            </ul>
            <div class="q-group">
              <a href="#" class="q-dec w-inline-block">-</a>
              <input
                class="q-num"
                type="number"
                value="${quantity}"
                min="1"
              />
              <a href="#" class="q-inc w-inline-block">+</a>
            </div>
          </div>
          <div class="price_remove">
            <div class="price_cart">${price}</div>
            <a href="#" class="remove" data-id="${id}">Remove</a>
          </div>
        </div>`;
    })
    .join("");

  updateSubtotal(); // Update subtotal when cart is displayed
  attachCartItemListeners(); // Attach listeners for cart actions
}

// Attach listeners for cart item actions
function attachCartItemListeners() {
  const removeButtons = document.querySelectorAll(".remove");
  const quantityInputs = document.querySelectorAll(".q-num");
  const decrementButtons = document.querySelectorAll(".q-dec");
  const incrementButtons = document.querySelectorAll(".q-inc");

  // Remove product
  removeButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const productId = button.getAttribute("data-id");
      cartItems = cartItems.filter((item) => item.id !== productId);
      displayCartItems();
    });
  });

  // Update quantity via input
  quantityInputs.forEach((input) => {
    input.addEventListener("change", (event) => {
      const productId = input.closest(".cart-item").getAttribute("data-id");
      const newQuantity = parseInt(event.target.value);
      if (newQuantity > 0) {
        const product = cartItems.find((item) => item.id === productId);
        product.quantity = newQuantity;
        updateSubtotal();
      } else {
        input.value = 1; // Ensure quantity stays above zero
      }
    });
  });

  // Increment quantity
  incrementButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const productId = button.closest(".cart-item").getAttribute("data-id");
      const product = cartItems.find((item) => item.id === productId);
      product.quantity += 1;
      displayCartItems();
    });
  });

  // Decrement quantity
  decrementButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const productId = button.closest(".cart-item").getAttribute("data-id");
      const product = cartItems.find((item) => item.id === productId);
      if (product.quantity > 1) {
        product.quantity -= 1;
        displayCartItems();
      }
    });
  });
}

// Update cart subtotal
function updateSubtotal() {
  const subtotal = document.querySelector(".subtotal-price");
  const total = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace("€", "").replace(".", ""));
    return sum + price * item.quantity;
  }, 0);

  subtotal.innerHTML = `${(total * 1.24).toLocaleString("en-US")}€`; // Add VAT
}

// Initial render
displayFilters(products);
displayProducts(products);
