import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./style.css";
import {
  cartOverlay,
  cartIcon,
  closeCart,
  cartSection,
  candyCardMain,
  BASE_URL,
  addToCartButton,
} from "./assets/ts/selector";
import { getProductsData, getOneProduct } from "./assets/ts/bortakvall-API";
import { type CandyData } from "./assets/ts/bortakvall-API.types";

const button = document.querySelector<HTMLButtonElement>(".goToPage")!;

button.addEventListener("click", () => {
  window.location.href = "src/assets/html/product-page.html";
});

const button2 = document.querySelector<HTMLButtonElement>(".goToPage2")!;

button2.addEventListener("click", () => {
  window.location.href = "src/assets/html/checkout-page.html";
});

const button3 = document.querySelector<HTMLButtonElement>(".goToPage3")!;

button3.addEventListener("click", () => {
  window.location.href = "src/assets/html/order-complete-page.html";
});

cartIcon?.addEventListener("click", () => {
  cartOverlay?.classList.remove("invisible");
});

closeCart?.addEventListener("click", () => {
  cartOverlay?.classList.add("invisible");
});

cartOverlay?.addEventListener("click", (e) => {
  if (!cartSection?.contains(e.target as Node)) {
    cartOverlay?.classList.add("invisible");
  }
});

const renderCandyProducts = async () => {
  const fetchedProducts = await getProductsData();
  //console.log(fetchedProducts);
  let renderCandyCards: string = "";

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
      localStorageCart.push(productData.data);
      localStorage.setItem("cart", JSON.stringify(localStorageCart));
      console.log("LocalStorage/Kundvagn:", localStorageCart);
    }
  });
};

//Hämtar kundvagn från LocalStorage
let localStorageCart: string[] = JSON.parse(
  localStorage.getItem("cart") || "[]"
);
renderCandyProducts();
