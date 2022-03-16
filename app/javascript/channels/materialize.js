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

  M.invalidate_selected_num = function (id) {
    const selected_field = $('#' + id).val();
    const parent_element = $('#' + id).parent().find('input');
    if (selected_field == '') {
      parent_element.addClass('invalid');
      return 1;
    } else {
      parent_element.removeClass('invalid');
      return 0;
    }
  }

  $('select[required].validate').on('change', function () {
    var selected_field_id = $(this)[0].id;
    M.invalidate_selected_num(selected_field_id);
  });

  M.invalid_input_num = function (id) {
    var element = $('#' + id + '.validate');
    var len = element[0].value.length;
    if (len === 0 && element.is(':required')) {
      element.addClass('invalid');
      return 1;
    }
    return 0;
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
