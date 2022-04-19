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

  // チーム開発募集をrailsに渡す
  $('#team_switch').on('click', function () {
    $('#idea_team_switch').val($(this).prop('checked'))
  });

  // 選択必須のバリデーション
  M.invalidate_selected_num = function (id) {
    const selected_field = $(id).val();
    const parent_element = $(id).siblings('input');
    if (selected_field == '') {
      parent_element.addClass('invalid');
      return 1;
    } else {
      parent_element.removeClass('invalid');
      return 0;
    }
  }

  // 入力必須のバリデーション
  M.invalid_input_num = function (id) {
    var element = $(id + '.validate');
    var len = element[0].value.length;
    if (len === 0 && element.is(':required')) {
      element.addClass('invalid');
      return 1;
    }
    return 0;
  };

  // 選択必須の時に必要な機能セット
  M.validation_select_set = function (id) {
    // select用のhelper-textクラスの初期設定
    var helper = $(id).parent().siblings('.helper-text');
    if (helper !== undefined) {
      helper.insertAfter($(id).siblings('input'));
    }

    // selectが変更されたらエラーメッセージを表示
    $(id).on('change', function () {
      M.invalidate_selected_num($(this));
    });
  };
})
