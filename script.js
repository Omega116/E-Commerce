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

function refresh(picture) {
  picture.addEventListener("mouseover", function () {
    if (hidden) {
      picture
        .closest(".display-block > .all-images")
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

document.querySelectorAll(".little-image").forEach(refresh);

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
    console.log(x, y);
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

/* sliding images */

slidedImgs.forEach((img, i) => {
  img.style.transform = `translateX(${100 * i}%)`;
});

btnSlideRight.addEventListener("click", function () {
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
});

btnSlideLeft.addEventListener("click", function () {
  if (curSlide <= 0) {
    curSlide = slidedImgs.length - 1;
  } else {
    curSlide--;
  }

  slidedImgs.forEach((img, i) => {
    img.style.transform = `translateX(${100 * (i - curSlide)}%)`;
  });
});
/* opening the pop up */

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
  swiperContainer.querySelectorAll(".image-box").forEach(popUpRefresh);
});

// function slide(slidedImgs, id) {
//   let curSlide = id - 1;
//   slidedImgs.forEach((img, i) => {
//     img.style.transform = `translateX(${100 * (i - curSlide)}%)`;
//   });
// }
function popUpRefresh(picture) {
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
}
