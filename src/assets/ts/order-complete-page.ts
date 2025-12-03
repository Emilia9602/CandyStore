import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../css/order-complete-page.css";
import "../css/global.css";
import { arrowLeft, startPageButton, completeDiv } from "./selector";
import type { completedOrder } from "./bortakvall-API.types";

arrowLeft!.addEventListener("click", () => {
  window.location.href = "/";
});
startPageButton!.addEventListener("click", () => {
  window.location.href = "/";
});

let orderFromLocalStorage: completedOrder = JSON.parse(
    localStorage.getItem("finishedOrder") || "[]"
  );;

const orderSuccessOrFail = (data: completedOrder) => {

  if(data.status === "success") {
    completeDiv.innerHTML = `
          <h2 class="pb-3 pt-3">Ordernummer: ${data.data.id}</h2>
          <h3 class="pt-2">Tack för din beställning! 🎉</h3>
          <p class="mt-3">
            Din order är nu på väg. Vi hoppas du får en riktigt trevlig
            Bortakväll!
          </p>
          <button class="startpage-button btn btn-secondary mt-4 mb-3">
            Gå till startsidan
          </button>`
  } else {
    completeDiv.innerHTML = `
          <h2 class="pb-3 pt-3">Error</h2>
          <h3 class="pt-2">Din beställning kunde inte genomföras</h3>
          <p class="mt-3">
            Vad felet är?
          </p>
          <button class="startpage-button btn btn-secondary mt-4 mb-3">
            Gå till startsidan
          </button>`
  }
};

console.log(orderFromLocalStorage);
orderSuccessOrFail(orderFromLocalStorage);