//Import everything needed
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../css/checkout-page.css";
import "../css/global.css";
import type {
  CheckoutCartItem,
  CreateOrderRequest,
  CreateOrderItemRequest,
  CartItem,
  ApiCompletedOrder,
} from "./bortakvall-API.types";
import { OrderComplete } from "./bortakvall-API";
import {
  checkoutCartListEl,
  checkoutForm,
  arrowLeft,
  name,
  surName,
  adress,
  postNr,
  place,
  phone,
  email,
  BASE_URL,
} from "./selector";

//Go back one page
arrowLeft!.addEventListener("click", () => {
  window.location.href = `${import.meta.env.BASE_URL}`;
});

//Create variables
let localStorageCart: CartItem[] = JSON.parse(
  localStorage.getItem("cart") || "[]"
);

let renderedItems: Number[] = [];
let totalPrice = 0;
let listHtml = "";

let checkoutCart: CheckoutCartItem[] = [];
let wantThisCandy: CreateOrderItemRequest[] = [];
let finishedOrder: ApiCompletedOrder | null = null; // ÄNDRA

const order: CreateOrderRequest = {
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

//Push cart and id in new arrays
const renderCart = () => {
  localStorageCart.forEach((item) => {
    if (checkoutCart.some((cartItem) => item.id === cartItem.product_id)) {
      let existingCartItem = checkoutCart.find(
        (cartItem) => item.id === cartItem.product_id
      );
      existingCartItem!.qty++;
    } else {
      let candyDataOrderItem: CheckoutCartItem = {
        product_id: item.id,
        product_name: item.name,
        images: { thumbnail: item.images.thumbnail, large: item.images.large },
        qty: item.cartQty,
        item_price: item.price,
        item_total: 0,
      };
      checkoutCart.push(candyDataOrderItem);
      renderedItems.push(item.id);
    }
  });
};

//Calculate total price
const calculateItemTotal = () => {
  checkoutCart.forEach((item) => {
    item.item_total = item.qty * item.item_price;
  });
};

//Show ordered products on checkout-page
const showCart = () => {
  checkoutCart.forEach((item) => {
    listHtml += `
    <div class="row p-2 product-checkout-section">
      <img src="${BASE_URL}${item.images.thumbnail}" class="col-3 checkout-product-image rounded-3 p-0">
      <p class="col-5 text-start fs-xl-5">${item.product_name}</p>
      <p class="col-5 text-end pe-2">${item.qty}x ${item.item_price}kr</p>
    </div>
    `;
    totalPrice = totalPrice + item.item_total;
  });

  checkoutCartListEl!.innerHTML += listHtml;

  document.querySelector(".checkoutTotal")!.innerHTML += `
    <hr>
    <div class="d-flex justify-content-between px-2">
      <p>Totalt:</p>
      <p class="fs-4">${totalPrice}kr</p>
    </div>
    `;
};

//Get orderded products to correct type in new array
const getOrderItems = () => {
  wantThisCandy = [];
  checkoutCart.forEach((product) => {
    const item: CreateOrderItemRequest = {
      product_id: product.product_id,
      qty: product.qty,
      item_price: product.item_price,
      item_total: product.item_total,
    };
    wantThisCandy.push(item);
  });
};

//Listener for when order is done and put finished order in localStorage
checkoutForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  order.customer_first_name = name.value;
  order.customer_last_name = surName.value;
  order.customer_address = adress.value;
  order.customer_postcode = postNr.value;
  order.customer_city = place.value;
  order.customer_email = email.value;
  order.customer_phone = phone.value;
  order.order_total = totalPrice;
  order.order_items = wantThisCandy;

  try {
    finishedOrder = await OrderComplete(order);
    localStorage.setItem("finishedOrder", JSON.stringify(finishedOrder));
    window.location.href = `${
      import.meta.env.BASE_URL
    }order-complete-page.html`;
  } catch (Error) {
    console.log(Error);
  }
});

//Activate functions
renderCart();
calculateItemTotal();
showCart();
getOrderItems();
