// materialize initialization

$(document).on ('turbolinks:load', function(){
  $('select').formSelect();
  $('.modal').modal({startingTop: '30%', endingTop: '200px'});
  $('.dropdown-trigger').dropdown({constrainWidth: false});

  $('#modal-trigger-intro').on('click', function() {
    $('#modal_intro').modal('open');
  });

  $('#modal-trigger-fund').on('click', function() {
    $('#modal_fund').modal('open');
  });
})
