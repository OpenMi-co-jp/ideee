$(document).on ('turbolinks:load', function(){

  $('#comment').on('click', function(e) {
    e.preventDefault()
    console.log('hello');
    $.ajax({
      url: '/comments',
      type: 'POST',
      data: { description: "test" },
      dataType: 'json'
    })
    .done(function() {
      alert('成功')
    })
    .fail(function() {
      alert('いいねの取り消しに失敗しました')
    })
  });
})
