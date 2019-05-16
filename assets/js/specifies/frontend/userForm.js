$(function(){
  /*表單驗證*/

	$("form").validate({
		submitHandler: function(form) {
      form.submit();
    },
    errorPlacement: function(error, element) {
      element.closest('div').append(error);
      element.closest('div').addClass('error');
    },
    success: function(element) {
      element.closest('div').removeClass('error');
    },
  });

});
$( document ).ready(function() {
  $("#disc_progress").addClass('active');
  $("#profile_progress").addClass('active');
  $("#file_progress").addClass('active');
  $("#form_progress").addClass('active');
});