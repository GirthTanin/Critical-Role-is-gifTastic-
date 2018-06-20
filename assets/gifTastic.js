var topics = [
  "Critical Role",
  "Dungeons & Dragons",
  "Natural 20",
  "Matt Mercer",
  "character sheet",
  "Dungeon Master",
  "Scanlan Shorthalt",
  "Grog Strongjaw",
  "Vex'ahlia",
  "Vax'ildan",
  "Percy Taliesin",
  "Keyleth",
  "Pike Trickfoot Ashley Johnson",
  "Taryon Darrington",
  "Tiberius Stormwind",
  "Critical Fail",
  "Vox Machina",
  "Is it Thursday, yet?"


]

function roleCall() {
  var subTopic = $(this).attr("data-gif");
  console.log(subTopic);
}

// this is supposed to clear the form after adding the new button, but in jQuery, it needs to be rephrased .trigger(*"reset");
function formReset(){
  $("#topics-form").trigger("reset");
}

// this will create all the buttons
function renderButtons() {

// as learned before, they are ALL recreated each time, or we'd have lots of duplicate buttons.
  $("#buttons-view").empty();

    for (i=0; i<topics.length; i++) {
      var a = $("<button>");
      a.addClass("topic");
      a.attr("data-gif", topics[i]);
      a.text(topics[i]);
      $("#buttons-view").append(a);
  }
}
// append the buttons in a manner that uses them all 


// this adds the new button, and now, even clears the form!
$("#add-subTopic").on("click", function(event) {
  event.preventDefault();
  var subTopicNew = $("#topic-input").val().trim();
  topics.push(subTopicNew);
  renderButtons();
  console.log("a new button appears");
  formReset();
});

$(document).on("click", ".topic", roleCall);

renderButtons();



// This will need to be changed to something else I think...
$(".topic").on("click", function() {

  var subTopic= $(this).attr("data-gif");

    // This next will also need to be tweaked.
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + subTopic + "&api_key=dc6zaTOxFJmzC&limit=10";

$.ajax({
    url: queryURL,
    method: "GET"
  })


  .then(function(response) {
    var results = response.data;
    for (var i = 0; i < results.length; i++) {

      console.log(response.data[i]);
      console.log(response.data[i].images.original);
      
      // this next chunk will keep our code from populating filth for whoever gets to see this.
      if (results[i].rating !== "r" && results[i].rating !=="pg-13") {
        // I think I need two classes on the new div, and somehow also find something to grab onto to toggle the state from still to animate.
        var critRoleImage = $("<div class='item' class='gif'>");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating + " ");

        var gifImage = $("<img>");

        gifImage.attr("src", results[i].images.fixed_height.url);
        gifImage.attr("alt", "critRole image");
    
        critRoleImage.append(p);
        critRoleImage.append(gifImage);
    
        $("#gifs-appear-here").prepend(critRoleImage);
    
      // I've tried to add the class .gif like we did in the pausing gifs activity.
      $(".gif").on("click", function() {
            
            
        var state = $(this).attr("data-state");
      
        
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        } else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });




      }
    }

    
    



  });
});