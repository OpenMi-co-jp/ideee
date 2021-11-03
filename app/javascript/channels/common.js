$(document).on ('turbolinks:load', function(){
  // alertとnoticeだけに対応
  var flashes = ['.alert', '.notice'];
  $.each(flashes, function(_, flash){
    if ($(flash)[0].innerText.length > 0) {
      $(flash).addClass("flash-color")
      if (flash == '.notice') {
        $(flash).fadeOut(10000);
      };
    };
  })
});
