import { setItemToSessionStorage} from './modal_push.js'

$(document).on ('turbolinks:load', function(){
  if (!['ideas-edit', 'ideas-new'].includes($('body').data('page'))) { return }

  // 「下書き保存ボタン」、「登録するボタン」、「公開するボタン」、「更新するボタン」のクリックがされた時のバリデーションチェック
  $("*[name=commit]").on('click', function() {
    var invalid_num = 0;
    invalid_num += M.invalid_input_num('#idea_name');
    invalid_num += M.invalid_input_num('#idea_background');
    invalid_num += M.invalid_input_num('#idea_goal');

  });
})
