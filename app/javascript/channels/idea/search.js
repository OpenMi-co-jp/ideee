$(document).on ('turbolinks:load', function(){
  if ($('body').data('page') != "ideas-search") { return }

  // 選択する日付の始まり
  $('.datepicker-start').datepicker({
    defaultDate: new Date(),
    // setDefaultDate: true,
  });

  // 選択する日付の終わり
  $('.datepicker-end').datepicker({
    defaultDate: new Date(),
    // setDefaultDate: true,
  });
})
