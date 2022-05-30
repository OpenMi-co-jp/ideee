$(document).on ('turbolinks:load', function(){
  if ($('body').data('page') != "ideas-show") { return }

  $('#js-comment-send').on('click', function(e) {
    e.preventDefault()
    $('.c-comment-form__submit-btn').addClass('disabled')
    const comment_input = $('#comment-form').val().replace(/^\s*(.*?)\s*$/, "$1");
    // コメントが入力されていれば発火
    if(comment_input.length > 0) {
      $('#comment-form_message').removeClass('c-comment-form__message');
      $("#comment-form_message").text('');
      create_comment(comment_input, $(this).data('id'))
      .done(function() {
        $('#js-comments').append(js_comments(comment_input)) // コメントをUIにセット
        $('#comment-form').val('') // コメントフォームを空にする
        $('.c-comment-form__submit-btn').removeClass('disabled')
        send_email(comment_input, $(this).data('id')) // アイデアの持ち主や関わる人にメールを送る
      })
      .fail(function() {
        alert('コメントに失敗しました')
      })
    } else {
      //$('.c-comment-form__submit-btn').css('color', 'gray') //追記
      $('#comment-form_message').addClass('c-comment-form__message');
      $("#comment-form_message").text('コメントを入力してください。'); // ここを消す？
      $('.c-comment-form__submit-btn').removeClass('disabled')
    }
  });

  $("#comment-form").on("comment-form", function() {

		var input = $(this).val(); //input に入力された文字を取得

		if(input){ //もし文字が入っていれば

			$("#js-comment-send").prop('disabled', false); //disabled を無効にする＝ボタンが押せる

		}else{

			$("#js-comment-send").prop('disabled', true); //disabled を有効にする＝ボタンが押せない
		}

});


  $('#comment-form').on('keyup', function(e) {
    if($(this).length > 0) {
      $("#comment-form_message").text('');
    }
  });

  $('.dropdown-comment-delete').on('click', function() {
    comment_id = $(this).attr('id')
    delete_comment(comment_id)
    .done(function() {
      $('#comment-' + comment_id).remove()
      $comments_count = $('#comments_count').find('p')
      $comments_count.html(Number($comments_count[0].innerText) - 1)
    })
  });

  $('.js-comment-shorten-trigger').on('click', function() {
    long_comment = $(this).prev('.c-comment-description__text');
    long_comment.toggleClass('compact')
    if (long_comment.hasClass('compact')) {
      $(this).text('続きを読む');
    } else {
      $(this).text('小さく畳む');
    }
  });

  function create_comment(comment, idea_id){
    return $.ajax({
      url: '/comments',
      type: 'POST',
      data: { description: comment, idea_id: idea_id},
      dataType: 'json'
    })
  };

  function delete_comment(comment_id){
    return $.ajax({
      url: '/comments/' + comment_id,
      type: 'DELETE',
      data: { id: comment_id },
      dataType: 'json'
    })
  };

  function send_email(comment, idea_id){
    return $.ajax({
      url: '/comments/send_email',
      type: 'POST',
      data: { description: comment, idea_id: idea_id},
      dataType: 'json'
    })
  }

  function js_comments(comment){
    const now = new Date()
    var mm = ('00' + (now.getMonth() + 1)).slice(-2);
    var dd = ('00' + now.getDate()).slice(-2);
    var h = ('00' + now.getHours()).slice(-2);
    var m = ('00' + now.getMinutes()).slice(-2);
    var escaped_comment = comment
                            .replace(/\n/g, '<br>')
                            .replace(/&/g, '&amp;')
                            .replace(/</g, '&lt;')
                            .replace(/>/g, '&gt;')
                            .replace(/"/g, '&quot;')
                            .replace(/'/g, '&#39;')
    return $(
            '<div class="p-comment-board__item own-comment">' +
              '<div class="c-unit-comment">' +
                '<div class="flex">' +
                  '<div class="date-small">' +
                    '<span>' + mm+'/'+dd+' '+h+':'+m + '</span>' +
                  '</div>' +
                  '<div class="c-unit-comment__info">' +
                    '<div class="c-unit-comment__info--description">' +
                      '<p>' +
                        escaped_comment +
                      '</p>' +
                    '</div>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>'
    )
  }
})
