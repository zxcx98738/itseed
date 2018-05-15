
  
$(function(){
  /*表單驗證*/
	$("form").validate({
		submitHandler: function(form) {
      form.submit();
    },
    errorPlacement: function(error, element) {
      element.closest('div').append(error);
      if(element.attr('type') == 'file'){
        element.siblings('button').addClass('error');
      }
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
  			minlength: 6,
        maxlength: 20
  		},
  		pwd_confirmation: {
  			equalTo : '#pwd'
  		},
  		phone: {
  			required: true,
  			maxlength: 20
  		},
      th: {
        required: true,
        maxlength: 10
      },
  		name: {
  			required: true,
  			maxlength: 10
  		},
  		gender: {
  			required: true,
  		},
  		school: {
  			required: true,
  			maxlength: 20
  		},
  		grade: {
  			required: true,
  			maxlength: 20
  		},
  		reference: {
  			maxlength: 20,
  		},
      photo: {
        accept: 'image/*',
        fileSize: 2
      }
  	},
  	messages: {
  		email: {
  			remote: "此帳號已存在",
  		},
  	}
  });
  console.log("aa");
  var pass;
  $(".pwd-btn").click(function(){
    $(".password-hide").css('display','none');
    $(".password-part").css('display','block');
    pass = $("#pwd").val();
    console.log(pass);
  });

  $(".pwd-stop-btn").click(function(){
    $(".password-hide").css('display','block');
    $(".password-part").css('display','none');
    $("#pwd").val(pass);
    $("#conpwd").val(pass);
  });
});