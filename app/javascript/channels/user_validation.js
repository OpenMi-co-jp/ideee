$(document).on ('turbolinks:load', function(){

  $('#edit_user_submit').on('click',function(e) {
    var error_num = 0;
    if(invalid_empty_when_submit('#user_name')) error_num++;
    if(invalid_empty_when_submit('#user_email')) error_num++;
    else if(invalid_email_format_when_submit('#user_email')) error_num++;
    if(invalid_selected_when_submit('#user_definition')) error_num++;
    if(error_num == 0) $('#edit_user').submit();
  });

  $('#user_name').on('keyup', function(e) {
    invalid_empty_when_modify('#user_name');
  });

  $('#user_email').on('keyup', function(e) {
    if( invalid_empty_when_modify('#user_email') ) return;
    invalid_email_format_when_modify('#user_email');
  });

  $('#user_definition').on('change', function(e) {
    invalid_selected_when_modify('#user_definition');
  });

  /**
   * 値が空であることを確認する（submit処理時）
   * @module invalid_empty_when_submit
   * @param {string} item_id 項目ID
   * @returns true:無効な値である、false:有効な値である
   */  
  function invalid_empty_when_submit(item_id) {
    if ($(item_id).val().length != 0) return false;
    $(item_id).nextAll(".js_empty_check").css('display','block');
    return true;
  }

  /**
   * 値が空であることを確認する（項目の修正時）
   * @module invalid_empty_when_modify
   * @param {string} item_id 項目ID
   * @returns true:無効な値である、false:有効な値である
   */  
   function invalid_empty_when_modify(item_id) {
    if ($(item_id).val().length == 0) return true;
    $(item_id).nextAll(".js_empty_check").css('display','none');
    return false;
  }

  /**
   * email形式かどうかを確認する（submit処理時）
   * @module invalid_email_format_when_submit
   * @param {string} item_id 項目ID
   * @returns true:無効な値である、false:有効な値である
   */
  function invalid_email_format_when_submit(item_id) {
    const email_regex = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9-]*\.)+[a-zA-Z]{1,}$/;
    var check_result = email_regex.test($(item_id).val());
    if (check_result) return false;
    $(item_id).nextAll(".js_email_format_check").css('display','block');
    return true;
  }

  /**
   * email形式かどうかを確認する（項目の修正時）
   * @module invalid_email_format_when_modify
   * @param {string} item_id 項目ID
   * @returns true:無効な値である、false:有効な値である
   */
   function invalid_email_format_when_modify(item_id) {
    const email_regex = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9-]*\.)+[a-zA-Z]{1,}$/;
    var check_result = email_regex.test($(item_id).val());
    if (!check_result) return true;
    $(item_id).nextAll(".js_email_format_check").css('display','none');
    return false;
  }


  /**
   * プルダウンメニュー項目の値が未選択であることを確認する（submit処理時）
   * @module invalid_selected_when_submit
   * @param {string} item_id 項目ID
   * @returns true:無効な値である、false:有効な値である
   */
  function invalid_selected_when_submit(item_id) {
    if ($(item_id).val().length != 0) return false;
    $(item_id).parent().nextAll(".js_unselected_check").css('display','block');
    return true;
  }

  /**
   * プルダウンメニュー項目の値が未選択であることを確認する（項目の修正時）
   * @module invalid_selected_when_modify
   * @param {string} item_id 項目ID
   * @returns true:無効な値である、false:有効な値である
   */
   function invalid_selected_when_modify(item_id) {
    if ($(item_id).val().length == 0) return true;
    $(item_id).parent().nextAll(".js_unselected_check").css('display','none');
    return false;
  }

})
