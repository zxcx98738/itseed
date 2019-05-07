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
              console.log($( "input[name='email']" ).val())
  						return $( "input[name='email']" ).val();
  					},
            method : function() {
              console.log($( "input[name='method']" ).val())
              return $( "input[name='method']" ).val();
            }
  				}
  			}
  		}
  	},
    messages: {
      email: {
        remote: "此帳號尚未被註冊",
      }
    }
  });
  // $("#resend").click(function(){
  //   window.history.forward(-1);　
  // });
});

