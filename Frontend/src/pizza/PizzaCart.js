
/**
* Created by chaika on 02.02.16.
*/
var Templates = require('../Templates');
var Storage = require('../Storage');

//Перелік розмірів піци
var PizzaSize = {
Big: "big_size",
Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $("#cart");

function addToCart(pizza, size) {
//Додавання однієї піци в кошик покупок
let increased = false;
// console.log(Cart);
//Приклад реалізації, можна робити будь-яким іншим способом
Cart.forEach(function (item) {
if (item.pizza == pizza && item.size == size) {
item.quantity++;
increased = true;
}
});

if (!increased) {
Cart.push({
pizza: pizza,
size: size,
quantity: 1
});


}
increaseCountCart();

//Оновити вміст кошика на сторінці
updateCart();
}

function increaseCountCart(num) {
let count = parseInt($(".cart-count").text());
if (num == undefined) $(".cart-count").text(++count);
else $(".cart-count").text(count + num);
// console.log(num);
}

function reduceCountCart(num) {
let count = parseInt($(".cart-count").text());
if (num == undefined) $(".cart-count").text(--count);
else $(".cart-count").text(count - num);
}

function removeFromCart(cart_item) {
//Видалити піцу з кошика
//TODO: треба зробити
// console.log(cart_item);
if (Cart.indexOf(cart_item) != -1) {
Cart.splice(Cart.indexOf(cart_item), 1);


}
//Після видалення оновити відображення
updateCart();
}

function initialiseCart() {
//Фукнція віпрацьвуватиме при завантаженні сторінки
//Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
//TODO: ...


var saved_pizza = Storage.get('cart');
if (saved_pizza) {
var numOfPizzas = function () {
  let count = 0;
  saved_pizza.forEach(function(item) {
    count += item.quantity;
  }
  );
  return count;
}
Cart = saved_pizza;
increaseCountCart(numOfPizzas());
}



updateCart();
}

$("#clear-cart").click(function() {
var newCart = [];

Cart.forEach(function(item) { newCart.push(item)});

newCart.forEach(function(item) {
removeFromCart(item)
reduceCountCart(item.quantity);
});
});

function getPizzaInCart() {
//Повертає піци які зберігаються в кошику
return Cart;
}

function updateCart() {
//Функція викликається при зміні вмісту кошика
//Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

//Очищаємо старі піци в кошику
$cart.html("");


let fullPrice = 0;
Cart.forEach(function(item) {
fullPrice += item.pizza[item.size].price * item.quantity;
})
$(".full_price").text(fullPrice);

//Онволення однієї піци
function showOnePizzaInCart(cart_item) {
var html_code = Templates.PizzaCart_OneItem(cart_item);

var $node = $(html_code);

$node.find(".plus").click(function(){
    //Збільшуємо кількість замовлених піц
    cart_item.quantity += 1;
    increaseCountCart();
    console.log(cart_item);
    fullPrice = 
    
    //Оновлюємо відображення
    updateCart();
});

$node.find(".minus").click(function(){
  //Збільшуємо кількість замовлених піц
  cart_item.quantity -= 1;
  reduceCountCart();
  if (cart_item.quantity == 0) {

    removeFromCart(cart_item);
  }

  //Оновлюємо відображення
  updateCart();
});

$node.find(".delete-pizza").click(function(){
//Збільшуємо кількість замовлених піц
reduceCountCart(cart_item.quantity);
cart_item.quantity = 0;
removeFromCart(cart_item);

//Оновлюємо відображення
updateCart();
});

$cart.append($node);
}

Cart.forEach(showOnePizzaInCart);
Storage.set("cart",	Cart);
}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;
