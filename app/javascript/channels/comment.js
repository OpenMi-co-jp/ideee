$(document).on ('turbolinks:load', function(){
  if ($('body').data('page') != "ideas-show") { return }

  $('#comment').on('click', function(e) {
    e.preventDefault()
    $('.submit-btn').addClass('disabled')
    const comment_input = $('#comment-form').val().replace(/^\s*(.*?)\s*$/, "$1");
    // コメントが入力されていれば発火
    if(comment_input.length > 0) {
      $('#comment-form_message').removeClass('c-comment-form__message');
      $("#comment-form_message").text('');
      create_comment(comment_input)
      .done(function() {
        $('#js-comments').append(js_comments(comment_input)) // コメントをUIにセット
        $('#comment-form').val('') // コメントフォームを空にする
        $('#comment.submit-btn').removeClass('disabled')
        send_email(comment_input) // アイデアの持ち主や関わる人にメールを送る
      })
      .fail(function() {
        alert('コメントに失敗しました')
      })
    } else {
      $('#comment-form_message').addClass('c-comment-form__message');
      $("#comment-form_message").text('コメントを入力してください。');
      $('#comment.submit-btn').removeClass('disabled')
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

  function create_comment(comment){
    return $.ajax({
      url: '/comments',
      type: 'POST',
      data: { description: comment, idea_id: gon.idea_id},
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

  function send_email(comment){
    return $.ajax({
      url: '/comments/send_email',
      type: 'POST',
      data: { description: comment, idea_id: gon.idea_id},
      dataType: 'json'
    })
  }

  function js_comments(comment){
    const now = new Date()
    var yy = now.getFullYear()
    var mm = now.getMonth() + 1
    var dd = now.getDate()
    var h = now.getHours()
    var m = now.getMinutes()
    var escaped_comment = comment
                            .replace(/\n/g, '<br>')
                            .replace(/&/g, '&amp;')
                            .replace(/</g, '&lt;')
                            .replace(/>/g, '&gt;')
                            .replace(/"/g, '&quot;')
                            .replace(/'/g, '&#39;')
    return $(
            '<div class="p-comment-board__item own-comment">' +
              '<div class="c-unit-comment white-text">' +
                '<div class="flex">' +
                  '<div class="c-unit-comment__info">' +
                    '<div class="c-unit-comment--description">' +
                      escaped_comment +
                    '</div>' +
                    '<div class="date-small pt-2">' +
                      yy+'.'+mm+'.'+dd+' '+h+':'+m +
                    '</div>' +
                  '</div>' +
                '</div>' +
              '</div>' +
            '</div>'
    )
  }
})
