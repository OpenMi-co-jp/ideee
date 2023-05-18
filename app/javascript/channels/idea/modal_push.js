$(document).on ('turbolinks:load', function(){
  if ($('body').data('page') != "ideas-show") { return }
  // #modal_difficultyが読み込まれていなかったらreturn
  if ($('#js_voted_mark').length){ return }

  const has_session = 'modal_session_check' + $('#modal_difficulty').data('id')

  // ideaのセッションがあればシェアモーダルを出現
  if (window.sessionStorage.getItem(has_session)){
    $('#modal_difficulty').modal('open');
  } else {
    sessionStorage.removeItem(has_session);
    sessionStorage.removeItem('ideaShare');
  }

  // ideaのid毎にsessionを設定
  window.sessionStorage.setItem(has_session, true);

  const ideaShareItem = JSON.parse(window.sessionStorage.getItem('ideaShare'));
  // sessionStorateに既にideaShareItemがいる場合
  if (ideaShareItem){
    // シェアモーダルが１度も表示されなかった場合
    if(ideaShareItem.isDisplay === false) {
      $('#modal_share').modal('open');
      ideaShareItem.isDisplay = true;
      setJsonSessionToStorage(ideaShareItem);
    }
  }

  const initIdeaShare = {
    isShare: false,
    isDisplay: false
  };

  const getedIitIdeaShare = window.sessionStorage.getItem('ideaShare');

  if (!getedIitIdeaShare) {
    $('#modal_share').modal('open');
    initIdeaShare.isDisplay = true;
    setJsonSessionToStorage(initIdeaShare);
  } else {
    // 既にモーダルが表示済みの場合
    if (JSON.parse(getedIitIdeaShare).isDisplay === true) { return; }
    setJsonSessionToStorage(initIdeaShare);
  }
})

const setJsonSessionToStorage = value =>  window.sessionStorage.setItem('ideaShare', JSON.stringify(value));
