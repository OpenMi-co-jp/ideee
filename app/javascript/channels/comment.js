$(document).on ('turbolinks:load', function(){

  $('#comment').on('click', function(e) {
    e.preventDefault()
    $('.submit-btn').addClass('disabled')
    const comment = $('#comment-form').val()

    if(comment.length > 0) {
      create_comment(comment)
      .done(function() {
        $('#js-comments').append(js_comments(comment))
        $('#comment-form').val('')
        $('.submit-btn').removeClass('disabled')
      })
      .fail(function() {
        alert('コメントに失敗しました')
      })
    }
  });

  function create_comment(comment){
    return $.ajax({
      url: '/comments',
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
              '<div class="comment-column-inside m-1">' +
                '<div class="flex">' +
                  '<div class="comment-info">' +
                    '<div class="comment-description">' +
                      comment +
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
