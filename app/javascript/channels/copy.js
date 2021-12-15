$(document).on ('turbolinks:load', function(){

  $(".c-url-copy").on("click", function() {
    url = window.location.href;
    navigator.clipboard.writeText(url);
  });

  $(".c-url-copy__mobile").on("click", function() {
    url = window.location.href;
    navigator.clipboard.writeText(url);
  });
})
