$(document).on ('turbolinks:load', function(){
  // 開発環境でのみ読み込み
  if (window.location.href.startsWith('http://localhost:3000')) {
    // 開発環境のマークを取り除く
    $(".js-dev-close").on("click", function() {
      $('.c-dev-mark').hide();
    });
  }
})
