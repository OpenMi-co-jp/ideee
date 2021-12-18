$(document).on ('turbolinks:load', function(){

  $(".c-url-copy, .c-url-copy__mobile").on("click", function() {
    url = window.location.href;
    navigator.clipboard.writeText(url);
  });
})
