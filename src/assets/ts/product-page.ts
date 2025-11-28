import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../css/product-page.css";
import { arrowLeft, BASE_URL, oneProductMain } from "./selector";
import { getProductsData, getOneProduct } from "./bortakvall-API";
import type { CandyData, OneCandyData } from "./bortakvall-API.types";

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
  console.log(fetchedProducts.data);
  let renderCandy: string = "";

  fetchedProducts.data.map((product: OneCandyData) => {
    console.log(product);
    renderCandy += `
      <div class="row justify-content-center mt-5">
        <div class="col-12 col-md-8 col-lg-6 d-flex flex-column">
          <img src="${BASE_URL}${product.data.images.large}" alt="Bild på godiset" class="img-fluid">
        </div>
        <div>
          <div class="card text-center">
            <div class="card-body">
              <h5 class="card-title">${product.data.name}</h5>
              <p class="card-text">Pris: ${product.data.price}</p>
              <hr>
              <p class="card-text">Beskrivning av godis</p>
            </div>
          </div>
        </div>
        <div class="text-center">
          <button class="btn btn-dark fw-bold mt-3">
            Lägg till i varukorgen
          </button>
        </div>
      </div>`;
  });
  oneProductMain.innerHTML = renderCandy;
};
renderCandyProduct();
