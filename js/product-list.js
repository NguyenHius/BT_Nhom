let currentCategory = "all";
let currentSearchTerm = "";

let cart = [];

let productsData = null;

document.addEventListener("DOMContentLoaded", function () {
  fetchProductsData()
    .then(() => {
      loadProducts();
      updateCartCount();
      setupEventListeners();
    })
    .catch((error) => {
      console.error("Error loading products:", error);
      showError("Failed to load products. Please try again later.");
    });
});

async function fetchProductsData() {
  try {
    const response = await fetch("json/products.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    productsData = await response.json();
    console.log("Products loaded successfully:", productsData);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

function setupEventListeners() {
  document.querySelectorAll(".filters button").forEach((button) => {
    button.addEventListener("click", function () {
      document
        .querySelectorAll(".filters button")
        .forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
      currentCategory = this.dataset.category;
      filterProducts();
    });
  });

  // Search input
  const searchInput = document.querySelector(
    '.search-container input[type="search"]'
  );
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      currentSearchTerm = this.value.toLowerCase();
      filterProducts();
    });
  }

  // Header scroll effect - Duplicate in html
  window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

// Load and display products
function loadProducts() {
  if (!productsData) {
    showError("No product data available");
    return;
  }

  setTimeout(() => {
    displayProducts(productsData.products);
    document.getElementById("loading").style.display = "none";
    document.getElementById("productGrid").style.display = "grid";
  }, 1000);
}

// Display products in gridf
function displayProducts(products) {
  const productGrid = document.getElementById("productGrid");
  const noProducts = document.getElementById("noProducts");

  if (products.length === 0) {
    productGrid.style.display = "none";
    noProducts.style.display = "block";
    return;
  }

  productGrid.style.display = "grid";
  noProducts.style.display = "none";

  productGrid.innerHTML = products
    .map(
      (product) => `
        <div class="product-card">
            ${
              product.discount
                ? `<div class="discount-badge">-${product.discount}%</div>`
                : ""
            }
            <div class="heart" onclick="toggleWishlist(${product.id})">♥</div>
            <img src="images/organic-img/${product.name.toLowerCase() // viết thường
                .replace(/\s+/g, "-") // thay khoảng trắng thành dấu -
                }.jpg" alt="${product.name}" />
            <div class="product-info">
                <h4>${product.name}</h4>
                <p class="product-description">${product.description}</p>
                <div class="product-price">
                    ${
                      product.originalPrice
                        ? `<span class="original-price">${product.originalPrice}</span>
                         <span class="current-price">${product.price}</span>`
                        : `<span class="current-price">${product.price}</span>`
                    }
                </div>
                <button class="add-to-cart-btn" onclick="addToCart(${
                  product.id
                })">
                    <i class="fas fa-shopping-cart"></i> Add to Cart
                </button>
            </div>
        </div>
    `
    )
    .join("");
}

// Filter
function filterProducts() {
  if (!productsData || !productsData.products) {
    showError("No product data available");
    return;
  }

  let filteredProducts = productsData.products;

  // Filter by category
  if (currentCategory !== "all") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === currentCategory
    );
  }

  // Filter by search
  if (currentSearchTerm) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(currentSearchTerm) ||
        product.description.toLowerCase().includes(currentSearchTerm)
    );
  }

  displayProducts(filteredProducts);
}

// Add to cart
function addToCart(productId) {
  if (!productsData || !productsData.products) {
    showError("Product data not available");
    return;
  }

  const product = productsData.products.find((p) => p.id === productId);
  if (product) {
    const existingItem = cart.find((item) => item.id === productId);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1,
      });
    }

    updateCartCount();
    showAddToCartFeedback();
  }
}

// Show error message
function showError(message) {
  const productGrid = document.getElementById("productGrid");
  const loading = document.getElementById("loading");
  const noProducts = document.getElementById("noProducts");

  // Hide loading and product grid
  loading.style.display = "none";
  productGrid.style.display = "none";

  // Show error in the no products section
  noProducts.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <h3>Error Loading Products</h3>
        <p>${message}</p>
        <button onclick="location.reload()" class="retry-btn">Try Again</button>
    `;
  noProducts.style.display = "block";
}

// Toggle wishlist
function toggleWishlist(productId) {
  // CHUA XONG CHUA XONG CHUA XONG CHUA XONG CHUA XONG CHUA XONG CHUA XONG CHUA XONG CHUA XONG CHUA XONG CHUA XONG CHUA XONG CHUA XONG CHUA XONG CHUA XONG CHUA XONG
  // CAN LAM HANH DONG THEM WISHLIST
  console.log("Toggle wishlist for product:", productId);
}

// Update cart count in header
function updateCartCount() {
  const cartBadge = document.querySelector(".cart-badge");
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cartBadge) {
    cartBadge.textContent = totalItems;
    cartBadge.style.display = totalItems > 0 ? "block" : "none";
  }
}

// Show feedback when item added to cart
function showAddToCartFeedback() {
  // Temporary notification
  const notification = document.createElement("div");
  notification.className = "cart-notification";
  notification.innerHTML = '<i class="fas fa-check"></i> Item added to cart!';
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 12px 20px;
        border-radius: 5px;
        z-index: 9999;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        animation: slideIn 0.3s ease-out;
    `;

  document.body.appendChild(notification);

  // Remove notification after 3 secs
  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease-in";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Add CSS for notifications if not already present
const style = document.createElement("style");
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
