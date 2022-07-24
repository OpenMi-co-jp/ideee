$(document).on ('turbolinks:load', function(){
  if ($('body').data('page') != "ideas-show") { return }

  if(window.sessionStorage.getItem('show_count')){
    $('#modal_difficulty').modal('open');
  }

  window.sessionStorage.setItem('show_count','1');

  console.log(window.sessionStorage.getItem('show_count'));
})
