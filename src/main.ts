import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./style.css";
import {
  cartOverlay,
  cartIcon,
  closeCart,
  cartSection,
  cartProductSection,
  candyCardMain,
  BASE_URL,
} from "./assets/ts/selector";
import { getProductsData, getOneProduct } from "./assets/ts/bortakvall-API";
import {
  type CandyData,
  type OneCandyData,
} from "./assets/ts/bortakvall-API.types";

const button = document.querySelector<HTMLButtonElement>(".goToPage");

button?.addEventListener("click", () => {
  window.location.href = "src/assets/html/product-page.html";
});

const button2 = document.querySelector<HTMLButtonElement>(".goToPage2");

button2?.addEventListener("click", () => {
  window.location.href = "src/assets/html/checkout-page.html";
});

const button3 = document.querySelector<HTMLButtonElement>(".goToPage3");

button3?.addEventListener("click", () => {
  window.location.href = "src/assets/html/order-complete-page.html";
});

cartIcon?.addEventListener("click", () => {
  cartOverlay?.classList.remove("invisible");
  renderCartProducts();
});

closeCart?.addEventListener("click", () => {
  cartOverlay?.classList.add("invisible");
});

cartOverlay?.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  if (!cartSection?.contains(e.target as Node)) {
    cartOverlay?.classList.add("invisible");
  }
  if (target.classList.contains("cart-product-trashcan")) {
    console.log(target.dataset.id);
    console.log("before:", localStorageCart);
    const filteredStorageCart = localStorageCart.filter((product) => {
      return product.id != Number(target.dataset.id);
    });
    localStorageCart = filteredStorageCart;
    localStorage.setItem("cart", JSON.stringify(filteredStorageCart));
    renderCartProducts();
  }
});

const renderCartProducts = async () => {
  let cartSectionHTML = "";
  let totalPrice = 0;
  localStorageCart.map((product: OneCandyData) => {
    totalPrice += product.price;
    cartSectionHTML += `
    <div class="row pb-2 pt-2 ${product.id}">
            <img
              src="${BASE_URL}${product.images.thumbnail}"
              class="cart-product-img img-thumbnail col-3 ms-3"
            />
            <h3 class="cart-product-header text-start col-4 d-flex flex-column">
              ${product.name}
              <span class="cart-product-trashcan mt-auto">- HG +</span>
            </h3>
            <h4
              class="cart-product-price col-3 d-flex flex-column align-items-end"
            >
              ${product.price}kr
              <span class="cart-product-trashcan mt-auto" data-id="${product.id}">🗑️</span>
            </h4>
          </div>
          `;
  });
  cartProductSection.innerHTML = cartSectionHTML;

  document.querySelector<HTMLParagraphElement>(
    ".total-price"
  )!.textContent = `${totalPrice}kr`;
};

const renderCandyProducts = async () => {
  const fetchedProducts = await getProductsData();
  //console.log(fetchedProducts);
  let renderCandyCards: string = "";
  console.log(fetchedProducts.data);

  fetchedProducts.data.map((product: CandyData) => {
    //console.log(product);
    renderCandyCards += `
    <div class="card" style="width: 18rem">
          <img
            src="${BASE_URL}${product.images.thumbnail}"
            class="card-img-top"
            alt="Bild på godis"
          />
          <div class="card-body">
            <h5 class="card-title candyCardTitle">${product.name}</h5>
            <p class="card-text">Pris: ${product.price}kr</p>
            <div class="d-flex gap-3 justify-content-center">
            <a href="#" class="btn candyCardBtn add-to-cart" data-id="${product.id}">Lägg i varukorg</a>
            <!--Ska ta användaren till produktens sida-->
            <a href="src/assets/html/product-page.html" class="goToProductPage btn candyCardBtn" data-id="${product.id}">Läs mer</a>
            </div>
          </div>
        </div>
    `;
  });
  candyCardMain.innerHTML = renderCandyCards;

  candyCardMain.addEventListener("click", async (e) => {
    const target = e.target as HTMLElement;

    if (target.classList.contains("add-to-cart")) {
      //Hämtar Produktdata
      const productData = await getOneProduct(Number(target.dataset.id));
      //Lägger till produkt i local storage
      console.log(productData.data);
      localStorageCart.push(productData.data);
      localStorage.setItem("cart", JSON.stringify(localStorageCart));
      console.log("LocalStorage/Kundvagn:", localStorageCart);
    }
    if (target.classList.contains("goToProductPage")) {
      localStorage.setItem("currentId", JSON.stringify(target.dataset.id));
    }
  });
};

//Hämtar kundvagn från LocalStorage
let localStorageCart: OneCandyData[] = JSON.parse(
  localStorage.getItem("cart") || "[]"
);
renderCandyProducts();
