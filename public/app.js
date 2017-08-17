$(document).on("click", "#save", function() {
  event.preventDefault();

  var thisId = $(this).attr("data-attr");

  $.ajax({
    method: "POST",
    url: "/saved/" + thisId
  })
  // With that done
  .done(function(data) {
    // Log the response
    console.log("DONE, bitch")
    console.log(data);
  });

});
