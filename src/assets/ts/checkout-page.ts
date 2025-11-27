import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "../css/checkout-page.css";
import { arrowLeft } from "./selector";

arrowLeft!.addEventListener("click", () => {
  window.location.href = "/";
});

const testArr = [
  {
    "id": 5216,
    "name": "Gott & Blandat Giants",
    "price": 12,
    "on_sale": false,
    "images": {
        "thumbnail": "/storage/products/thumbnails/1997509-300x300.png",
        "large": "/storage/products/1997509.png"
    },
    "stock_status": "instock",
    "stock_quantity": 5,
    "tags": [
        {
            "id": 113,
            "name": "Gelatinfri",
            "slug": "gelatinfri"
        }
    ]
},
{
    "id": 6545,
    "name": "Banana Bubs",
    "price": 8,
    "on_sale": false,
    "images": {
        "thumbnail": "/storage/products/thumbnails/156622-300x300.png",
        "large": "/storage/products/156622.png"
    },
    "stock_status": "instock",
    "stock_quantity": 8,
    "tags": [
        {
            "id": 113,
            "name": "Gelatinfri",
            "slug": "gelatinfri"
        },
        {
            "id": 114,
            "name": "Palmoljefri",
            "slug": "palmoljefri"
        },
        {
            "id": 115,
            "name": "Vegansk",
            "slug": "vegansk"
        }
    ]
},
{
    "id": 6563,
    "name": "Banana Splits",
    "price": 8,
    "on_sale": false,
    "images": {
        "thumbnail": "/storage/products/thumbnails/3827741-300x300.png",
        "large": "/storage/products/3827741.png"
    },
    "stock_status": "instock",
    "stock_quantity": 6,
    "tags": [
        {
            "id": 113,
            "name": "Gelatinfri",
            "slug": "gelatinfri"
        },
        {
            "id": 114,
            "name": "Palmoljefri",
            "slug": "palmoljefri"
        }
    ]
}
];

import { checkoutCartListEl } from "./selector";

let listHtml = "";
let total = 0;

testArr.forEach((product) => {
  listHtml += `<li>${product.name} - ${product.price} kr</li>`;
  total += Number(product.price);
});

checkoutCartListEl!.innerHTML = listHtml;
checkoutCartListEl!.innerHTML += `<li>Totalt - ${total} kr</li>`;
