(function() {
  $.validator.addMethod("fileSize", function(value, element, param) {
    var optionalValue = this.optional(element);
    if (optionalValue) {
      return optionalValue;
    }

    var limit = param * 1024 * 1024;
    var size = element.files[0].size;

    if(size > limit)
      return false;
    else
      return true;
  }, "檔案需小於{0}MB");

  $.validator.addMethod("accept", function(value, element, param) {
    // Split mime on commas in case we have multiple types we can accept
    var typeParam = typeof param === "string" ? param.replace(/\s/g, "").replace(/,/g, "|") : "image/*",
    optionalValue = this.optional(element),
    i, file;

    // Element is optional
    if (optionalValue) {
      return optionalValue;
    }

    if ($(element).attr("type") === "file") {
      // If we are using a wildcard, make it regex friendly
      typeParam = typeParam.replace(/\*/g, ".*");

      // Check if the element has a FileList before checking each file
      if (element.files && element.files.length) {
        for (i = 0; i < element.files.length; i++) {
          file = element.files[i];

          // Grab the mimetype from the loaded file, verify it matches
          if (!file.type.match(new RegExp( ".?(" + typeParam + ")$", "i"))) {
            return false;
          }
        }
      }
    }

    // Either return true because we've validated each file, or because the
    // browser does not support element.files and the FileList feature
    return true;
  }, $.validator.format("檔案格式錯誤"));
})();
  
$(function(){
  /*上傳圖片*/
  $('#uploadBtn').click(function(){
    $('input[name="photo"]').click();
  });

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