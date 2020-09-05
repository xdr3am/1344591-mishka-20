var toOrder = document.querySelector(".button--to-order");
var cart = document.querySelector(".modal-cart");
var addToCart = document.querySelector(".modal-cart__button");

toOrder.addEventListener("click", function (evt) {
  evt.preventDefault();
  cart.classList.add("modal-cart--show");
});

addToCart.addEventListener("click", function (evt) {
  evt.preventDefault();
  cart.classList.remove("modal-cart--show");
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (cart.classList.contains("modal-cart--show")) {
      evt.preventDefault();
      cart.classList.remove("modal-cart--show");
    }
  }
});
