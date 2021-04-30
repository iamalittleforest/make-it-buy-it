// define global variables
var allFavoriteInfo = [];
var allRestaurantInfo = [];

// side nav
$(document).ready(function(){
  $(".sidenav").sidenav();
});

init();

// enables use of enter key to submit
$("form").on("submit", function(e){
  e.preventDefault();
  searchHandler(e);
})

// search button starts search for restaurants
$("#search-btn").on("click", searchHandler);

function searchHandler(event){
  event.stopPropagation();
  
  // formats input text
  var search = $("#search-input").val().trim();
  
  if(search){
    // clear the input field
    $("#search-input").val("");
    
    // fetch restaurants for based on input
    doSearch(search);
  }
}

// get search data
function doSearch(search){
  
  // empty results prior to performing new search
  $("#render-search").html("");
  
  $.ajax({
    headers: {
      Authorization: "Bearer Ryqj-TG94SYRXzsiWTxT_4MKhOAx1HAulcczosM1LalfLE72pqkh-h6KneP7efCyUS1tLZwzMCds6LsnPzigmTfDOcqSIvskkZHDLHcRbSjuAIi4ukJnZmQXCstjW3Yx",
    },
    method: "GET",
    accepts: "*",
    url: `https://wendy-cors.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${search}&limit=10`,
  }).then(function(data){
    // console.log(data);
    renderSearch(data);
  })
}

// render search results
function renderSearch(data){

  $("#restaurants-container").show();
  $("#favorites-container").hide();

  // save get 
  allRestaurantInfo = data.businesses;
  console.log(allRestaurantInfo);
  
  // save all restaurant info and create cards for each restaurant 
  for(var i = 0; i < allRestaurantInfo.length; i++){

    var restaurantInfo = allRestaurantInfo[i];
    
    // create restaurant card
    var cardContainer = $("<div>");
    cardContainer.addClass("col s12 m12 l6");
    $("#render-search").append(cardContainer);
    
    var card = $("<div>");
    card.attr("id", "restaurant-card");
    card.addClass("card horizontal hoverable");
    cardContainer.append(card);
    
    var cardImg = $("<div>");
    cardImg.attr("id", "image-container");
    cardImg.addClass("card-image");
    card.append(cardImg);
    
    var img = $("<img>");
    img.attr("id", "restaurant-img");
    img.attr("src", restaurantInfo.image_url);
    cardImg.append(img);
    
    var cardContent = $("<div>");
    cardContent.attr("id", "content-container");
    cardContent.addClass("card-content");
    card.append(cardContent);
    
    var name = $("<h4>");
    name.attr("id", "restaurant-name");
    name.addClass("card-title");
    name.text(restaurantInfo.name);
    cardContent.append(name);
    
    var price = $("<h6>");
    price.attr("id", "restaurant-price");
    price.text(`Price: ${restaurantInfo.price}`);
    cardContent.append(price);
    
    var rating = $("<h6>");
    rating.attr("id", "restaurant-rating");
    rating.text(`Rating: ${restaurantInfo.rating}`);
    cardContent.append(rating);
    
    var linkBtn = $("<button>");
    linkBtn.attr("id", "link-btn");
    linkBtn.addClass("btn btn-small btn-buy-it left");
    linkBtn.attr("type", "button");
    linkBtn.html(`<i class=" material-icons">link</i>`);
    
    var link = $("<a>");
    link.attr("href", restaurantInfo.url || "https://yelp.com");
    link.attr("target", "_blank");
    link.append(linkBtn);
    cardContent.append(link);
    
    var favoriteBtn = $("<button>");
    favoriteBtn.attr("id", "favorite-btn");
    favoriteBtn.addClass("btn btn-small btn-buy-it left");
    favoriteBtn.attr("type", "button");
    favoriteBtn.html(`<i class=" material-icons">favorite_border</i>`);
    favoriteBtn.attr("data-image", restaurantInfo.image_url);
    favoriteBtn.attr("data-name", restaurantInfo.name);
    favoriteBtn.attr("data-price", restaurantInfo.price);
    favoriteBtn.attr("data-rating", restaurantInfo.rating);
    favoriteBtn.attr("data-url", restaurantInfo.url);
    cardContent.append(favoriteBtn);
  }
  searchFormat();
}


// select favorite restaurant to save
$("#render-search").on("click", "#favorite-btn", saveFavoriteHandler);

function saveFavoriteHandler(event){
  event.stopPropagation();
  
  // change favorite icon to signify addition to favorites
  $(this).html(`<i class=" material-icons">favorite</i>`);

  // obtain restaurant info from data stored on the favorite button
  var favoriteImg = $(this).attr("data-image");
  var favoriteName = $(this).attr("data-name");
  var favoritePrice = $(this).attr("data-price");
  var favoriteRating = $(this).attr("data-rating");
  var favoriteUrl = $(this).attr("data-url");

  // create an object to store the data
  var favoriteInfo = {
    imgUrl: favoriteImg,
    name: favoriteName,
    price: favoritePrice,
    rating: favoriteRating,
    url: favoriteUrl
  }
  
  // checks for duplicate entries
  if(!allFavoriteInfo.includes(favoriteInfo)){
    
    // add favorite restaurant to localStorage
    allFavoriteInfo.push(favoriteInfo);
    localStorage.setItem("allFavorites", JSON.stringify(allFavoriteInfo));
  }
  
  // console.log(favoriteInfo);
  console.log(allFavoriteInfo);
}


// view favorite restaurants
$("#all-favorites-btn").on("click", viewFavoritesHandler);

function viewFavoritesHandler(event){
  event.stopPropagation();

  $("#restaurants-container").hide();
  $("#favorites-container").show();

  // get stored favorites from localStorage
  var savedFavorites = JSON.parse(localStorage.getItem("allFavorites"));

  // checks for data in localStorage
  if(savedFavorites !== null){
    allFavoriteInfo = savedFavorites;
  }else{
    allFavoriteInfo = [];
  }

  // create cards for each favorite restaurant 
  for(var i = 0; i < allFavoriteInfo.length; i++){

    var favorite = allFavoriteInfo[i];
    
    // create favorite restaurant card
    var cardContainer = $("<div>");
    cardContainer.addClass("col s12 m12 l6");
    $("#render-favorites").append(cardContainer);
    
    var card = $("<div>");
    card.attr("id", "restaurant-card");
    card.addClass("card horizontal hoverable");
    cardContainer.append(card);
    
    var cardImg = $("<div>");
    cardImg.attr("id", "image-container");
    cardImg.addClass("card-image");
    card.append(cardImg);

    var img = $("<img>");
    img.attr("id", "restaurant-img");
    img.attr("src", favorite.imgUrl);
    cardImg.append(img);

    var cardContent = $("<div>");
    cardContent.attr("id", "content-container");
    cardContent.addClass("card-content");
    card.append(cardContent);
    
    var name = $("<h4>");
    name.attr("id", "restaurant-name");
    name.addClass("card-title");
    name.text(favorite.name);
    cardContent.append(name);

    var price = $("<h6>");
    price.attr("id", "restaurant-price");
    price.text(`Price: ${favorite.price}`);
    cardContent.append(price);
    
    var rating = $("<h6>");
    rating.attr("id", "restaurant-rating");
    rating.text(`Rating: ${favorite.rating}`);
    cardContent.append(rating);

    var linkBtn = $("<button>");
    linkBtn.attr("id", "link-btn");
    linkBtn.addClass("btn btn-small btn-buy-it left");
    linkBtn.attr("type", "button");
    linkBtn.html(`<i class=" material-icons">link</i>`);
    cardContent.append(linkBtn);
    
    var link = $("<a>");
    link.attr("href", favorite.url || "https://yelp.com");
    link.attr("target", "_blank");
    link.append(linkBtn);
    cardContent.append(link);
  }
  searchFormat();
}

// make room for results 
function searchFormat(){
  $("#search-padding").attr("class", "search-padding-results");
}

// initialize page
function init(){
  $("#restaurants-container").hide();
  $("#favorites-container").hide();
  $("#search-padding").attr("class", "search-padding-default");
}