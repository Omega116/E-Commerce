"use strict";

import { productImg } from "script.js";
const swiperContainer = document.querySelector(".pop-up");
const slidedImgs = document.querySelectorAll(".container > img");
const btnSlideRight = document.querySelector(".btn-slide-right");
const btnSlideLeft = document.querySelector(".btn-slide-left");
let curSlide = 0;

/* opening the pop up */

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
  console.log(curSlide);
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
  console.log(curSlide);
});

/* opening the swiper */

productImg.addEventListener("click", function () {
  swiperContainer.classList.remove("hidden");
});
