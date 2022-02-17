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

});
