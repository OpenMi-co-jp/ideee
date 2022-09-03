$(document).on("turbolinks:load", function () {
  if (!['ideas-tags', 'ideas-search'].includes($('body').data('page'))) { return }

  $(".js-search-fire").change(function () {
    $("#js-search-form").submit();
  });
});
