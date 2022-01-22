import Rails from "@rails/ujs";

$(document).on ('turbolinks:load', function(){

  $('#edit_user_submit').on('click',function(e) {
    e.preventDefault();
    var error_num = 0;

    if(invalid_empty_submit('#user_name')) error_num++;
    if(invalid_empty_submit('#user_email')) error_num++;
    if(invalid_email_format_submit('#user_email')) error_num++;
    if(invalid_selected_submit('#user_definition')) error_num++;

    if(error_num == 0){
      Rails.fire($("#edit_user")[0],'submit');
    }
  });

  $('#user_name').on('keyup', function(e) {
    invalid_empty_modify('#user_name');
  });

  $('#user_email').on('keyup', function(e) {
    if( invalid_empty_modify('#user_email') ) return;
    invalid_email_format_modify('#user_email');
  });

  $('#user_definition').on('change', function(e) {
    invalid_selected_modify('#user_definition');
  });

  // 値が空であることを確認する（submit処理時）
  function invalid_empty_submit(item_id) {
    if ($(item_id).val().length != 0) return false;
    $(item_id).nextAll(".js_empty_check").css('display','block');
    return true;
  }

  // 値が空であることを確認する（項目の修正時）
   function invalid_empty_modify(item_id) {
    if ($(item_id).val().length == 0) return true;
    $(item_id).nextAll(".js_empty_check").css('display','none');
    return false;
  }

  // email形式かどうかを確認する（submit処理時）
  function invalid_email_format_submit(item_id) {
    const email_regex = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9-]*\.)+[a-zA-Z]{1,}$/;
    var check_result = email_regex.test($(item_id).val());
    if (check_result) return false;
    $(item_id).nextAll(".js_email_format_check").css('display','block');
    return true;
  }

  // email形式かどうかを確認する（項目の修正時）
   function invalid_email_format_modify(item_id) {
    const email_regex = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9-]*\.)+[a-zA-Z]{1,}$/;
    var check_result = email_regex.test($(item_id).val());
    if (!check_result) return true;
    $(item_id).nextAll(".js_email_format_check").css('display','none');
    return false;
  }

  // プルダウンメニュー項目の値が未選択であることを確認する（submit処理時）
  function invalid_selected_submit(item_id) {
    if ($(item_id).val().length != 0) return false;
    $(item_id).parent().nextAll(".js_unselected_check").css('display','block');
    return true;
  }

  // プルダウンメニュー項目の値が未選択であることを確認する（項目の修正時）
   function invalid_selected_modify(item_id) {
    if ($(item_id).val().length == 0) return true;
    $(item_id).parent().nextAll(".js_unselected_check").css('display','none');
    return false;
  }

})
