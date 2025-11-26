import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./style.css";

import { getProductsData } from "./assets/ts/bortakvall-API";

import { candyCardDiv } from "./assets/ts/selector";

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

const productButton = document.querySelector<HTMLButtonElement>(".goToProductPage")!;

productButton.addEventListener("click", () => {
  window.location.href = "src/assets/html/product-page.html";
});

const renderCandyProducts = async () => {
  const fetchedProduct = await getProductsData();
  console.log(fetchedProduct);
};
renderCandyProducts();