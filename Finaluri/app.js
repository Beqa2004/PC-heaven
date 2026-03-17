import { saleProducts, advisedProducts, prebuiltPcs, topBrands } from './data.js';

// ვარენდერებთ ინფორმაციას დისპლეიზე გამოსატანად
function renderProducts(data, containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  data.forEach((product) => {
    const card = document.createElement("div");
    card.className = "Card";

    // Logic for Badge, Status, and Price (Same as yours, just cleaner)
    const badgeHTML = product.badge
      ? `<div class="${product.badge}"><span>${product.badge}</span></div>`
      : "";
    const displayStatus =
      product.badge === "Preorder" ? "Preorder" : product.status;
    const statusColor = product.badge === "Preorder" ? "#2DBC4E" : "#0069DA";
    const originalPriceHTML = product.originalPrice
      ? `<span class="original-price">${product.originalPrice}</span>`
      : "";

    card.innerHTML = `
      ${badgeHTML}
      <i class="fa-regular fa-heart fa-2xl favorite-icon"></i>
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p class="status" style="color: ${statusColor};">${displayStatus}</p>
      <div class="price-container">
        <span class="current-price">${product.currentPrice}</span>
        ${originalPriceHTML}
      </div>
      <div class="buy">
        <button type="button">Buy Now</button>
        <i class="fa-solid fa-cart-shopping fa-2x"></i>
      </div>
    `;
    container.appendChild(card);
  });
}
function displayTopBrands() {
  const brandContainer = document.querySelector(".topBrands");

  topBrands.forEach((product) => {
    const card = document.createElement("div");
    card.className = "topBrand";

    card.innerHTML = `
      <div>
      <img class="productLogo" src="${product.logoImg}" alt="logoImg"></img>
      <button type="button">Show more</button>
      </div>
      <img class="productImg" src="${product.productImg}" alt="productImg"></img>
    `;

    brandContainer.appendChild(card);
  });
}

function handleFavorites() {
  // ვასელექთებთ ყველა კონტეინერს
  const containers = document.querySelectorAll(
    ".onSale, .suggestedProducts, .prebuiltPC",
  );
  // გადავატარებთ ფუნქციას ამ კონტეინერისთვის და ყველა ფავორიტის ღილაკს გადავცემთ ფუნქციას რომელიც დაჭერაზე მოქმედებებს შეასრულებს
  containers.forEach((container) => {
    container.addEventListener("click", (event) => {
      if (event.target.classList.contains("favorite-icon")) {
        const heart = event.target;
        heart.classList.toggle("active");

        if (heart.classList.contains("active")) {
          alert("Product Added To Favorites✅");
          heart.classList.replace("fa-regular", "fa-solid");
        } else {
          alert("Product Removed From Favorites❌");
          heart.classList.replace("fa-solid", "fa-regular");
        }
      }
    });
  });
}

// კალათაში დამატების ფუნქცია
function handleCartClicks() {
  const containers = document.querySelectorAll(
    ".onSale, .suggestedProducts, .prebuiltPC"
  );

  containers.forEach((container) => {
    container.addEventListener("click", (event) => {
      if (event.target.classList.contains("fa-cart-shopping")) {
        alert("Added to your cart ✅");
      }
    });
  });
}

// burger menu-ს ანიმაცია
function setupBurgerMenu() {
  const menuBtn = document.querySelector(".menu");
  const burgerMenu = document.querySelector(".burgerMenu");

  menuBtn.addEventListener("click", () => {
    burgerMenu.classList.toggle("dropDown");
  });

  document.addEventListener("click", (event) => {
    if (!menuBtn.contains(event.target) && !burgerMenu.contains(event.target)) {
      burgerMenu.classList.remove("dropDown");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts(saleProducts, ".onSale");
  renderProducts(advisedProducts, ".suggestedProducts");
  renderProducts(prebuiltPcs, ".prebuiltPC");
  displayTopBrands();
  setupBurgerMenu();
  handleFavorites();
  handleCartClicks()
});
