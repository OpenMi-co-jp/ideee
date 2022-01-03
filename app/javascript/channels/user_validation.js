$(document).on ('turbolinks:load', function(){

  $('#edit_user_submit').on('click',function(e) {
    var error_num = 0;
    error_num += invalid_empty($('#user_name')) ? 1 : 0;
    if( invalid_empty($('#user_email')) ) {
      error_num++;
    } else if( invalid_not_email_format($('#user_email')) ) {
      error_num++;
    }
    error_num += invalid_not_selected($('#user_definition')) ? 1 : 0;
    if(error_num == 0) $('#edit_user').submit();
  });

  $('#user_name').on('keyup', function(e) {
    valid_not_empty($('#user_name'));
  });

  $('#user_email').on('keyup', function(e) {
    if( !valid_not_empty($('#user_email')) ) return;
    valid_email_format($('#user_email'));
  });

  $('#user_definition').on('change', function(e) {
    valid_selected($('#user_definition'));
  });

  const email_regex = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9-]*\.)+[a-zA-Z]{1,}$/;

  function invalid_empty(item) {
    if (item.val().length != 0) return false;
    item.nextAll(".js_empty_check").css('display','block');
    return true;
  }

  function invalid_not_email_format(item) {
    
    var check_result = email_regex.test(item.val());
    if (check_result) return false;
    item.nextAll(".js_email_format_check").css('display','block');
    return true;
  }

  function invalid_not_selected(item) {
    if (item.val().length != 0) return false;
    item.parent().nextAll(".js_unselected_check").css('display','block');
    return true;
  }

  function valid_not_empty(item) {
    if (item.val().length == 0) return false;
    item.nextAll(".js_empty_check").css('display','none');
    return true;
  }

  function valid_email_format(item) {
    var check_result = email_regex.test(item.val());
    if (!check_result) return false;
    item.nextAll(".js_email_format_check").css('display','none');
    return true;
  }

  function valid_selected(item) {
    if (item.val().length == 0) return false;
    item.parent().nextAll(".js_unselected_check").css('display','none');
    return true;
  }

})
  