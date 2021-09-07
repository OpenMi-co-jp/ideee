$(document).on ('turbolinks:load', function(){
  var flashes = ['.alert', '.notice'];
  $.each(flashes, function(_, flash){
    if ($(flash)[0].innerText.length > 0) {
      $(flash).addClass("flash-color")
      $(flash).fadeOut(10000);
    };
  })
});
