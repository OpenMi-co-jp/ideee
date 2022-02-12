// materialize initialization
$(document).on ('turbolinks:load', function(){
  $('select').formSelect(); // selectタブをJSで表示
  $('.modal').modal({startingTop: '30%', endingTop: '200px'}); // モーダルの大きさ調整
  $('.dropdown-trigger').dropdown({constrainWidth: false}); // ドロップダウンメニューのための初期設定
  $('.icon-circle.large').materialbox(); // 画像拡大表示のための初期設定
  $('.collapsible').collapsible(); // 折り畳みの初期設定
  $('.carousel').carousel({ // カルーセルの表示初期設定
    duration: 100,
    padding: 50,
    fullWidth: true,
    indicators: true
  });
  $('ul.tabs').tabs(); // nav tabsの初期設定

  $('.sidenav').sidenav({
    closeOnClick: true,
    edge: 'right',
    draggable: true
  });

  // タグの入力
  $(".chips").chips({
    placeholder: "Enterで入力",
    secondaryPlaceholder: "+Tag",
    data: getChipsData($("#tag-hidden-field").val()),
    limit: 3
  });

  // chipsの初期データを取得するメソッド
  function getChipsData(values) {
    return !values
      ? []
      : values.split(",").map(function (value) {
          return { tag: value };
        });
  }

  // 更新時にchipsの値をフォームに格納
  $(".idea-btn").on("click", function () {
    const tags = M.Chips.getInstance($(".chips")).chipsData.map(function (
      value
    ) {
      return value["tag"];
    });
    $("#tag-hidden-field").val(tags);
  });

  // カルーセルを3秒ごとに移動
  if($('body').data('page') == "ideas-index") {
    var instance = M.Carousel.getInstance($('.carousel'));
    setInterval(function(){
      instance.next(1);
    },3000);
  }

  // ideee説明用のモーダル
  $('#modal-trigger-intro').on('click', function() {
    $('#modal_intro').modal('open');
  });

  // 募金用のモーダル
  $('#modal-trigger-fund').on('click', function() {
    $('#modal_fund').modal('open');
  });

  // 協働開発者募集のモーダル
  $('#modal-trigger-cooperation').on('click', function() {
    $('#modal_cooperation').modal('open');
  });

  // モーダルを閉じる用
  $('.modal-close-btn').on('click', function() {
    $('.modal').modal('close');
  });

  // ログイン用のモーダル
  $('.modal-trigger-login').on('click', function() {
    $('#modal_before_login').modal('open');
  });

  $('.sidenav-trigger').on('click', function () {
    $('.sidenav').sidenav('open');
  });

  // アイデア投稿の導線モーダル、アイデアと下書きもなければ表示
  if($('h4').hasClass('no_idea_posted') && $('h5').hasClass('no_draft_posted')) {
    $('#modal_idea_post').modal('open');
  };

  $('#modal-trigger-difficulty').on('click', function () {
    $('#modal_difficulty').modal('open');
  });

  $('.modal-close-trigger').on('click', function () {
    $('#modal_difficulty').modal('close');
    // TODO: jsでUIの文字を変更するようにする
    // $('#modal-trigger-difficulty').html($(this))
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
