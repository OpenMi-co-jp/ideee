$(document).on ('turbolinks:load', function() {
  if (!['users/registrations-new', 'users/registrations-create', 'devise/passwords-edit'].includes($('body').data('page'))) { return }

  M.validation_min_len_set('#user_password');
  M.validation_min_len_set('#user_password_confirmation');

})
