$(document).ready(function () {

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
    "Is it Thursday, yet?",
    "Talks Machina",
    "Greyskull",
    "Fjord",
    "Yasha",
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
      // console.log("going through the array" + a); 
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
    $("body").on("click", ".topic", function() {

      var subTopic= $(this).attr("data-gif");

      // This next will also need to be tweaked.
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + subTopic + "&api_key=2grxkFESyxoQd3eMOJN6V4jvq0kkMuCH&limit=10";
      // 2grxkFESyxoQd3eMOJN6V4jvq0kkMuCH is giphy api key for GirthTanin
      
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      .then(function(response) {
        var results = response.data;
        for (var i = 0; i < results.length; i++) {

          // console.log(response.data[i]);
          // console.log(response.data[i].images.original);
          
          // this next chunk will keep our code from populating filth for whoever gets to see this.
          if (results[i].rating !== "r" && results[i].rating !=="pg-13") {
            // console.log('rating is not R or PG13')
            // I think I need two classes on the new div, and somehow also find something to grab onto to toggle the state from still to animate.  So it took me a while to get to an understanding that the keys in an API call are very similar to an array.  An array with arrays in it.  Or an object with many attributes or descriptors in it.
            var critRoleImage = $("<div class='item' class='gif'>");
            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating + " ");

            var gifImage = $("<img>");

            gifImage.attr("src", results[i].images.fixed_height.url);

            gifImage.addClass("crImage");

            gifImage.attr("data-state", "animate");

            gifImage.attr("data-animate", results[i].images.fixed_height.url);

            gifImage.attr("data-still", results[i].images.fixed_height_still.url);
  // just above, I need to be able to recognize what is needed to get the correct size and which image, and then the magic part...

            critRoleImage.append(p);
            critRoleImage.append(gifImage);
      
            $("#gifs-appear-here").prepend(critRoleImage);
          }
        }
      });
  });
  // I've tried to add the class .gif like we did in the pausing gifs activity.  It hasn't worked, I'm changing it to crImage to see if a better name helps me connect it correctly.
  $("body").on("click", "img.crImage", function() {
    console.log("clicking the gif recognized");   
          
    var state = $(this).attr("data-state");
  
    if (state === "animate") {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    } else {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }
  });
});
