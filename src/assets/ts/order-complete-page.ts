import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../css/order-complete-page.css";
import "../css/global.css";
import { arrowLeft, startPageButton } from "./selector";
import type { completedOrder } from "./bortakvall-API.types";

arrowLeft!.addEventListener("click", () => {
  window.location.href = "/";
});
startPageButton!.addEventListener("click", () => {
  window.location.href = "/";
});

let orderFromLocalStorage: completedOrder[] = JSON.parse(
    localStorage.getItem("finishedOrder") || "[]"
  );

/*const orderSuccessOrFail = (orderFromLocalStorage: completedOrder) => {

  if(orderFromLocalStorage.status === "success")
};*/

console.log(orderFromLocalStorage);