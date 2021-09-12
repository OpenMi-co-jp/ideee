$(document).on ('turbolinks:load', function(){

  $('.like-click').on('click', function() {
    const this_id = '#' + this.id
    like_num = Number($(this_id).find($('.likes-count')).html())
    if($(this_id).hasClass('clicked')){
      unlike(this_id).done(function(data) {
        $(this_id).toggleClass('clicked')
        $(this_id).find($('.likes-count')).html(like_num - 1)
      })
      .fail(function() {
        alert('いいねの取り消しに失敗しました')
      })
    } else {
      like(this_id).done(function() {
        $(this_id).toggleClass('clicked')
        $(this_id).find($('.likes-count')).html(like_num + 1)
      })
      .fail(function() {
        alert('いいねに失敗しました')
      })
    }
  });

  function unlike(this_id){
    return $.ajax({
      url: '/likes/' + $(this_id).data('id'),
      type: 'DELETE',
      data: { id: $(this_id).data('id') },
      dataType: 'json'
    })
  }

  function like(this_id){
    return $.ajax({
      url: '/likes',
      type: 'POST',
      data: { id: $(this_id).data('id') },
      dataType: 'json'
    })
  }
})
