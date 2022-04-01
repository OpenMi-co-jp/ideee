$(document).on ('turbolinks:load', function(){
  var beforePos = 0;

  function ScrollAnime() {
    var elemTop = $('main').offset().top;
    var scroll = $(window).scrollTop();
    if(scroll == beforePos) {
    //IE11対策で処理を入れない
    }else if(elemTop > scroll || 0 > scroll - beforePos){
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

  // ヘッダーの切り替えが見えなくなる問題に対処
  hsize = $('body').height();
  $('.sidenav').css("height", hsize + "px");
});
