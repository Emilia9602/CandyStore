import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../css/product-page.css";
import "../css/global.css";
import { arrowLeft, BASE_URL, oneProductMain } from "./selector";
import { getOneProduct } from "./bortakvall-API";
import type { productPageOneCandyData } from "./bortakvall-API.types";

arrowLeft!.addEventListener("click", () => {
  window.location.href = "/";
});

//Render one Candy
const renderCandyProduct = async () => {
  const currentId: string = localStorage.getItem("currentId") || "[]";
  console.log("inside:", currentId);
  const newId: number = JSON.parse(currentId);
  console.log(newId);
  const fetchedProducts = await getOneProduct(newId);
  console.log(fetchedProducts);

  renderCandyData(fetchedProducts.data);
};

const renderCandyData = (product: productPageOneCandyData) => {
  console.log(product);
  let renderCandy: string = "";
  renderCandy += `
      <div class="row justify-content-center mt-5">
        <div class="col-12 col-md-8 col-lg-6 d-flex flex-column">
          <img src="${BASE_URL}${product.images.large}" alt="Bild på godiset" class="img-fluid">
        </div>
        <div class="row justify-content-center mt-5">
          <div class="card text-center col-12 col-md-8 col-lg-6 d-flex flex-column">
            <div class="card-body">
              <h5 class="card-title">${product.name}</h5>
              <p class="card-text">Pris: ${product.price}kr</p>
              <hr>
              <p class="card-text">Beskrivning: ${product.description}</p>
            </div>
          </div>
        </div>
        <div class="text-center">
          <button class="btn btn-dark fw-bold mt-3">
            Lägg till i varukorgen
          </button>
        </div>
      </div>`;
  oneProductMain.innerHTML = renderCandy;
};

renderCandyProduct();
