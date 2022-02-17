// materialize initialization
$(document).on ('turbolinks:load', function(){
  $('select').formSelect(); // selectタブをJSで表示
  $('.dropdown-trigger').dropdown({constrainWidth: false}); // ドロップダウンメニューのための初期設定
  $('.icon-circle.large').materialbox(); // 画像拡大表示のための初期設定
  $('.collapsible').collapsible(); // 折り畳みの初期設定
  $('ul.tabs').tabs(); // nav tabsの初期設定
  $('input#idea_name').characterCounter(); // テキスト入力の文字制限表示

  $('.sidenav').sidenav({
    closeOnClick: true,
    edge: 'right',
    draggable: true
  });

  // 開発者募集をrailsに渡す
  $('#cooperation_switch').on('click', function () {
    $('#idea_cooperation_switch').val($(this).prop('checked'))
  });
})
