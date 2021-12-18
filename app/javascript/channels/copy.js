$(document).on ('turbolinks:load', function(){

  $(".c-url-copy").on("click", function() {
    url = window.location.href;
    navigator.clipboard.writeText(url);
  });
})
