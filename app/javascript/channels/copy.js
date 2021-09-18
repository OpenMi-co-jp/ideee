$(document).on ('turbolinks:load', function(){

  $(".url-copy").on("click", function() {
    url = window.location.href;
    navigator.clipboard.writeText(url);
  });
})
