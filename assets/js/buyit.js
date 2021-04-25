$(document).ready(function(){
  $(".sidenav").sidenav();
});

init();

// search button starts search for restaurants
$("#search-btn").on("click", searchHandler);

function searchHandler(event){
  event.stopPropagation();
  
  // formats input text
  var search = $("#search-input").val().trim();
  
  if(search){
    
    // clear the input field
    $("#search-input").val("");
    
    // save search to local storage
    // saveSearch(search);
    
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

  var allBusinessInfo = data.businesses;
  
  // create restaurant cards for each restaurant 
  for(var i = 0; i < allBusinessInfo.length; i++){

    var businessInfo = allBusinessInfo[i];
    
    var cardContainer = $("<div>");
    cardContainer.addClass("col m12 l6");
    $("#render-search").append(cardContainer);
    
    var card = $("<div>");
    card.attr("id", "restaurant-card");
    card.addClass("card horizontal hoverable");
    cardContainer.append(card);
    
    var cardImg = $("<div>");
    cardImg.addClass("card-image");
    card.append(cardImg);

    var img = $("<img>");
    img.attr("id", "restaurant-img");
    img.attr("src", `${businessInfo.image_url}`)
    cardImg.append(img);

    var cardContent = $("<div>");
    cardContent.addClass("card-content");
    card.append(cardContent);
    
    var name = $("<div>");
    name.attr("id", "restaurant-name");
    name.addClass("card-title");
    name.text(`${businessInfo.name}`);
    cardContent.append(name);

    var price = $("<div>");
    price.attr("id", "restaurant-price");
    price.text(`Price: ${businessInfo.price}`);
    cardContent.append(price);

    var rating = $("<div>");
    rating.attr("id", "restaurant-rating");
    rating.text(`Yelp Rating: ${businessInfo.rating}`);
    cardContent.append(rating);
  }
}

// initialize page
function init(){
  $("#restaurants-container").hide();
}