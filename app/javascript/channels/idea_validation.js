// Rails.fireをするには、個別のJSファイルにてRailsをimportする必要がある
import Rails from "@rails/ujs";

$(document).on ('turbolinks:load', function(){
  if (!['ideas-edit', 'ideas-new'].includes($('body').data('page'))) { return }

  // 「下書き保存ボタン」のクリックがされた時のバリデーションチェック
  $('#save_draft_submit').on('click', function() {
    invalid_idea();

  });

  // 「登録するボタン」、「更新するボタン」のクリックがされた時のバリデーションチェック
  $('#register_submit').on('click', function() {
    invalid_idea();

  });

  function invalid_idea(){
    var invalid_num = 0;
    invalid_num += M.invalid_input_num('#idea_name');
    invalid_num += M.invalid_input_num('#idea_background');
    invalid_num += M.invalid_input_num('#idea_goal');
    if(invalid_num == 0) Rails.fire($("#idea_form")[0],'submit');

};

})
