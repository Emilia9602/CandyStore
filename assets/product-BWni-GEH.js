import{h as p,d as v,c as y,a as i,b as h,B as o,f as b,o as m,i as f,e as S}from"./selector-C0W9yTxM.js";/* empty css             */import{a as u,g as x}from"./bortakvall-API-DUsLl1p5.js";p.addEventListener("click",()=>{window.location.href="./"});v.addEventListener("click",()=>{window.location.href="./checkout-page.html"});y?.addEventListener("click",()=>{i?.classList.remove("invisible"),n()});h?.addEventListener("click",()=>{i?.classList.add("invisible")});let r=JSON.parse(localStorage.getItem("cart")||"[]");const c=()=>{let s=0;r.forEach(a=>{s+=a.cartQty}),document.querySelector(".cart-count").textContent=String(s)},d=s=>{const a=r.filter(t=>t.id!=s);r=a,localStorage.setItem("cart",JSON.stringify(a)),n()},n=async()=>{let s="",a=0;r.map(t=>{a+=t.price*t.cartQty,s+=`
    <div class="row pb-2 pt-2 ${t.id}">
            <img
              src="${o}${t.images.thumbnail}"
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
          `}),b.innerHTML=s,document.querySelector(".total-price").textContent=`${a}kr`},k=async()=>{const s=localStorage.getItem("currentId")||"[]",a=JSON.parse(s);try{const t=await u(a);if(w(t.data),t.data.stock_status==="outofstock"){const e=document.querySelector(".add-to-cart");e.classList.add("disabled"),e.textContent="Ej i lager",document.querySelector(".stock-wrapper").innerHTML=`
      <i class="fa-solid fa-circle-xmark text-danger fs-5"></i>
      <p class="m-0 ms-2">(0) I lager</p>
    `}}catch(t){console.error(t);const e=document.createElement("div");e.className="candyErrorDiv alert alert-warning text-center w-50 my-2 m-auto",e.innerHTML=`
    <h5>${t}</h5>
    <p class="mb-0">Kunde inte visa den valda produkten</p>
  `,document.querySelector("main").before(e),setTimeout(()=>{e.remove()},5e3)}},$=s=>{const a=[...s];for(let t=a.length-1;t>0;t--){const e=Math.floor(Math.random()*(t+1));[a[t],a[e]]=[a[e],a[t]]}return a.slice(0,6)},L=async()=>{try{const s=await x(),a=$(s.data);let t="";a.map(e=>{const g=e.on_sale?'<span class="badge bg-danger w-100 rounded-bottom-0 fs-6">EXTRA PRIS!</span>':"";t+=`
    <div class="other-product-container" data-id=${e.id}>
    ${g}
      <img src="${o}${e.images.large}" />
      <div class="other-rating-star py-2 px-2 fs-6">
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
        <i class="fa-solid fa-star"></i>
      </div>
      <div class="other-product-info px-2">
        <p class="other-product-name mb-1">${e.name}</p>
        <p class="other-product-price mb-0">${e.price}kr</p>
      </div>
    </div>
    `}),m.innerHTML=t}catch(s){console.error(s);const a=document.createElement("div");a.className="candyErrorDiv alert alert-warning text-center w-50 my-2 m-auto",a.innerHTML=`
    <h5>${s}</h5>
    <p class="mb-0">Kunde inte visa ''Andra köpte också''</p>
  `,document.querySelector(".other-products-section").after(a),setTimeout(()=>{a.remove()},5e3)}};m.addEventListener("click",s=>{const a=s.target;if(a.closest(".other-product-container")){const e=a.closest(".other-product-container").dataset.id;localStorage.setItem("currentId",JSON.stringify(e)),window.location.href="./product-page.html"}});const w=s=>{let a="";const e=s.on_sale?'<span class="badge bg-danger fs-6 mb-auto">EXTRA PRIS!</span>':"";a+=`
  
      <div class="product-img-info-container row justify-content-center mt-5">
        <div class="img-cotnainer col-12 col-lg-6 d-flex flex-column">
          <img src="${o}${s.images.large}" alt="Bild på godiset" class="product-img img-fluid">
        </div>
        <div class="product-info col-12 col-lg-6 d-flex flex-column mt-4 mt-lg-0">
          <div class="card mb-md-4">
            <div class="card-body p-xxl-4">
            <div class="d-flex justify-content-between">
            <h5 class="card-title fs-3">${s.name}</h5>
              ${e}
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
              <p class="card-text mt-2 fs-1 mb-1">${s.price}kr</p>
              <hr class="mt-0 mb-4">
              <div class="stock-wrapper d-flex align-items-center">
                <i class="fa-solid fa-circle-check text-success fs-5"></i> 
                <p class="m-0 ms-2">(${s.stock_quantity}) I lager</p>
              </div>
              <div class="description-container">
              <p class="card-text mt-4 fs-4">Beskrivning:</p>
              <p class="card-text mt-3">${s.description}</p>
              <div>
              <button class="add-to-cart btn btn-light mt-3 d-block m-auto" data-id="${s.id}">
                Lägg till i varukorgen
              </button>
            </div>
          </div>
        </div>
      </div>
`,f.innerHTML=a};f.addEventListener("click",async s=>{const a=s.target;if(a.classList.contains("add-to-cart"))try{const t=await u(Number(a.dataset.id)),e=r.find(l=>l.id===t.data.id);e?e.cartQty+=1:r.push({...t.data,cartQty:1}),localStorage.setItem("cart",JSON.stringify(r)),c()}catch(t){console.error(t);const e=document.createElement("div");e.className="candyErrorDiv alert alert-warning text-center w-50 my-2 m-auto",e.innerHTML=`
              <h5>${t}</h5>
              <p class="mb-0">Kunde ej lägga till produkten i varukorgen</p>
            `,document.querySelector("main").before(e),setTimeout(()=>{e.remove()},5e3)}});i?.addEventListener("click",s=>{const a=s.target;if(S?.contains(s.target)||i?.classList.add("invisible"),a.classList.contains("cart-product-trashcan")){const t=Number(a.dataset.id);d(t),c()}if(a.classList.contains("increase-qty")){const t=r.find(e=>e.id===Number(a.dataset.id));if(!t)return;t.cartQty+=1,localStorage.setItem("cart",JSON.stringify(r)),c(),n()}if(a.classList.contains("decrease-qty")){const t=r.find(e=>e.id===Number(a.dataset.id));if(!t)return;if(t.cartQty-=1,t.cartQty===0){const e=Number(a.dataset.id);c(),d(e)}else localStorage.setItem("cart",JSON.stringify(r)),c(),n()}});c();k();L();
