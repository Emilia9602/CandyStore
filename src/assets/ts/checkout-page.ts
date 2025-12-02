import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../css/checkout-page.css";
import "../css/global.css";
import { arrowLeft } from "./selector";
import type { CandyData, CartItem } from "./bortakvall-API.types";
import type { CandyDataOrderItem, orderData, oneCandyOrderData } from "./bortakvall-API.types";
import { OrderComplete } from "./bortakvall-API";
import {
  checkoutCartListEl,
  BASE_URL,
  submitBtn,
  checkoutForm,
} from "./selector";

arrowLeft!.addEventListener("click", () => {
  window.location.href = "/";
});

let localStorageCart: CartItem[] = JSON.parse(
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
        qty: item.cartQty,
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

const order: orderData = {
  customer_first_name: "",
  customer_last_name: "",
  customer_address: "",
  customer_postcode: "",
  customer_city: "",
  customer_email: "",
  customer_phone: "",
  order_total: 0,
  order_items: [],
};

/*let wantThisCandy: oneCandyOrderData = {
  product_id: 0,
  qty: 0,
  item_price: 0,
  item_total: 0,
}*/
//let wantThisCandy: oneCandyOrderData[] = [];

const name = document.querySelector<HTMLInputElement>("#name")!;
const surName = document.querySelector<HTMLInputElement>("#surname")!;
const adress = document.querySelector<HTMLInputElement>("#adress")!;
const postNr = document.querySelector<HTMLInputElement>("#postNum")!;
const place = document.querySelector<HTMLInputElement>("#place")!;
const phone = document.querySelector<HTMLInputElement>("#phone")!;
const email = document.querySelector<HTMLInputElement>("#email")!;

checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();
  order.customer_first_name = name.value;
  order.customer_last_name = surName.value;
  order.customer_address = adress.value;
  order.customer_postcode = postNr.value;
  order.customer_city = place.value;
  order.customer_email = email.value;
  order.customer_phone = phone.value;

  order.order_items.map((item) => {
    checkoutCart.forEach((product) => {
      item.product_id = product.product_id;
      item.qty = product.qty;
      item.item_price = product.item_price;
      item.item_total = product.item_total;
    });
  });

  console.log(order.order_items);
  });

  //order.customer_postcode = postNr.value;
//});

console.log(checkoutCart);

renderCart();
calculateItemTotal();
showCart();
