// define global variables 
var allFavoriteRecipes = [];
var allRecipeInfo = [];

// side nav 
$(document).ready(function(){
    $('.sidenav').sidenav();
  });

init();

$("form").on("submit", function(e){
  e.preventDefault();
  searchRecipe(e);
})

// on the click of the magnify glass search button, searchRecipe function runs.
  $("#search-btn").on("click", searchRecipe);

  function searchRecipe(event) {
    //prevents firing of any other functions.
    event.stopPropagation();

    var search = $("#search-input").val().trim();

    if(search){
    
      // clear the input field
      $("#search-input").val("");
      
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
    url: `https://api.spoonacular.com/recipes/complexSearch?includeIngredients=${search}&number=10&apiKey=ec05068cf090412eb77ead2a99d031e9&addRecipeInformation=true&fillIngredients=true&query`,
  }).then(function(data){
    console.log(data);
    renderSearch(data);
  })
}

// rendering search results
function renderSearch(data){
  
  $("#recipes-container").show();
  $("#favorite-container").hide();

var allRecipeInfo = data.results;
console.log(allRecipeInfo);

for(var i = 0; i < allRecipeInfo.length; i++){
   
  var recipesInfo = allRecipeInfo[i];

  var cardContainer = $("<div>");
  cardContainer.addClass("col s12 m12 l6");
  $("#render-search").append(cardContainer)

  var card = $("<div>");
  card.attr("id", "recipe-card");
  card.addClass("card horizontal hoverable");
  cardContainer.append(card);
  
  var cardImg = $("<div>");
  cardImg.attr("id", "image-container");
  cardImg.addClass("card-image");
  card.append(cardImg);

  var jpg = $("<img>");
  jpg.attr("id", "recipe-img");
  jpg.attr("src", recipesInfo.image);
  cardImg.append(jpg);

  var cardContent = $("<div>");
  cardContent.attr("id", "content-container");
  cardContent.addClass("card-content");
  card.append(cardContent);
  
  var name = $("<h4>");
  name.attr("id", "recipe-name");
  name.addClass("card-title");
  name.text(recipesInfo.title);
  cardContent.append(name);

  var missedIngredientCount = $("<h6>");
  missedIngredientCount.attr("id", "missed-ingredient-count");
  missedIngredientCount.text(`Missing Ingredients: ${recipesInfo.missedIngredientCount}`);
  cardContent.append(missedIngredientCount);

  var linkBtn = $("<button>");
  linkBtn.attr("id", "link-btn");
  linkBtn.addClass("btn btn-small btn-make-it left");
  linkBtn.attr("type", "button");
  linkBtn.html(`<i class="material-icons">link</i>`);
  
  var link = $("<a>");
  link.attr("href", recipesInfo.sourceUrl);
  link.attr("target", "_blank");
  link.append(linkBtn);
  cardContent.append(link);

  var favoriteBtn = $("<button>");
  favoriteBtn.attr("id", "favorite-btn");
  favoriteBtn.addClass("btn btn-small btn-make-it left");
  favoriteBtn.attr("type", "button");
  favoriteBtn.html(`<i class=" material-icons">favorite_border</i>`);
  favoriteBtn.attr("data-image", recipesInfo.image);
  favoriteBtn.attr("data-name", recipesInfo.title);
  favoriteBtn.attr("data-missed-ing", recipesInfo.missedIngredientCount);
  favoriteBtn.attr("data-url", recipesInfo.sourceUrl);
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

  // obtaining the recipe info from data, to put into favorites button event listener
  var favoriteRecipeImg = $(this).attr("data-image");
  var favoriteRecipeName = $(this).attr("data-name");
  var favoriteMissedIng = $(this).attr("data-missed-ing");
  var favoriteRecipeUrl = $(this).attr("data-url");

  var favoriteRecipeInfo = {
    imgUrl: favoriteRecipeImg,
    name: favoriteRecipeName,
    missedIngredients: favoriteMissedIng,
    url: favoriteRecipeUrl,
  }
  
  // checks for duplicate entries
  if(!allFavoriteRecipes.includes(favoriteRecipeInfo)){
    
    // add favorite to localStorage
    allFavoriteRecipes.push(favoriteRecipeInfo);
    localStorage.setItem("allFavoriteRecipes", JSON.stringify(allFavoriteRecipes));
  }
  
  // console.log(favoriteInfo);
  console.log(allFavoriteRecipes);
}


$("#all-favorites-btn").on("click", viewFavoritesRecipes);

function viewFavoritesRecipes(event){
  event.stopPropagation();

  $("#recipes-container").hide();
  $("#favorites-container").show();

  // get stored favorites from localStorage
  var savedFavorites = JSON.parse(localStorage.getItem("allFavoriteRecipes"));

  // checks for data in localStorage
  if(savedFavorites !== null){
    allFavoriteRecipes = savedFavorites;
  }else{
    allFavoriteRecipes = [];
  }

  // create cards for each favorite restaurant 
  for(var i = 0; i < allFavoriteRecipes.length; i++){

    var favorite = allFavoriteRecipes[i];
    
    // create restaurant card
    var cardContainer = $("<div>");
    cardContainer.addClass("col s12 m12 l6");
    $("#render-favorites").append(cardContainer);
    
    var card = $("<div>");
    card.attr("id", "recipe-card");
    card.addClass("card horizontal hoverable");
    cardContainer.append(card);
    
    var cardImg = $("<div>");
    cardImg.attr("id", "image-container");
    cardImg.addClass("card-image");
    card.append(cardImg);

    var img = $("<img>");
    img.attr("id", "recipe-img");
    img.attr("src", favorite.imgUrl);
    cardImg.append(img);

    var cardContent = $("<div>");
    cardContent.attr("id", "content-container");
    cardContent.addClass("card-content");
    card.append(cardContent);
    
    var name = $("<h4>");
    name.attr("id", "recipe-name");
    name.addClass("card-title");
    name.text(favorite.name);
    cardContent.append(name);

    var missedIngredientCount = $("<h6>");
    missedIngredientCount.attr("id", "missed-ingredient-count");
    missedIngredientCount.text(`Missing Ingredients: ${favorite.missedIngredients}`);
    cardContent.append(missedIngredientCount);

    var linkBtn = $("<button>");
    linkBtn.attr("id", "link-btn");
    linkBtn.addClass("btn btn-small btn-make-it left");
    linkBtn.attr("type", "button");
    linkBtn.html(`<i class=" material-icons">link</i>`);
    cardContent.append(linkBtn);
    
    var link = $("<a>");
    link.attr("href", favorite.url || "https://spoonacular.com");
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
  $("#recipes-container").hide();
  $("#favorites-container").hide();
  $("#search-padding").attr("class", "search-padding-default");
}



