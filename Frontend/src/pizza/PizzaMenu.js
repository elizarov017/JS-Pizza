/**
* Created by chaika on 02.02.16.
*/
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = require('../Pizza_List');

//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");

function showPizzaList(list) {
  //Очищаємо старі піци в кошику
  $pizza_list.html("");

  //Онволення однієї піци
  function showOnePizza(pizza) {
      var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

      var $node = $(html_code);

      $node.find(".buy-big").click(function(){
          PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
      });
      $node.find(".buy-small").click(function(){
          PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
      });

      $pizza_list.append($node);
  }
  $(".count").text(list.length);
  list.forEach(showOnePizza);
}

$(".menu").click(function () {
let filter = this.getAttribute("filter-data");
$(".active").removeClass("active");
$(this).addClass("active");
$(".filter-name").text(this.getAttribute("text") + " піци");
filterPizza(filter);
})

function filterPizza(filter) {
  //Масив куди потраплять піци які треба показати
  var pizza_shown = [];

  // $()

  Pizza_List.forEach(function(pizza){
      //Якщо піка відповідає фільтру
      console.log(pizza);
      

      if (filter == "vega" && pizza.type == "Вега піца") pizza_shown.push(pizza);

      if (pizza.content[filter] != undefined || filter == "all") pizza_shown.push(pizza);

      

      //TODO: зробити фільтри
  });

  //Показати відфільтровані піци
  showPizzaList(pizza_shown);
}

function initialiseMenu() {
  //Показуємо усі піци
  showPizzaList(Pizza_List)
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;
