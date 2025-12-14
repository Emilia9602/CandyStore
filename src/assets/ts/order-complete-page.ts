//Import everything needed
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../css/order-complete-page.css";
import "../css/global.css";
import { arrowLeft, completeDiv, BASE_URL } from "./selector";
import type {
  ApiCompletedOrder,
  CartItem,
  orderNamesArrayType,
} from "./bortakvall-API.types";

//Go back one page
arrowLeft!.addEventListener("click", () => {
  window.location.href = `${import.meta.env.BASE_URL}`;
});

//Get finished order from local storage and parse
let orderFromLocalStorage: ApiCompletedOrder = JSON.parse(
  localStorage.getItem("finishedOrder") || "{}"
);

//Get cart from local storage and parse
let cartFromLocalStorage: CartItem[] = JSON.parse(
  localStorage.getItem("cart") || "[]"
);

//Create variable to put cart items into array
let orderNames: orderNamesArrayType = {
  items: [],
};

//Put cart from local storage in to orderNames array
const getOrderNames = () => {
  cartFromLocalStorage.forEach((item) => {
    const cartItem: CartItem = {
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      cartQty: item.cartQty,
      on_sale: item.on_sale,
      images: item.images,
      stock_quantity: item.stock_quantity,
      stock_status: item.stock_status,
    };

    orderNames.items.push(cartItem);
  });
};

//Function to show success or fail order on complete-page
const orderSuccessOrFail = (data: ApiCompletedOrder) => {
  if (data.status === "success") {
    completeDiv.innerHTML = `
          <h2 class=" pt-3 fs-1">Ordernummer: ${data.data.id}</h2>
          <i class="fa-solid fa-circle-check fs-1 text-success d-block py-2 m-auto"></i>
          <h3 class="pt-2 fs-2">Tack för din beställning!</h3>
          <p class="mt-3 px-4 py-2">
            Din order är nu på väg. Vi hoppas du får en riktigt trevlig
            Bortakväll!
          </p>
          <p id="orderP" class="fs-2 mb-0 mt-4">Beställning:</p>
          <div id="orderNamesUl" class="p-3 gap-1"></div>
          <button class="startpage-button btn btn-light mt-4 mb-4 fs-5">
            Gå till startsidan ➜
          </button>
          `;

    const orderNamesUl =
      document.querySelector<HTMLUListElement>("#orderNamesUl")!;
    let totalPrice = 0;
    orderNames.items.forEach((item) => {
      totalPrice += item.price * item.cartQty;
      orderNamesUl.innerHTML += `
      <div class="row px-2 mb-2 d-flex">
        <img src="${BASE_URL}${item.images.thumbnail}" class="col-3 rounded-3 p-0">
        <p class="col-5 text-start">${item.name}</p>
        <p class="col-4 text-end">${item.cartQty}x ${item.price}kr</p>
      </div>
      `;
    });
    orderNamesUl.innerHTML += `
    <hr>
    <div class="d-flex justify-content-between">
      <p>Totalt:</p>
      <p class="fs-4">${totalPrice}kr</p>
    </div>
    `;
  } else {
    completeDiv.innerHTML = `
          <h2 class="pb-3 pt-3">Vi ber om ursäkt!</h2>
          <h3 class="pt-2">Din beställning kunde inte genomföras</h3>
          <p class="mt-3">
            ${data.message}
          </p>
          <button class="startpage-button btn btn-secondary mt-4 mb-3">
            Gå till startsidan
          </button>
          `;
  }

  //Go to start-page
  document.querySelector(".startpage-button")!.addEventListener("click", () => {
    window.location.href = `${import.meta.env.BASE_URL}`;
  });
};

//Activate functions
getOrderNames();
orderSuccessOrFail(orderFromLocalStorage);
