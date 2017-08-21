$(document).on("click", ".article button", function() {
  event.preventDefault();

  var thisId = $(this).attr("data-attr");

  if($(this).hasClass("save")){
    $.ajax({
      method: "POST",
      url: "/saved/" + thisId
    })
    // With that done
    .done(function(data) {
      // Log the response
      console.log(data);
      alert("Article added successfully!")
    })}
    else if($(this).hasClass("delete")){
    $.ajax({
      method: "POST",
      url: "/delete/" + thisId
    }).done(function(data){
      console.log(data);
    })}
    else{
      $.ajax({
      method: "POST",
      url: "/comment/" + thisId
    })
    // With that done
    .done(function(data) {
      // Log the response
      console.log(data);
      alert("Comment added successfully!")
    })};
});