$(document).on ('turbolinks:load', function() {
  if ($('body').data('page') != "ideas-show") { return }

  $(".url-copy-js").on("click", function() {
    url = window.location.href;
    navigator.clipboard.writeText(url);
  });
})
