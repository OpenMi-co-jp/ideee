$(document).on ('turbolinks:load', function(){

  $('#edit_user_submit').on('click',function(e) {
    var error_num = 0;
    if(invalid_empty(0,'#user_name')) error_num++;
    if(invalid_empty(0,'#user_email')) error_num++;
    else if(invalid_email_format(0,'#user_email')) error_num++;
    if(invalid_selected(0,'#user_definition')) error_num++;
    if(error_num == 0) $('#edit_user').submit();
  });

  $('#user_name').on('keyup', function(e) {
    invalid_empty(1,'#user_name');
  });

  $('#user_email').on('keyup', function(e) {
    if( invalid_empty(1,'#user_email') ) return;
    invalid_email_format(1,'#user_email');
  });

  $('#user_definition').on('change', function(e) {
    invalid_selected(1,'#user_definition');
  });

  /**
   * テキスト項目の値が空であることを確認する（空であるとき、無効と評価する）
   * @module invalid_empty
   * @param {number} mode 0:submit時、1:項目修正時
   * @param {string} item_id 項目ID
   * @returns true:無効な値である、false:有効な値である
   */  
  function invalid_empty(mode,item_id) {
    if (mode == 0) {
      if ($(item_id).val().length != 0) return false;
      $(item_id).nextAll(".js_empty_check").css('display','block');
      return true;
    } else {
      if ($(item_id).val().length == 0) return true;
      $(item_id).nextAll(".js_empty_check").css('display','none');
      return false;
    }
  }

  /**
   * テキスト項目の値がemail形式以外であることを確認する（email形式以外であるとき、無効と評価する）
   * @module invalid_email_format
   * @param {number} mode 0:submit時、1:項目修正時
   * @param {string} item_id 項目ID
   * @returns true:無効な値である、false:有効な値である
   */
  function invalid_email_format(mode,item_id) {
    const email_regex = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9-]*\.)+[a-zA-Z]{1,}$/;
    var check_result = email_regex.test($(item_id).val());
    if (mode == 0) {
      if (check_result) return false;
      $(item_id).nextAll(".js_email_format_check").css('display','block');
      return true;
    } else {
      if (!check_result) return true;
      $(item_id).nextAll(".js_email_format_check").css('display','none');
      return false;
    }
  }

  /**
   * プルダウンメニュー項目の値が未選択であることを確認する（未選択であるとき、無効と評価する）
   * @module invalid_selected
   * @param {number} mode 0:submit時、1:項目修正時
   * @param {string} item_id 項目ID
   * @returns true:無効な値である、false:有効な値である
   */
  function invalid_selected(mode,item_id) {
    if (mode == 0) {
      if ($(item_id).val().length != 0) return false;
      $(item_id).parent().nextAll(".js_unselected_check").css('display','block');
      return true;
    } else {
      if ($(item_id).val().length == 0) return true;
      $(item_id).parent().nextAll(".js_unselected_check").css('display','none');
      return false;
    }
  }

})
