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

  $('#comment-delete').on('click', function() {
    const element = $(this)
    const comment_body = element.parents('.comment-column')
    const comment_id = comment_body.attr('id')
    $.ajax({
      url: '/comments/${comment_id}',
      type: 'POST',
      data: {id: comment_id, _method: "delete"},
      dataType: 'json'
    })
    .done(function(data) {
      element.parents('.parent').remove()
      $('#comment-${comment_id}').remove()
      $('#comments_count').html('<img src="/assets/icons/comment.svg"/>${gon.comment.idea.comments_num}')
    })
  });

  function create_comment(comment){
    return $.ajax({
      url: '/comments',
      type: 'POST',
      data: { description: comment, idea_id: gon.idea_id},
      dataType: 'json'
    })
  }

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
            '<div class="comment-column m-1 own-comment">' +
              '<div class="comment-column-inside m-1 white-text">' +
                '<div class="flex">' +
                  '<div class="comment-info">' +
                    '<div class="comment-description">' +
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
