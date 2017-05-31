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