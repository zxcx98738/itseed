$(function(){
	$("form").validate({
		submitHandler: function(form) {
      form.submit();
    },
    errorPlacement: function(error, element) {
      element.closest('div').append(error);
    },
  	rules: {
  		email: {
  			required: true,
        email: true,
  			remote: {
  				url: "/check-email",
  				type: "post",
  				data: {
  					email: function() {
  						return $( "input[name='email']" ).val();
  					}
  				},
          success: function(data) {
            console.log(data)
            if (data == true){
                swal({
                  title: '此帳號尚未被註冊，是否前往註冊?',
                  confirmButtonText: '確定',
                  cancelButtonText: '取消',
                  showCancelButton: true
                })
                .then(function(result) {
                  if (result.value) {
                    document.location.href = "/register";   
                  }
                })              
              $("#login-btn").attr("disabled", true);
              // messages: {
              //   email: "此帳號已存在"
              // }
            }
            else{

              $("#login-btn").attr("disabled", false);
            }
          }
  			}
  		}
  	}
  });
  // $("#resend").click(function(){
  //   window.history.forward(-1);　
  // });
});

