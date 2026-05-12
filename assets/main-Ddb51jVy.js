import{c as p,a as l,b as v,d as $,e as k,B as r,f as P,r as S,s as C,g as n}from"./selector-C0W9yTxM.js";/* empty css             */import{g as x,a as L}from"./bortakvall-API-DUsLl1p5.js";let u="",o=0,m=0;p?.addEventListener("click",()=>{l?.classList.remove("invisible"),g()});v?.addEventListener("click",()=>{l?.classList.add("invisible")});$.addEventListener("click",()=>{window.location.href="./checkout-page.html"});const f=s=>{const a=i.filter(t=>t.id!=s);i=a,localStorage.setItem("cart",JSON.stringify(a)),g()},c=()=>{let s=0;i.forEach(a=>{s+=a.cartQty}),document.querySelector(".cart-count").textContent=String(s)};l?.addEventListener("click",s=>{const a=s.target;if(k?.contains(s.target)||l?.classList.add("invisible"),a.classList.contains("cart-product-trashcan")){const t=Number(a.dataset.id);f(t),c()}if(a.classList.contains("increase-qty")){const t=i.find(e=>e.id===Number(a.dataset.id));if(!t)return;t.cartQty+=1,localStorage.setItem("cart",JSON.stringify(i)),c(),g()}if(a.classList.contains("decrease-qty")){const t=i.find(e=>e.id===Number(a.dataset.id));if(!t)return;if(t.cartQty-=1,t.cartQty===0){const e=Number(a.dataset.id);c(),f(e)}else localStorage.setItem("cart",JSON.stringify(i)),c(),g()}});const g=async()=>{let s="",a=0;i.map(t=>{a+=t.price*t.cartQty,s+=`
    <div class="row pb-2 pt-2 ${t.id}">
            <img
              src="${r}${t.images.thumbnail}"
              class="cart-product-img img-thumbnail col-3 ms-3"
            />
            <h3 class="cart-product-header text-start col-4 d-flex flex-column">
              ${t.name}
              <div class="mt-auto">
                <ul class="pagination pagination-sm m-0">
                  <li class="page-item"><p class="decrease-qty page-link m-0" data-id="${t.id}">-</p></li>
                  <li class="page-item"><p class="page-link m-0">${t.cartQty}</p></li>
                  <li class="page-item"><p class="increase-qty page-link m-0" data-id="${t.id}">+</p></li>
                </ul>
              </div>
            </h3>
            <h4
              class="cart-product-price col-3 d-flex flex-column align-items-end"
            >
              ${t.cartQty}x ${t.price}kr
              <i class="fa-solid fa-trash-can cart-product-trashcan mt-auto" data-id="${t.id}"></i>
            </h4>
          </div>
          `}),P.innerHTML=s,document.querySelector(".total-price").textContent=`${a}kr`},T=s=>{s.sort((a,t)=>a.name.localeCompare(t.name))},E=s=>{s.sort((a,t)=>t.name.localeCompare(a.name))},b=s=>{let a="";s.map(t=>{const d=t.on_sale?'<span class="badge bg-danger rounded-bottom-0 fs-6">EXTRA PRIS!</span>':"";m++,t.stock_status==="instock"?(o++,a+=`
        <div class="card candyCard" data-id="${t.id}">
        ${d}
          <img
            src="${r}${t.images.thumbnail}"
            class="card-img-top"
            alt="Bild på godis"
          />
          <div class="card-body d-flex flex-column p-3">
            <h5 class="card-title candyCardTitle">${t.name}</h5>
            <p class="card-text">Pris: ${t.price}kr</p>
            <div class="card-button-container d-flex gap-1 justify-content-between mt-auto">
            <button class="btn btn-light btn-sm add-to-cart" data-id="${t.id}">
              Lägg i varukorg
            </button>
            <a href="./product-page.html"
              class="btn btn-light btn-sm goToProductPage"
              data-id="${t.id}">
              <i class="fa-solid fa-circle-info"></i>
            </a>
            </div>
          </div>
        </div>
    `):t.stock_status==="outofstock"&&(a+=`
        <div class="card candyCard" data-id="${t.id}">
          <img
            src="${r}${t.images.thumbnail}"
            class="card-img-top"
            alt="Bild på godis"
          />
          <div class="card-body d-flex flex-column p-3">
            <h5 class="card-title candyCardTitle">${t.name}</h5>
            <p class="card-text">Pris: ${t.price}kr</p>
            <div class="card-button-container d-flex gap-1 justify-content-between mt-auto">
            <button class="btn btn-light btn-sm add-to-cart" disabled>
              Ej i lager
            </button>
            <a href="src/assets/html/product-page.html"
              class="btn btn-light btn-sm goToProductPage"
              data-id="${t.id}">
              <i class="fa-solid fa-circle-info"></i>
            </a>
            </div>
          </div>
        </div>
    `)}),n.innerHTML=a};S.addEventListener("click",()=>{h(),m=0,o=0});const h=async()=>{try{const a=(await x()).data;let t=!1;C.addEventListener("click",()=>{t?(E(a),b(a)):(T(a),b(a)),t=!t}),a.map(e=>{const y=e.on_sale?'<span class="badge bg-danger rounded-bottom-0 fs-6">EXTRA PRIS!</span>':"";m++,e.stock_status==="instock"?(o++,u+=`
        <div class="card candyCard" data-id="${e.id}">
        ${y}
          <img
            src="${r}${e.images.thumbnail}"
            class="card-img-top"
            alt="Bild på godis"
          />
          <div class="card-body d-flex flex-column p-3">
            <h5 class="card-title candyCardTitle">${e.name}</h5>
            <p class="card-text">Pris: ${e.price}kr</p>
            <div class="card-button-container d-flex gap-1 justify-content-between mt-auto">
            <button class="btn btn-light btn-sm add-to-cart" data-id="${e.id}">
              Lägg i varukorg
            </button>
            <a href="./product-page.html"
              class="btn btn-light btn-sm goToProductPage"
              data-id="${e.id}">
              <i class="fa-solid fa-circle-info"></i>
            </a>
            </div>
          </div>
        </div>
    `):e.stock_status==="outofstock"&&(u+=`
        <div class="card candyCard" data-id="${e.id}">
          <img
            src="${r}${e.images.thumbnail}"
            class="card-img-top"
            alt="Bild på godis"
          />
          <div class="card-body d-flex flex-column p-3">
            <h5 class="card-title candyCardTitle">${e.name}</h5>
            <p class="card-text">Pris: ${e.price}kr</p>
            <div class="card-button-container d-flex gap-1 justify-content-between mt-auto">
            <button class="btn btn-light btn-sm add-to-cart" disabled>
              Ej i lager
            </button>
            <a href="src/assets/html/product-page.html"
              class="btn btn-light btn-sm goToProductPage"
              data-id="${e.id}">
              <i class="fa-solid fa-circle-info"></i>
            </a>
            </div>
          </div>
        </div>
    `)})}catch(s){console.error(s);const a=document.createElement("div");a.className="candyErrorDiv alert alert-warning text-center w-50 my-2 m-auto",a.innerHTML=`
    <h5>${s}</h5>
    <p class="mb-0">Kunde inte visa våra produkter</p>
    `,n.before(a),setTimeout(()=>{a.remove()},5e3)}document.querySelector(".count-candy").innerHTML=`
  <p class="m-0 btn btn-light btn-sm">${o} i lager</p>
  <p class="m-0 btn btn-light btn-sm">Antal: ${m}</p>
  `,n.innerHTML=u,n.addEventListener("click",async s=>{const a=s.target;if(a.classList.contains("add-to-cart"))try{const t=await L(Number(a.dataset.id)),e=i.find(d=>d.id===t.data.id);e?e.cartQty+=1:i.push({...t.data,cartQty:1}),localStorage.setItem("cart",JSON.stringify(i)),c()}catch(t){console.error(t);const e=document.createElement("div");e.className="candyErrorDiv alert alert-warning text-center w-50 my-2 m-auto",e.innerHTML=`
          <h5>${t}</h5>
          <p class="mb-0">Kunde ej lägga till produkten i varukorgen</p>
        `,n.before(e),setTimeout(()=>{e.remove()},5e3)}if(a.classList.contains("goToProductPage")||a.closest(".card")&&!a.classList.contains("add-to-cart")){const t=a.closest(".card");if(!t)return;const e=t.dataset.id;localStorage.setItem("currentId",JSON.stringify(e)),window.location.href="./product-page.html"}})};let i=JSON.parse(localStorage.getItem("cart")||"[]");c();h();
