$(document).on("click", "button#save", function() {
  event.preventDefault();
  console.log("SAVE CLICKED");

  var thisId = $(this).attr("_id");

  $.ajax({
    method: "POST",
    url: "/saved/" + thisId
  })
  // With that done
  .done(function(data) {
    // Log the response
    console.log(data);
  });

});
