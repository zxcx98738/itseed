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
  				}
  			}
  		},
  		pwd: {
  			required: true,
  			minlength: 8
  		},
  		pwd_confirmation: {
  			equalTo : '#pwd'
  		}
  	},
  	messages: {
  		email: {
  			remote: "此帳號已存在",
  		}
  	}
  });
  // $("#resend").click(function(){
  //   window.history.forward(-1);　
  // });
});

