$(document).on ('turbolinks:load', function(){
  if ($('body').data('page') != "ideas-show") { return }

  if(window.sessionStorage.getItem('modal_session_check') == location.pathname){
    $('#modal_difficulty').modal('open');
  }else{
    sessionStorage.removeItem('modal_session_check');
  }

  window.sessionStorage.setItem('modal_session_check',location.pathname);
})
