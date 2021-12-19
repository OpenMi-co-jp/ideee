$(document).on ('turbolinks:load', function(){

  $(".url-copy-js, .c-url-copy__mobile").on("click", function() {
    url = window.location.href;
    navigator.clipboard.writeText(url);
  });
})
