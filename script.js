"use strict";
const navBtn = document.querySelector(".nav-btn");
const wishlistBtn = document.querySelector(".wish");
const cartitems = document.querySelector(".cartitems");
const searchIcon = document.querySelector(".searchicon");
const searchInput = document.querySelector(".searchinput");
const bestSeller = document.querySelector(".product-container-3");
const addWish = bestSeller.querySelectorAll(".fa-heart");
const navMenyCon = document.querySelector(".nav-meny-container");
const closenavMeny = document.querySelector(".close-container");
const dealBtn = document.querySelector(".deal-btn");
const url = "https://api.jsonbin.io/b/610160aea263d14a297dd773";
const key = "$2b$10$AkibEWIB0Xm0SHRtMsKy0eMkm/qbKlQQPA/W6Yh649BNraoAbkNam";

navBtn.addEventListener("click", (e) => {
  navMenyCon.classList.remove("hidden");
});

closenavMeny.addEventListener("click", (e) => {
  navMenyCon.classList.add("hidden");
});

dealBtn.addEventListener("click", (e) => {
  location.href = "./kampanjer.html";
});
