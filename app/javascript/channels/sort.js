$(document).on("turbolinks:load", function () {
  if (!['ideas-tags', 'ideas-search'].includes($('body').data('page'))) { return }

  $(".sort_select").change(function () {
    $("#sort_form").submit();
  });
});
