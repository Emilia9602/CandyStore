//Import everything needed
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./style.css";
import "./assets/css/cart.css";
import "./assets/css/global.css";
import {
  cartOverlay,
  cartIcon,
  closeCart,
  cartSection,
  cartProductSection,
  cartCheckoutButton,
  candyCardMain,
  BASE_URL,
  sortButton,
  restoreButton,
} from "./assets/ts/selector";
import { getProductsData, getOneProduct } from "./assets/ts/bortakvall-API";
import {
  type CandyData,
  type CartItem,
  type OneCandyData,
} from "./assets/ts/bortakvall-API.types";

cartIcon?.addEventListener("click", () => {
  cartOverlay?.classList.remove("invisible");
  renderCartProducts();
});

closeCart?.addEventListener("click", () => {
  cartOverlay?.classList.add("invisible");
});

cartCheckoutButton.addEventListener("click", () => {
  window.location.href = "/src/assets/html/checkout-page.html";
});

const deleteProductFromCart = (id: number) => {
  const filteredStorageCart = localStorageCart.filter((product) => {
    return product.id != id;
  });
  localStorageCart = filteredStorageCart;
  localStorage.setItem("cart", JSON.stringify(filteredStorageCart));
  renderCartProducts();
};

const getCartAmount = () => {
  let totalQty: number = 0;
  localStorageCart.forEach((product) => {
    totalQty += product.cartQty;
  });
  document.querySelector<HTMLSpanElement>(".cart-count")!.textContent =
    String(totalQty);
};

cartOverlay?.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;
  if (!cartSection?.contains(e.target as Node)) {
    cartOverlay?.classList.add("invisible");
  }
  if (target.classList.contains("cart-product-trashcan")) {
    const currentId = Number(target.dataset.id);
    deleteProductFromCart(currentId);
    getCartAmount();
  }
  if (target.classList.contains("increase-qty")) {
    const productUpdate = localStorageCart.find((product) => {
      return product.id === Number(target.dataset.id);
    });

    if (!productUpdate) return;

    productUpdate.cartQty += 1;
    localStorage.setItem("cart", JSON.stringify(localStorageCart));
    getCartAmount();
    renderCartProducts();
  }
  if (target.classList.contains("decrease-qty")) {
    const prodcutUpdate = localStorageCart.find((product) => {
      return product.id === Number(target.dataset.id);
    });

    if (!prodcutUpdate) return;

    prodcutUpdate.cartQty -= 1;

    if (prodcutUpdate.cartQty === 0) {
      const currentId = Number(target.dataset.id);
      getCartAmount();
      deleteProductFromCart(currentId);
    } else {
      localStorage.setItem("cart", JSON.stringify(localStorageCart));
      getCartAmount();
      renderCartProducts();
    }
  }
});

const renderCartProducts = async () => {
  let cartSectionHTML = "";
  let totalPrice = 0;
  localStorageCart.map((product: CartItem) => {
    totalPrice += product.price * product.cartQty;
    cartSectionHTML += `
    <div class="row pb-2 pt-2 ${product.id}">
            <img
              src="${BASE_URL}${product.images.thumbnail}"
              class="cart-product-img img-thumbnail col-3 ms-3"
            />
            <h3 class="cart-product-header text-start col-4 d-flex flex-column">
              ${product.name}
              <div class="mt-auto">
                <ul class="pagination pagination-sm m-0">
                  <li class="page-item"><p class="decrease-qty page-link m-0" data-id="${product.id}">-</p></li>
                  <li class="page-item"><p class="page-link m-0">${product.cartQty}</p></li>
                  <li class="page-item"><p class="increase-qty page-link m-0" data-id="${product.id}">+</p></li>
                </ul>
              </div>
            </h3>
            <h4
              class="cart-product-price col-3 d-flex flex-column align-items-end"
            >
              ${product.cartQty}x ${product.price}kr
              <i class="fa-solid fa-trash-can cart-product-trashcan mt-auto" data-id="${product.id}"></i>
            </h4>
          </div>
          `;
  });
  cartProductSection.innerHTML = cartSectionHTML;

  document.querySelector<HTMLParagraphElement>(
    ".total-price"
  )!.textContent = `${totalPrice}kr`;
};

const sortProductsByName = (arr: CandyData[]) => {
  arr.sort((a: CandyData, b: CandyData) => a.name.localeCompare(b.name));
};

const sortProductsByNameReverse = (arr: CandyData[]) => {
  arr.sort((a: CandyData, b: CandyData) => b.name.localeCompare(a.name));
};

const renderCandyProductsSorted = (products: CandyData[]) => {
  let renderCandyCards: string = "";

  products.map((product) => {

    renderCandyCards += `
        <div class="card" data-id="${product.id}">
          <img
            src="${BASE_URL}${product.images.thumbnail}"
            class="card-img-top"
            alt="Bild på godis"
          />
          <div class="card-body d-flex flex-column p-3">
            <h5 class="card-title candyCardTitle">${product.name}</h5>
            <p class="card-text">Pris: ${product.price}kr</p>
            <div class="card-button-container d-flex gap-1 justify-content-between mt-auto">
            <button class="btn btn-light btn-sm add-to-cart" data-id="${product.id}">
              Lägg i varukorg
            </button>
            <a href="src/assets/html/product-page.html"
              class="btn btn-light btn-sm goToProductPage"
              data-id="${product.id}">
              <i class="fa-solid fa-circle-info"></i>
            </a>
            </div>
          </div>
        </div>
    `;
  });
  candyCardMain.innerHTML = renderCandyCards;
};

restoreButton.addEventListener("click", () => {
  renderCandyProducts();
});

//Render all the candy cards on first page
const renderCandyProducts = async () => {
  const fetchedProducts = await getProductsData();
  const fetchedProductsWithoutData = fetchedProducts.data;
  let sorted = false;
  sortButton.addEventListener("click", () => {
    if (!sorted) {
      sortProductsByName(fetchedProductsWithoutData);
      renderCandyProductsSorted(fetchedProductsWithoutData);
    } else {
      sortProductsByNameReverse(fetchedProductsWithoutData);
      renderCandyProductsSorted(fetchedProductsWithoutData);
    }

    sorted = !sorted;
  });

  let renderCandyCards: string = "";
  let countCandyInstock = 0;
  let countCandy = 0;
  fetchedProductsWithoutData.map((product: CandyData) => {
    const onSale = product.on_sale;
    console.log(onSale);
    const saleIcon = onSale
    ? `<span class="badge bg-danger">EXTRAPRIS!</span>`
    : "";
    
    countCandy++;
    if (product.stock_status === "instock") {
      countCandyInstock++;
      renderCandyCards += `
        <div class="card candyCard" data-id="${product.id}">
        ${saleIcon}
          <img
            src="${BASE_URL}${product.images.thumbnail}"
            class="card-img-top"
            alt="Bild på godis"
          />
          <div class="card-body d-flex flex-column p-3">
            <h5 class="card-title candyCardTitle">${product.name}</h5>
            <p class="card-text">Pris: ${product.price}kr</p>
            <div class="card-button-container d-flex gap-1 justify-content-between mt-auto">
            <button class="btn btn-light btn-sm add-to-cart" data-id="${product.id}">
              Lägg i varukorg
            </button>
            <a href="src/assets/html/product-page.html"
              class="btn btn-light btn-sm goToProductPage"
              data-id="${product.id}">
              <i class="fa-solid fa-circle-info"></i>
            </a>
            </div>
          </div>
        </div>
    `;
    } else if (product.stock_status === "outofstock") {
      renderCandyCards += `
        <div class="card candyCard" data-id="${product.id}">
          <img
            src="${BASE_URL}${product.images.thumbnail}"
            class="card-img-top"
            alt="Bild på godis"
          />
          <div class="card-body d-flex flex-column p-3">
            <h5 class="card-title candyCardTitle">${product.name}</h5>
            <p class="card-text">Pris: ${product.price}kr</p>
            <div class="card-button-container d-flex gap-1 justify-content-between mt-auto">
            <button class="btn btn-light btn-sm add-to-cart" disabled>
              Ej i lager
            </button>
            <a href="src/assets/html/product-page.html"
              class="btn btn-light btn-sm goToProductPage"
              data-id="${product.id}">
              <i class="fa-solid fa-circle-info"></i>
            </a>
            </div>
          </div>
        </div>
    `;
    }
  });

  //Shows productcount on first page
  document.querySelector(".count-candy")!.innerHTML = `
  <p class="m-0 btn btn-light btn-sm">${countCandyInstock} i lager</p>
  <p class="m-0 btn btn-light btn-sm">Antal: ${countCandy}</p>
  `;
  candyCardMain.innerHTML = renderCandyCards;

  candyCardMain.addEventListener("click", async (e) => {
    const target = e.target as HTMLElement;

    if (target.classList.contains("add-to-cart")) {
      //Hämtar Produktdata
      const productData: OneCandyData = await getOneProduct(
        Number(target.dataset.id)
      );
      //Lägger till produkt i local storage
      const existing = localStorageCart.find(
        (item) => item.id === productData.data.id
      );
      if (existing) {
        existing.cartQty += 1;
      } else {
        localStorageCart.push({ ...productData.data, cartQty: 1 });
      }
      localStorage.setItem("cart", JSON.stringify(localStorageCart));
      getCartAmount();
    }
    if (
      target.classList.contains("goToProductPage") ||
      (target.closest(".card") && !target.classList.contains("add-to-cart"))
    ) {
      const card = target.closest(".card") as HTMLElement;
      if (!card) return;
      console.log(target.parentElement);

      const id = card.dataset.id;
      console.log(id);
      localStorage.setItem("currentId", JSON.stringify(id));
      window.location.href = "/src/assets/html/product-page.html";
    }
  });
};

//ska inte va kvar
  candyCardMain.addEventListener("click", async (e) => {

  const target = e.target as HTMLElement;

  if (target.classList.contains("card")) {
    const productData: OneCandyData = await getOneProduct (Number(target.dataset.id));
    console.log(productData);
  }
})
//

//Hämtar kundvagn från LocalStorage
let localStorageCart: CartItem[] = JSON.parse(
  localStorage.getItem("cart") || "[]"
);

//Activate functions
getCartAmount();
renderCandyProducts();
