$(document).on ('turbolinks:load', function(){

  $('#comment').on('click', function(e) {
    e.preventDefault()
    $('.submit-btn').addClass('disabled')
    const comment = $('#comment-form').val()

    // コメントが入力されていれば発火
    if(comment.length > 0) {
      create_comment(comment)
      .done(function() {
        $('#js-comments').append(js_comments(comment)) // コメントをUIにセット
        $('#comment-form').val('') // コメントフォームを空にする
        $('.submit-btn').removeClass('disabled') // コメントの連投を防ぐdisabled
        send_email(comment) // アイデアの持ち主や関わる人にメールを送る
      })
      .fail(function() {
        alert('コメントに失敗しました')
      })
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
    return $(
            '<div class="p-comment-board__item own-comment">' +
              '<div class="c-unit-comment white-text">' +
                '<div class="flex">' +
                  '<div class="c-unit-comment__info">' +
                    '<div class="c-unit-comment__description">' +
                      comment.replace(/\n/g, '<br>') +
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
