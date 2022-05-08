$(document).on ('turbolinks:load', function(){
  // アイデアのnewとedit以外のページではreturn
  if (!['ideas-edit', 'ideas-new'].includes($('body').data('page'))) { return }

  // タグの入力
  $(".chips").chips({
    placeholder: "Enterで入力",
    secondaryPlaceholder: "+Tag",
    data: getChipsData($("#tag-hidden-field").val()),
    limit: 3
  });
  // 自動入力用のタグをセット
  setTags()

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

  // タグを取得
  function setTags() {
    $.ajax({
      url: '/tags_list',
      type: 'GET',
      dataType: 'json'
    })
    .done(function (data) {
      setTagAutoComplete(data);
    })
  }

  // タグを自動入力を設定する
  function setTagAutoComplete(data_hash) {
    $('.chips-autocomplete').chips({
      autocompleteOptions: {
        data: data_hash,
        limit: Infinity,
        minLength: 2
      }
    });
  }

});
