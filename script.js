// ===================== Global Variables =====================
let menuItems = {
  starters:[
    {name:"Momos",price:120,image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSokkwqZd7_afHTs25TDACII3ERVuXaFyt9vA&s"},
    {name:"Spring Rolls",price:150,image:"https://d1mxd7n691o8sz.cloudfront.net/static/recipe/recipe/2023-12/Vegetable-Spring-Rolls-2-1-906001560ca545c8bc72baf473f230b4.jpg"},
    {name:"Noodles",price:130,image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVPvcZIxeA9bZukK18CymY32OqFUTVbkKXgQ&s"},
    {name:"Manchurian",price:140,image:"https://www.indianhealthyrecipes.com/wp-content/uploads/2021/07/veg-manchurian.jpg"}
  ],
  mainCourse:[
    {name:"Paneer Butter Masala",price:250,image:"https://myfoodstory.com/wp-content/uploads/2021/07/restaurant-style-paneer-butter-masala-2-500x500.jpg"},
    {name:"Butter Chicken",price:300,image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYU7bkgqtucD8ngwFxlIK-rDPzBR4k-ZIkTA&s"},
    {name:"Dal Makhni",price:200,image:"https://www.cookwithmanali.com/wp-content/uploads/2019/04/Restaurant-Style-Dal-Makhani.jpg"},
    {name:"Mix Veg",price:180,image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhFmMGJlfxGvp0zGmsGjUijCWxynckzwvYfQ&s"},
    {name:"Garlic Naan",price:50,image:"https://allwaysdelicious.com/wp-content/uploads/2022/04/garlic-butter-naan-4.jpg"},
    {name:"Butter Roti",price:30,image:"https://mrprabhu.in/uploads/products/249--1736799755.jpg"},
    {name:"Laccha Paratha",price:40,image:"https://orders.popskitchen.in/wp-content/uploads/2024/09/image-64.png"}
  ],
  beverages:[
    {name:"Cold Coffee",price:100,image:"https://mytastycurry.com/wp-content/uploads/2020/04/Cafe-style-cold-coffee-with-icecream.jpg"},
    {name:"Lassi",price:60,image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZVOz2BkNNLe-ac2FRFJ-6g4sTdXk7y2JZBA&s"},
    {name:"Tea",price:30,image:"https://budleaf.com/wp-content/uploads/2023/08/Adrak-masala-chai-1568x1045.jpeg"},
    {name:"Mineral Water",price:20,image:"https://static.toiimg.com/thumb/msid-119352903,width-400,resizemode-4/119352903.jpg"},
    {name:"Strawberry Milk Shake",price:120,image:"https://assets.epicurious.com/photos/647df8cad9749492c4d5d407/1:1/w_4506,h_4506,c_limit/StrawberryMilkshake_RECIPE_053123_3599.jpg"}
  ],
  desserts:[
    {name:"Ice Cream",price:90,image:"https://www.milkmaid.in/sites/default/files/2022-12/Chocolate-Ice-Cream-335x300.jpg"},
    {name:"Gulab Jamun",price:50,image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3aJrkMZfZWaRkqQu36Y9TBzYlCrkKHvy7mw&s"},
    {name:"Ras Malai",price:60,image:"https://images.archanaskitchen.com/images/recipes/indian/sweet-recipes/traditional_rasmalai_recipe_d5b18e48ac.jpg"},
    {name:"Jalebi",price:40,image:"https://s3-ap-south-1.amazonaws.com/betterbutterbucket-silver/shubhi-mishra20171004002157988.jpeg"},
    {name:"Kaju Katli",price:70,image:"https://www.sweedesi.com/cdn/shop/products/kaju-katli-bhagat-mishthan-bhandar-780831.png?v=1740033711"}
  ]
};

let username = localStorage.getItem("username")||"";
let isLoggedIn = localStorage.getItem("isLoggedIn")==="true";
let cart = JSON.parse(localStorage.getItem(`cart_${username}`))||[];
let orderHistory = JSON.parse(localStorage.getItem(`orderHistory_${username}`))||[];

// ===================== Cart & Profile =====================
function updateCartCount(){
  const cartCount = document.getElementById("cartCount");
  if(cartCount) cartCount.textContent = cart.reduce((s,i)=>s+i.quantity,0);
}

function showProfile(){
  const profileSection = document.getElementById("profileSection");
  const usernameDisplay = document.getElementById("usernameDisplay");
  const loginBtn = document.getElementById("loginBtn");
  const logoutBtn = document.getElementById("logoutBtn");
  if(isLoggedIn){
    if(profileSection) profileSection.classList.remove("hidden");
    if(usernameDisplay) usernameDisplay.textContent = "Hello, "+username;
    if(loginBtn) loginBtn.classList.add("hidden");
    if(logoutBtn) logoutBtn.classList.remove("hidden");
  } else {
    if(profileSection) profileSection.classList.add("hidden");
    if(loginBtn) loginBtn.classList.remove("hidden");
    if(logoutBtn) logoutBtn.classList.add("hidden");
  }
}

if(document.getElementById("logoutBtn")){
  document.getElementById("logoutBtn").addEventListener("click",function(){
    isLoggedIn=false;
    localStorage.setItem("isLoggedIn","false");
    username="";
    cart=[];
    saveCart();
    showProfile();
    window.location.href="index.html";
  });
}

// ===================== Menu =====================
function toggleCategory(id, btn){
  const el = document.getElementById(id);
  if(!el) return;
  el.classList.toggle("show");
  const arrow = btn.querySelector(".arrow");
  if(arrow) arrow.textContent = el.classList.contains("show") ? "▲" : "▼";
}

function displayMenu(){
  for(let category in menuItems){
    const container = document.getElementById(category);
    if(!container) continue;
    container.innerHTML = "";
    menuItems[category].forEach((item,index)=>{
      const inCart = cart.find(x=>x.name===item.name);
      let quantitySection = inCart ? 
      `<div class="quantity-control"><button onclick="decreaseQuantity('${item.name}')">-</button><span>${inCart.quantity}</span><button onclick="increaseQuantity('${item.name}')">+</button></div><button class="go-cart" onclick="window.location.href='cart.html'">Go to Cart</button>` 
      : `<button class="btn" onclick="addToCart('${category}',${index})">Add</button>`;
      let div = document.createElement("div");
      div.className="menu-item";
      div.innerHTML = `<img src="${item.image}" alt="${item.name}"><h3>${item.name}</h3><p class="price">₹${item.price}</p>${quantitySection}`;
      container.appendChild(div);
    });
  }
}

function addToCart(category,index){
  if(!isLoggedIn){alert("Please login first!"); window.location.href="login.html"; return;}
  const item = menuItems[category][index];
  let existing = cart.find(x=>x.name===item.name);
  if(existing) existing.quantity++;
  else cart.push({name:item.name,price:item.price,quantity:1});
  saveCart();
  displayMenu();
}

function increaseQuantity(name){
  const item = cart.find(x=>x.name===name);
  if(item) item.quantity++;
  saveCart();
  displayMenu();
}

function decreaseQuantity(name){
  const item = cart.find(x=>x.name===name);
  if(item){
    item.quantity--;
    if(item.quantity<=0) cart = cart.filter(x=>x.name!==name);
  }
  saveCart();
  displayMenu();
}

function saveCart(){
  if(username) localStorage.setItem(`cart_${username}`, JSON.stringify(cart));
  updateCartCount();
  displayCart();
}

// ===================== Cart =====================
function displayCart(){
  const container = document.getElementById("cartContainer");
  if(!container) return;
  container.innerHTML="";
  cart.forEach(item=>{
    let div = document.createElement("div");
    div.className="cart-item";
    div.innerHTML=`<h4>${item.name}</h4><p>₹${item.price}</p><div class="quantity-control"><button onclick="decreaseQuantity('${item.name}')">-</button><span>${item.quantity}</span><button onclick="increaseQuantity('${item.name}')">+</button></div>`;
    container.appendChild(div);
  });
}

function proceedToCheckout(){
  if(!isLoggedIn){alert("Please login first!"); window.location.href="login.html"; return;}
  if(cart.length===0){alert("Cart is empty!"); return;}
  localStorage.setItem('checkout_cart', JSON.stringify(cart));
  window.location.href="checkout.html";
}

// ===================== Order History =====================
function displayOrderHistory(){
  const container = document.getElementById("orderHistoryContainer");
  if(!container) return;
  container.innerHTML="";
  orderHistory.forEach(order=>{
    let div = document.createElement("div");
    div.className="cart-item";
    div.innerHTML=`<h4>Order at: ${order.date}</h4>${order.items.map(i=>`<p>${i.name} x${i.quantity}</p>`).join("")}`;
    container.appendChild(div);
  });
}

// ===================== Login Form =====================
if(document.getElementById("loginForm")){
  document.getElementById("loginForm").addEventListener("submit",function(e){
    e.preventDefault();
    username=document.getElementById("username").value;
    isLoggedIn=true;
    localStorage.setItem("isLoggedIn","true");
    localStorage.setItem("username",username);
    cart=JSON.parse(localStorage.getItem(`cart_${username}`))||[];
    orderHistory=JSON.parse(localStorage.getItem(`orderHistory_${username}`))||[];
    window.location.href="menu.html";
  });
}

// ===================== Checkout Page =====================
if(document.getElementById("checkoutItems")){
  cart = JSON.parse(localStorage.getItem('checkout_cart'))||[];
  const checkoutItems = document.getElementById("checkoutItems");
  cart.forEach(item=>{
    let div = document.createElement("div");
    div.className="cart-item";
    div.innerHTML=`<h4>${item.name}</h4><p>₹${item.price} x ${item.quantity}</p>`;
    checkoutItems.appendChild(div);
  });
  const checkoutForm = document.getElementById("checkoutForm");
  if(checkoutForm){
    checkoutForm.addEventListener("submit",function(e){
      e.preventDefault();
      let order = {
        items: cart,
        date: new Date().toLocaleString(),
        customer:{
          name:document.getElementById("customerName").value,
          phone:document.getElementById("phone").value,
          address:document.getElementById("address").value,
          pincode:document.getElementById("pincode").value,
          payment:document.getElementById("paymentMode").value,
          coupon:document.getElementById("coupon").value
        }
      };
      orderHistory.push(order);
      localStorage.setItem(`orderHistory_${username}`, JSON.stringify(orderHistory));
      localStorage.removeItem('checkout_cart');
      cart = [];
      saveCart();
      window.location.href="thankyou.html";
    });
  }
}

// ===================== Init =====================
displayMenu();
displayCart();
updateCartCount();
displayOrderHistory();
showProfile();
// Handle checkout form submission
const checkoutForm = document.getElementById("checkoutForm");
if(checkoutForm){
    const checkoutItemsContainer = document.getElementById("checkoutItems");
    
    // Display selected cart items on checkout page
    if(cart.length > 0 && checkoutItemsContainer){
        checkoutItemsContainer.innerHTML = cart.map(item => 
            `<div class="cart-item">
                <h4>${item.name}</h4>
                <p>₹${item.price} x ${item.quantity}</p>
            </div>`
        ).join("");
    }

    checkoutForm.addEventListener("submit", function(e){
        e.preventDefault();
        if(cart.length === 0){
            alert("Cart is empty!");
            return;
        }

        // Get form values
        const fullName = document.getElementById("fullName").value.trim();
        const phoneNumber = document.getElementById("phoneNumber").value.trim();
        const address = document.getElementById("address").value.trim();
        const pincode = document.getElementById("pincode").value.trim();
        const paymentMode = document.getElementById("paymentMode").value;
        const coupon = document.getElementById("coupon").value.trim();

        if(!fullName || !phoneNumber || !address || !pincode || !paymentMode){
            alert("Please fill all required fields!");
            return;
        }

        // Save order to history
        orderHistory.push({
            items: [...cart],
            date: new Date().toLocaleString(),
            customer: {fullName, phoneNumber, address, pincode, paymentMode, coupon}
        });
        localStorage.setItem(`orderHistory_${username}`, JSON.stringify(orderHistory));

        // Clear cart
        cart = [];
        saveCart();

        // Redirect to thank you page
        localStorage.setItem("lastOrder", JSON.stringify({
            fullName, items: [...orderHistory[orderHistory.length-1].items]
        }));
        window.location.href = "thankyou.html";
    });
}
