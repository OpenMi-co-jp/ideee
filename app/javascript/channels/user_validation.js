import Rails from "@rails/ujs";

$(document).on ('turbolinks:load', function(){

  $('#edit_user_submit').on('click',function(e) {
    var invalid_num = 0;
    invalid_num = M.validate_submit();
    if(invalid_num == 0) Rails.fire($("#edit_user")[0],'submit');
  });

})
