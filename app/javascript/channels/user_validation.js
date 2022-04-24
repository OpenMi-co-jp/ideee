// Rails.fireをするには、個別のJSファイルにてRailsをimportする必要がある
import Rails from "@rails/ujs";

$(document).on ('turbolinks:load', function(){
  if ($('body').data('page') == "users/registrations-edit") {

    // 登録のクリックがされた時のバリデーションチェック
    $('#edit_user_submit').on('click', function() {
      var invalid_num = 0;
      invalid_num += M.invalid_input_num('#user_name');
      invalid_num += M.invalid_input_num('#user_email');
      invalid_num += M.invalidate_selected_num('#user_definition');
      if(invalid_num == 0) Rails.fire($("#edit_user")[0],'submit');
    });

    // select用のバリデーション
    M.validation_select_set('#user_definition');
  }

  if (['users/registrations-new', 'users/registrations-create'].includes($('body').data('page'))) {

    M.validation_min_len_set('#user_password');
    M.validation_min_len_set('#user_password_confirmation');
  }

})
