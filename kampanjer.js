/* eslint-disable no-unused-vars */
import data from "./data.js";
const modal = document.querySelector(".modal");
const productContiner = document.querySelector(
  ".kapmanjersida-product-container"
);
const wishValue = document.querySelector(".wish");
let wishes = 0;
const cartItems = document.querySelector(".cartitems");
let items = 0;
let count = 0;

const hamtainfo = async () => {
  try {
    const resp = await axios("./products.json");
    visainfo(resp.data);
  } catch (error) {
    console.error(error);
  }
};
hamtainfo();

const visainfo = (data) => {
  const { items } = data;
  let num = 0;
  let hallare = [];
  items.forEach((el, ind) => {
    hallare.push(el.description);
    num = parseInt(el.price) * 1.3;
    let html = `
        <div class="pcon" id="${ind}">
          <div class="rbtcon">
            <p>FLERA FÄRGER</p>
            <i class="far fa-heart"></i>
          </div>
          <div class="imgcon">
            <img src="${el.image1}" alt="" />
            <p>${el.title}</p>
            <span>${el.price} kr</span>
            <div class="procent-div">
              <h6 class="procent">${num}kr</h6>
              <span>- 30%</span>
            </div>
            <button class="buy-btn">KÖP</button>
          </div>
        </div>`;
    productContiner.insertAdjacentHTML("afterbegin", html);
  });
  const prodCont = document.querySelectorAll(".pcon");
  prodCont.forEach((el) => {
    el.addEventListener("click", (e) => {
      displayModal(
        e.target.parentElement.children,
        items,
        el,
        hallare,
        e.currentTarget.getAttribute("id")
      );
      modal.scrollIntoView({ behavior: "smooth" });
    });
  });
  document.querySelectorAll(".fa-heart").forEach((heart) => {
    heart.addEventListener("click", (e) => {
      wishValue.innerHTML = `${++wishes}`;
    });
  });
};

const displayModal = (element, items, div, hallare, id) => {
  const cost = 0;
  modal.innerHTML = "";
  modal.classList.remove("hidden");
  let num = parseInt(element[3].children[0].innerText.split("kr")[0]);
  let html = `
        <div class="prodbilder">
         <i class="far fa-window-close"></i>
         <div class="praminfo">
         <p>* detta ingår</p>
         <span>
         Liggdel,
         Sittdel,
        Skötväska,
        Regnskydd,
        Myggnät,
        Skötunderlägg
         
         </span>
         <h6 class="lasmer"> >> LÄS MER HÄR<h6>
         <div class="mertextinfo hidden">
          ${hallare[id]}
         </div>
         </div>
          </div>
           <div class="prodMainBild">
           <p class="left"><</p>
           <div class="prodimgcont">
           <div class="bildspel" id="0">
           <img src="${element[0].src}" class="imgspel"/>
           </div>
           </div>

           <p class="right">></p>
           </div>
          </div>
          <div class="contentprod">
            <h4>${element[1].textContent}</h4>
            <h5 class="prisst">${element[2].textContent}</h5>
             <div class="procent-div">
              <h6 class="procent">${num}kr</h6>
              <span>- 30%</span>
            </div>
            <div class="bilstolcont">
               <p>Bilbarnstol</p>
        <label for="ja">Ja tack</label>
        <input type="radio"  id="ja" name="ja" class="valbilstol"/>
        <label for="nej">Nej tack</label>
        <input type="radio" id="nej" name="ja"  checked="checked" class="valbilstol"/>
              </div>
              <div class="color-div">
              <p>Välj färg</p>
                <select name="color" id="colorsselect">
            <option value="black">Black</option>
          <option value="gray">Gray</option>
         </select>
              </div>
              <div class="phbt-cont">
                <div>
                  <p>Antal</p>
                  <input type="number" value="1" class="valbilstol"/>
                  </div>
                <button class="purchase-btn">KÖP</button>
                </div>
            </div>

        `;
  modal.insertAdjacentHTML("afterbegin", html);
  const prdobilderContiner = document.querySelector(".prodimgcont");
  let imagesArray = data[div.id];
  if (imagesArray) {
    imagesArray.forEach((img, ind) => {
      let nyhtml = `
       <div class="bildspel hidden" id="${ind + 1}">
           <img src="${img[0]}" class="imgspel"/>
           </div>
       `;
      prdobilderContiner.insertAdjacentHTML("beforeend", nyhtml);
    });
  }
  document.querySelector(".fa-window-close").addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  document.querySelectorAll(".purchase-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      cartItems.innerHTML = `${++items}`;
    });
  });

  document.querySelectorAll(".valbilstol").forEach((el) => {
    el.addEventListener("click", (e) => {
      let id = e.target.id;

      let cost = 0;
      cost = parseInt(element[2].textContent.split("kr")[0]);

      if (id == "ja") {
        document.querySelectorAll(".prisst").forEach((el) => {
          el.innerHTML = `${(cost += 400)} kr`;
        });
      }
      if (id == "nej") {
        document.querySelectorAll(".prisst").forEach((el) => {
          el.innerHTML = `${cost} kr`;
        });
      }
      if (e.target.getAttribute("type") == "number") {
        document.querySelectorAll(".prisst").forEach((el) => {
          el.innerHTML = `${cost * e.target.value} kr`;
        });
      }
    });
  });
  document.querySelector(".lasmer").addEventListener("click", (e) => {
    document.querySelector(".mertextinfo").classList.toggle("hidden");
  });

  let count = 0;
  const divarray = document.querySelectorAll(".bildspel");
  document.querySelector(".right").addEventListener("click", (e) => {
    ++count;
    if (imagesArray) {
      divarray.forEach((el) => {
        if (count >= divarray.length) {
          count = 0;
        }
        if (el.getAttribute("id") == count) {
          el.classList.remove("hidden");
        } else {
          el.classList.add("hidden");
        }
      });
    }
  });
};
