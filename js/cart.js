const button = document.querySelector(".cart-button");
const cartWrapper = document.querySelector(".cart-wrapper");
const closeBtn = document.querySelector(".close-button");

// Open/close cart functionality
if (button && cartWrapper && closeBtn) {
  button.addEventListener("click", () => {
    cartWrapper.classList.remove("hide");
  });

  closeBtn.addEventListener("click", () => {
    cartWrapper.classList.add("hide");
  });
}

// Cart Items Array
let cartItems = [];

// Display Cart Items in the Cart
const cartContainer = document.querySelector(".cart-list");

function displayCartItems(cartItems) {
  cartContainer.innerHTML = cartItems
    .map((product) => {
      let { brand, name, price, image, id, quantity } = product;
      return `
        <div class="cart-item" data-id="${id}">
          <div class="cart_image_box">
            <img src="${image}" alt="" class="image" />
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
              <a href="#" class="q-dec w-inline-block">
                <img src="./assets/minus.svg" loading="lazy" alt="" class="increment-icon" />
              </a>
              <input
                class="q-num"
                type="number"
                value="${quantity}"
                min="1"
              />
              <a href="#" class="q-inc w-inline-block">
                <img src="./assets/plus-1.svg" loading="lazy" alt="" class="increment-icon" />
              </a>
            </div>
          </div>
          <div class="price_remove">
            <div class="price_cart">${price}</div>
            <a href="#" class="remove" data-id="${id}">Remove</a>
          </div>
        </div>
      `;
    })
    .join("");

  attachCartEventListeners();
  updateCartItemCount();
}

// Attach event listeners for cart actions
function attachCartEventListeners() {
  // Remove item
  document.querySelectorAll(".remove").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const productId = button.getAttribute("data-id");
      removeItem(productId);
    });
  });

  // Update quantities
  document.querySelectorAll(".q-group").forEach((group) => {
    const decrementBtn = group.querySelector(".q-dec");
    const incrementBtn = group.querySelector(".q-inc");
    const quantityInput = group.querySelector(".q-num");
    const productId = group.closest(".cart-item").dataset.id;

    decrementBtn.addEventListener("click", (event) => {
      event.preventDefault();
      let currentValue = parseInt(quantityInput.value);
      if (currentValue > 1) {
        updateQuantity(productId, currentValue - 1);
      }
    });

    incrementBtn.addEventListener("click", (event) => {
      event.preventDefault();
      let currentValue = parseInt(quantityInput.value);
      updateQuantity(productId, currentValue + 1);
    });

    quantityInput.addEventListener("change", (event) => {
      let newValue = parseInt(event.target.value);
      if (newValue > 0) {
        updateQuantity(productId, newValue);
      } else {
        event.target.value = 1;
        updateQuantity(productId, 1);
      }
    });
  });
}

// Update quantity in cart
function updateQuantity(productId, quantity) {
  const product = cartItems.find((item) => item.id === productId);
  if (product) {
    product.quantity = quantity;
    displayCartItems(cartItems);
  }
}

// Remove a product from the cart
function removeItem(productId) {
  cartItems = cartItems.filter((item) => item.id !== productId);
  displayCartItems(cartItems);
}

// Update cart item count
function updateCartItemCount() {
  const cartItemNum = document.querySelectorAll(".quantity_cart");
  cartItemNum.forEach((element) => {
    element.innerHTML = cartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
  });
}
