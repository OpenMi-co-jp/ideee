// materialize initialization
$(document).on ('turbolinks:load', function(){
  $('select').formSelect(); // selectタブをJSで表示
  $('.dropdown-trigger').dropdown({constrainWidth: false}); // ドロップダウンメニューのための初期設定
  $('.icon-circle.large').materialbox(); // 画像拡大表示のための初期設定
  $('.collapsible').collapsible(); // 折り畳みの初期設定
  $('ul.tabs').tabs(); // nav tabsの初期設定
  $('input#idea_name').characterCounter(); // テキスト入力の文字制限表示

  $('.sidenav').sidenav({
    closeOnClick: true,
    edge: 'right',
    draggable: true
  });

  // 開発者募集をrailsに渡す
  $('#cooperation_switch').on('click', function () {
    $('#idea_cooperation_switch').val($(this).prop('checked'))
  });

  // select用のhelper-textクラスの初期設定
  M.init_validate_select = function () {
    $("select[required].validate").each(function(){
      const element = $(this);
      const helper = element.parent().parent().find('.helper-text');
      if (helper !== undefined) {
        helper.insertAfter(element.parent().find('input'));
      }
    });
  };

  M.init_validate_select();

  M.validate_select_field = function (param) {
    var select_invalid_num = 0;
    if(param === undefined){
      $("select[required].validate").each(function(){
        const select_value = $(this).val();
        const input_element = $(this).parent().find('input');
        input_element.removeAttr('readonly', '');
        if (select_value != '') {
          input_element.removeClass('invalid');
        } else {
          input_element.addClass('invalid');
        }
      });
    }else{
      const select_value = param.val();
      const input_element = param.parent().find('input');
      input_element.removeAttr('readonly', '');
      if (select_value != '') {
        input_element.removeClass('invalid');
      } else {
        input_element.addClass('invalid');
      }
    }
    select_invalid_num = $('input[type=text].select-dropdown.dropdown-trigger.invalid').length;
    return select_invalid_num;
  }

  $(document).on('change', 'select[required].validate', function () {
    M.validate_select_field($(this));
  });

  M.validate_input = function (types) {
    var input_selector = '';
    var invalid_num = 0;
    $.each(types,function(index,val){
      if(input_selector==''){
        input_selector += 'input[type=' + val + '].validate ';
      }else{
        input_selector += ', input[type=' + val + '].validate ';
      }
    });

    $(input_selector).each(function (element, index) {
      var element = $(this);
      var len = element[0].value.length;
      if (len === 0 && element[0].validity.badInput === false && element.is(':required')) {
        if (element.hasClass('validate')) {
          element.addClass('invalid');
        }
      }
    });

    var input_invalid_num = 0;
    $.each(types,function(index,val){
      // selectセレクタについてはmaterializeではinput[type=text]セレクタに自動で置き換えが行われるため、selectセレクタのinvalid数を除く
      if(val === 'text'){
        var input_text_invalid_num = $('input[type=' + val + '].invalid').length;
        var select_invalid_num = $('input[type=' + val + '].select-dropdown.dropdown-trigger.invalid').length;
        input_invalid_num += input_text_invalid_num - select_invalid_num;
      }else{
        input_invalid_num += $('input[type=' + val + '].invalid').length
      }
    });

    return input_invalid_num;
  };

  M.validate_textarea = function () {
    var input_selector = 'textarea.validate';
    $(input_selector).each(function (element, index) {
      var element = $(this);
      var len = element[0].value.length;
      if (len === 0 && element[0].validity.badInput === false && element.is(':required')) {
        if (element.hasClass('validate')) {
          element.addClass('invalid');
        }
      }
    });

    return $("textarea.invalid").length;
  };

})
