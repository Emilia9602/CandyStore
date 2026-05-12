import{a as o,r as a,B as n}from"./selector-DV-y1yVU.js";o.addEventListener("click",()=>{window.location.href="/CandyStore"});let l=JSON.parse(localStorage.getItem("finishedOrder")||"{}"),i=JSON.parse(localStorage.getItem("cart")||"[]"),c={items:[]};const d=()=>{i.forEach(t=>{const e={id:t.id,name:t.name,description:t.description,price:t.price,cartQty:t.cartQty,on_sale:t.on_sale,images:t.images,stock_quantity:t.stock_quantity,stock_status:t.stock_status};c.items.push(e)})},p=t=>{if(t.status==="success"){a.innerHTML=`
          <h2 class=" pt-3 fs-1">Ordernummer: ${t.data.id}</h2>
          <i class="fa-solid fa-circle-check fs-1 text-success d-block py-2 m-auto"></i>
          <h3 class="pt-2 fs-2">Tack för din beställning!</h3>
          <p class="mt-3 px-4 py-2">
            Din order är nu på väg. Vi hoppas du får en riktigt trevlig
            Bortakväll!
          </p>
          <p id="orderP" class="fs-2 mb-0 mt-4">Beställning:</p>
          <div id="orderNamesUl" class="p-3 gap-1"></div>
          <button class="startpage-button btn btn-light mt-4 mb-4 fs-5">
            Gå till startsidan ➜
          </button>
          `;const e=document.querySelector("#orderNamesUl");let r=0;c.items.forEach(s=>{r+=s.price*s.cartQty,e.innerHTML+=`
      <div class="row px-2 mb-2 d-flex">
        <img src="${n}${s.images.thumbnail}" class="col-3 rounded-3 p-0">
        <p class="col-5 text-start">${s.name}</p>
        <p class="col-4 text-end">${s.cartQty}x ${s.price}kr</p>
      </div>
      `}),e.innerHTML+=`
    <hr>
    <div class="d-flex justify-content-between">
      <p>Totalt:</p>
      <p class="fs-4">${r}kr</p>
    </div>
    `}else a.innerHTML=`
          <h2 class="pb-3 pt-3">Vi ber om ursäkt!</h2>
          <h3 class="pt-2">Din beställning kunde inte genomföras</h3>
          <p class="mt-3">
            ${t.message}
          </p>
          <button class="startpage-button btn btn-secondary mt-4 mb-3">
            Gå till startsidan
          </button>
          `;document.querySelector(".startpage-button").addEventListener("click",()=>{window.location.href="/CandyStore"})};d();p(l);
