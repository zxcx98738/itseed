(function() {
  $.validator.addMethod("fileSize", function(value, element, param) {
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
  /*上傳檔案*/
  $('button[type="button"]').click(function(){
    $(this).siblings('input').click();
  });

  /*表單驗證*/
  $("form").each(function(){
    $(this).validate({
      submitHandler: function(form) {
        form.submit();
      },
      errorPlacement: function(error, element) {
        element.closest('div').append(error);
        if(element.attr('type') == 'file'){
          element.siblings('button[type="button"]').addClass('error');
        }
      },
      rules: {          
        // registration: {
        //   required: true,
        //   accept: 'application/pdf',
        //   fileSize: 5
        // },
        autobiography: {
          required: true,
          accept: 'application/pdf',
          fileSize: 5
        },
        receipt: {
          required: true,
          accept: 'application/pdf',
          fileSize: 5
        },
      },
      messages: {
        registration: {
          required: "未選擇檔案",
        },
        autobiography: {
          required: "未選擇檔案",
        },
        receipt: {
          required: "未選擇檔案",
        },
      }
    });
  });
});
$( document ).ready(function() {
  $("#disc_progress").addClass('active');
  $("#profile_progress").addClass('active');
  $("#file_progress").addClass('active');
});