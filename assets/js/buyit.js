var allFavoriteInfo = [];
var allRestaurantInfo = [];

$(document).ready(function(){
  $(".sidenav").sidenav();
});

init();
$("form").on('submit', function(e){
  e.preventDefault()
  searchHandler(e)
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
    
    // fetch restaurants for city
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
  var allBusinessInfo = data.businesses;
  console.log(allBusinessInfo);
  
  // save all restaurant info and create cards for each restaurant 
  for(var i = 0; i < allBusinessInfo.length; i++){

    // create object to store restaurant data (is this redundant?)
    var businessInfo = allBusinessInfo[i];
    
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
    img.attr("src", businessInfo.image_url)
    cardImg.append(img);
    
    var cardContent = $("<div>");
    cardContent.attr("id", "content-container");
    cardContent.addClass("card-content");
    card.append(cardContent);
    
    var name = $("<h4>");
    name.attr("id", "restaurant-name");
    name.addClass("card-title");
    name.text(businessInfo.name);
    cardContent.append(name);
    
    var price = $("<h6>");
    price.attr("id", "restaurant-price");
    price.text(`Price: ${businessInfo.price}`);
    cardContent.append(price);
    
    var rating = $("<h6>");
    rating.attr("id", "restaurant-rating");
    rating.text(`Rating: ${businessInfo.rating}`);
    cardContent.append(rating);
    
    var linkBtn = $("<button>");
    linkBtn.attr("id", "link-btn");
    linkBtn.addClass("btn btn-small btn-color left");
    linkBtn.attr("type", "button");
    linkBtn.html(`<i class=" material-icons">link</i>`);
    
    var link = $("<a>");
    link.attr("href", businessInfo.url || "https://yelp.com");
    link.attr("target", "_blank");
    link.append(linkBtn);
    cardContent.append(link);
    
    var favoriteBtn = $("<button>");
    favoriteBtn.attr("id", "favorite-btn");
    favoriteBtn.addClass("btn btn-small btn-color left");
    favoriteBtn.attr("type", "button");
    favoriteBtn.html(`<i class=" material-icons">favorite_border</i>`);
    favoriteBtn.attr("data-image", businessInfo.image_url);
    cardContent.append(favoriteBtn);
  }
}

// select favorite restaurant to save
$("#render-search").on("click", "#favorite-btn", saveFavoriteHandler);

function saveFavoriteHandler(event){
  event.stopPropagation();
  
  // change favorite icon to signify addition to favorites
  $(this).html(`<i class=" material-icons">favorite</i>`);

  var favoriteImg = $(this).attr("data-image");
  var favoriteName = $(this).siblings("#restaurant-name").text();
  var favoritePrice = $(this).siblings("#restaurant-price").text();
  var favoriteRating = $(this).siblings("#restaurant-rating").text();
  // var favoriteLink = $(this).siblings("#restaurant-link").text();

  var favoriteInfo = {
    imgUrl: favoriteImg,
    name: favoriteName,
    price: favoritePrice,
    rating: favoriteRating,
    // link: favoriteLink
  }
  
  // checks for duplicate entries
  if(!allFavoriteInfo.includes(favoriteInfo)){
    
    // add city to search history and save to localStorage
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
    
    // create restaurant card
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
    linkBtn.addClass("btn btn-small btn-color left");
    linkBtn.attr("type", "button");
    linkBtn.html(`<i class=" material-icons">link</i>`);
    cardContent.append(linkBtn);
    
    var link = $("<a>");
    link.attr("href", favorite.link);
    linkBtn.append(link);

    // var favoriteBtn = $("<button>");
    // favoriteBtn.attr("id", "favorite-btn");
    // favoriteBtn.addClass("btn btn-small btn-color left");
    // favoriteBtn.attr("type", "button");
    // favoriteBtn.html(`<i class=" material-icons">favorite_border</i>`);
    // cardContent.append(favoriteBtn);
  }
}


// initialize page
function init(){
  $("#restaurants-container").hide();
  $("#favorites-container").hide();
}