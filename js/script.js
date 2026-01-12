/*Abrir  Cart*/
const cartButton = document.getElementById("cart");
const crossButton = document.getElementById("cross__cart");
const body = document.getElementsByTagName("body")[0];
const cart = document.querySelector(".cart");
const banner = document.querySelector(".banner");
const header = document.querySelector(".header");
const products = document.querySelector(".products");
const footer = document.querySelector(".footer");


console.log(cartButton);
console.log(crossButton);
console.log(cart);
console.log(banner);
console.log(header);
console.log(products);
console.log(footer);
console.log(body);

cartButton.addEventListener("click", () =>{
    //Mostrar carrito
    cart.classList.add("cart--show");
    //Oscurecer página
    body.classList.add("body--wait");
    header.classList.add("header--wait");
    products.classList.add("products--wait");
    footer.classList.add("footer--wait");
    banner.classList.add("banner--wait");
});

crossButton.addEventListener("click", () =>{
    //Ocultar carrito
    cart.classList.remove("cart--show");
    //Devolver brillo a la página
    body.classList.remove("body--wait");
    header.classList.remove("header--wait");
    products.classList.remove("products--wait");
    footer.classList.remove("footer--wait");
    banner.classList.remove("banner--wait");
});
