// materialize initialization

// $(document).on ('turbolinks:load', function(){
//   // $('.modal').modal();
//   $('.modal').on('click', function() {
//     $('#modal1').open();
//     alert("クリックされました");
//   });
// });
$(document).ready(function(){
  $('select').formSelect();
  $('.modal').modal({startingTop: '30%', endingTop: '200px'});
})
