//Import everything needed
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../css/order-complete-page.css";
import "../css/global.css";
import {
  arrowLeft,
  startPageButton,
  completeDiv
} from "./selector";
import type {
  completedOrder,
  CartItem,
  orderNamesArrayType
} from "./bortakvall-API.types";

//Go back one page
arrowLeft!.addEventListener("click", () => {
  window.location.href = "/";
});

//Go to start-page
startPageButton!.addEventListener("click", () => {
  window.location.href = "/";
});

//Get finished order from local storage and parse
let orderFromLocalStorage: completedOrder = JSON.parse(
  localStorage.getItem("finishedOrder") || "[]"
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
    let cartItem: CartItem = {
      id: item.id,
      name: item.name,
      description: item.description,
      price: item.price,
      cartQty: item.cartQty,
      on_sale: item.on_sale,
      images: item.images
    }
    orderNames.items.push(cartItem);
  });
}

//Function to show success or fail order on complete-page
const orderSuccessOrFail = (data: completedOrder) => {

  if (data.status === "success") {
    completeDiv.innerHTML = `
          <h2 class="pb-3 pt-3">Ordernummer: ${data.data.id}</h2>
          <h3 class="pt-2">Tack för din beställning! 🎉</h3>
          <p class="mt-3">
            Din order är nu på väg. Vi hoppas du får en riktigt trevlig
            Bortakväll!
          </p>
          <p id="orderP">Beställning:</p>
          <ul id="orderNamesUl"></ul>
          <button class="startpage-button btn btn-secondary mt-4 mb-3">
            Gå till startsidan
          </button>`;

    const orderNamesUl =
      document.querySelector<HTMLUListElement>("#orderNamesUl")!;

    orderNames.items.forEach((item) => {
      orderNamesUl.innerHTML += `
      <li>${item.cartQty}st - ${item.name}</li>`
    });
    
  } else {
    completeDiv.innerHTML = `
          <h2 class="pb-3 pt-3">Vi ber om ursäkt!</h2>
          <h3 class="pt-2">Din beställning kunde inte genomföras</h3>
          <p class="mt-3">
            ${data.message}
          </p>
          <button class="startpage-button btn btn-secondary mt-4 mb-3">
            Gå till startsidan
          </button>`
  }
};

//Activate functions
getOrderNames();
orderSuccessOrFail(orderFromLocalStorage);