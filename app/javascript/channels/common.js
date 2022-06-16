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

    $.ajax({
      url: '/notifications/check',
      type: 'POST'
    }).done(function() {
      $('#js_notification_check').find('.js_header__bell').addClass('checked')
    })
    .fail(function() {
      alert('新地通知は0件です')
    })
  })
});
