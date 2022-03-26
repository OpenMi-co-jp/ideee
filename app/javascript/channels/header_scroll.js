$(document).on ('turbolinks:load', function(){
  var beforePos = 0;

  function ScrollAnime() {
    var elemTop = $('.header-body').offset().top;
    var scroll = $(window).scrollTop();
    if(elemTop > scroll || 0 > scroll - beforePos){
      $('header').removeClass('js-up-move');
      $('header').addClass('js-down-move');
    }else{
      $('header').removeClass('js-down-move');
      $('header').addClass('js-up-move');
    }
    beforePos = scroll;
  }

  $(window).scroll(function () {
    ScrollAnime();
  });
});
