$(document).on ('turbolinks:load', function(){
  if ($('body').data('page') != "rooms-show") { return }

  $('.dropdown-message-delete').on('click', function() {
    message_id = $(this).attr('id')
    delete_item(message_id)
    .done(function() {
      $('#messages-' + message_id).remove()
      $messages_count = $('#messages_count').find('p')
      $messages_count.html(Number($messages_count[0].innerText) - 1)
    })
  });

  function delete_item(message_id){
    return $.ajax({
      url: '/messages/' + message_id,
      type: 'DELETE',
      data: { id: message_id },
      dataType: 'json'
    })
  };
})
