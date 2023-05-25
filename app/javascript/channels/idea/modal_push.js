$(document).on ('turbolinks:load', function(){
  if ($('body').data('page') != "ideas-show") { return }

  // SNSなどへのシェア用をモーダル表示
  displayShareModal()

  // #modal_difficultyが読み込まれていなかったらreturn
  if ($('#js_voted_mark').length){ return }

  const has_session = 'modal_session_check' + $('#modal_difficulty').data('id')

  // ideaのセッションがあればシェアモーダルを出現
  if (window.sessionStorage.getItem(has_session)){
    $('#modal_difficulty').modal('open')
  } else {
    sessionStorage.removeItem(has_session)
  }

  // ideaのid毎にsessionを設定
  window.sessionStorage.setItem(has_session, true)

  // 公開する
  $("[name=idea-publish]").on('click', function() {
    setJsonValueToSessionStorage({ isDisplay: false })
  });
})


const displayShareModal = () => {
  const ideaShareItemObject = JSON.parse(getSessionStorageByKey('ideaShare'))
  // セッションストレージに値がない場合
  if (!ideaShareItemObject) {
    $('#modal_share').modal('open')
    setJsonValueToSessionStorage({isDisplay: true})
    return;
  } 

  // 既にモーダルが表示済みの場合
  if(ideaShareItemObject?.isDisplay === true) { return }

  // モーダルを表示していない場合
  if (ideaShareItemObject?.isDisplay === false) {
    $('#modal_share').modal('open')
    return setJsonValueToSessionStorage({isDisplay: true})
  }
  
  setJsonValueToSessionStorage({ isDisplay: false })
}

export const setJsonValueToSessionStorage = value => window.sessionStorage.setItem('ideaShare', JSON.stringify(value))

const getSessionStorageByKey = (key) =>  window.sessionStorage.getItem(key)
