$(document).on ('turbolinks:load', function(){
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $('#avatar_img_prev').attr('src', e.target.result);
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  // 画像をアップロードしたら現在表示している画像を消す
  $("#post-img").on ('change', function(){
    $('#avatar_img_prev').removeClass('disabled');
    $('.present-img').remove();
    readURL(this);
  });
});
