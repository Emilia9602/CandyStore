//Base Url
export const BASE_URL = "https://www.bortakvall.se";

export const arrowLeft = document.querySelector<HTMLElement>(
  ".fa-arrow-left-long"
)!;
export const startPageButton =
  document.querySelector<HTMLButtonElement>(".startpage-button")!;

//Cart
export const cartOverlay =
  document.querySelector<HTMLDivElement>(".cart-overlay")!;
export const cartIcon =
  document.querySelector<HTMLElement>(".fa-cart-shopping")!;
export const closeCart =
  document.querySelector<HTMLParagraphElement>(".cart-close-button")!;
export const cartSection =
  document.querySelector<HTMLDivElement>(".cart-section")!;
export const cartProductSection = document.querySelector<HTMLDivElement>(
  ".cart-product-section"
)!;
export const cartCheckoutButton = document.querySelector<HTMLButtonElement>(
  ".cart-checkout-button"
)!;

//Cards
export const candyCardMain =
  document.querySelector<HTMLDivElement>(".productPageMain")!;
export const addToCartButton =
  document.querySelector<HTMLAnchorElement>(".add-to-cart");

//Checkout-page
export const checkoutCartListEl =
  document.querySelector<HTMLDivElement>("#checkoutCartList");
export const submitBtn =
  document.querySelector<HTMLButtonElement>("#submitBtn")!;
export const checkoutForm =
  document.querySelector<HTMLFormElement>(".checkoutForm")!;
export const name = document.querySelector<HTMLInputElement>("#name")!;
export const surName = document.querySelector<HTMLInputElement>("#surname")!;
export const adress = document.querySelector<HTMLInputElement>("#adress")!;
export const postNr = document.querySelector<HTMLInputElement>("#postNum")!;
export const place = document.querySelector<HTMLInputElement>("#place")!;
export const phone = document.querySelector<HTMLInputElement>("#phone")!;
export const email = document.querySelector<HTMLInputElement>("#email")!;

//Product-page
export const oneProductMain =
  document.querySelector<HTMLDivElement>(".oneProductMain")!;
export const prodcutPage = document.querySelector<HTMLAnchorElement>(
  ".goToProductPage"!
);

//Order-Complete-page
export const completeDiv =
  document.querySelector<HTMLDivElement>(".completeDiv")!;

export const otherProductsCarousel = document.querySelector<HTMLDivElement>(
  ".other-products-carousel"
)!;
