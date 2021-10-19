// materialize initialization

$(document).on ('turbolinks:load', function(){
  $('select').formSelect(); // selectタブをJSで表示
  $('.modal').modal({startingTop: '30%', endingTop: '200px'}); // モーダルの大きさ調整
  $('.dropdown-trigger').dropdown({constrainWidth: false}); // ドロップダウンメニューのための初期設定
  $('.icon-circle.large').materialbox(); // 画像拡大表示のための初期設定
  $('.collapsible').collapsible(); // 折り畳みの初期設定
  $('.carousel').carousel({ // カルーセルの表示初期設定
    duration: 100,
    numVisible: 5,
    dist: -50,
    shift: 10,
    padding: 20
  });

  // ideee説明用のモーダル
  $('#modal-trigger-intro').on('click', function() {
    $('#modal_intro').modal('open');
  });

  // 募金用のモーダル
  $('#modal-trigger-fund').on('click', function() {
    $('#modal_fund').modal('open');
  });

  // ログイン用のモーダル
  $('.modal-trigger-login').on('click', function() {
    $('#modal_before_login').modal('open');
  });

  // アイデア投稿の導線モーダル
  if($('h4').hasClass('no_idea_posted')) {
    $('#modal_idea_post').modal('open');
  };
})
