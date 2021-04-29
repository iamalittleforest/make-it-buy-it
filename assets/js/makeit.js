// side nav 
$(document).ready(function(){
    $('.sidenav').sidenav();
  });

init();

// on the click of the magnify glass search button, searchRecipe function runs.
  $("#search-btn").on("click", searchRecipe)

  function searchRecipe(event) {
    //prevents firing of any other functions.
    event.stopPropagation();

    var search = $("#search-input").val().trim();


    if(search){
    
      // clear the input field
      $("#search-input").val("");
      
      // save search to local storage
      // saveSearch(search);
      
      // runs the doSearch functions given the "search" parameter
      // this function will initiate the search for recipes 
      doSearch(search);
    }
  }


  // this function will initiate the search for recipes 
function doSearch(search){

  // empty results prior to performing new search
  $("#render-search").html("");

  $.ajax({
    contentType: "application/json",
    method: "GET",
    url: `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${search}&number=10&ranking=1&apiKey=ec05068cf090412eb77ead2a99d031e9`,
  }).then(function(data){
    console.log(data);
    renderSearch(data);
  })
}
// rendering search results
function renderSearch(data) {
  $("#ingredients-container").show();

// create restaurant cards for each restaurant
for (var i=0; i < data.length; i++) {
   
  allRecipesInfo = data[i]

var cardContainer = $("<div>");
cardContainer.addClass("col m12 l6");
$("#render-search").append(cardContainer)

var card = $("<div>");
    card.attr("id", "restaurant-card");
    card.addClass("card horizontal hoverable");
    cardContainer.append(card);
    
    var cardImg = $("<div>");
    cardImg.addClass("card-image");
    card.append(cardImg);

    var jpg = $("<img>");
    jpg.attr("id", "restaurant-img");
    jpg.attr("src", `${allRecipesInfo.image}`)
    cardImg.append(jpg);

    var cardContent = $("<div>");
    cardContent.addClass("card-content");
    card.append(cardContent);
    
    var name = $("<div>");
    name.attr("id", "recipe-name");
    name.addClass("card-title");
    name.text(`${allRecipesInfo.title}`);
    cardContent.append(name);

    var missedIngredientCount = $("<div>");
    missedIngredientCount.attr("id", "missed-ingredient-count");
    missedIngredientCount.text(`Number of Missed Ingredients: ${allRecipesInfo.missedIngredientCount}`);
    cardContent.append(missedIngredientCount);

    // var missedIngredientsList = $("<div>");
    // missedIngredientsList.attr("id", "missed-ingredient-list");
    // missedIngredientsList.text(`Missed Ingredients: ${allRecipesInfo.missedIngredients[0].name}`);
    // cardContent.append(missedIngredientsList);

    cardContent.on("click", function(){
      
    })
    // var price = $("<div>");
    // price.attr("id", "restaurant-price");
    // price.text(`Price: ${businessInfo.price}`);
    // cardContent.append(price);

    // var rating = $("<div>");
    // rating.attr("id", "restaurant-rating");
    // rating.text(`Yelp Rating: ${businessInfo.rating}`);
    // cardContent.append(rating);
  }




}


// render search results 

// function renderSearch(data) {

//   $("#ingrediets-container").show();

//   var allIngredientsInfo = data.usedIngredients;


//   //create restaurant cards for each restaurant 

//   for(var i = 0; i < allIngredientsInfo; i++) {

//     var cardContainer = $("<div>");
//     cardContainer.addClass("col m12 l6");
//     $("#render-search").append(cardContainer);

//     var card = $("<div>");
//     card.attr("id", "restaurant-card");
//     card.addClass("card horizontal hoverable");
//     cardContainer.append(card);

//     var cardImg = $("<div>");
//     cardImg.addClass("card-image");
//     card.append(cardImg);

//     var img = $("<img>");
//     img.attr("id", "restaurant-img");
//     img.attr("src", `${ADD}`);
//     cardImg.append(img);

//     var cardContent = $("<div>");
//     cardContent.addClass("card-content");
//     card.append(cardContent);
    
//     var name = $("<div>");
//     name.attr("id", "restaurant-name");
//     name.addClass("card-title");
//     name.text(`${ADD}`);
//     cardContent.append(name);
//     // change price to something
//     var price = $("<div>");
//     price.attr("id", "restaurant-price");
//     price.text(`Price: ${ADD}`);
//     cardContent.append(price);
//     // change rating to something 
//     var rating = $("<div>");
//     rating.attr("id", "restaurant-rating");
//     rating.text(`Yelp Rating: ${ADD}`);
//     cardContent.append(rating);
//   }

// }






// initialize page
function init(){
  $("#ingredients-container").hide();
}
//   $("button").on("click", function () {
//     var searchCity = $("#search").val();
//     fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchCity}&units=imperial&appid=2f13e6ddf4fe6dc7bcf87d5d56fa266c`)
//         .then(function (data) {
//             return data.json();
//         })
//         .then(function (data) {
//             console.log(data)
//             console.log('temp', data.list[0].main.temp);
//             console.log('humidity', data.list[1].main.humidity);
//             console.log('speed', data.list[0].wind.speed);
//             console.log('coords', data.city.coord);
//             var lat = data.city.coord.lat;
//             var lon = data.city.coord.lon;
//         })
// })



