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
    });
  }else{
    $.ajax({
      method: "DELETE",
      url: "/delete/" + thisId
    }).done(function(data){
      console.log(data);
    });
  };

});
