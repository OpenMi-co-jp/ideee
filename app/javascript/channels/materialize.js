// materialize initialization
$(document).on ('turbolinks:load', function(){
  $('select').formSelect(); // selectタブをJSで表示
  $('.modal').modal({startingTop: '30%', endingTop: '200px'}); // モーダルの大きさ調整
  $('.dropdown-trigger').dropdown({constrainWidth: false}); // ドロップダウンメニューのための設定
  $('.icon-circle.large').materialbox(); // 画像拡大表示のための設定
  $('.carousel').carousel({ // カルーセルの表示設定
    duration: 100,
    padding: 50,
    fullWidth: true,
    indicators: true
  });

  // カルーセルを3秒ごとに移動
  if($('body').data('page') == "ideas-index") {
    var instance = M.Carousel.getInstance($('.carousel'));
    setInterval(function(){
      instance.next(1);
    },3000);
  }

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

  if($('h4').hasClass('no_idea_posted')) {
    $('#modal_idea_post').modal('open');
  };


  $('#modal-trigger-difficulty').on('click', function () {
    $('#modal_difficuty').modal('open');
  });

  $('.modal-close-trigger').on('click', function () {
    $('#modal_difficuty').modal('close');
    $('#difficuty_board').hide();
  });
})
