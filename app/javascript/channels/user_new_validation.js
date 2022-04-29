// Rails.fireをするには、個別のJSファイルにてRailsをimportする必要がある
import Rails from "@rails/ujs";

$(document).on ('turbolinks:load', function(){
  if (!['users/registrations-new', 'users/registrations-create'].includes($('body').data('page'))) { return }

  M.validation_min_len_set('#user_password');
  M.validation_min_len_set('#user_password_confirmation');

})
