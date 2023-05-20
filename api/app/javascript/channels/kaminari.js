$(document).on("turbolinks:load", function () {
  if ($('body').data('page') != "users-show") { return }

  if($(location).attr('search').startsWith("?published_page") ) {
    $('#link1')[0].click();
  }

  if($(location).attr('search').startsWith("?like_page") ) {
    $('#link2')[0].click();
  }

  if($(location).attr('search').startsWith("?comment_page") ) {
    $('#link3')[0].click();
  }
});
