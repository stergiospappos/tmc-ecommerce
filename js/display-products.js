//A function to display these products in the frontend dynamically

const productContainer = document.querySelector(".products-container");

function displayProducts(products) {
  productContainer.innerHTML = products
    .map((product) => {
      let { brand, name, price, image } = product;
      return `
        <!-- Single Product Card -->
              <div class="product-card">
                <div class="product-info">
                  <div class="product-brand">${brand}</div>
                  <div class="product-name">${name}</div>
                  <div class="product-price">${price}</div>
                  <a href="#" class="add-to-cart btn">Add To Cart</a>
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

export default displayProducts;
