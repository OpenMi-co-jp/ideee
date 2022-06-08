// materialize initialization
$(document).on ('turbolinks:load', function(){
  $('.modal').modal({startingTop: '30%', endingTop: '200px'}); // モーダルの大きさ調整

  // ideee説明用のモーダル
  $('#modal-trigger-intro').on('click', function() {
    $('#modal_intro').modal('open');
  });

  // 募金用のモーダル
  $('#modal-trigger-fund').on('click', function() {
    $('#modal_fund').modal('open');
  });

  // モーダルを閉じる用
  // $('.modal-close-btn').on('click', function() {
  //   $('.modal').modal('close');
  // });

  // ログイン用のモーダル
  $('.modal-trigger-login').on('click', function() {
    $('#modal_before_login').modal('open');
  });

  $('.sidenav-trigger').on('click', function () {
    $('.sidenav').sidenav('open');
  });

  // アイデア投稿の導線モーダル、アイデアと下書きもなければ表示
  if ($('body').data('page') == "users-show") {
    if($('h5').hasClass('no_idea_posted') && $('h5').hasClass('no_draft_posted')) {
      $('#modal_idea_post').modal('open');
    };
  }

  $('#modal-trigger-difficulty').on('click', function () {
    $('#modal_difficulty').modal('open');
  });

  $('.modal-close-trigger').on('click', function () {
    $('#modal_difficulty').modal('close');
    // TODO: jsでUIの文字を変更するようにする
    // $('#modal-trigger-difficulty').html($(this))
  });

  // share用のパラメーターが渡されたらモーダルを開く
  params = window.location.search;
  params.includes('?share=true') ? $('#modal_share').modal('open') : null;
})
