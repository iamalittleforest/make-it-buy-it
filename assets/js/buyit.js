$(document).ready(function(){
  $(".sidenav").sidenav();
});

// $.ajax({
//   headers: {
//     Authorization: "Bearer Ryqj-TG94SYRXzsiWTxT_4MKhOAx1HAulcczosM1LalfLE72pqkh-h6KneP7efCyUS1tLZwzMCds6LsnPzigmTfDOcqSIvskkZHDLHcRbSjuAIi4ukJnZmQXCstjW3Yx",
//   },
//   method: "GET",
//   accepts: "*",
//   url: `https://wendy-cors.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=${search}`,
// }).then(function (data) {
//   console.log(data);
// });

// $("#search-btn").on("click", searchHandler);

// function searchHandler(event) {
//   event.preventDefault();
  
//   // formats input text
//   var search = $("#search-input").val().trim();
  
//   if(search) {
    
//     // clear the input field
//     $("#search").val("");
    
//     // save search to local storage
//     saveSearch(search);
    
//     // fetch restaurants for city
//     fetchRestaurants(search);
//   }
// }