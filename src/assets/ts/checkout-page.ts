//Import everything needed
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../css/checkout-page.css";
import "../css/global.css";
import type {
  CandyDataOrderItem,
  orderData,
  oneCandyOrderData,
  completedOrder,
  CartItem
} from "./bortakvall-API.types";
import {
  OrderComplete
} from "./bortakvall-API";
import {
  checkoutCartListEl,
  checkoutForm,
  arrowLeft,
  name, surName, adress, postNr, place, phone, email
} from "./selector";

//Go back one page
arrowLeft!.addEventListener("click", () => {
  window.location.href = "/";
});

//Create variables
let localStorageCart: CartItem[] = JSON.parse(
  localStorage.getItem("cart") || "[]"
);

let checkoutCart: CandyDataOrderItem[] = [];
let renderedItems: Number[] = [];
let totalPrice = 0;
let listHtml = "";

let wantThisCandy: oneCandyOrderData[] = [];
let finishedOrder: completedOrder[] = [];

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

//Show orderded products on checkout-page
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

//Get orderded products to correct type in new array
const getOrderItems = () => {
  checkoutCart.forEach((product) => {
    let oneCandyOrderData: oneCandyOrderData = {
      product_id: product.product_id,
      qty: product.qty,
      item_price: product.item_price,
      item_total: product.item_total
    };
    wantThisCandy.push(oneCandyOrderData);
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
    window.location.href = "/src/assets/html/order-complete-page.html";
  } catch (Error) {
    console.log(Error);
  }
});

//Activate functions
renderCart();
calculateItemTotal();
showCart();
getOrderItems();