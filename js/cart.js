const button = document.querySelector(".cart-button");
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

//Cart Functionality

//Cart Items Array
cartItems = [];

//Display CartItem in the Cart
const cartContainer = document.querySelector(".cart-list");

function displayCartItems(cartItems) {
  cartContainer.innerHTML = cartItems
    .map((product) => {
      let { brand, name, price, image, id } = product;
      return `
        <!-- Single Cart Item -->
                <div class="cart-item">
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
                      <a href="#" class="q-dec w-inline-block"
                        ><img
                          src="./assets/minus.svg"
                          loading="lazy"
                          alt=""
                          class="increment-icon" /></a
                      ><input
                        aria-label="Update quantity"
                        class="q-num"
                        required=""
                        pattern="^[0-9]+$"
                        inputmode="numeric"
                        type="number"
                        name="quantity"
                        autocomplete="off"
                        value="1"
                      /><a href="#" class="q-inc w-inline-block"
                        ><img
                          src="./assets/plus-1.svg"
                          loading="lazy"
                          alt=""
                          class="increment-icon"
                      /></a>
                    </div>
                  </div>
                  <div class="price_remove">
                    <div class="price_cart">${price}</div>
                    <a data-id="${id}" class="remove">Remove </a>
                  </div>
                </div>
                <!-- End Single Cart Item -->
        `;
    })
    .join("");
  // Attach event listeners to "Remove" buttons after displaying items
  const removeFromCartButtons = document.querySelectorAll(".remove");
  removeFromCartButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const productId = button.getAttribute("data-id"); // Get product ID from data-id attribute
      removeItem(productId); // Call remove function
    });
  });

  // Attach event listeners for quantity increment and decrement
  document.querySelectorAll(".q-group").forEach((group) => {
    const decrementBtn = group.querySelector(".q-dec");
    const incrementBtn = group.querySelector(".q-inc");
    const quantityInput = group.querySelector(".q-num");

    // Event listener for decrement button
    decrementBtn.addEventListener("click", (event) => {
      event.preventDefault();
      let currentValue = parseInt(quantityInput.value) || 1;
      if (currentValue > 1) {
        // Prevent going below 1
        quantityInput.value = currentValue - 1;
      }
    });

    // Event listener for increment button
    incrementBtn.addEventListener("click", (event) => {
      event.preventDefault();
      let currentValue = parseInt(quantityInput.value) || 1;
      quantityInput.value = currentValue + 1;
    });
  });

  // Update each element with the cart item count
  const cartItemNum = document.querySelectorAll(".quantity_cart");
  cartItemNum.forEach((element) => {
    element.innerHTML = cartItems.length;
  });
}

// Function to remove a product from the cart
function removeItem(productId) {
  const index = cartItems.findIndex((item) => item.id === productId);
  if (index !== -1) {
    cartItems.splice(index, 1); // Remove item from cartItems
    displayCartItems(cartItems); // Refresh the cart display
  }
}
