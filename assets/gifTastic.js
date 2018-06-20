var topics = [
  "critical-role",
  "dungeons", 
  "dragons", 
  "dice", 
  "monster", 
  "manual", 
  "npc",
  "character",
  "DM",
  "Scanlon",
  "Grog",
  "Vex",
  "Vax",
  "Percy",
  "Doty",
  "Victor",
  "Keyleth",
  "Pike",
  "Tiberius",

]

for (i=0; i<topics.length; i++)
// append the buttons in a manner that uses them all, 



// This will need to be changed to something else
$("#button").on("click", function() {

  var subTopic= $(this).attr("data-gif");

    // This next will also need to be tweaked.
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + subTopic + "api_key=dc6zaTOxFJmzC&limit=10";

$.ajax({
    url: queryURL,
    method: "GET"
  })


  .then(function(response) {
    var results = response.data;
    for (var i = 0; i < results.length; i++) {
      // line 63 of 13-button-Ajax...
      if (results[i].rating !== "r" && results[i].rating !=="pg-13") {
        
      }
    }

    

    var critRoleImage = $("<img>");

    critRoleImage.attr("src", subTopic);
    critRoleImage.attr("alt", "critRole image");

    $("#images").prepend(critRoleImage);




  });
});