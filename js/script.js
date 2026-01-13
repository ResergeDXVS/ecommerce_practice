/*Abrir  Cart*/
const cartButton = document.getElementById("cart");
const menuButton = document.getElementById("home");
const crossButton = document.getElementById("cross__cart");
const crossMenuButton = document.getElementById("cross__menu");
const body = document.getElementsByTagName("body")[0];
const cart = document.querySelector(".cart");
const menu = document.querySelector(".menu");
const banner = document.querySelector(".banner");
const header = document.querySelector(".header");
const products = document.querySelector(".products");
const footer = document.querySelector(".footer");
let openMenus=false;
let openCart=false;

class CartItem{
    constructor(id, imagen, nameProduct, price, number){
        this.id = id;
        this.imagen = imagen;
        this.nameProduct = nameProduct;
        this.price = price.replace("$","");
        this.number = number;
        this.total = (parseFloat(price.replace("$",""))*number).toFixed(2);
    }

    updateTotal(newNumber){
        this.number = newNumber;
        this.total = (parseFloat(this.price) * parseInt(newNumber)).toFixed(2);
    }

    addNumber(){
        this.number = this.number+1;
        this.total = (parseFloat(this.price) * parseInt(this.number)).toFixed(2);
    }
    
}

const removeClasses = () =>{
    body.classList.remove("body--wait");
    header.classList.remove("header--wait");
    products.classList.remove("products--wait");
    footer.classList.remove("footer--wait");
    banner.classList.remove("banner--wait");
}

const addClasses = () =>{
    body.classList.add("body--wait");
    header.classList.add("header--wait");
    products.classList.add("products--wait");
    footer.classList.add("footer--wait");
    banner.classList.add("banner--wait");
}

cartButton.addEventListener("click", () =>{
    if(!openMenus){    //Bool para revisar si el carrito esta abierto
        openCart = true;
        //Mostrar carrito
        cart.classList.add("cart--show");
        showCart();
    }
    addClasses();
    
});

crossButton.addEventListener("click", () =>{
    if(!openMenus){
        //Bool para revisar si el carrito esta abierto
        openCart = false;
        //Ocultar carrito 
        cart.classList.remove("cart--show");
    }
    removeClasses();
});

menuButton.addEventListener("click", () =>{
    if(!openCart){    //Bool para revisar si el carrito esta abierto
        openMenus = true;
        //Mostrar carrito
        menu.classList.add("menu--show");
    }
    addClasses();
    
});

crossMenuButton.addEventListener("click", () =>{
    if(!openCart){    //Bool para revisar si el carrito esta abierto
        openMenus = false;
        //Ocultar carrito
        menu.classList.remove("menu--show");        
    }
    removeClasses();
});


/* Manejo de la información del carrito */

const productItems = document.querySelectorAll(".products__item");
const productButtons = document.querySelectorAll(".products__button");

const editLocalStorage = (cartData) => {
    let listCart = JSON.parse(localStorage.getItem("cartData")) || [];

    if (listCart.length>0){
        listCart = listCart.map(item => new CartItem(item.id, item.imagen, item.nameProduct, item.price, item.number));
        console.log(listCart.length);
        const checkCartItem = listCart.find(p => p.id === cartData.id);
        const index = listCart.findIndex(p => p.id === cartData.id);
        if (checkCartItem !== undefined){
            checkCartItem.addNumber();
            listCart[index] = checkCartItem;
            console.log(checkCartItem);
        }else{
            listCart.push(new CartItem(cartData.id,cartData.imagen,cartData.name,cartData.price,1));
            console.log(listCart);
        }
        localStorage.setItem("cartData", JSON.stringify(listCart));
        
    }else{
        listCart.push(new CartItem(cartData.id,cartData.imagen,cartData.name,cartData.price,1));
        localStorage.setItem("cartData", JSON.stringify(listCart));
    }
    

}
const deleteCartItem = (parent,listCart,index) => {
    parent.remove();
    listCart.splice(index,1);
    localStorage.setItem("cartData", JSON.stringify(listCart));
}
const checkPaymentButton = (listCart,buttonCart) => {
    if (listCart.length>0){
        calculateTotalPayment(listCart);
    }else{
        buttonCart.classList.add("invisible");
    }
}

const generateCartItem = (productCart) => {
    const cartItem = document.createElement("div");
    const cartImagen = document.createElement("img");
    const cartProduct = document.createElement("p");
    const cartPrice = document.createElement("p");
    const cartInput = document.createElement("input");
    const cartTotal = document.createElement("p");
    const cartButton = document.createElement("i");
    cartItem.setAttribute("class","cart__item");
    cartImagen.setAttribute("class","cart__image");
    cartProduct.setAttribute("class","cart__product");
    cartPrice.setAttribute("class","cart__price");
    cartTotal.setAttribute("class","cart__total");
    cartButton.setAttribute("class","fi fi-sc-trash cart__button");
    cartInput.setAttribute("class","form-control cart__number");
    cartInput.setAttribute("input","number");
    cartInput.setAttribute("id","cantidad");
    cartInput.setAttribute("name","cantidad");
    cartInput.setAttribute("min","0");
    cartInput.setAttribute("max","100");
    cartInput.setAttribute("step","1");
    cartInput.setAttribute("type","number");
    cartItem.append(cartImagen);
    cartItem.append(cartProduct);
    cartItem.append(cartPrice);
    cartItem.append(cartInput);
    cartItem.append(cartTotal);
    cartItem.append(cartButton);
    cartItem.setAttribute("id",productCart.id);
    cartImagen.setAttribute("src",productCart.imagen);
    cartProduct.innerText = productCart.nameProduct;
    cartPrice.innerText = `$ ${productCart.price}`;
    cartTotal.innerText = `$ ${productCart.total}`;
    cartInput.value = productCart.number;

    cartInput.addEventListener("input", (event) => {
        let listCart = JSON.parse(localStorage.getItem("cartData")) || [];
        let number = event.target.value;
        listCart = listCart.map(item => new CartItem(item.id, item.imagen, item.nameProduct, item.price, item.number));
        const parent = event.target.parentNode;
        const parentID = parent.getAttribute("id");
        const total = parent.querySelector(".cart__total");
        const checkCartItem = listCart.find(p => p.id === parentID);
        const index = listCart.findIndex(p => p.id === parentID);
        const buttonCart = document.querySelector(".cart__pay");
        if (checkCartItem !== undefined){
            if (number>0){
                checkCartItem.updateTotal(number);
                listCart[index] = checkCartItem;
                total.innerText = `$ ${checkCartItem.total}`;
                localStorage.setItem("cartData", JSON.stringify(listCart));
            }else{
                deleteCartItem(parent,listCart,index);
            }
            checkPaymentButton(listCart,buttonCart);
            updateBadge();
            
        }
    });

    cartButton.addEventListener("click", (event) =>{
        let listCart = JSON.parse(localStorage.getItem("cartData")) || [];
        listCart = listCart.map(item => new CartItem(item.id, item.imagen, item.nameProduct, item.price, item.number));
        const parent = event.target.parentNode;
        const parentID = parent.getAttribute("id");
        const checkCartItem = listCart.find(p => p.id === parentID);
        const index = listCart.findIndex(p => p.id === parentID);
        const buttonCart = document.querySelector(".cart__pay");
        if (checkCartItem !== undefined){
            deleteCartItem(parent,listCart,index);
        }
        checkPaymentButton(listCart,buttonCart);
        updateBadge();
    })

    return cartItem;
}

const showCart = () => {
    const listCart = JSON.parse(localStorage.getItem("cartData")) || [];
    const cartBasket = document.querySelector(".cart__basket");
    const buttonCart = document.querySelector(".cart__pay");
    cartBasket.innerHTML = "";
    if (listCart.length>0){
        buttonCart.classList.remove("invisible");
        listCart.forEach(cart => {
            cartBasket.append(generateCartItem(cart));
        });
    }
    checkPaymentButton(listCart,buttonCart);
    updateBadge();
    
}

const calculateTotalPayment = (basket) =>{
    let total = 0;
    const button = cart.querySelector(".cart__pay").getElementsByTagName("button")[0];
    console.log(button)
    basket.forEach(data => {
        total += parseFloat(data.total);
    });
    button.innerText = `Pagar $ ${total.toFixed(2)}`;
}

productItems.forEach(producto => {
    producto.addEventListener("mouseover", ()=> {
        const button = producto.querySelector(".products__button");
        if(window.innerWidth>=1200){
            if (openCart || openMenus){
                producto.style.cursor = "default";
            }else{
                producto.style.transform = "scale(1.05)";
                button.classList.remove("invisible");
            }
        }else{

        }
    })
});

productItems.forEach(producto => {
    producto.addEventListener("mouseleave", ()=> {
        const button = producto.querySelector(".products__button");
        if(window.innerWidth>=1200){
            producto.style.transform = "scale(1)";
            button.classList.add("invisible");
        }
    });
});

productButtons.forEach(boton => {
    boton.addEventListener("click", () => {
        const information = boton.parentNode.parentNode;
        const data = {
            id: information.id,
            imagen: information.querySelector('.products__images').getAttribute("src"),
            name: information.querySelector('.products__name').innerText,
            price: information.querySelector('.products__prize').innerText,
        }
        console.log(data);
        editLocalStorage(data);
        updateBadge();

    })
});



/*Actualizar Badge*/
const updateBadge = () =>{
    const badge = document.getElementById("cart__size");
    let listCart = JSON.parse(localStorage.getItem("cartData")) || [];
    listCart = listCart.map(item => new CartItem(item.id, item.imagen, item.nameProduct, item.price, item.number));
    let total = 0; 
    listCart.forEach(data => {
        total += parseInt(data.number);
    })
    if (total==0){
        badge.classList.add("invisible");
    }else if (total>0 && total<=9){
        badge.classList.remove("invisible");
        badge.innerText = total;
    }else{
        badge.classList.remove("invisible");
        badge.innerText = "+9";
    }

}

const toggleButtons = () => {
    const buttons = document.querySelectorAll(".products__button");
    if (window.innerWidth < 1200) {
        buttons.forEach(boton => boton.classList.remove("invisible"));
    }else{
        buttons.forEach(boton => boton.classList.add("invisible"));
    }
}

// Ejecutar al cargar
toggleButtons();

// Ejecutar al cambiar tamaño
window.addEventListener("resize", toggleButtons);


updateBadge();