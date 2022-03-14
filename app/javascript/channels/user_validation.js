// Rails.fireをするには、個別のJSファイルにてRailsをimportする必要がある
import Rails from "@rails/ujs";

$(document).on ('turbolinks:load', function(){

  $('#edit_user_submit').on('click',function(e) {
    var invalid_num = 0;
    invalid_num += M.validate_input(['text','email']);
    invalid_num += M.validate_select_field();
    if(invalid_num == 0) Rails.fire($("#edit_user")[0],'submit');
  });

})
