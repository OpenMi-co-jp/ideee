$(document).on ('turbolinks:load', function(){

  $('.like-click').on('click', function() {
    const element = $(this)
    like_num = Number(element.find($('.likes-count')).html())
    if(element.hasClass('clicked')){
      element.toggleClass('clicked')
      element.find($('.likes-count')).html(like_num - 1)
      unlike(element)
      .fail(function() {
        alert('いいねの取り消しに失敗しました')
        element.toggleClass('clicked')
        element.find($('.likes-count')).html(like_num + 1)  
      })
    } else {
      element.toggleClass('clicked')
      element.find($('.likes-count')).html(like_num + 1)
      like(element)
      .fail(function() {
        alert('いいねに失敗しました')
        element.toggleClass('clicked')
        element.find($('.likes-count')).html(like_num - 1)
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
