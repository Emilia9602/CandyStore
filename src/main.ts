import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./style.css";
import {
  cartOverlay,
  cartIcon,
  closeCart,
  cartSection,
} from "./assets/ts/selector";

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
