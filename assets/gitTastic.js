// This is not just a place holder.

// This will need to be changed to something else
$("#cat-button").on("click", function() {

    // This next will also need to be tweaked.
    var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=criticalrole";

$.ajax({
    url: queryURL,
    method: "GET"
  })


  .then(function(response) {

    var imageUrl= response.data.image_original_url;

    var critRoleImage = $("<img>");

    critRoleImage.attr("src", imageUrl);
    critRoleImage.attr("alt", "critRole image");

    $("#images").prepend(critRoleImage);




  });
});