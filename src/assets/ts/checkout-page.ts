import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../css/checkout-page.css";
import "../css/global.css";
import { arrowLeft } from "./selector";
import type { CandyData } from "./bortakvall-API.types";
import type { CandyDataOrderItem } from "./bortakvall-API.types";
import { checkoutCartListEl } from "./selector";

arrowLeft!.addEventListener("click", () => {
  window.location.href = "/";
});

let localStorageCart: CandyData[] = JSON.parse(
  localStorage.getItem("cart") || "[]"
);

let checkoutCart: CandyDataOrderItem[] = [];
let renderedItems: Number[] = [];
let totalPrice = 0;
let listHtml = "";

const renderCart = () => {
  localStorageCart.forEach((item) => {
    if (checkoutCart.some((cartItem) => item.id === cartItem.product_id)) {
      let existingCartItem = checkoutCart.find(
        (cartItem) => item.id === cartItem.product_id
      );
      existingCartItem!.qty++;
    } else {
      let candyDataOrderItem: CandyDataOrderItem = {
        product_id: item.id,
        product_name: item.name,
        qty: 1,
        item_price: item.price,
        item_total: 0,
      };
      checkoutCart.push(candyDataOrderItem);
      renderedItems.push(item.id);
    }
  });
};

const calculateItemTotal = () => {
  checkoutCart.forEach((item) => {
    item.item_total = item.qty * item.item_price;
  });
};

const showCart = () => {
  checkoutCart.forEach((item) => {
    listHtml += `<li>${item.qty}x ${item.product_name} - ${item.item_total} kr</li>`;
    totalPrice = totalPrice + item.item_total;
  });

  checkoutCartListEl!.innerHTML = listHtml;
  checkoutCartListEl!.innerHTML += `<li>Totalt - ${totalPrice} kr</li>`;
};

renderCart();
calculateItemTotal();
showCart();
