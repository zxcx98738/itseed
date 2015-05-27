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
  			minlength: 6
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
});