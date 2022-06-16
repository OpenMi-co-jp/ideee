$(document).on ('turbolinks:load', function(){
  // alertとnoticeだけに対応
  var flashes = ['.alert', '.notice'];
  $.each(flashes, function(_, flash){
    if ($(flash)[0].innerText.length > 0) {
      $(flash).addClass("flash-color")
      if (flash == '.notice') {
        $(flash).fadeOut(10000);
      };
    };
  })

  // 通知をクリックしたらアップデート
  $('#js_notification_check').on('click', function() {
    // checkedが付いていたら既読なのでreturn
    if ($(this).children('.checked').length != 0) { return }
    $(this).find('.js_header__bell').addClass('checked');
// .header__bellを使わない。新しくクラスを付与。上記２行を１行にまとめる。
// doneの時にcssを付与。error時にはアラート。アラート探す。
// comment.jsを真似する。
    $.ajax({
      url: '/notifications/check',
      type: 'POST'
    })
  })
});

