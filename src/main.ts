import "bootstrap/dist/css/bootstrap.css";
import "./style.css";

const button = document.querySelector<HTMLButtonElement>(".goToPage")!;

button.addEventListener("click", () => {
  window.location.href = "src/assets/html/product-page.html";
});
