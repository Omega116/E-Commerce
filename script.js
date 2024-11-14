"use strict";

let quantity = 0;
let price = 125;
let hidden = true;
const zoomDiv = document.querySelector(".zoom");
let productImg = document.querySelector(".scalable-image");
let id = Number(
  document.querySelector(".display-window .active-box img").getAttribute("id")
);
const swiperContainer = document.querySelector(".pop-up");
const PopUpThumbnails = swiperContainer.querySelectorAll(".little-image");

function refresh() {
  document.querySelectorAll(".little-image").forEach((picture) => {
    picture.addEventListener("mouseover", function () {
      if (hidden) {
        picture
          .closest(".all-images")
          .querySelectorAll(".image-box")
          .forEach((box) => box.classList.remove("active-box"));

        picture.closest(".image-box").classList.add("active-box");
        let id = Number(picture.getAttribute("id"));

        picture
          .closest(".display-block")
          .querySelector(
            ".scalable-image"
          ).src = `images/image-product-${id}.jpg`;
        productImg = document.querySelector(".display-window >.scalable-img");
      }
    });
  });
}

window.addEventListener("click", function (e) {
  if (e.target.closest(".plus-icon")) {
    quantity++;
    e.target
      .closest(".plus-icon")
      .parentNode.querySelector(".quantity").innerText = quantity;
    let currentPrice = e.target
      .closest(".info-block")
      .querySelector(".current-price");
    currentPrice.innerText = `${price * quantity}.00`;
  } else if (e.target.closest(".minus-icon")) {
    if (quantity > 0) {
      quantity--;
      e.target
        .closest(".minus-icon")
        .parentNode.querySelector(".quantity").innerText = quantity;
      let currentPrice = e.target
        .closest(".info-block")
        .querySelector(".current-price");
      currentPrice.innerText = `${price * quantity}.00`;
    }
    if (quantity === 0) {
      let currentPrice = e.target
        .closest(".info-block")
        .querySelector(".current-price");
      currentPrice.innerText = `125.00`;
    }
  }
});

/* zoom effect */
document
  .querySelector(".scalable-image")
  .addEventListener("mousemove", function (e) {
    const infoBlock = document.querySelector(".info-block");
    let id = Number(
      document.querySelector(".active-box>img").getAttribute("id")
    );
    const zoomedImg = document.querySelector(".zoom-image");
    zoomedImg.src = `images/image-product-${id}.jpg`;
    zoomDiv.style.display = "block";
    infoBlock.style.margin = "0";
    let start = document.querySelector("main").clientWidth * 0.09;
    let x = (e.clientX - start) / 400;
    let y = (e.clientY - 220) / 400;
    /*     console.log(x, y); */
    zoomedImg.style.transform = `translate3d(-${250 * x}px,-${250 * y}px,0px)`;
  });
document
  .querySelector(".scalable-image")
  .addEventListener("mouseleave", function (e) {
    const infoBlock = document.querySelector(".info-block");
    zoomDiv.style.display = "none";
    infoBlock.style.margin = "auto 0 ";
  });

const slidedImgs = document.querySelectorAll(".container > img");
const btnSlideRight = document.querySelector(".btn-slide-right");
const btnSlideLeft = document.querySelector(".btn-slide-left");
const dots = document.querySelector(".dots");
let curSlide = 0;

refresh();
/* sliding images */

slidedImgs.forEach((img, i) => {
  img.style.transform = `translateX(${100 * i}%)`;
});

btnSlideRight.addEventListener("click", function () {
  slideRight();
});

function slideRight(id = 0) {
  if (id) {
    curSlide = id - 2;
  }
  if (curSlide > slidedImgs.length - 2) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  slidedImgs.forEach((img, i) => {
    img.style.transform = `translateX(${100 * (i - curSlide)}%)`;
  });
  // curSlide = id - 1
  // id = curSlide + 1
  ThumbnailSlideDirection(curSlide + 1);
}
//Slide Pop Up Product Photos

btnSlideLeft.addEventListener("click", function () {
  slideLeft();
});

function slideLeft(id = 0) {
  if (id) {
    curSlide = id;
  }
  if (curSlide <= 0) {
    curSlide = slidedImgs.length - 1;
  } else {
    curSlide--;
  }

  slidedImgs.forEach((img, i) => {
    img.style.transform = `translateX(${100 * (i - curSlide)}%)`;
  });
  ThumbnailSlideDirection(curSlide + 1);
}

function ThumbnailSlideDirection(direction) {
  PopUpThumbnails.forEach((thumbnail) => {
    thumbnail.parentElement.classList.remove("active-box");
  });
  PopUpThumbnails.forEach((thumbnail) => {
    if (Number(thumbnail.getAttribute("id")) === direction) {
      thumbnail.parentElement.classList.add("active-box");
    }
  });
}

//Opening Pop Up element

productImg.addEventListener("click", function () {
  swiperContainer.classList.remove("hidden");
  hidden = false;
  let id = Number(
    document.querySelector(".display-window .active-box img").getAttribute("id")
  );
  swiperContainer.querySelectorAll(".image-box").forEach((imageBox) => {
    if (Number(imageBox.querySelector("img").getAttribute("id")) === id) {
      imageBox.classList.add("active-box");
    }
  });
  curSlide = id - 1;
  slidedImgs.forEach((img, i) => {
    img.style.transform = `translateX(${100 * (i - curSlide)}%)`;
  });
});

// function slide(slidedImgs, id) {
//   let curSlide = id - 1;
//   slidedImgs.forEach((img, i) => {
//     img.style.transform = `translateX(${100 * (i - curSlide)}%)`;
//   });
// }
/* function popUpRefresh(picture) {
  picture.addEventListener("mouseover", function () {
    console.log(picture);
    if (!hidden) {
      picture
        .closest(".all-images")
        .querySelectorAll(".image-box")
        .forEach((box) => box.classList.remove("active-box"));

      picture.closest(".image-box").classList.add("active-box");
      let id = Number(picture.querySelector("img").getAttribute("id"));
      console.log(id);
    }
  });
} */

/* function slidePhotoWithThumbnails(el) {} */
PopUpThumbnails.forEach((thumbnail) =>
  thumbnail.addEventListener("mouseover", function () {
    let oldID = Number(
      swiperContainer.querySelector(".active-box > img").getAttribute("id")
    );
    let id = Number(thumbnail.getAttribute("id"));
    if (id > oldID) {
      slideRight(id);
    } else if (id < oldID) {
      slideLeft(id);
    }
  })
);

// Close Pop Up

swiperContainer.addEventListener("click", function (e) {
  //Close if you click outside the Pop Up childs

  if (!e.target.closest(".slider")) {
    swiperContainer.classList.add("hidden");
    ThumbnailSlideDirection(-1);
  }
  hidden = true;
  refresh();
});

/* 
    Shopping list Code
 */

const btnShopping = document.querySelector('.profile > img[alt="cart icon"]');

const shoppingList = document.querySelector(".shopping-list");

let btnsRemoveProduct = document.querySelectorAll(".btn-remove-product");

const btnBuy = document.querySelector(".add-to-cart");

// Initialize the purchases array
let purchases = [];

// Build products objects
class Product {
  constructor(productName, originalPrice, currentPrice, quantity, id) {
    this.productName = productName;
    this.originalPrice = originalPrice;
    this.currentPrice = currentPrice;
    this.quantity = quantity;
    this.id = id;
  }
}

// Display an alert in case of not specifying a quantity for the product
const handleNullValue = function () {
  alert("Please specify a quantity for the product.");
};

const generateRandomID = function () {
  return Math.floor(Math.random() * (9999 - 1000) + 1000);
};

// Add purshased products to shopping list
const handlePurchaseEvent = function () {
  let value = Number(document.querySelector(".quantity").innerHTML);
  if (!value) {
    handleNullValue();
  } else {
    let currentPrice = Number(
      btnBuy.closest(".info-block").querySelector(".current-price").innerText
    );

    let originalPrice = Number(
      btnBuy
        .closest(".info-block")
        .querySelector(".original-price")
        .innerText.slice(1)
    );

    let productName = btnBuy
      .closest(".info-block")
      .querySelector(".title").innerText;

    let quantity = Number(
      btnBuy.closest(".info-block").querySelector(".quantity").innerText
    );

    let id = generateRandomID();

    let product = new Product(
      productName,
      originalPrice,
      currentPrice,
      quantity,
      id
    );

    purchases.push(product);
  }
};

// Build HTML to insert in shoppingList
const buildListedItemHTML = function () {
  let html = ``;
  if (purchases.length === 0) {
    html = `<div class="listed-item">
      <div class="no-item-container">
        <p class="no-item">
          No Items listed
          <i class="bx bx-cube"></i>
        </p>
      </div>
    </div>`;
  } else {
    for (let i = 0; i < purchases.length; i++) {
      html += `
      <div class="listed-item" id="${purchases[i].id}">
      <div class="summary">
      <img
      src="images/image-product-${Math.floor(
        Math.random() * 3 + 1
      )}-thumbnail.jpg"
      alt="product image"
      />
      <div class="name-and-price">
      <p class="product-summary-name">
      ${purchases[i].productName}
      </p>
      <p class="price-summary">
      <span class="summary-original-price"> $${purchases[
        i
      ].originalPrice.toFixed(2)} * ${purchases[i].quantity} </span>
      <span class="current-price"> ${purchases[i].currentPrice.toFixed(
        2
      )}</span>
      </p>
      </div>
      <img
      src="images/icon-delete.svg"
      alt="remove product icon"
      class="btn-remove-product"
      />
      </div>
      <button class="btn-styled"><p>Checkout</p></button>
      </div>
      `;
    }
  }
  return html;
};

const shoppingListInitialization = function () {
  shoppingList.innerHTML = `
  <div class="title-box">
    <h2 class="shopping-list-title">Cart</h2>
  </div>
  `;
};

// Delete listed items
const handleDeleteEvent = function () {
  let hasDeleted = false;
  btnsRemoveProduct = document.querySelectorAll(".btn-remove-product");
  btnsRemoveProduct.forEach((btn) => {
    btn.addEventListener("click", function () {
      let id = Number(btn.closest(".listed-item").getAttribute("id"));
      let oldShoppingList = purchases;
      purchases = purchases.filter((item) => item.id !== id);
      if (oldShoppingList.length > purchases.length) {
        hasDeleted = true;
      }
      if (hasDeleted) {
        displayShoppingList(false);
      }
    });
  });
};

const displayShoppingList = function (pressedOnBuy) {
  shoppingList.classList.remove("hidden");
  shoppingListInitialization();
  if (pressedOnBuy) {
    handlePurchaseEvent();
  }

  const html = buildListedItemHTML();
  shoppingList.insertAdjacentHTML("beforeend", html);

  handleDeleteEvent();
};

btnBuy.addEventListener("click", () => displayShoppingList(true));

btnShopping.addEventListener("click", () => displayShoppingList(false));

// Click outside the Shopping list to close
const closeShoppingList = function (e) {
  if (
    !e.target.closest(".shopping-list") &&
    !e.target.closest('.profile img[alt="cart icon"]') &&
    !e.target.closest(".quantity-choice") &&
    !e.target.closest(".add-to-cart")
  ) {
    shoppingList.classList.add("hidden");
  }
};
window.addEventListener("click", closeShoppingList);
