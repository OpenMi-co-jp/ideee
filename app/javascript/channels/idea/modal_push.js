$(document).on ('turbolinks:load', function(){
  if ($('body').data('page') != "ideas-show") { return }
  // #modal_difficultyが読み込まれていなかったらreturn
  if (!$('#modal_difficulty').length){ return }

  const has_session = 'modal_session_check' + $('#modal_difficulty').data('id')

  // ideaのセッションがあればシェアモーダルを出現
  if (window.sessionStorage.getItem(has_session)){
    $('#modal_difficulty').modal('open');
  } else {
    sessionStorage.removeItem(has_session);
  }

  // ideaのid毎にsessionを設定
  window.sessionStorage.setItem(has_session, true);
})
