const API="https://fakestoreapi.com/products";
const prodData=async ()=>{
    const res=await fetch(API);
    if(!res.ok) throw new Error("Network responce was not ok!")
    return res.json();
}
let products=[];
//iife function 
(async function init(){
   try{
        products=await prodData();
        console.log(products);
        // render products 
        const list=document.getElementById("productList");
        const cards=products.map(prod=> 
            `
            <div class="col-md-4">
              <div class="card" style="width: 18rem;">
  <img src="${prod.image}" class="card-img-top" alt="..." width="200" height="150">
  <div class="card-body">
    <h5 class="card-title">${prod.title}</h5>
    <p class="card-text">Price : $ ${prod.price}</p>
    <button class="btn btn-primary" onclick="showDetails(${prod.id})">More Details</button>
  </div>
</div>
            </div>
            `
        ).join("");
        list.innerHTML=cards;
        const modal=new bootstrap.Modal(document.getElementById("productModal"));
        let currentProduct=null;
       window.showDetails=function(id){
        console.log("Hello")
        const p=products.find(x=> x.id===id)
        if(!p) return;
        currentProduct=p;
        document.getElementById("modalTitle").innerText=p.title
        document.getElementById("modalDesc").innerText=p.description
        document.getElementById("modalPrice").innerText="$" + p.price
        const img1=document.getElementById("modalImg");
        img1.src=p.image;
        img1.alt=p.title;
        modal.show();
        }
 let cartCount=0;
 const cartBadge=document.getElementById("cartCount");
 function updateCart(){
    cartBadge.innerText=cartCount
 }
document.getElementById("modalAdd").onclick=()=>{
    cartCount++;
    updateCart();
    modal.hide();
}
// Product Details Modal
   }
   catch(err){
     console.log(err)
   }
})();