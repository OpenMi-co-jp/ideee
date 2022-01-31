import Rails from "@rails/ujs";

$(document).on ('turbolinks:load', function(){

  $('#edit_user_submit').on('click',function(e) {
    e.preventDefault();
    var invalid_num = 0

    M.updateTextFields();
    var input_selector = 'input[type=text].validate, input[type=password].validate, input[type=email].validate, input[type=url].validate, input[type=tel].validate, input[type=number].validate, input[type=search].validate, input[type=date].validate, input[type=time].validate, textarea.validate';
    $(input_selector).each(function (element, index) {
      var _this = $(this);
      M.validate_field_submit(_this);
    });

    const _requiredSelects = $("select[required].validate");
    M.validate_select_field(_requiredSelects);

    invalid_num = $(".invalid").length;

    if(invalid_num == 0){
      Rails.fire($("#edit_user")[0],'submit');
    }

  });

})
