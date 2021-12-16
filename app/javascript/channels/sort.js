$(document).on("turbolinks:load", function () {
  $(".sort_select").change(function () {
    $("#sort_form").submit();
  });
});
