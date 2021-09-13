$(document).on ('turbolinks:load', function(){

  $('.like-click').on('click', function() {
    const element = $(this)
    like_num = Number(element.find($('.likes-count')).html())
    if(element.hasClass('clicked')){
      unlike(element).done(function() {
        element.toggleClass('clicked')
        element.find($('.likes-count')).html(like_num - 1)
      })
      .fail(function() {
        alert('いいねの取り消しに失敗しました')
      })
    } else {
      like(element).done(function() {
        element.toggleClass('clicked')
        element.find($('.likes-count')).html(like_num + 1)
      })
      .fail(function() {
        alert('いいねに失敗しました')
      })
    }
  });

  function unlike(element){
    return $.ajax({
      url: '/likes/' + element.data('id'),
      type: 'DELETE',
      data: { id: element.data('id') },
      dataType: 'json'
    })
  }

  function like(element){
    return $.ajax({
      url: '/likes',
      type: 'POST',
      data: { id: element.data('id') },
      dataType: 'json'
    })
  }
})
