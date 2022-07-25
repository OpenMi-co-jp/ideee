$(document).on ('turbolinks:load', function(){
  if ($('body').data('page') != "ideas-show") { return }

  if(window.sessionStorage.getItem('show_idea') == location.pathname){
    $('#modal_difficulty').modal('open');
  }

  window.sessionStorage.setItem('show_idea',location.pathname);
})
