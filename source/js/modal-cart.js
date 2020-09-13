var toOrder = document.querySelectorAll('.to-order');
var cart = document.querySelector('.modal-cart');
var addToCart = document.querySelector('.modal-cart__button');

for (var i = 0; i < toOrder.length; i++) {
  toOrder[i].addEventListener('click', function (evt) {
    evt.preventDefault();
    cart.classList.add('modal-cart--show');
  })
};

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    if (cart.classList.contains('modal-cart--show')) {
      evt.preventDefault();
      cart.classList.remove('modal-cart--show');
    }
  }
});
