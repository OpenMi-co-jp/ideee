$(document).on ('turbolinks:load', function(){
  if ($('body').data('page') != "ideas-search") { return }

  // 選択する日付の始まり
  $('.datepicker-start').datepicker({
    format: 'yyyy/mm/dd',
    setDefaultDate: true,
    defaultDate: new Date(yearBefore),
  });

  // 選択する日付の終わり
  $('.datepicker-end').datepicker({
    format: 'yyyy/mm/dd',
    setDefaultDate: true,
    defaultDate: new Date(),
  });

  function yearBefore () {
    return new Date().getFullYear() - 1, new Date().getMonth(), new Date().getDate()
  }
})
