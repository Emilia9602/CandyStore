//Import everything needed
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../css/cart.css";
import "../css/global.css";
import "../css/product-page.css";
import {
  arrowLeft,
  BASE_URL,
  oneProductMain,
  closeCart,
  cartIcon,
  cartOverlay,
  cartProductSection,
  cartCheckoutButton,
  cartSection,
  otherProductsCarousel,
} from "./selector";
import {
  getOneProduct,
  getProductsData
} from "./bortakvall-API";
import type {
  CartItem,
  productPageOneCandyData,
  OneCandyData,
  CandyData,
} from "./bortakvall-API.types";

//Go back one page
arrowLeft!.addEventListener("click", () => {
  window.location.href = `${import.meta.env.BASE_URL}`;
});

//Go to checkout-page from cart
cartCheckoutButton.addEventListener("click", () => {
  window.location.href = `${import.meta.env.BASE_URL}checkout-page.html`;
});

//Show cart
cartIcon?.addEventListener("click", () => {
  cartOverlay?.classList.remove("invisible");
  renderCartProducts();
});

//Hide cart
closeCart?.addEventListener("click", () => {
  cartOverlay?.classList.add("invisible");
});

//Get choosen product from local storage and parse
let localStorageCart: CartItem[] = JSON.parse(
  localStorage.getItem("cart") || "[]"
);

//Get amount of products in cart and show on cart icon
const getCartAmount = () => {
  let totalQty: number = 0;
  localStorageCart.forEach((product) => {
    totalQty += product.cartQty;
  });
  document.querySelector<HTMLSpanElement>(".cart-count")!.textContent =
    String(totalQty);
};

//Delete product from cart
const deleteProductFromCart = (id: number) => {
  const filteredStorageCart = localStorageCart.filter((product) => {
    return product.id != id;
  });
  localStorageCart = filteredStorageCart;
  localStorage.setItem("cart", JSON.stringify(filteredStorageCart));
  renderCartProducts();
};

//Render cart products
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

//Get choosen product from local storage and render on product-page
const renderCandyProduct = async () => {
  const currentId: string = localStorage.getItem("currentId") || "[]";

  const newId: number = JSON.parse(currentId);

  const fetchedProducts = await getOneProduct(newId);
  console.log(fetchedProducts.data);
  renderCandyData(fetchedProducts.data);

  if (fetchedProducts.data.stock_status === "outofstock") {
    const addBtn = document
      .querySelector<HTMLButtonElement>(".add-to-cart")!
    addBtn.classList.add("disabled");
    addBtn.textContent = "Ej i lager"
    document.querySelector(".stock-wrapper")!.innerHTML = `
      <i class="fa-solid fa-circle-xmark text-danger fs-5"></i>
      <p class="m-0 ms-2">(0) I lager</p>
    `;
  }
};

//Get six random products to show underneath main product
const getRandomSix = (arr: CandyData[]) => {
  const copy = [...arr];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy.slice(0, 6);
};
//Render six random products underneath main product
const renderOtherProducts = async () => {
  const fetchedProducts = await getProductsData();
  const otherProducts = getRandomSix(fetchedProducts.data);
  let otherProductsList = "";

  otherProducts.map((product) => {
    const onSale = product.on_sale;
    const saleIcon = onSale
      ? `<span class="badge bg-danger w-100 rounded-bottom-0 fs-6">EXTRA PRIS!</span>`
      : "";
    otherProductsList += `
    <div class="other-product-container" data-id=${product.id}>
    ${saleIcon}
      <img src="${BASE_URL}${product.images.large}" />
      <div class="other-rating-star py-2 px-2 fs-6">
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
      </div>
      <div class="other-product-info px-2">
        <p class="other-product-name mb-1">${product.name}</p>
        <p class="other-product-price mb-0">${product.price}kr</p>
      </div>
    </div>
    `;
  });
  otherProductsCarousel.innerHTML = otherProductsList;
};

//Listener for the six random products to go to their product-page
otherProductsCarousel.addEventListener("click", (e) => {
  const target = e.target as HTMLElement;

  if (target.closest(".other-product-container")) {
    const cardEl = target.closest(".other-product-container") as HTMLElement;
    const currentId = cardEl.dataset.id;
    localStorage.setItem("currentId", JSON.stringify(currentId));
    window.location.href = `${import.meta.env.BASE_URL}product-page.html`;
  }
});

//Render choosen product on product-page
const renderCandyData = (product: productPageOneCandyData) => {
  let renderCandy: string = "";

  const onSale = product.on_sale;
  const saleIcon = onSale
    ? `<span class="badge bg-danger fs-6 mb-auto">EXTRA PRIS!</span>`
    : "";

  renderCandy += `
  
      <div class="product-img-info-container row justify-content-center mt-5">
        <div class="img-cotnainer col-12 col-lg-6 d-flex flex-column">
          <img src="${BASE_URL}${product.images.large}" alt="Bild på godiset" class="product-img img-fluid">
        </div>
        <div class="product-info col-12 col-lg-6 d-flex flex-column mt-4 mt-lg-0">
          <div class="card mb-md-4">
            <div class="card-body p-xxl-4">
            <div class="d-flex justify-content-between">
            <h5 class="card-title fs-3">${product.name}</h5>
              ${saleIcon}
            </div>
              <div class="rating-wrapper d-flex align-items-center">
                <div class="rating-star">
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                </div>
                <p class="mx-2 my-0">(14)</p>
              </div>        
              <p class="card-text mt-2 fs-1 mb-1">${product.price}kr</p>
              <hr class="mt-0 mb-4">
              <div class="stock-wrapper d-flex align-items-center">
                <i class="fa-solid fa-circle-check text-success fs-5"></i> 
                <p class="m-0 ms-2">(${product.stock_quantity}) I lager</p>
              </div>
              <div class="description-container">
              <p class="card-text mt-4 fs-4">Beskrivning:</p>
              <p class="card-text mt-3">${product.description}</p>
              <div>
              <button class="add-to-cart btn btn-light mt-3 d-block m-auto" data-id="${product.id}">
                Lägg till i varukorgen
              </button>
            </div>
          </div>
        </div>
      </div>
`;
  oneProductMain.innerHTML = renderCandy;
};

//Listener to add product to cart
oneProductMain.addEventListener("click", async (e) => {
  const target = e.target as HTMLElement;
  if (target.classList.contains("add-to-cart")) {

    //Get productdata
    const productData: OneCandyData = await getOneProduct(
      Number(target.dataset.id)
    );

    //Add product to local storage
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
});

//Listener on cart and activate clicked function
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

//Activate functions
getCartAmount();
renderCandyProduct();
renderOtherProducts();