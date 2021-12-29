$(document).on ('turbolinks:load', function(){

  $('#edit_user_submit').on('click',function(e) {
    var error_num = 0;
    error_num += validate_user_name(0);
    error_num += validate_user_email(0);
    error_num += validate_user_definition(0);
    if(error_num == 0) $('#edit_user').submit();
  });

  $('#user_name').on('keyup', function(e) {
    validate_user_name(1);
  });

  $('#user_email').on('keyup', function(e) {
    validate_user_email(1);
  });

  $('#user_definition').on('change', function(e) {
    validate_user_definition(1);
  });

  /**
   * user_nameのバリデート関数
   * @param {*} mode モード(0:「更新するボタン」押下時、1:当該項目の修正時)
   * @returns (0:問題無し、1:問題あり)
   */
  function validate_user_name(mode) {
    var user_name = $('#user_name').val();

    if(mode == 0) {
      if(user_name == '') {
        $('#user_name_message').addClass('user_name_message');
        $("#user_name_message").text('ユーザー名を入力してください。');
        return 1;
      }
      return 0;
    } else if(mode == 1) {
      if(user_name != '') {
        $("#user_name_message").removeClass('user_name_message')
        $("#user_name_message").text('');  
      }
    }
  }

  /**
   * user_emailのバリデート関数
   * @param {*} mode モード(0:「更新するボタン」押下時、1:当該項目の修正時)
   * @returns (0:問題無し、1:問題あり)
   */
  function validate_user_email(mode) {
    const email_regex = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9-]*\.)+[a-zA-Z]{1,}$/;
    var user_email = $('#user_email').val();
    var user_email_message = $('#user_email_message').text();

    if(mode == 0) {
      var result = validate_email(user_email);
      if(result == 1) {
        $('#user_email_message').addClass('user_email_message');
        $("#user_email_message").text('メールアドレスを入力してください。');
        return 1;
      }else if(result == 2) {
        $('#user_email_message').addClass('user_email_message');
        $("#user_email_message").text('正しい形式のメールアドレスを入力してください。');
        return 1;
      }
      return 0;
    } else if(mode == 1) {
      var result = validate_email(user_email);

      // バリデート結果に問題があってメッセージ表示している、かつuser_emailのバリデートがある場合（未入力）
      if(user_email_message.length > 0 && result == 1) {
        $('#user_email_message').addClass('user_email_message');
        $("#user_email_message").text('メールアドレスを入力してください。');
        return 1;
      // バリデート結果に問題があってメッセージ表示している、かつuser_emailのバリデートがある場合（email形式でない）
      } else if(user_email_message.length > 0 && result == 2) {
        $('#user_email_message').addClass('user_email_message');
        $("#user_email_message").text('正しい形式のメールアドレスを入力してください。');
        return 1;
      // user_emailのバリデートが問題ない場合
      } else if(result == 0) {
        $('#user_email_message').removeClass('user_email_message');
        $("#user_email_message").text('');
        return 0;
      }
    }
  }
  
  /**
   * emailのバリデート関数
   * @param {*} email
   * @returns (0:問題無し、1:問題あり(未入力)、2:問題あり(email形式でない))
   */
  function validate_email(email) {
    const email_regex = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9-]*\.)+[a-zA-Z]{1,}$/;
    if(email == '') {
      return 1;
    } else if (!email_regex.test(email)) {
      return 2;
    } else {
      return 0;
    }
  }

  /**
   * user_definitionのバリデート関数
   * @param {*} mode モード(0:「更新するボタン」押下時、1:当該項目の修正時)
   * @returns (0:問題無し、1:問題あり)
   */
  function validate_user_definition(mode) {
    var user_definition = $('#user_definition').val();

    if(mode == 0) {
      if(user_definition == '') {
        $('#user_definition_message').addClass('user_definition_message');
        $("#user_definition_message").text('タイプを選択してください。');
        return 1;
      }
      return 0;
    } else if(mode == 1) {
      if(user_definition != '') {
        $("#user_definition_message").removeClass('user_definition_message')
        $("#user_definition_message").text('');
      }
      return 0;      
    }
  }
})
  