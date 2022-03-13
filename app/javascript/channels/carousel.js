$(document).on ('turbolinks:load', function() {
  if ($('body').data('page') != "ideas-index") { return }

  $('.carousel').carousel({ // カルーセルの表示初期設定
    padding: 50,
    fullWidth: true,
    indicators: true
  });

  // カルーセルを3秒ごとに移動
  var instance = M.Carousel.getInstance($('.carousel'));
  setInterval(function(){
    instance.next(1);
  },8000);
})
