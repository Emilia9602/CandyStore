import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../css/checkout-page.css";
import { arrowLeft } from "./selector";

arrowLeft!.addEventListener("click", () => {
  window.location.href = "/";
});
