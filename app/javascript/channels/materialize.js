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

  M.validate_select_field = function (object) {
    const select_value = $(object).val();
    const input_element = $(object).parent().find('input');
    input_element.removeAttr('readonly', '');

    if (select_value != '') {
      input_element.addClass('valid');
      input_element.removeClass('invalid');
    } else {
      input_element.addClass('invalid');
      input_element.removeClass('valid');
    }
  };

  $(document).on('change', 'select[required].validate', function () {
    M.validate_select_field($(this));
  });

  M.validate_submit = function () {
    var input_selector = 'input[type=text].validate, input[type=password].validate, input[type=email].validate, input[type=url].validate, input[type=tel].validate, input[type=number].validate, input[type=search].validate, input[type=date].validate, input[type=time].validate, textarea.validate';
    $(input_selector).each(function (element, index) {
      var element = $(this);
      var len = element[0].value.length;
      if (len === 0 && element[0].validity.badInput === false && element.is(':required')) {
        if (element.hasClass('validate')) {
          element.addClass('invalid');
          element.removeClass('valid');
        }
      }
    });

    $("select[required].validate").each(function(){
      M.validate_select_field($(this));
    });

    return $(".invalid").length;
  };

})
