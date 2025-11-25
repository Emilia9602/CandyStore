import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../css/order-complete-page.css";
import { arrowLeft } from "./selector";

arrowLeft!.addEventListener("click", () => {
  window.location.href = "/";
});
