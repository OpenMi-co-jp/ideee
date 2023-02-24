$(document).on ('turbolinks:load', function() {
    if (!['users/sessions-new'].includes($('body').data('page'))) { return }

    M.validation_min_len_set('#user_password');
})
