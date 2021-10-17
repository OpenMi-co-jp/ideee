// materialize initialization

$(document).on ('turbolinks:load', function(){
  $('select').formSelect();
  $('.modal').modal({startingTop: '30%', endingTop: '200px'});
  $('.dropdown-trigger').dropdown({constrainWidth: false});
  $('.icon-circle.large').materialbox();
  $('.collapsible').collapsible();
  $('.carousel').carousel({
    duration: 100,
    padding: 50,
    fullWidth: true,
    indicators: true
  });

  var instance = M.Carousel.getInstance($('.carousel'));
  setInterval(function(){
    instance.next(1);
  },3000);

  $('#modal-trigger-intro').on('click', function() {
    $('#modal_intro').modal('open');
  });

  $('#modal-trigger-fund').on('click', function() {
    $('#modal_fund').modal('open');
  });

  $('.modal-trigger-login').on('click', function() {
    $('#modal_before_login').modal('open');
  });

  if($('h4').hasClass('no_idea_posted')) {
    $('#modal_idea_post').modal('open');
  };


  $('#modal-trigger-difficulty').on('click', function () {
    $('#modal_difficuty').modal('open');
  });

  $('.modal-close-trigger').on('click', function () {
    $('#modal_difficuty').modal('close');
    $('#difficuty_board').hide();
  });
})
