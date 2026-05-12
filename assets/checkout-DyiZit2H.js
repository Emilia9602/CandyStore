import{a as n,i as d,n as m,s as u,j as p,p as _,k as h,l as f,m as y,B as v,q as g}from"./selector-DV-y1yVU.js";import{O as w}from"./bortakvall-API-koG9ZvC9.js";n.addEventListener("click",()=>{window.location.href="/CandyStore"});let E=JSON.parse(localStorage.getItem("cart")||"[]"),k=[],s=0,l="",o=[],c=[],i;const r={customer_first_name:"",customer_last_name:"",customer_address:"",customer_postcode:"",customer_city:"",customer_email:"",customer_phone:"",order_total:0,order_items:[]},C=()=>{E.forEach(e=>{if(o.some(t=>e.id===t.product_id)){let t=o.find(a=>e.id===a.product_id);t.qty++}else{let t={product_id:e.id,product_name:e.name,images:{thumbnail:e.images.thumbnail,large:e.images.large},qty:e.cartQty,item_price:e.price,item_total:0};o.push(t),k.push(e.id)}})},S=()=>{o.forEach(e=>{e.item_total=e.qty*e.item_price})},q=()=>{o.forEach(e=>{l+=`
    <div class="row p-2 product-checkout-section">
      <img src="${v}${e.images.thumbnail}" class="col-3 checkout-product-image rounded-3 p-0">
      <p class="col-5 text-start fs-xl-5">${e.product_name}</p>
      <p class="col-5 text-end pe-2">${e.qty}x ${e.item_price}kr</p>
    </div>
    `,s=s+e.item_total}),g.innerHTML+=l,document.querySelector(".checkoutTotal").innerHTML+=`
    <hr>
    <div class="d-flex justify-content-between px-2">
      <p>Totalt:</p>
      <p class="fs-4">${s}kr</p>
    </div>
    `},$=()=>{c=[],o.forEach(e=>{const t={product_id:e.product_id,qty:e.qty,item_price:e.item_price,item_total:e.item_total};c.push(t)})};d.addEventListener("submit",async e=>{e.preventDefault(),r.customer_first_name=m.value,r.customer_last_name=u.value,r.customer_address=p.value,r.customer_postcode=_.value,r.customer_city=h.value,r.customer_email=f.value,r.customer_phone=y.value,r.order_total=s,r.order_items=c;try{i=await w(r),localStorage.setItem("finishedOrder",JSON.stringify(i)),window.location.href="/CandyStoreorder-complete-page.html"}catch(t){console.error(t);const a=document.createElement("div");a.className="candyErrorDiv alert alert-warning text-center w-50 my-2 m-auto",a.innerHTML=`
    <h5>${t}</h5>
    <p class="mb-0">Kunde inte genomföra ordern!</p>
  `,document.querySelector(".before-error-div").before(a),setTimeout(()=>{a.remove()},5e3)}});C();S();q();$();
