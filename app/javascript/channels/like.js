$(document).on ('turbolinks:load', function(){

  $('.like-click').on('click', function() {
    const this_id = '#' + this.id
    if($(this_id).hasClass('clicked')){
      $.ajax({
        url: '/likes/' + $(this_id).data('id'),
        type: 'DELETE',
        data: { id: $(this_id).data('id') },
        dataType: 'json'
      })
      .done(function() {
        $(this_id).closest($('.like-image')).html("<%= image_tag \"like-icon.svg\", size: '45x45', class: 'like-svg' %>")
        $(this_id).toggleClass('clicked')
      })
      .fail(function(data) {
        alert('いいねに失敗しました')
      })
    } else {
      $.ajax({
        url: '/likes',
        type: 'POST',
        data: { id: $(this_id).data('id') },
        dataType: 'json'
      })
      .done(function() {
        $(this_id).closest($('.like-image')).html("<%= image_tag \"like-icon.svg\", size: '45x45', class: 'like-svg' %>")
        $(this_id).toggleClass('clicked')
      })
      .fail(function(data) {
        alert('いいねに失敗しました')
      })
    }
  });
})
