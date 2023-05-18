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

  displayShareModal();
})

// SNSなどへのシェア用もモーダル表示
const displayShareModal = () => {
  
  const ideaShareItemObject = JSON.parse(getSessionStorageByKey('ideaShare'));

  // セッションストレージにシェアモーダル用のフラグが存在していない場合
  if (!ideaShareItemObject) {
    $('#modal_share').modal('open');
    return setJsonValueToStorage({isDisplay: true})
  }
  
  // 既にモーダルが表示済みの場合
  if (JSON.parse(ideaShareItemObject).isDisplay === true) { 
    return; 
  }
 
  setJsonValueToStorage({ isDisplay: false }); 
}

const setJsonValueToStorage = value => window.sessionStorage.setItem('ideaShare', JSON.stringify(value));

const getSessionStorageByKey = (key) =>  window.sessionStorage.getItem(key);
