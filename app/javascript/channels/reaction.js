$(document).on ('turbolinks:load', function(){
  if ($('body').data('page') != "ideas-show") { return }

  $('.js-reaction-click').on('click', function() {
    const element = $(this)
    like_num = Number(element.find($('.js-like-count')).html())
    if(element.hasClass('clicked')){
      element.toggleClass('clicked')
      unreaction(element)
      .fail(function() {
        element.toggleClass('clicked')
      })
    } else {
      element.toggleClass('clicked')
      reaction(element)
      .fail(function() {
        element.toggleClass('clicked')
      })
    }
  });

  function unreaction(element){
    return $.ajax({
      url: '/reactions/' + element.data('id'),
      type: 'DELETE',
      data: { id: element.data('id'), type: element.data('type') },
      dataType: 'json'
    })
  }

  function reaction(element){
    return $.ajax({
      url: '/reactions',
      type: 'POST',
      data: { id: element.data('id'), type: element.data('type'), emoji: element.data('emoji') },
      dataType: 'json'
    })
  }
})
