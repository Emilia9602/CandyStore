export const BASE_URL = "https://www.bortakvall.se";

//Page for HTML-Element (document.querySelector)

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

//Cards
export const candyCardDiv =
  document.querySelector<HTMLDivElement>(".candyCardDiv")!;
export const candyCardMain =
  document.querySelector<HTMLDivElement>(".productPageMain")!;
